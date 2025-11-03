import { NextResponse } from "next/server";

interface MelhorEnvioError {
  message?: string;
  [key: string]: unknown;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch("https://www.melhorenvio.com.br/api/v2/me/shipment/calculate", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "MeuApp (meuemail@exemplo.com)"
      },
      body: JSON.stringify(body)
    });

    const text = await response.text();
    let data: unknown;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Erro ao interpretar resposta da API" }, { status: 500 });
    }

    if (!response.ok) {
      const errorData = data as MelhorEnvioError;
      return NextResponse.json(
        { error: errorData.message || "Erro ao calcular frete" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
