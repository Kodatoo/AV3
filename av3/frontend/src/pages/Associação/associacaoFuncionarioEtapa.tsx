import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

type Etapa = { id: number; nome: string };
type Funcionario = { id: number; nome: string };

export default function AssociarFuncionarioEtapa() {
  const [etapas, setEtapas] = useState<Etapa[]>([]);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [etapaId, setEtapaId] = useState<number | null>(null);
  const [funcionarioId, setFuncionarioId] = useState<number | null>(null);
  const [associados, setAssociados] = useState<Funcionario[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const [respEtapas, respFuncs] = await Promise.all([
          fetch("http://localhost:3333/etapas"),
          fetch("http://localhost:3333/funcionarios"),
        ]);
        const dataEtapas = await respEtapas.json();
        const dataFuncs = await respFuncs.json();

        const etapasNorm = dataEtapas.map((e: any) => ({
          id: e.id,
          nome: e.nome,
        }));
        const funcsNorm = dataFuncs.map((f: any) => ({
          id: f.id,
          nome: f.nome,
        }));

        setEtapas(etapasNorm);
        setFuncionarios(funcsNorm);

        if (etapasNorm.length > 0) setEtapaId(etapasNorm[0].id);
        if (funcsNorm.length > 0) setFuncionarioId(funcsNorm[0].id);
      } catch (e) {
        console.error("Erro ao carregar etapas/funcionarios", e);
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, []);

  // carregar associados quando mudar etapa
  useEffect(() => {
    const carregarAssociados = async () => {
      if (!etapaId) return;
      try {
        const resp = await fetch(
          `http://localhost:3333/associacoes/${etapaId}`
        );
        const data = await resp.json();
        setAssociados(
          data.map((f: any) => ({ id: f.id, nome: f.nome }))
        );
      } catch (e) {
        console.error("Erro ao carregar associados", e);
      }
    };

    carregarAssociados();
  }, [etapaId]);

  const handleAddFuncionario = async () => {
    if (!etapaId || !funcionarioId) return;

    // evita duplicado no front
    if (associados.some((f) => f.id === funcionarioId)) return;

    try {
      const resp = await fetch("http://localhost:3333/associacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etapaId, funcionarioId }),
      });

      if (!resp.ok) {
        alert("Erro ao associar funcionário");
        return;
      }

      const func = funcionarios.find((f) => f.id === funcionarioId);
      if (func) setAssociados((prev) => [...prev, func]);
    } catch (e) {
      console.error(e);
      alert("Erro de conexão ao associar funcionário");
    }
  };

  const handleRemoveFuncionario = async (rmId: number) => {
    if (!etapaId) return;
    try {
      const resp = await fetch(
        `http://localhost:3333/associacoes/${etapaId}/${rmId}`,
        { method: "DELETE" }
      );
      if (!resp.ok) {
        alert("Erro ao remover associação");
        return;
      }
      setAssociados((prev) => prev.filter((f) => f.id !== rmId));
    } catch (e) {
      console.error(e);
      alert("Erro de conexão ao remover associação");
    }
  };

  const etapaSelecionada = etapas.find((e) => e.id === etapaId);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-8">
          <h2 className="text-2xl font-semibold mb-8">
            Associação de Funcionários às Etapas
          </h2>

          {carregando ? (
            <p>Carregando...</p>
          ) : (
            <>
              <div className="bg-white shadow rounded-lg p-6 mb-10">
                <div className="mb-5 grid grid-cols-2 gap-8 items-end">
                  <div>
                    <label className="block font-medium mb-2">Etapa</label>
                    <select
                      className="border rounded p-2 w-full"
                      value={etapaId ?? ""}
                      onChange={(e) => setEtapaId(Number(e.target.value))}
                    >
                      {etapas.map((e) => (
                        <option key={e.id} value={e.id}>
                          {e.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium mb-2">
                      Funcionário
                    </label>
                    <select
                      className="border rounded p-2 w-full"
                      value={funcionarioId ?? ""}
                      onChange={(e) =>
                        setFuncionarioId(Number(e.target.value))
                      }
                    >
                      {funcionarios.map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleAddFuncionario}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                >
                  Adicionar Funcionário à Etapa
                </button>
              </div>

              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Funcionários Associados à Etapa:{" "}
                  {etapaSelecionada?.nome ?? "-"}
                </h3>
                {associados.length === 0 ? (
                  <p className="text-gray-500">
                    Nenhum funcionário associado.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {associados.map((f) => (
                      <li
                        key={f.id}
                        className="flex justify-between items-center border-b pb-2"
                      >
                        <span>{f.nome}</span>
                        <button
                          onClick={() => handleRemoveFuncionario(f.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
