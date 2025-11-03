'use client';

import { useState } from "react";
import Image from "next/image";

type FreteOption = {
    id: number;
    name: string;
    price: string;
    currency: string;
    delivery_time: number;
    error?: string;
    company: {
        id: number;
        name: string;
        picture: string;
    };
};

export default function CalculoFrete() {
    const [fromCep, setFromCep] = useState("");
    const [toCep, setToCep] = useState("");
    const [resultado, setResultado] = useState<FreteOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");

    const calcularFrete = async () => {
        setErro("");
        setResultado([]);
        setLoading(true);

        try {
            const response = await fetch("/api/calcularFrete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    from: { postal_code: fromCep },
                    to: { postal_code: toCep },
                    products: [
                        {
                            id: "1",
                            width: 11,
                            height: 17,
                            length: 27,
                            weight: 0.3,
                            insurance_value: 50,
                            quantity: 1
                        }
                    ]
                })
            });

            const data: unknown = await response.json();
            if (typeof data === "object" && data !== null && "error" in data) {
                setErro((data as { error: string }).error);
            } else if (Array.isArray(data)) {
                const opcoesValidas = data.filter(
                    (item: FreteOption) => !item.error && item.price
                );
                setResultado(opcoesValidas);
            } else {
                setErro("Erro inesperado no retorno da API");
            }
        } catch {
            setErro("Erro ao conectar com o servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-white">Cálculo de Frete</h1>

            <div className="flex flex-col gap-3 mb-6">
                <input
                    type="text"
                    placeholder="CEP de origem"
                    value={fromCep}
                    onChange={(e) => setFromCep(e.target.value)}
                    className="border border-gray-700 bg-gray-900 text-white p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="CEP de destino"
                    value={toCep}
                    onChange={(e) => setToCep(e.target.value)}
                    className="border border-gray-700 bg-gray-900 text-white p-2 rounded"
                />
                <button
                    onClick={calcularFrete}
                    disabled={loading}
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                >
                    {loading ? "Calculando..." : "Calcular Frete"}
                </button>
            </div>

            {erro && <p className="text-red-500">{erro}</p>}

            <div className="space-y-4">
                {resultado.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between border border-gray-700 p-4 rounded text-gray-200"
                    >
                        <div className="flex items-center gap-3">
                            <Image
                                src={item.company.picture}
                                alt={item.company.name}
                                width={50}
                                height={50}
                                className="object-contain"
                            />
                            <div>
                                <p className="font-semibold">{item.company.name}</p>
                                <p className="text-sm text-gray-400">{item.name}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">
                                {parseFloat(item.price).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: item.currency === "R$" ? "BRL" : item.currency
                                })}
                            </p>
                            <p className="text-sm text-gray-400">
                                {item.delivery_time} dias úteis
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
