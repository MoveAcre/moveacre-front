import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
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
import Beneficios from "./pages/Beneficios";
import Criterios from "./pages/Criterios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ma-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .ma-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 1px solid #111;
  }

  .ma-nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .ma-nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #555;
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.2s;
  }

  .ma-nav-link:hover { color: #C8F500; }

  .ma-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 24px;
    letter-spacing: 0.1em;
    color: #C8F500;
    text-transform: uppercase;
    text-decoration: none;
  }

  .ma-hero {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 80px 40px 60px;
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
  }

  .ma-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #C8F500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .ma-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(52px, 9vw, 96px);
    line-height: 0.92;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 32px;
  }

  .ma-headline span { color: #C8F500; }

  .ma-manifesto {
    font-family: 'Barlow', sans-serif;
    font-size: 16px;
    font-weight: 400;
    color: #888;
    line-height: 1.7;
    max-width: 560px;
    margin-bottom: 48px;
    border-left: 2px solid #C8F500;
    padding-left: 20px;
  }

  .ma-manifesto em {
    color: #F5F5F0;
    font-style: normal;
    font-weight: 500;
  }

  .ma-cta-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 32px;
  }

  .ma-btn-primary {
    background: #C8F500;
    color: #0A0A0A;
    border: none;
    padding: 18px 40px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 20px;
    text-transform: uppercase;
    cursor: pointer;
    letter-spacing: 0.05em;
    transition: 0.15s;
  }

  .ma-btn-primary:hover { background: #d4ff00; transform: translateY(-1px); }

  .ma-btn-secondary {
    background: transparent;
    color: #888;
    border: 1px solid #333;
    padding: 18px 32px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
    letter-spacing: 0.05em;
    transition: 0.15s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .ma-btn-secondary:hover { border-color: #C8F500; color: #C8F500; }

  .ma-tension {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #444;
    letter-spacing: 0.05em;
    line-height: 1.6;
    max-width: 400px;
  }

  .ma-info-strip {
    display: flex;
    gap: 40px;
    flex-wrap: wrap;
    padding-top: 16px;
    border-top: 1px solid #111;
  }

  .ma-info-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ma-info-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .ma-info-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px;
    font-weight: 700;
    color: #C8F500;
  }

  .ma-footer {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #111;
    flex-wrap: wrap;
    gap: 12px;
  }

  .ma-footer-left {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ma-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }

  .ma-footer-links {
    display: flex;
    gap: 16px;
  }

  .ma-footer-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #444;
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }

  .ma-footer-link:hover { color: #C8F500; }

  .ma-footer-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #C8F500;
    letter-spacing: 0.05em;
  }
`;

const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "moveacre@gmail.com").split(",").map(e => e.trim());

const AdminRoute = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/" replace />;
  const email = user?.primaryEmailAddress?.emailAddress || "";
  if (!ADMIN_EMAILS.includes(email)) return <Navigate to="/" replace />;
  return <AdminDashboard />;
};

const Index = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) return null;
  if (isSignedIn) {
    // Admin vai direto para o painel administrativo
    const email = user?.primaryEmailAddress?.emailAddress || "";
    if (ADMIN_EMAILS.includes(email)) return <Navigate to="/admin" replace />;
    return <DoadorDashboard />;
  }

  return (
    <div className="ma-root">
      <style>{styles}</style>

      <nav className="ma-nav">
        <Link to="/" className="ma-logo">MOVEACRE</Link>
        <div className="ma-nav-links">
          <Link to="/criterios" className="ma-nav-link">Quem pode doar</Link>
          <Link to="/beneficios" className="ma-nav-link">Benefícios</Link>
          <SignInButton mode="modal">
            <button style={{ background:"none", border:"1px solid #333", color:"#888", padding:"8px 20px", fontFamily:"JetBrains Mono,monospace", fontSize:11, cursor:"pointer", letterSpacing:"0.05em", textTransform:"uppercase" }}>
              ENTRAR
            </button>
          </SignInButton>
        </div>
      </nav>

      <div className="ma-hero">
        <div className="ma-eyebrow">// MOVEACRE — ACRE, BRASIL · DOAÇÃO DE SANGUE</div>

        <h1 className="ma-headline">
          SANGUE NÃO<br />
          CHEGA POR <span>WHATSAPP.</span>
        </h1>

        <p className="ma-manifesto">
          Todo dia aparece um pedido urgente de sangue no grupo da família.{" "}
          A gente compartilha, sente o aperto — e fica por isso mesmo.{" "}
          <em>Não porque não quer ajudar. Mas porque o sistema nunca facilitou.</em>{" "}
          O MOVEACRE muda isso: conecta quem precisa a quem pode ajudar,{" "}
          de forma rápida, direta e sem depender de viralização.{" "}
          <em>Porque salvar uma vida não pode depender de um post viral.</em>
        </p>

        <div className="ma-cta-row">
          <SignInButton mode="modal">
            <button className="ma-btn-primary">QUERO AJUDAR</button>
          </SignInButton>
          <Link to="/criterios" className="ma-btn-secondary">
            Ver critérios de doação
          </Link>
        </div>

        <div className="ma-info-strip">
          <div className="ma-info-item">
            <span className="ma-info-label">Tipo de doação</span>
            <span className="ma-info-value">Voluntária</span>
          </div>
          <div className="ma-info-item">
            <span className="ma-info-label">Duração</span>
            <span className="ma-info-value">~30min</span>
          </div>
          <div className="ma-info-item">
            <span className="ma-info-label">Local</span>
            <span className="ma-info-value">Hemoacre</span>
          </div>
          <div className="ma-info-item">
            <span className="ma-info-label">Custo</span>
            <span className="ma-info-value">Zero</span>
          </div>
        </div>
      </div>

      <footer className="ma-footer">
        <div className="ma-footer-left">
          <span className="ma-footer-copy">© 2026 MOVEACRE — Rio Branco, Acre, Brasil</span>
          <div className="ma-footer-links">
            <Link to="/criterios" className="ma-footer-link">Critérios de doação</Link>
            <Link to="/beneficios" className="ma-footer-link">Benefícios</Link>
          </div>
        </div>
        <span className="ma-footer-tag">VAMOS MOVER O ACRE.</span>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/admin" element={<AdminRoute />} />
        <Route path="/minhas-urgencias" element={<MinhasUrgencias />} />
        {/* RENOMEADO: "Pedir ajuda" → "Abrir pedido" para evitar confusão com suporte */}
        <Route path="/criar-urgencia" element={<SyncWrapper><CriarUrgencia /></SyncWrapper>} />
        <Route path="/completar-perfil" element={<CompletarPerfil />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/historico-doador" element={<HistoricoDoador />} />
        <Route path="/editar-pedido/:id" element={<EditarPedido />} />
        <Route path="/listar-urgencias" element={<MinhasUrgencias />} />
        {/* Novas páginas públicas */}
        <Route path="/beneficios" element={<Beneficios />} />
        <Route path="/criterios" element={<Criterios />} />
      </Routes>
    </Router>
  );
}
