import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { productType } from './productType'
import { orderType } from './orderType'
import { salesType } from './salesType'
import { authorType } from './authorType'
import { preorderType } from './preOrder'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType, orderType, salesType, authorType, preorderType],
}
