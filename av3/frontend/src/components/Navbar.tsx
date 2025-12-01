import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/aeronaves": "Lista de Aeronaves",
  "/aeronaves/cadastro": "Cadastrar Aeronave",
  "/pecas": "Peças",
  "/etapas": "Etapas",
  "/teste": "Testes",
  "/relatorios": "Relatórios",
  "/funcionarios": "Funcionários",
  "/associacao": "Associação Etapas",
}

export default function Navbar() {
  const location = useLocation()
  const title = titles[location.pathname] || "Painel de Controle"
  const [nivel, setNivel] = useState<string | null>(null)

  useEffect(() => {
    setNivel(localStorage.getItem("nivel"))
  }, [])

  return (
    <header className="w-full bg-white border-b px-6 py-4 flex items-center justify-between">
      <span className="text-xl font-semibold">{title}</span>
      {nivel && (
        <span className="text-sm text-gray-600">
          Nível: <strong>{nivel}</strong>
        </span>
      )}
    </header>
  );
}
