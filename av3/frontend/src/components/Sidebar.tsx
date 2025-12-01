import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ChevronDown, ChevronRight, Plane, LogOut } from "lucide-react"

export default function Sidebar() {
  const [openAeronaves, setOpenAeronaves] = useState(false)
  const [nivel, setNivel] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const n = localStorage.getItem("nivel")
    setNivel(n)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("nivel")
    navigate("/")
  };

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        {nivel ? `Bem-vindo, ${nivel}!` : "Bem-vindo!"}
      </div>

      <nav className="flex-1 p-4 space-y-2">
       
        <Link to="/dashboard" className="block py-2 px-4 rounded hover:bg-gray-800">
          Dashboard
        </Link>

        
        {(nivel === "Admin" || nivel === "Engenheiro") && (
          <>
            <button
              onClick={() => setOpenAeronaves(!openAeronaves)}
              className="flex items-center justify-between w-full py-2 px-4 rounded hover:bg-gray-800"
            >
              <span className="flex items-center gap-2">
                <Plane size={18} />
                Aeronaves
              </span>
              {openAeronaves ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {openAeronaves && (
              <div className="ml-6 flex flex-col space-y-1">
                <Link to="/aeronaves" className="block py-2 px-3 rounded hover:bg-gray-800">
                  Lista de Aeronaves
                </Link>
                <Link to="/aeronaves/cadastro" className="block py-2 px-3 rounded hover:bg-gray-800">
                  Cadastrar Aeronave
                </Link>
              </div>
            )}
          </>
        )}

       
        <Link to="/pecas" className="block py-2 px-4 rounded hover:bg-gray-800">
          Peças
        </Link>

        
        <Link to="/etapas" className="block py-2 px-4 rounded hover:bg-gray-800">
          Etapas
        </Link>

        
        <Link to="/teste" className="block py-2 px-4 rounded hover:bg-gray-800">
          Testes
        </Link>

    
        {(nivel === "Admin" || nivel === "Engenheiro") && (
          <Link to="/relatorios" className="block py-2 px-4 rounded hover:bg-gray-800">
            Relatórios
          </Link>
        )}

    
        {nivel === "Admin" && (
          <Link to="/funcionarios" className="block py-2 px-4 rounded hover:bg-gray-800">
            Funcionários
          </Link>
        )}

       
        {(nivel === "Admin" || nivel === "Engenheiro") && (
          <Link to="/associacao" className="block py-2 px-4 rounded hover:bg-gray-800">
            Associação Etapas
          </Link>
        )}
      </nav>

 
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}
