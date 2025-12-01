import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resp = await fetch("http://localhost:3333/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: login, // campo do Funcionario no back
          senha,
        }),
      });

      if (resp.status === 401) {
        setErro("Usuário ou senha incorretos");
        return;
      }

      if (!resp.ok) {
        setErro("Erro ao tentar entrar");
        return;
      }

      const data = await resp.json();
      // data.nivelPermissao: "ADMINISTRADOR" | "ENGENHEIRO" | "OPERADOR"

      const mapaNivel: Record<string, string> = {
        ADMINISTRADOR: "Admin",
        ENGENHEIRO: "Engenheiro",
        OPERADOR: "Operador",
      };

      const nivelBackend = data.nivelPermissao as string;
      const nivelFront =
        mapaNivel[nivelBackend as keyof typeof mapaNivel] ?? "Operador";

      localStorage.setItem("nivel", nivelFront);
      localStorage.setItem("usuarioNome", data.nome);
      setErro("");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro de conexão no login:", error);
      setErro("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Login</label>
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu login"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />
          </div>

          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
