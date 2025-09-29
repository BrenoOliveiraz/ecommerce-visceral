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

export async function createMercadoPagoCheckout(
  items: GroupBasketItem[],
  metadata: Metadata
) {
  try {
    const itemsWithoutPrice = items.filter((item) => !item.product.price)
    if (itemsWithoutPrice.length > 0) {
      throw new Error("Some items don't have a price")
    }

    const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL
    if (!rawBaseUrl || !/^https?:\/\//.test(rawBaseUrl)) {
      throw new Error("NEXT_PUBLIC_BASE_URL precisa ser uma URL válida e pública")
    }

    const baseUrl = rawBaseUrl.replace(/\/$/, '')

    const successUrl = `${baseUrl}/success?orderNumber=${metadata.orderNumber}`
    const failureUrl = `${baseUrl}/basket`
    const pendingUrl = `${baseUrl}/basket`

    const response = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.product._id, 
          title: item.product.name || 'Unnamed Product',
          description: `Product ID: ${item.product._id}`,
          picture_url: item.product.image
            ? imageUrl(item.product.image).url()
            : 'https://via.placeholder.com/150',
          quantity: item.quantity,
          currency_id: 'BRL',
          unit_price: Number(item.product.price!.toFixed(2)),
        })),

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

    return response.init_point
  } catch (error: any) {
    console.error('Erro ao criar preferência Mercado Pago:', error)
    if (error?.cause) {
      console.error('Detalhes do erro:', error.cause)
    }
    throw new Error(error.message || 'Erro desconhecido ao criar preferência')
  }
}