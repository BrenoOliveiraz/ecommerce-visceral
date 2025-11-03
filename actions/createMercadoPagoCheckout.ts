'use server'

import { preference } from '@/lib/mercadopago'
import { BasketItem } from '@/app/(store)/store'
import { imageUrl } from '@/lib/imageUrl'

export type Metadata = {
  orderNumber: string
  customerName: string
  customerEmail: string
  clerkUserId: string
}

export type GroupBasketItem = {
  product: BasketItem['product']
  quantity: number
}

/**
 * Cria uma preferência de pagamento no Mercado Pago.
 * Agora aceita também o valor do frete.
 */
export async function createMercadoPagoCheckout(
  items: GroupBasketItem[],
  metadata: Metadata,
  valorFrete: number
) {
  try {
    // 🧩 Verifica se há produtos sem preço definido
    const itemsWithoutPrice = items.filter((item) => !item.product.price)
    if (itemsWithoutPrice.length > 0) {
      throw new Error('Alguns produtos não possuem preço definido.')
    }

    // 🌐 Define a BASE_URL de forma segura
    const rawBaseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL
    if (!rawBaseUrl || !/^https?:\/\//.test(rawBaseUrl)) {
      throw new Error(
        `BASE_URL inválida: "${rawBaseUrl}". 
Verifique suas variáveis de ambiente (.env.local ou no painel da Vercel). 
Exemplo:
  BASE_URL=https://seudominio.com
ou, localmente:
  BASE_URL=http://localhost:3000`
      )
    }

    const baseUrl = rawBaseUrl.replace(/\/$/, '')

    // 🔁 URLs de retorno obrigatórias para o Mercado Pago
    const successUrl = `${baseUrl}/success?orderNumber=${metadata.orderNumber}`
    const failureUrl = `${baseUrl}/basket`
    const pendingUrl = `${baseUrl}/basket`

    console.log('✅ Criando preferência Mercado Pago com URLs:')
    console.log('  Success:', successUrl)
    console.log('  Failure:', failureUrl)
    console.log('  Pending:', pendingUrl)

    // 🧮 Monta os itens do pedido + frete
    const itemsComFrete = [
      ...items.map((item) => ({
        id: item.product._id,
        title: item.product.name || 'Produto sem nome',
        description: `ID: ${item.product._id}`,
        picture_url: item.product.image
          ? imageUrl(item.product.image).url()
          : 'https://via.placeholder.com/150',
        quantity: item.quantity,
        currency_id: 'BRL',
        unit_price: Number(item.product.price!.toFixed(2)),
      })),
      ...(valorFrete > 0
        ? [
            {
              id: 'frete',
              title: 'Frete',
              description: 'Custo de envio',
              quantity: 1,
              currency_id: 'BRL',
              unit_price: valorFrete,
            },
          ]
        : []),
    ]

    // 🚀 Cria a preferência de pagamento
    const response = await preference.create({
      body: {
        items: itemsComFrete,
        payer: {
          name: metadata.customerName,
          email: metadata.customerEmail,
        },
        external_reference: metadata.orderNumber,
        back_urls: {
          success: successUrl,
          failure: failureUrl,
          pending: pendingUrl,
        },
        auto_return: 'approved',
      },
    })

    console.log('✅ Preferência criada com sucesso!')
    return response.init_point
  } catch (error: any) {
    console.error('❌ Erro ao criar preferência Mercado Pago:', error)
    if (error?.cause) {
      console.error('Detalhes do erro:', error.cause)
    }
    throw new Error(error.message || 'Erro desconhecido ao criar preferência.')
  }
}
