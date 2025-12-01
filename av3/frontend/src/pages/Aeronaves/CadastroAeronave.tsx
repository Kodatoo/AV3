import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroAeronave() {
  const navigate = useNavigate();

  const [modelo, setModelo] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [capacidade, setCapacidade] = useState<number | "">("");
  const [tipo, setTipo] = useState("");
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  console.log("ENVIANDO AERONAVE", { modelo, fabricante, capacidade, tipo });

  try {
    const response = await fetch("http://localhost:3333/aeronaves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelo,
        fabricante,
        capacidade,
        tipo,
      }),
    });

    console.log("STATUS DA RESPOSTA", response.status);

    if (!response.ok) {
      alert("Erro ao cadastrar aeronave");
      return;
    }

    alert("Aeronave cadastrada com sucesso!");
    navigate("/aeronaves");
  } catch (error) {
    console.error("ERRO NO FETCH", error);
    alert("Erro de conexão com o servidor");
  }
};
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Cadastro de Aeronave
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Modelo</label>
            <input
              type="text"
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Boeing 737"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Fabricante</label>
            <input
              type="text"
              value={fabricante}
              onChange={(e) => setFabricante(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Boeing"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Capacidade</label>
            <input
              type="number"
              value={capacidade}
              onChange={(e) => setCapacidade(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 180"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Tipo da aeronave
            </label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione</option>
              <option value="Comercial">Comercial</option>
              <option value="Militar">Militar</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
