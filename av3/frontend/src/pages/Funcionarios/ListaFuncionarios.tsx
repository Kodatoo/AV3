import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Funcionario = {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  nivelPermissao: string; // "ADMINISTRADOR" | "ENGENHEIRO" | "OPERADOR"
};

export default function ListaFuncionarios() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarFuncionarios = async () => {
    try {
      const resp = await fetch("http://localhost:3333/funcionarios");
      const data = await resp.json();

      const normalizados = data.map((f: any) => ({
        id: f.id,
        nome: f.nome,
        telefone: f.telefone,
        endereco: f.endereco,
        usuario: f.usuario,
        nivelPermissao:
          f.nivelPermissao === "ADMINISTRADOR"
            ? "Administrador"
            : f.nivelPermissao === "ENGENHEIRO"
            ? "Engenheiro"
            : "Operador",
      }));

      setFuncionarios(normalizados);
    } catch (error) {
      console.error("Erro ao buscar funcionários", error);
      alert("Erro ao carregar funcionários");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Funcionários
            </h1>
            <button
              onClick={() => navigate("/funcionarios/cadastro")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Cadastrar Funcionário
            </button>
          </div>

          {carregando ? (
            <p>Carregando...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {funcionarios.map((func) => (
                <div
                  key={func.id}
                  className="bg-white p-4 shadow rounded-lg border hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/funcionarios/${func.id}`)}
                >
                  <h2 className="text-lg font-bold text-gray-800">
                    {func.nome}
                  </h2>
                  <p className="text-gray-600">{func.nivelPermissao}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Login: {func.usuario}
                  </p>
                  <p className="text-sm text-gray-500">{func.telefone}</p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
