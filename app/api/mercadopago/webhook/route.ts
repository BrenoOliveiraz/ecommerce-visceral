
import { NextRequest, NextResponse } from "next/server";
import { payment } from "@/lib/mercadopago";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Webhook Mercado Pago recebido:", body);

    if (body.type === "payment" || body.action?.startsWith("payment")) {
      const paymentId = body.data.id;

      const data = await payment.get({ id: paymentId.toString() });

      console.log("Pagamento recebido:", data);

      if (data.status === "approved") {
        const order = await backendClient.create({
          _type: "order",
          orderNumber: crypto.randomUUID(),
          mercadoPagoPaymentId: data.id,
          customerName: data.payer?.first_name + " " + data.payer?.last_name,
          email: data.payer?.email,
          totalPrice: data.transaction_amount,
          currency: data.currency_id,
          status: "paid",
          orderDate: new Date().toISOString(),
          products: [],
        });

        console.log("Ordem criada no Sanity:", order);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erro no webhook Mercado Pago:", error);
    return NextResponse.json({ error: "Erro no webhook" }, { status: 500 });
  }
}
