import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CadastroFuncionario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    endereco: "",
    telefone: "",
    login: "",
    senha: "",
    nivel: "",
  });
  const [salvando, setSalvando] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // converte o texto do select para o enum do Prisma
    const mapaNivel: Record<string, string> = {
      Administrador: "ADMINISTRADOR",
      Engenheiro: "ENGENHEIRO",
      Operador: "OPERADOR",
    };

    const nivelPermissao = mapaNivel[formData.nivel];

    try {
      setSalvando(true);
      const resp = await fetch("http://localhost:3333/funcionarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          endereco: formData.endereco,
          telefone: formData.telefone,
          usuario: formData.login,     // campo do Prisma
          senha: formData.senha,
          nivelPermissao,              // enum já convertido
        }),
      });

      if (!resp.ok) {
        alert("Erro ao cadastrar funcionário");
        return;
      }

      alert("Funcionário cadastrado com sucesso!");
      navigate("/funcionarios");
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-6">Cadastrar Funcionário</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nome"
          type="text"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="endereco"
          type="text"
          placeholder="Endereço"
          value={formData.endereco}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="telefone"
          type="text"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="login"
          type="text"
          placeholder="Login"
          value={formData.login}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="nivel"
          value={formData.nivel}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Nível de permissão</option>
          <option value="Administrador">Administrador</option>
          <option value="Operador">Operador</option>
          <option value="Engenheiro">Engenheiro</option>
        </select>
        <button
          type="submit"
          disabled={salvando}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md disabled:opacity-60"
        >
          {salvando ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
