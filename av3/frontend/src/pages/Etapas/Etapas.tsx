import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

type Etapa = {
  id: number;
  nome: string;
  responsavel: string;
  status: string;
  dataInicial: string; // yyyy-MM-dd
  dataFinal: string;   // yyyy-MM-dd
};

export default function Etapas() {
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [carregando, setCarregando] = useState(true);

  // criação
  const [mostrarModal, setMostrarModal] = useState(false);
  const [novaEtapa, setNovaEtapa] = useState({
    nome: "",
    responsavel: "",
    status: "Pendente",
    dataInicial: "",
    dataFinal: "",
  });
  const [salvando, setSalvando] = useState(false);

  // edição
  const [etapaEditando, setEtapaEditando] = useState<Etapa | null>(null);
  const [salvandoEdicao, setSalvandoEdicao] = useState(false);

  const carregarEtapas = async () => {
    try {
      const resp = await fetch("http://localhost:3333/etapas");
      const data = await resp.json();

      const normalizadas = data.map((e: any) => ({
        id: e.id,
        nome: e.nome,
        responsavel: e.responsavel,
        status:
          e.status === "CONCLUIDA"
            ? "Concluída"
            : e.status === "EM_ANDAMENTO"
            ? "Em Andamento"
            : "Pendente",
        dataInicial: e.dataInicial.slice(0, 10),
        dataFinal: e.dataFinal.slice(0, 10),
      }));
      setEtapas(normalizadas);
    } catch (error) {
      console.error("Erro ao buscar etapas", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarEtapas();
  }, []);

  const handleExcluir = async (id: number) => {
    if (!confirm(`Excluir etapa ID ${id}?`)) return;
    try {
      const resp = await fetch(`http://localhost:3333/etapas/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        alert("Erro ao excluir etapa");
        return;
      }
      setEtapas((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao excluir etapa");
    }
  };

  // ======== CRIAÇÃO ========

  const abrirModal = () => {
    setNovaEtapa({
      nome: "",
      responsavel: "",
      status: "Pendente",
      dataInicial: "",
      dataFinal: "",
    });
    setMostrarModal(true);
  };

  const fecharModal = () => setMostrarModal(false);

  const handleChange = (campo: keyof typeof novaEtapa, valor: string) => {
    setNovaEtapa((prev) => ({ ...prev, [campo]: valor }));
  };

  const salvarEtapa = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSalvando(true);
      const resp = await fetch("http://localhost:3333/etapas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaEtapa),
      });

      if (!resp.ok) {
        alert("Erro ao criar etapa");
        return;
      }

      const criada = await resp.json();
      const etapaNormalizada: Etapa = {
        id: criada.id,
        nome: criada.nome,
        responsavel: criada.responsavel,
        status:
          criada.status === "CONCLUIDA"
            ? "Concluída"
            : criada.status === "EM_ANDAMENTO"
            ? "Em Andamento"
            : "Pendente",
        dataInicial: criada.dataInicial.slice(0, 10),
        dataFinal: criada.dataFinal.slice(0, 10),
      };

      setEtapas((prev) => [...prev, etapaNormalizada]);
      fecharModal();
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao criar etapa");
    } finally {
      setSalvando(false);
    }
  };

  // ======== EDIÇÃO ========

  const abrirEditar = (etapa: Etapa) => {
    setEtapaEditando({ ...etapa });
  };

  const fecharEditar = () => setEtapaEditando(null);

  const handleChangeEdicao = (campo: keyof Etapa, valor: string) => {
    if (!etapaEditando) return;
    setEtapaEditando({ ...etapaEditando, [campo]: valor });
  };

  const salvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!etapaEditando) return;

    try {
      setSalvandoEdicao(true);
      const resp = await fetch(
        `http://localhost:3333/etapas/${etapaEditando.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: etapaEditando.nome,
            responsavel: etapaEditando.responsavel,
            status: etapaEditando.status,
            dataInicial: etapaEditando.dataInicial,
            dataFinal: etapaEditando.dataFinal,
          }),
        }
      );

      if (!resp.ok) {
        alert("Erro ao atualizar etapa");
        return;
      }

      const atualizada = await resp.json();
      const etapaNormalizada: Etapa = {
        id: atualizada.id,
        nome: atualizada.nome,
        responsavel: atualizada.responsavel,
        status:
          atualizada.status === "CONCLUIDA"
            ? "Concluída"
            : atualizada.status === "EM_ANDAMENTO"
            ? "Em Andamento"
            : "Pendente",
        dataInicial: atualizada.dataInicial.slice(0, 10),
        dataFinal: atualizada.dataFinal.slice(0, 10),
      };

      setEtapas((prev) =>
        prev.map((e) => (e.id === etapaNormalizada.id ? etapaNormalizada : e))
      );
      fecharEditar();
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao atualizar etapa");
    } finally {
      setSalvandoEdicao(false);
    }
  };

  // ======== JSX ========

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold mb-4">Etapas</h2>
            <button
              onClick={abrirModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Nova Etapa
            </button>
          </div>

          {carregando ? (
            <p>Carregando...</p>
          ) : (
            <table className="w-full bg-white shadow-md rounded border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="p-3">Etapa</th>
                  <th className="p-3">Responsável</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Data Inicial</th>
                  <th className="p-3">Data Final</th>
                  <th className="p-3 text-center">Ações</th>
                </tr>
              </thead>
              <tbody>
                {etapas.map((etapa) => (
                  <tr key={etapa.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{etapa.nome}</td>
                    <td className="p-3">{etapa.responsavel}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          etapa.status === "Concluída"
                            ? "bg-green-100 text-green-700"
                            : etapa.status === "Em Andamento"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {etapa.status}
                      </span>
                    </td>
                    <td className="p-3">{etapa.dataInicial}</td>
                    <td className="p-3">{etapa.dataFinal}</td>
                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() => abrirEditar(etapa)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleExcluir(etapa.id)}
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

          {/* Modal de criação */}
          {mostrarModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">Nova Etapa</h3>
                <form onSubmit={salvarEtapa} className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={novaEtapa.nome}
                      onChange={(e) => handleChange("nome", e.target.value)}
                      className="w-full border border-gray-300 rounded p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Responsável
                    </label>
                    <input
                      type="text"
                      value={novaEtapa.responsavel}
                      onChange={(e) =>
                        handleChange("responsavel", e.target.value)
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
                      value={novaEtapa.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                      className="w-full border border-gray-300 rounded p-2"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Em Andamento">Em Andamento</option>
                      <option value="Concluída">Concluída</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm mb-1 text-gray-600">
                        Data Inicial
                      </label>
                      <input
                        type="date"
                        value={novaEtapa.dataInicial}
                        onChange={(e) =>
                          handleChange("dataInicial", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm mb-1 text-gray-600">
                        Data Final
                      </label>
                      <input
                        type="date"
                        value={novaEtapa.dataFinal}
                        onChange={(e) =>
                          handleChange("dataFinal", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={fecharModal}
                      className="px-4 py-2 rounded border border-gray-300 text-gray-700"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={salvando}
                      className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
                    >
                      {salvando ? "Salvando..." : "Salvar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Modal de edição */}
          {etapaEditando && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                  Editar Etapa #{etapaEditando.id}
                </h3>
                <form onSubmit={salvarEdicao} className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Nome
                    </label>
                    <input
                      type="text"
                      value={etapaEditando.nome}
                      onChange={(e) =>
                        handleChangeEdicao("nome", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-2"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Responsável
                    </label>
                    <input
                      type="text"
                      value={etapaEditando.responsavel}
                      onChange={(e) =>
                        handleChangeEdicao("responsavel", e.target.value)
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
                      value={etapaEditando.status}
                      onChange={(e) =>
                        handleChangeEdicao("status", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded p-2"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Em Andamento">Em Andamento</option>
                      <option value="Concluída">Concluída</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm mb-1 text-gray-600">
                        Data Inicial
                      </label>
                      <input
                        type="date"
                        value={etapaEditando.dataInicial}
                        onChange={(e) =>
                          handleChangeEdicao("dataInicial", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm mb-1 text-gray-600">
                        Data Final
                      </label>
                      <input
                        type="date"
                        value={etapaEditando.dataFinal}
                        onChange={(e) =>
                          handleChangeEdicao("dataFinal", e.target.value)
                        }
                        className="w-full border border-gray-300 rounded p-2"
                        required
                      />
                    </div>
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
