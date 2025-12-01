import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Aeronave = {
  id: number;
  modelo: string;
  fabricante: string;
  capacidade: number;
  tipo: string; // "COMERCIAL" | "MILITAR" vindo do back
};

export default function ListaAeronaves() {
  const navigate = useNavigate();

  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await fetch("http://localhost:3333/aeronaves");
        if (!resp.ok) {
          throw new Error("Falha ao buscar aeronaves");
        }
        const data = await resp.json();
        // Se quiser deixar o tipo mais amigável na tabela:
        const normalizadas = data.map((a: any) => ({
          id: a.id,
          modelo: a.modelo,
          fabricante: a.fabricante,
          capacidade: a.capacidade,
          tipo: a.tipo === "MILITAR" ? "Militar" : "Comercial",
        }));
        setAeronaves(normalizadas);
      } catch (e: any) {
        console.error(e);
        setErro("Erro ao carregar aeronaves");
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Lista de Aeronaves
            </h2>
            <button
              onClick={() => navigate("/aeronaves/cadastro")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Nova Aeronave
            </button>
          </div>

          {carregando && <p>Carregando...</p>}
          {erro && <p className="text-red-600">{erro}</p>}

          {!carregando && !erro && (
            <table className="w-full border border-gray-200 bg-white shadow rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-left">
                  <th className="p-3 border-b">ID</th>
                  <th className="p-3 border-b">Modelo</th>
                  <th className="p-3 border-b">Fabricante</th>
                  <th className="p-3 border-b">Capacidade</th>
                  <th className="p-3 border-b">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {aeronaves.map((aeronave) => (
                  <tr key={aeronave.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{aeronave.id}</td>
                    <td className="p-3 border-b">{aeronave.modelo}</td>
                    <td className="p-3 border-b">{aeronave.fabricante}</td>
                    <td className="p-3 border-b">{aeronave.capacidade}</td>
                    <td className="p-3 border-b">{aeronave.tipo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>
    </div>
  );
}
