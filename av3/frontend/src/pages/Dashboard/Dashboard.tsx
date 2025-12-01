import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

export default function Dashboard() {
  // dados mockados
  const emProducao = 12;
  const pecasDisponiveis = 48;
  const etapasConcluidas = 35;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 grid grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-4 flex flex-col items-center">
            <h3 className="text-gray-700">Em Produção</h3>
            <div className="w-24 h-24 border-4 border-blue-500 rounded-full mt-3 flex items-center justify-center text-3xl font-bold text-blue-600">
              {emProducao}
            </div>
          </div>
          <div className="bg-white shadow rounded p-4 flex flex-col items-center">
            <h3 className="text-gray-700">Peças Disponíveis</h3>
            <div className="w-24 h-24 border-4 border-green-500 rounded-full mt-3 flex items-center justify-center text-3xl font-bold text-green-600">
              {pecasDisponiveis}
            </div>
          </div>
          <div className="bg-white shadow rounded p-4 flex flex-col items-center">
            <h3 className="text-gray-700">Etapas Concluídas</h3>
            <div className="w-24 h-24 border-4 border-purple-500 rounded-full mt-3 flex items-center justify-center text-3xl font-bold text-purple-600">
              {etapasConcluidas}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
