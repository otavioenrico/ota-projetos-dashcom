import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { DashboardLayout } from "./components/layout/DashboardLayout";

// Public pages
import Homepage from "./pages/Homepage";
import Produto from "./pages/Produto";
import Planos from "./pages/Planos";
import Registrar from "./pages/Registrar";
import Login from "./pages/Login";
import CentralAjuda from "./pages/CentralAjuda";
import SobreNos from "./pages/SobreNos";
import PoliticaPrivacidade from "./pages/PoliticaPrivacidade";
import TermosUso from "./pages/TermosUso";

// Dashboard pages
import Dashboard from "./pages/Dashboard";
import FluxoCaixa from "./pages/FluxoCaixa";
import Contas from "./pages/Contas";
import Clientes from "./pages/Clientes";
import Fornecedores from "./pages/Fornecedores";
import Relatorios from "./pages/Relatorios";
import Agenda from "./pages/Agenda";
import Integracoes from "./pages/Integracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/produto" element={<Produto />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/login" element={<Login />} />
          <Route path="/central-ajuda" element={<CentralAjuda />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
          <Route path="/politica-privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/termos-uso" element={<TermosUso />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/fluxo-caixa" element={<FluxoCaixa />} />
                  <Route path="/contas" element={<Contas />} />
                  <Route path="/clientes" element={<Clientes />} />
                  <Route path="/fornecedores" element={<Fornecedores />} />
                  <Route path="/relatorios" element={<Relatorios />} />
                  <Route path="/agenda" element={<Agenda />} />
                  <Route path="/integracoes" element={<Integracoes />} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Redirect old routes to new dashboard structure */}
          <Route path="/fluxo-caixa" element={<Navigate to="/dashboard/fluxo-caixa" replace />} />
          <Route path="/contas" element={<Navigate to="/dashboard/contas" replace />} />
          <Route path="/clientes" element={<Navigate to="/dashboard/clientes" replace />} />
          <Route path="/fornecedores" element={<Navigate to="/dashboard/fornecedores" replace />} />
          <Route path="/relatorios" element={<Navigate to="/dashboard/relatorios" replace />} />
          <Route path="/agenda" element={<Navigate to="/dashboard/agenda" replace />} />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
  </QueryClientProvider>
);

export default App;
