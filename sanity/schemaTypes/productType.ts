import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: 'product',
  title: 'Products',
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
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'descriptionP2',
      title: 'Description P2',
      type: 'blockContent',
    }),
    defineField({
      name: 'descriptionP3',
      title: 'Description P3',
      type: 'blockContent',
    }),
    defineField({
      name: 'design',
      title: 'Designer',
      type: 'string',
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
      name: 'stockP',
      title: 'Stock P',
      type: 'number',
    }),
    defineField({
      name: 'stockM',
      title: 'Stock M',
      type: 'number',
    }),
    defineField({
      name: 'stockG',
      title: 'Stock G',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0', // pega a primeira imagem do array
      subtitle: 'price',
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `$${select.subtitle}`,
        media: select.media,
      };
    },
  },
});
