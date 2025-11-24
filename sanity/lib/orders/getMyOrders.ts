import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live"


export default async function getMyOrders(userId: string) {

    if (!userId) {
        throw new Error("User Id is not required")
    }


    const MY_ORDERS_QUERY = defineQuery(`
      *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
        ...,
        products[]{
            ...,
            product->
        }
      }  
        
        `)

    try {
        console.log("🔍 Buscando pedidos para userId:", userId)

        // 🔹 Faz o fetch no Sanity
        const orders = await sanityFetch({
            query: MY_ORDERS_QUERY,
            params: { userId },
        })

        console.log("✅ Resultado do sanityFetch:", orders)

        // 🔹 Retorna os dados, mesmo se for array vazio
        return orders?.data || []
    } catch (error: any) {
        console.error("❌ Erro ao buscar pedidos do Sanity:", error?.message || error)
        throw new Error("Error fetching orders")
    }

}
