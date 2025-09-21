import { defineQuery } from 'next-sanity'
import { sanityFetch } from '../live'

export const searchProductsByName = async (searchParam: string) =>{

    const PRODUCT_SEARCH_QUERY = defineQuery(`
        *[
        _type == "product" && name match $searchParam
        
        ] | order(name asc)
        `);

        try {
            const product = await sanityFetch({
                query: PRODUCT_SEARCH_QUERY,
                params: {
                    searchParam: `${searchParam}*`
                }
            });
            return product.data || []
        } catch (error) {
            console.error("Error", error);
            return [];
        }

}