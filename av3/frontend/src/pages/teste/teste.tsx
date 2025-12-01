import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

type Teste = {
  id: number;
  tipo: string;
  resultado: string;
  data?: string;
  aeronaveModelo?: string;
};

type Aeronave = {
  id: number;
  modelo: string;
};

export default function Testes() {
  const [testes, setTestes] = useState<Teste[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [novoTeste, setNovoTeste] = useState({
    tipo: "",
    resultado: "APROVADO",
    data: "",
    aeronaveId: "",
  });
  const [salvando, setSalvando] = useState(false);

  const carregarTestes = async () => {
    try {
      const resp = await fetch("http://localhost:3333/testes");
      const data = await resp.json();

      const normalizados = data.map((t: any) => ({
        id: t.id,
        tipo:
          t.tipo === "ELETRICO"
            ? "Elétrico"
            : t.tipo === "HIDRAULICO"
            ? "Hidráulico"
            : "Aerodinâmico",
        resultado: t.resultado, // "APROVADO" | "REPROVADO"
        data: t.data ? t.data.slice(0, 10) : "",
        aeronaveModelo: t.aeronave?.modelo,
      }));

      setTestes(normalizados);
    } catch (error) {
      console.error("Erro ao buscar testes", error);
      alert("Erro ao carregar testes");
    } finally {
      setCarregando(false);
    }
  };

  const carregarAeronaves = async () => {
    try {
      const resp = await fetch("http://localhost:3333/aeronaves");
      const data = await resp.json();
      setAeronaves(
        data.map((a: any) => ({ id: a.id, modelo: a.modelo }))
      );
    } catch (error) {
      console.error("Erro ao buscar aeronaves para testes", error);
    }
  };

  useEffect(() => {
    carregarTestes();
    carregarAeronaves();
  }, []);

  const abrirModal = () => {
    setNovoTeste({
      tipo: "",
      resultado: "APROVADO",
      data: "",
      aeronaveId: "",
    });
    setMostrarModal(true);
  };

  const fecharModal = () => setMostrarModal(false);

  const handleChange = (
    campo: keyof typeof novoTeste,
    valor: string
  ) => {
    setNovoTeste((prev) => ({ ...prev, [campo]: valor }));
  };

  const salvarTeste = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!novoTeste.tipo || !novoTeste.aeronaveId) {
      alert("Tipo e aeronave são obrigatórios");
      return;
    }

    try {
      setSalvando(true);
      const resp = await fetch("http://localhost:3333/testes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: novoTeste.tipo,             // "Elétrico" | "Hidráulico" | "Aerodinâmico"
          resultado: novoTeste.resultado,   // "APROVADO" | "REPROVADO"
          data: novoTeste.data,             // yyyy-MM-dd
          aeronaveId: Number(novoTeste.aeronaveId),
        }),
      });

      if (!resp.ok) {
        alert("Erro ao criar teste");
        return;
      }

      const criado = await resp.json();

      const testeNormalizado: Teste = {
        id: criado.id,
        tipo:
          criado.tipo === "ELETRICO"
            ? "Elétrico"
            : criado.tipo === "HIDRAULICO"
            ? "Hidráulico"
            : "Aerodinâmico",
        resultado: criado.resultado,
        data: criado.data ? criado.data.slice(0, 10) : "",
        aeronaveModelo: criado.aeronave?.modelo,
      };

      setTestes((prev) => [...prev, testeNormalizado]);
      fecharModal();
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao criar teste");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Testes de Aeronaves</h2>
            <button
              onClick={abrirModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              + Novo Teste
            </button>
          </div>

          {carregando ? (
            <p>Carregando...</p>
          ) : (
            <table className="w-full bg-white shadow-md rounded border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-left">
                  <th className="p-3">ID</th>
                  <th className="p-3">Tipo do Teste</th>
                  <th className="p-3">Resultado</th>
                  <th className="p-3">Data</th>
                  <th className="p-3">Aeronave</th>
                </tr>
              </thead>
              <tbody>
                {testes.map((teste) => (
                  <tr key={teste.id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{teste.id}</td>
                    <td className="p-3">{teste.tipo}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded text-sm font-medium ${
                          teste.resultado === "APROVADO"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {teste.resultado}
                      </span>
                    </td>
                    <td className="p-3">
                      {teste.data || "-"}
                    </td>
                    <td className="p-3">
                      {teste.aeronaveModelo || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {mostrarModal && (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                  Novo Teste
                </h3>
                <form onSubmit={salvarTeste} className="space-y-3">
                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Tipo do Teste
                    </label>
                    <select
                      value={novoTeste.tipo}
                      onChange={(e) =>
                        handleChange("tipo", e.target.value)
                      }
                      className="w-full border rounded p-2"
                      required
                    >
                      <option value="">Selecione</option>
                      <option value="Elétrico">Elétrico</option>
                      <option value="Hidráulico">Hidráulico</option>
                      <option value="Aerodinâmico">Aerodinâmico</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Resultado
                    </label>
                    <select
                      value={novoTeste.resultado}
                      onChange={(e) =>
                        handleChange("resultado", e.target.value)
                      }
                      className="w-full border rounded p-2"
                    >
                      <option value="APROVADO">APROVADO</option>
                      <option value="REPROVADO">REPROVADO</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Data
                    </label>
                    <input
                      type="date"
                      value={novoTeste.data}
                      onChange={(e) =>
                        handleChange("data", e.target.value)
                      }
                      className="w-full border rounded p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm mb-1 text-gray-600">
                      Aeronave
                    </label>
                    <select
                      value={novoTeste.aeronaveId}
                      onChange={(e) =>
                        handleChange("aeronaveId", e.target.value)
                      }
                      className="w-full border rounded p-2"
                      required
                    >
                      <option value="">Selecione</option>
                      {aeronaves.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.modelo} (ID {a.id})
                        </option>
                      ))}
                    </select>
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
        </main>
      </div>
    </div>
  );
}
