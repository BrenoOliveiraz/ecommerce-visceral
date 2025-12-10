import { defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons'

export const preorderType = defineType({
  name: 'preorder',
  title: 'Pré-Pedido (Aguardando Pagamento)',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'clerkUserId',
      title: 'Clerk User ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'customerName',
      title: 'Customer Name (Clerk)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'nomeCompleto',
      title: 'Nome Completo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'numeroContato',
      title: 'Número para Contato',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'cpf',
      title: 'CPF',
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'frete',
      title: 'Valor do Frete',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'items',
      title: 'Itens do Carrinho',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'productWithQuantity',
          title: 'Produto + Quantidade',
          fields: [
            defineField({
              name: 'product',
              title: 'Produto',
              type: 'reference',
              to: [{ type: 'product' }],
            }),
            defineField({
              name: 'quantity',
              title: 'Quantidade',
              type: 'number',
            }),
            defineField({
              name: 'size',
              title: 'Tamanho',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      orderNumber: 'orderNumber',
      nome: 'nomeCompleto',
      email: 'email',
    },
    prepare({ orderNumber, nome, email }) {
      return {
        title: `${nome} — Pré-pedido`,
        subtitle: `${orderNumber} • ${email}`,
      }
    },
  },
})
