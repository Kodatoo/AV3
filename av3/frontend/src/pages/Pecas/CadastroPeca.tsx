import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroPeca() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [fornecedor, setFornecedor] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ENVIANDO PECA", { nome, tipo, fornecedor });

    try {
      const resp = await fetch("http://localhost:3333/pecas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          tipo, // "Importada" ou "Nacional"
          fornecedor,
        }),
      });

      console.log("STATUS DA RESPOSTA", resp.status);

      if (!resp.ok) {
        alert("Erro ao cadastrar peça");
        return;
      }

      alert("Peça cadastrada com sucesso!");
      navigate("/pecas");
    } catch (error) {
      console.error("ERRO NO FETCH PECA", error);
      alert("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8 flex justify-center items-center min-h-screen">
          <div className="bg-white rounded-xl shadow p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-5 text-center">
              Cadastro de Peça
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm mb-1 text-gray-600">Nome</label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome da peça"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-600">Tipo</label>
                <input
                  type="text"
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Importada ou Nacional"
                />
              </div>
              <div>
                <label className="block text-sm mb-1 text-gray-600">
                  Fornecedor
                </label>
                <input
                  type="text"
                  value={fornecedor}
                  onChange={(e) => setFornecedor(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome do fornecedor"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
              >
                Salvar
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
