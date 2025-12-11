

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { NextRequest, NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";
import { MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const raw = await req.text();
    const body = JSON.parse(raw);

    if (!body?.action || !body?.data?.id) {
      return NextResponse.json({ ok: true });
    }

    const action = body.action;
    const paymentId = body.data.id;

    if (!paymentId) return NextResponse.json({ ok: true });
    if (action !== "payment.created" && action !== "payment.updated") {
      return NextResponse.json({ ok: true });
    }

    const paymentClient = new Payment(client);

    let data: any;
    try {
      data = await paymentClient.get({ id: paymentId });
    } catch {
      return NextResponse.json({ ok: true });
    }

    if (data.status !== "approved") return NextResponse.json({ ok: true });

    // ============================================
    // Usar JSON do external_reference, se existir
    // ============================================
    let ref: any = {};
    try {
      ref = JSON.parse(data.external_reference || "{}");
    } catch {
      console.error("Erro ao parsear external_reference");
      ref = {};
    }

    // Se não houver orderNumber, usar o ID do pagamento como identificador
    const internalOrderId = ref.orderNumber || data.id;

    // Checar se o pedido já existe no banco
    const existingOrder = await backendClient.fetch(
      `*[_type == "order" && mercadoPagoPaymentId == $id][0]`,
      { id: internalOrderId }
    );

    if (existingOrder) return NextResponse.json({ ok: true });

    const items = data.additional_info.items || [];

    const sanityProducts = items.map((item: any) => ({
      _key: crypto.randomUUID(),
      product: { _type: "reference", _ref: item.id },
      quantity: Number(item.quantity) || 1,
      size: item.category_id || null,
    }));

    // Usar dados do external_reference ou fallback
    const cepFinal = ref.cep || "Não informado";
    const enderecoFinal = ref.endereco || "Não informado";
    const complementoFinal = ref.complemento || "Não informado";
    const cpfFinal = ref.cpf || "Não informado";

    await backendClient.create({
      _type: "order",
      orderNumber: internalOrderId, // agora sempre existe
      mercadoPagoPaymentId: data.id,
      mercadoPagoPayerId: data.payer?.id,
      mercadoPagoPreferenceId: data.order?.id || null,
      nomeCompleto: ref.nomeCompleto || "Não informado",
      cpf: cpfFinal,
      email: ref.customerEmail || "Não informado",
      cep: cepFinal,
      endereco: enderecoFinal,
      complemento: complementoFinal,
      numeroContato: ref.numeroContato || "Não informado",
      currency: data.currency_id,
      totalPrice: data.transaction_amount,
      amountDiscount: 0,
      status: "paid",
      orderDate: new Date().toISOString(),
      products: sanityProducts,
    });

    // Atualizar estoque
    for (const item of sanityProducts) {
      const productId = item.product._ref;
      const quantity = item.quantity;
      const size = item.size;

      const product = await backendClient.fetch(
        `*[_type == "product" && _id == $id][0]`,
        { id: productId }
      );

      if (!product) continue;

      const patch: any = {};

      if (size === "P") patch.stockP = Math.max(0, (product.stockP ?? 0) - quantity);
      if (size === "M") patch.stockM = Math.max(0, (product.stockM ?? 0) - quantity);
      if (size === "G") patch.stockG = Math.max(0, (product.stockG ?? 0) - quantity);

      if (Object.keys(patch).length > 0) {
        await backendClient.patch(productId).set(patch).commit();
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("🔥 Erro no webhook Mercado Pago:", error);
    return NextResponse.json({ ok: true });
  }
}

