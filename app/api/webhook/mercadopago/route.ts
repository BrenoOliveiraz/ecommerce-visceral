/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { NextRequest, NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";
import { MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";
import { Metadata } from "@/app/(store)/basket/page";

// 🔐 Configuração Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  console.log("\n\n==============================");
  console.log("🔥 [1] WEBHOOK MERCADO PAGO CHAMADO!");
  console.log("==============================");

  try {
    const raw = await req.text(); // importante para logs reais
    console.log("📩 [2] RAW BODY RECEBIDO:", raw);

    const body = JSON.parse(raw);
    console.log("📩 [3] BODY PARSED:", body);

    // 🔎 Log quando MP notifica novo evento
    console.log("📢 [4] EVENTO RECEBIDO:", body.action);

    if (!body?.action || !body?.data?.id) {
      console.log("⚠️ [5] Evento inválido ou incompleto.");
      return NextResponse.json({ ok: true });
    }

    const action = body.action;
    const paymentId = body.data.id;

    if (!paymentId) {
      console.log("⚠️ [6] paymentId ausente.");
      return NextResponse.json({ ok: true });
    }

    if (action !== "payment.created" && action !== "payment.updated") {
      console.log("ℹ️ [7] Evento ignorado:", action);
      return NextResponse.json({ ok: true });
    }

    console.log("🔎 [8] Buscando pagamento no Mercado Pago:", paymentId);

    let data: any;
    try {
      const paymentClient = new Payment(client);
      data = await paymentClient.get({ id: paymentId });
    } catch (err) {
      console.error("❌ [9] ERRO AO BUSCAR PAGAMENTO NO MP:", err);
      return NextResponse.json({ ok: true });
    }

    console.log("📌 [10] DADOS DO PAGAMENTO:", data);

    // 🔍 Status do pagamento
    console.log("🟦 [11] STATUS RECEBIDO:", data.status);

    if (data.status !== "approved") {
      console.log("⏳ [12] Pagamento ainda não aprovado:", data.status);
      return NextResponse.json({ ok: true });
    }

    console.log("🟢 [13] PAGAMENTO APROVADO! Prosseguindo...");

    const orderNumber = data.external_reference;
    const metadata = data.metadata as Metadata | undefined;

    console.log("🧾 [14] orderNumber:", orderNumber);
    console.log("👤 [15] metadata:", metadata);

    if (!orderNumber) {
      console.log("⚠️ [16] external_reference ausente.");
      return NextResponse.json({ ok: true });
    }

    console.log("🔎 [17] Verificando se ordem já existe no Sanity...");

    const existingOrder = await backendClient.fetch(
      `*[_type == "order" && orderNumber == $orderNumber][0]`,
      { orderNumber }
    );

    if (existingOrder) {
      console.log("⚠️ [18] Ordem já existente:", existingOrder._id);
      return NextResponse.json({ ok: true });
    }

    console.log("🟡 [19] Ordem ainda não existe. Preparando criação…");

    // -----------------------------
    // 🔧 MAPEAMENTO DOS ITENS
    // -----------------------------

    console.log("📦 [20] ITEMS ORIGINAIS DO MP:", data.additional_info?.items);

    const items = (data.additional_info?.items || []).filter(
      (item: any) => item.id !== "frete"
    );

    console.log("📦 [21] ITEMS FILTRADOS (sem frete):", items);

    const sanityProducts = items.map((item: any) => ({
      _key: crypto.randomUUID(),
      product: {
        _type: "reference",
        _ref: item.id,
      },
      quantity: item.quantity || 1,
    }));

    console.log("🪵 [22] PRODUCTS PARA GRAVAR NO SANITY:", sanityProducts);

    console.log("🛠 [23] Tentando criar ordem no Sanity...");

    let order;
    try {
      order = await backendClient.create({
        _type: "order",
        orderNumber,
        mpPaymentId: data.id,
        mpPayerId: data.payer?.id,
        customerName:
          data.payer?.first_name || metadata?.customerName || "Cliente",
        clerkUserId: metadata?.clerkUserId || "",
        email: data.payer?.email || metadata?.customerEmail,
        currency: data.currency_id,
        totalPrice: data.transaction_amount,
        status: "paid",
        orderDate: new Date().toISOString(),
        products: sanityProducts,
      });
    } catch (err) {
      console.error("❌ [24] ERRO AO CRIAR ORDEM NO SANITY:", err);
      return NextResponse.json({ ok: true });
    }

    console.log("🎉 [25] ORDEM CRIADA COM SUCESSO:", order);

    console.log("==============================");
    console.log("🏁 [26] Webhook finalizado com sucesso!");
    console.log("==============================\n\n");

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ [27] ERRO GERAL NO WEBHOOK:", error);
    return NextResponse.json({ ok: true });
  }
}
