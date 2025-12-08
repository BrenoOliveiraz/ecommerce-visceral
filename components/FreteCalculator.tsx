'use client';

import { useState } from "react";
import Image from "next/image";
import BuscaCep from "./BuscaCep";

export type FreteOption = {
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

interface CalculoFreteProps {
  onSelectFrete?: (valorFrete: number) => void;
  onCepEncontrado?: (cep: string, endereco: string | null) => void;
  onComplementoChange?: (complemento: string) => void;
}

export default function CalculoFrete({ onSelectFrete, onCepEncontrado, onComplementoChange }: CalculoFreteProps) {
  const fromCep = "62508250";

  const [toCep, setToCep] = useState("");
  const [endereco, setEndereco] = useState<string | null>(null);
  const [complemento, setComplemento] = useState("");
  const [resultado, setResultado] = useState<FreteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [freteSelecionado, setFreteSelecionado] = useState<number | null>(null);

  const calcularFrete = async () => {
    if (toCep.length !== 8) {
      setErro("Informe um CEP válido");
      return;
    }

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
              quantity: 1,
            },
          ],
        }),
      });

      const data = await response.json();

      if (data.error) {
        setErro(data.error);
      } else if (Array.isArray(data)) {
        const opcoesValidas = data.filter(
          (item: FreteOption) =>
            !item.error &&
            item.price &&
            item.company.name.toLowerCase().includes("correios")
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

  const handleSelectFrete = (valor: number) => {
    setFreteSelecionado(valor);
    onSelectFrete?.(valor);
  };

  const handleCepEncontrado = (cep: string, endereco: string | null) => {
    setToCep(cep);
    setEndereco(endereco);
    onCepEncontrado?.(cep, endereco);
  };

  const handleComplementoChange = (value: string) => {
    setComplemento(value);
    onComplementoChange?.(value);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">Cálculo de Frete</h1>

      <div className="flex flex-col gap-3 mb-6">
        {/* Campo para CEP */}
        <BuscaCep onCepEncontrado={handleCepEncontrado} />

        {/* Botão para calcular frete */}
        <button
          onClick={calcularFrete}
          disabled={loading || toCep.length !== 8}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white p-2 rounded"
        >
          {loading ? "Calculando..." : "Calcular Frete"}
        </button>

        {/* Campo para complemento / número aparece apenas se o endereço estiver definido */}
        {endereco && (
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-gray-200 font-medium" htmlFor="complemento">
              Número / Complemento
            </label>
            <input
              id="complemento"
              type="text"
              value={complemento}
              onChange={(e) => handleComplementoChange(e.target.value)}
              placeholder="Ex: Apt 101, Casa 12"
              className="p-2 rounded border border-gray-700 bg-zinc-800 text-white"
            />
          </div>
        )}
      </div>

      {erro && <p className="text-red-500 mb-4">{erro}</p>}

      {/* Lista de opções de frete */}
      <div className="space-y-4">
        {resultado.map((item) => {
          const valor = parseFloat(item.price);
          return (
            <div
              key={item.id}
              onClick={() => handleSelectFrete(valor)}
              className={`flex items-center justify-between border p-4 rounded text-gray-200 cursor-pointer transition-colors
                ${freteSelecionado === valor
                  ? "border-red-600 bg-red-900/30"
                  : "border-gray-700 hover:border-red-600"}`}
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
                  {valor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-sm text-gray-400">{item.delivery_time} dias úteis</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
