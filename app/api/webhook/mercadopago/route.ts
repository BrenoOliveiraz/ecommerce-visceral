/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { NextRequest, NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";
import { MercadoPagoConfig, Payment } from "mercadopago";
import crypto from "crypto";
import { Metadata } from "@/app/(store)/basket/page";

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

    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    if (action !== "payment.created" && action !== "payment.updated") {
      return NextResponse.json({ ok: true });
    }

    let data: any;
    try {
      const paymentClient = new Payment(client);
      data = await paymentClient.get({ id: paymentId });
    } catch {
      return NextResponse.json({ ok: true });
    }

    if (data.status !== "approved") {
      return NextResponse.json({ ok: true });
    }

    const orderNumber = data.external_reference;
    const metadata = data.metadata as Metadata | undefined;

    if (!orderNumber) {
      return NextResponse.json({ ok: true });
    }

    const existingOrder = await backendClient.fetch(
      `*[_type == "order" && orderNumber == $orderNumber][0]`,
      { orderNumber }
    );

    if (existingOrder) {
      return NextResponse.json({ ok: true });
    }

    const items = (data.additional_info?.items || []).filter(
      (item: any) => item.id !== "frete"
    );

    const sanityProducts = items.map((item: any) => ({
      _key: crypto.randomUUID(),
      product: { _type: "reference", _ref: item.id },
      quantity: Number(item.quantity) || 1,
      size: item.metadata?.size || item.category_id || null,
    }));

    let order;
    try {
      order = await backendClient.create({
        _type: "order",
        orderNumber,
        mercadoPagoPaymentId: data.id,
        mercadoPagoPayerId: data.payer?.id,
        mercadoPagoPreferenceId: data.order?.id || null,
        customerName:
          data.payer?.first_name || metadata?.customerName || "Cliente",
        clerkUserId: metadata?.clerkUserId || "",
        email: data.payer?.email || metadata?.customerEmail,
        currency: data.currency_id,
        totalPrice: data.transaction_amount,
        amountDiscount: 0,
        status: "paid",
        orderDate: new Date().toISOString(),
        products: sanityProducts,
      });
    } catch {
      return NextResponse.json({ ok: true });
    }

    try {
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

        if (size === "P") {
          patch.stockP = Math.max(0, (product.stockP ?? 0) - quantity);
        } else if (size === "M") {
          patch.stockM = Math.max(0, (product.stockM ?? 0) - quantity);
        } else if (size === "G") {
          patch.stockG = Math.max(0, (product.stockG ?? 0) - quantity);
        } else {
          continue;
        }

        await backendClient.patch(productId).set(patch).commit();
      }
    } catch {}

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
