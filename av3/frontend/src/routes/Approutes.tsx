import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "../pages/login/Login"
import Dashboard from "../pages/Dashboard/Dashboard"
import ListaAeronaves from "../pages/Aeronaves/ListaAeronaves"
import CadastroAeronave from "../pages/Aeronaves/CadastroAeronave"
import Pecas from "../pages/Pecas/Pecas"
import Relatorios from "../pages/Relatorios/Relatorios"
import Etapas from "../pages/Etapas/Etapas"
import ListaFuncionarios from "../pages/Funcionarios/ListaFuncionarios"
import DetalhesFuncionario from "../pages/Funcionarios/DetalhesFuncionario"
import CadastroFuncionario from "../pages/Funcionarios/CadastroFuncionario"
import Testes from "../pages/teste/teste"
import CadastroPeca from "../pages/Pecas/CadastroPeca"
import AssociarFuncionarioEtapa from "../pages/Associação/associacaoFuncionarioEtapa"
import ProtectedRoute from "../components/ProtectedRoutes"

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
    
        <Route path="/" element={<Login />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allow={["Admin", "Engenheiro", "Operador"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/aeronaves"
          element={
            <ProtectedRoute allow={["Admin", "Engenheiro"]}>
              <ListaAeronaves />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aeronaves/cadastro"
          element={
            <ProtectedRoute allow={["Admin", "Engenheiro"]}>
              <CadastroAeronave />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pecas"
          element={
            <ProtectedRoute allow={["Admin", "Engenheiro", "Operador"]}>
              <Pecas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pecas/cadastro"
          element={
            <ProtectedRoute allow={["Admin", "Engenheiro"]}>
              <CadastroPeca />
            </ProtectedRoute>
          }
        />
        <Route
          path="/etapas"
          element={
            <ProtectedRoute allow={["Admin", "Engenheiro", "Operador"]}>
              <Etapas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/relatorios"
          element={
            <ProtectedRoute allow={["Admin", "Engenheiro"]}>
              <Relatorios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/funcionarios"
          element={
            <ProtectedRoute allow={["Admin"]}>
              <ListaFuncionarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/funcionarios/:id"
          element={
            <ProtectedRoute allow={["Admin"]}>
              <DetalhesFuncionario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/funcionarios/cadastro"
          element={
            <ProtectedRoute allow={["Admin"]}>
              <CadastroFuncionario />
            </ProtectedRoute>
          }
        />
        <Route
          path="/associacao"
          element={
            <ProtectedRoute allow={["Admin", "Engenheiro"]}>
              <AssociarFuncionarioEtapa />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teste"
          element={
            <ProtectedRoute allow={["Admin", "Engenheiro", "Operador"]}>
              <Testes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
