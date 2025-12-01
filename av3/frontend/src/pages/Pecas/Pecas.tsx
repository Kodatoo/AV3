import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Peca = {
  id: number;
  nome: string;
  codigo: string;
  tipo: string;
  fornecedor: string;
  estoque: number;
  status: string;
};

export default function Pecas() {
  const navigate = useNavigate();
  const [pecas, setPecas] = useState<Peca[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [pecaEditando, setPecaEditando] = useState<Peca | null>(null);
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  const carregarPecas = async () => {
    try {
      const resp = await fetch("http://localhost:3333/pecas");
      const data = await resp.json();
      setPecas(data);
    } catch (error) {
      console.error("Erro ao buscar peças", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarPecas();
  }, []);

  const handleExcluir = async (id: number) => {
    if (!confirm(`Excluir peça ID ${id}?`)) return;
    try {
      const resp = await fetch(`http://localhost:3333/pecas/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        alert("Erro ao excluir peça");
        return;
      }
      setPecas((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao excluir peça");
    }
  };

  const abrirEditar = (peca: Peca) => {
    setPecaEditando({ ...peca }); // cópia para editar no modal
  };

  const fecharEditar = () => {
    setPecaEditando(null);
  };

  const handleChangeEdicao = (
    campo: keyof Peca,
    valor: string | number
  ) => {
    if (!pecaEditando) return;
    setPecaEditando({ ...pecaEditando, [campo]: valor } as Peca);
  };

  const salvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pecaEditando) return;

    try {
      setSalvandoEdicao(true);
      const resp = await fetch(
        `http://localhost:3333/pecas/${pecaEditando.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: pecaEditando.nome,
            tipo: pecaEditando.tipo,
            fornecedor: pecaEditando.fornecedor,
            estoque: pecaEditando.estoque,
            status: pecaEditando.status,
          }),
        }
      );

      if (!resp.ok) {
        alert("Erro ao atualizar peça");
        return;
      }

      const atualizada: Peca = await resp.json();

      setPecas((prev) =>
        prev.map((p) => (p.id === atualizada.id ? atualizada : p))
      );

      fecharEditar();
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao atualizar peça");
    } finally {
      setSalvandoEdicao(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold mb-4">Peças</h2>
            <button
              onClick={() => navigate("/pecas/cadastro")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Nova Peça
            </button>
          </div>

          {carregando ? (
            <p>Carregando...</p>
          ) : (
            <table className="w-full bg-white shadow-md rounded border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="p-3">Nome</th>
                  <th className="p-3">Código</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Fornecedor</th>
                  <th className="p-3">Estoque</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pecas.map((peca) => (
                  <tr key={peca.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{peca.nome}</td>
                    <td className="p-3">{peca.codigo}</td>
                    <td className="p-3">{peca.tipo}</td>
                    <td className="p-3">{peca.fornecedor}</td>
                    <td className="p-3">{peca.estoque}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          peca.status === "PRONTA" ||
                          peca.status === "EM_TRANSPORTE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {peca.status}
                      </span>
                    </td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => abrirEditar(peca)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleExcluir(peca.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Modal de edição */}
          {pecaEditando && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                  Editar Peça #{pecaEditando.id}
                </h3>
                <form onSubmit={salvarEdicao} className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={pecaEditando.nome}
                      onChange={(e) =>
                        handleChangeEdicao("nome", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Tipo
                    </label>
                    <input
                      type="text"
                      value={pecaEditando.tipo}
                      onChange={(e) =>
                        handleChangeEdicao("tipo", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Fornecedor
                    </label>
                    <input
                      type="text"
                      value={pecaEditando.fornecedor}
                      onChange={(e) =>
                        handleChangeEdicao("fornecedor", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Estoque
                    </label>
                    <input
                      type="number"
                      value={pecaEditando.estoque}
                      onChange={(e) =>
                        handleChangeEdicao("estoque", Number(e.target.value))
                      }
                      className="w-full border border-gray-300 rounded p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Status
                    </label>
                    <select
                      value={pecaEditando.status}
                      onChange={(e) =>
                        handleChangeEdicao("status", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-2"
                    >
                      <option value="EM_PRODUCAO">EM_PRODUCAO</option>
                      <option value="PRONTA">PRONTA</option>
                      <option value="EM_TRANSPORTE">EM_TRANSPORTE</option>
                    </select>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={fecharEditar}
                      className="px-4 py-2 rounded border border-gray-300 text-gray-700"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={salvandoEdicao}
                      className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
                    >
                      {salvandoEdicao ? "Salvando..." : "Salvar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
