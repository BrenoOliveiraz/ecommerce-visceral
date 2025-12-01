'use client';

import { useState } from "react";

interface BuscaCepProps {
  onCepEncontrado: (cep: string, endereco: string | null) => void;
}

export default function BuscaCep({ onCepEncontrado }: BuscaCepProps) {
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState<string | null>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const buscarEndereco = async (cep: string) => {
    if (cep.length !== 8) return;
    setLoading(true);
    setErro("");

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        setEndereco(null);
        setErro("CEP não encontrado");
        onCepEncontrado(cep, null);
      } else {
        const enderecoFormatado = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`;
        setEndereco(enderecoFormatado);
        onCepEncontrado(cep, enderecoFormatado);
      }
    } catch {
      setErro("Erro ao buscar o endereço");
      setEndereco(null);
      onCepEncontrado(cep, null);
    } finally {
      setLoading(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, "");
    setCep(valor);

    if (valor.length === 8) {
      buscarEndereco(valor);
    } else {
      setEndereco(null);
      setErro("");
      onCepEncontrado(valor, null);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Digite o CEP"
        value={cep}
        onChange={handleCepChange}
        className="border border-gray-700 bg-gray-900 text-white p-2 rounded"
      />
      {loading && <p className="text-gray-400 text-sm">Buscando endereço...</p>}
      {erro && <p className="text-red-500 text-sm">{erro}</p>}
      {endereco && (
        <div className="bg-gray-800 border border-gray-700 text-gray-300 rounded p-2">
          <p className="text-sm">{endereco}</p>
        </div>
      )}
    </div>
  );
}
