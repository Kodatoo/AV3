import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Funcionario = {
  id: number;
  nome: string;
  telefone: string;
  endereco: string;
  usuario: string;
  nivelPermissao: string;
};

export default function DetalhesFuncionario() {
  const { id } = useParams<{ id: string }>();
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const resp = await fetch(
          `http://localhost:3333/funcionarios/${id}`
        );

        if (resp.status === 404) {
          setErro("Funcionário não encontrado.");
          return;
        }

        if (!resp.ok) {
          setErro("Erro ao buscar funcionário.");
          return;
        }

        const data = await resp.json();
        setFuncionario({
          id: data.id,
          nome: data.nome,
          telefone: data.telefone,
          endereco: data.endereco,
          usuario: data.usuario,
          nivelPermissao:
            data.nivelPermissao === "ADMINISTRADOR"
              ? "Administrador"
              : data.nivelPermissao === "ENGENHEIRO"
              ? "Engenheiro"
              : "Operador",
        });
      } catch (e) {
        console.error(e);
        setErro("Erro de conexão ao buscar funcionário.");
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, [id]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6">
          {carregando && <p>Carregando...</p>}
          {erro && <p className="text-red-600">{erro}</p>}
          {!carregando && !erro && funcionario && (
            <div className="bg-white rounded-lg shadow p-6 max-w-xl">
              <h1 className="text-2xl font-semibold mb-4">
                {funcionario.nome}
              </h1>
              <p>
                <strong>Nível:</strong> {funcionario.nivelPermissao}
              </p>
              <p>
                <strong>Login:</strong> {funcionario.usuario}
              </p>
              <p>
                <strong>Telefone:</strong> {funcionario.telefone}
              </p>
              <p>
                <strong>Endereço:</strong> {funcionario.endereco}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
