import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import AdminDashboard from "./pages/AdminDashboard";
import MinhasUrgencias from "./pages/MinhasUrgencias";
import CriarUrgencia from "./pages/CriarUrgencia";
import CompletarPerfil from "./pages/CompletarPerfil";
import SyncWrapper from "./components/SyncWrapper";
import DoadorDashboard from "./pages/DoadorDashboard";
import Perfil from "./pages/Perfil";
import HistoricoDoador from "./pages/HistoricoDoador";
import EditarPedido from "./pages/EditarPedido";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ma-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .ma-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 64px;
    letter-spacing: 0.1em;
    color: #C8F500;
    margin-bottom: 8px;
  }

  .ma-sub {
    color: #555;
    font-size: 16px;
    margin-bottom: 48px;
    text-transform: uppercase;
    letter-spacing: 2px;
  }

  .ma-actions {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 320px;
  }

  .ma-btn-primary {
    background: #C8F500;
    color: #0A0A0A;
    border: none;
    padding: 20px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 18px;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition: 0.2s;
  }

  .ma-btn-primary:hover { transform: scale(1.02); background: #d4ff00; }

  .ma-btn-outline {
    background: transparent;
    color: #F5F5F0;
    border: 1px solid #333;
    padding: 16px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 14px;
    text-transform: uppercase;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
  }

  .ma-user-box {
    position: absolute;
    top: 20px;
    right: 20px;
  }
`;

const Index = () => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <DoadorDashboard />;
  }

  return (
    <div className="ma-root">
      <style>{styles}</style>
      <h1 className="ma-logo">MOVEACRE</h1>
      <p className="ma-sub">Sistema de Doação de Sangue</p>
      <p style={{ color: '#888', maxWidth: '400px', textAlign: 'center', marginBottom: '32px', fontSize: '14px', lineHeight: '1.6' }}>
        Conectando doadores voluntários a quem mais precisa. Cadastre-se para doar sangue, registrar seus atestados ou solicitar uma transfusão de urgência.
      </p>

      <div className="ma-actions">
        <SignInButton mode="modal">
          <button className="ma-btn-primary">ENTRAR NO SISTEMA</button>
        </SignInButton>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/minhas-urgencias" element={<MinhasUrgencias />} />
        <Route path="/criar-urgencia" element={<SyncWrapper><CriarUrgencia /></SyncWrapper>} />
        <Route path="/completar-perfil" element={<CompletarPerfil />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/historico-doador" element={<HistoricoDoador />} />
        <Route path="/editar-pedido/:id" element={<EditarPedido />} />
        <Route path="/listar-urgencias" element={<MinhasUrgencias />} />
      </Routes>
    </Router>
  );
}
