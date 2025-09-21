import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType, validation } from "sanity";

export const productType = defineType({
    name: 'product',
    title: 'Products ',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
      defineField({
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'image',
        title: 'Product image',
        type: 'image',
        options: {
          hotspot: true,
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'blockContent',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'category' } }],
      }),
      defineField({
        name: 'stock',
        title: 'Stock',
        type: 'number',
        validation: (Rule) => Rule.required(),
      }),
    ],
    preview: {
      select: {
        title: 'name',
        media: 'image',
        subtitle: 'price'
      },
      prepare(select) {
        return {
          title: select.title,
          subtitle: `$${select.subtitle}`,
          media: select.media,
        }
      }
    }
  })
  