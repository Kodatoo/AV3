import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

type ResultadoTeste = {
  tipo: string;
  resultado: "APROVADO" | "REPROVADO";
};

type Relatorio = {
  id: number;
  aeronave: string;
  cliente: string;
  dataEntrega: string;
  etapas: string[];
  pecas: string[];
  resultadosTestes: ResultadoTeste[];
};

export default function Relatorios() {
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await fetch("http://localhost:3333/relatorios");
        const data = await resp.json();

        const normalizados = data.map((r: any) => ({
          id: r.id,
          aeronave: r.aeronave,
          cliente: r.cliente,
          dataEntrega: r.dataEntrega.slice(0, 10),
          etapas: r.etapas,
          pecas: r.pecas,
          resultadosTestes: r.resultadosTestes,
        }));

        setRelatorios(normalizados);
      } catch (e) {
        console.error("Erro ao carregar relatórios", e);
        alert("Erro ao carregar relatórios");
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
        <main className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Relatórios</h2>

          {carregando ? (
            <p>Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatorios.map((relatorio) => (
                <div
                  key={relatorio.id}
                  className="bg-white shadow rounded p-6 border-l-4 border-blue-500 hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Relatório da Aeronave: {relatorio.aeronave}
                  </h3>
                  <p className="mb-1">
                    <span className="font-bold">Cliente:</span>{" "}
                    {relatorio.cliente}
                  </p>
                  <p className="mb-1">
                    <span className="font-bold">Data de entrega:</span>{" "}
                    {relatorio.dataEntrega}
                  </p>
                  <p className="mb-1">
                    <span className="font-bold">Etapas realizadas:</span>{" "}
                    {relatorio.etapas.join(", ")}
                  </p>
                  <p className="mb-1">
                    <span className="font-bold">Peças utilizadas:</span>{" "}
                    {relatorio.pecas.join(", ")}
                  </p>
                  <div className="mb-1">
                    <span className="font-bold">Resultados dos testes:</span>
                    <ul className="list-disc ml-5 mt-1">
                      {relatorio.resultadosTestes.map((teste, idx) => (
                        <li key={idx}>
                          <span className="font-medium">{teste.tipo}:</span>{" "}
                          <span
                            className={
                              teste.resultado === "APROVADO"
                                ? "bg-green-100 text-green-700 px-2 py-1 rounded"
                                : "bg-red-100 text-red-700 px-2 py-1 rounded"
                            }
                          >
                            {teste.resultado}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
