'use server'

import { preference } from '@/lib/mercadopago'
import { BasketItem } from '@/app/(store)/store'
import { imageUrl } from '@/lib/imageUrl'

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string;
  cep: string;
  endereco: string | null;
};


// ✅ AGORA O SIZE EXISTE AQUI
export type GroupBasketItem = {
  product: BasketItem['product']
  quantity: number
  size?: 'P' | 'M' | 'G' | undefined
}

export async function createMercadoPagoCheckout(
  items: GroupBasketItem[],
  metadata: Metadata,
  valorFrete: number
) {
  try {
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

    const itemsComFrete = [
      ...items.map((item) => ({
        id: item.product._id,
        title: item.product.name || 'Produto sem nome',
        description: `Tamanho: ${item.size ?? 'N/A'}`,
        picture_url: item.product.image
          ? imageUrl(item.product.image).url()
          : 'https://via.placeholder.com/150',
        quantity: Number(item.quantity), // Certifique-se de que 'quantity' seja um número
        currency_id: 'BRL',
        unit_price: Number(item.product.price!.toFixed(2)),

        category_id: item.size,

        metadata: {
          size: item.size
        }
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
    ];


    const response = await preference.create({
      body: {
        items: itemsComFrete,
        payer: {
          name: metadata.customerName,
          email: metadata.customerEmail,
        },
        external_reference: metadata.orderNumber,

        notification_url: `${baseUrl}/api/webhook/mercadopago`, // ✅ AQUI

        back_urls: {
          success: successUrl,
          failure: failureUrl,
          pending: pendingUrl,
        },
        auto_return: 'approved',
      },
    })


    return response.init_point
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao criar preferência Mercado Pago.')
  }
}
