import { TagIcon } from "@sanity/icons";
import { title } from "process";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: 'sale',
    title: 'Sale',
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Sale Title',

        }),
        defineField({
            name: 'description',
            type: 'text',
            title: 'Sale Description',

        }),
        defineField({
            name: 'discountAmount',
            type: 'number',
            title: 'Discount Amount',
            description: 'Amount of in percentage or fixed value'

        }),
        defineField({
            name: 'cuponCode',
            type: 'string',
            title: 'Cupon Code',
        }),
                defineField({
            name: 'validFrom',
            type: 'datetime',
            title: 'Valid From',
        }),
                defineField({
            name: 'validUntil',
            type: 'datetime',
            title: 'Valid Until',
        }),
                defineField({
            name: 'isActive',
            type: 'boolean',
            title: 'Is Active',
            description: 'Toogle to active/desactive the sale',
            initialValue: true,

        }),
    ],
    preview: {
        select: {
            title: 'title',
            discountAmount: 'discountAmount',
            cuponCode: 'cuponCode',
            isActive: 'isActive'
        },
        prepare(selection){
            const {title, discountAmount, cuponCode, isActive} = selection;
            const status = isActive ? 'Active' : 'Inactive';
            return{
                title,
                subtitle: `${discountAmount}%off - Code: ${cuponCode} - ${status}`
            }
        }
    }
})