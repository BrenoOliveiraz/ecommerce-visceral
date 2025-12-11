import { BasketIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const orderType = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mercadoPagoPreferenceId',
      title: 'Mercado Pago Preference ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mercadoPagoPaymentId',
      title: 'Mercado Pago Payment ID',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mercadoPagoPayerId',
      title: 'Mercado Pago Payer ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'email',
      title: 'Customer Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cep',
      title: 'CEP',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endereco',
      title: 'Endereço',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'complemento',
      title: 'Complemento',
      type: 'string',
      validation: (Rule) => Rule.required().error("Complemento é obrigatório"),
    }),

    // 🔥 NOVOS CAMPOS
    defineField({
      name: 'nomeCompleto',
      title: 'Nome Completo',
      type: 'string',
      validation: (Rule) => Rule.required().error("Nome completo é obrigatório"),
    }),
    defineField({
      name: 'numeroContato',
      title: 'Número para Contato',
      type: 'string',
      validation: (Rule) => Rule.required().error("Número para contato é obrigatório"),
    }),
    defineField({
      name: 'cpf',
      title: 'CPF',
      type: 'string',
      validation: (Rule) => Rule.required().error("CPF é obrigatório"),
    }),

    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'productWithQuantity',
          title: 'Product with Quantity',
          fields: [
            defineField({
              name: 'product',
              title: 'Product Bought',
              type: 'reference',
              to: [{ type: 'product' }],
            }),
            defineField({
              name: 'quantity',
              title: 'Quantity Purchased',
              type: 'number',
            }),
            defineField({
              name: 'size',
              title: 'Product Size',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'product.name',
              quantity: 'quantity',
              size: 'size',
              image: 'product.image',
              price: 'product.price',
              currency: 'product.currency',
            },
            prepare({ title, quantity, size, image, price, currency }) {
              return {
                title: `${title} ${size} x${quantity}`,
                subtitle: price ? `${(price * quantity).toFixed(2)} ${currency}` : '',
                media: image,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amountDiscount',
      title: 'Amount Discount',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pendente', value: 'pending' },
          { title: 'Pago', value: 'paid' },
          { title: 'Enviado', value: 'shipped' },
          { title: 'Entregue', value: 'delivered' },
          { title: 'Cancelado', value: 'cancelled' },
        ],
      },
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      name: 'customerName',
      amount: 'totalPrice',
      currency: 'currency',
      orderId: 'orderNumber',
      email: 'email',
    },
    prepare(select) {
      const orderSnippet = `${select.orderId?.slice(0, 5)}...${select.orderId?.slice(-5)}`
      return {
        title: `${select.name} (${orderSnippet})`,
        subtitle: `${select.amount} ${select.currency} ${select.email}`,
        media: BasketIcon,
      }
    },
  },
})
