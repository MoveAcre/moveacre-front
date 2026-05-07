import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import AdminDashboard from "./pages/AdminDashboard";
import MinhasUrgencias from "./pages/MinhasUrgencias";
import CriarUrgencia from "./pages/CriarUrgencia";
import CompletarPerfil from "./pages/CompletarPerfil";
import SyncWrapper from "./components/SyncWrapper";
import DoadorDashboard from "./pages/DoadorDashboard";
import Perfil from "./pages/Perfil";
import HistoricoDoador from "./pages/HistoricoDoador";
import EditarPedido from "./pages/EditarPedido";
import EditarConta from "./pages/EditarConta";
import Criterios from "./pages/Criterios";
import Sobre from "./pages/Sobre";
import Termos from "./pages/Termos";
import Privacidade from "./pages/Privacidade";
import Logo from "./components/Logo";
import { useIsAdmin } from "./hooks/useIsAdmin";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ma-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* NAVBAR */
  .ma-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: 64px;
    background: rgba(10,10,10,0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid #1a1a1a;
  }

  .ma-nav-left {
    display: flex;
    align-items: center;
    gap: 40px;
  }

  .ma-nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .ma-nav-link {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #666;
    text-decoration: none;
    letter-spacing: 0.02em;
    padding: 6px 12px;
    transition: color 0.15s;
  }

  .ma-nav-link:hover { color: #F5F5F0; }

  .ma-nav-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .ma-btn-nav-enter {
    background: transparent;
    color: #777;
    border: 1px solid #252525;
    padding: 8px 18px;
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: all 0.15s;
  }

  .ma-btn-nav-enter:hover {
    border-color: #444;
    color: #F5F5F0;
    opacity: 1;
  }

  .ma-btn-nav-cta {
    background: #C8F500;
    color: #0A0A0A;
    border: none;
    padding: 9px 20px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.15s;
  }

  .ma-btn-nav-cta:hover { background: #d4ff00; opacity: 1; transform: none; }

  /* HERO */
  .ma-hero {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 100px 40px 80px;
    max-width: 920px;
    width: 100%;
    margin: 0 auto;
  }

  .ma-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #C8F500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  .ma-eyebrow::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: #C8F500;
    flex-shrink: 0;
  }

  .ma-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(56px, 9.5vw, 104px);
    line-height: 0.9;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 36px;
    letter-spacing: -0.01em;
  }

  .ma-headline span { color: #C8F500; }

  .ma-sub {
    font-family: 'Barlow', sans-serif;
    font-size: 17px;
    font-weight: 400;
    color: #777;
    line-height: 1.75;
    max-width: 540px;
    margin-bottom: 52px;
  }

  .ma-sub strong { color: #C8F500; font-weight: 600; }

  .ma-cta-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    align-items: center;
    margin-bottom: 64px;
  }

  .ma-btn-primary {
    background: #C8F500;
    color: #0A0A0A;
    border: none;
    padding: 18px 44px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 18px;
    text-transform: uppercase;
    cursor: pointer;
    letter-spacing: 0.06em;
    transition: 0.15s;
  }

  .ma-btn-primary:hover { background: #d4ff00; transform: translateY(-1px); opacity: 1; }

  .ma-btn-secondary {
    background: transparent;
    color: #666;
    border: 1px solid #222;
    padding: 18px 36px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
    letter-spacing: 0.04em;
    transition: 0.15s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .ma-btn-secondary:hover { border-color: #C8F500; color: #C8F500; opacity: 1; }

  /* STATS */
  .ma-stats {
    display: flex;
    border: 1px solid #161616;
    background: #0D0D0D;
    flex-wrap: wrap;
  }

  .ma-stat {
    flex: 1;
    min-width: 120px;
    padding: 24px 28px;
    border-right: 1px solid #161616;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .ma-stat:last-child { border-right: none; }

  .ma-stat-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }

  .ma-stat-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 28px;
    font-weight: 900;
    color: #C8F500;
    line-height: 1;
  }

  .ma-stat-sub {
    font-family: 'Barlow', sans-serif;
    font-size: 12px;
    color: #444;
    line-height: 1.4;
  }

  /* TENSION BAR */
  .ma-tension-bar {
    padding: 14px 40px;
    background: #0D0D0D;
    border-top: 1px solid #111;
    border-bottom: 1px solid #111;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .ma-tension-dot {
    width: 6px;
    height: 6px;
    background: #C8F500;
    border-radius: 50%;
    flex-shrink: 0;
    animation: mdot 2.5s ease-in-out infinite;
  }

  @keyframes mdot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.25; }
  }

  .ma-tension-text {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #444;
    letter-spacing: 0.04em;
    line-height: 1.5;
  }

  .ma-tension-text em { color: #666; font-style: normal; }

  /* FOOTER */
  .ma-footer {
    padding: 24px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #111;
    flex-wrap: wrap;
    gap: 16px;
  }

  .ma-footer-left {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ma-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #2e2e2e;
    letter-spacing: 0.05em;
  }

  .ma-footer-links {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }

  .ma-footer-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #3a3a3a;
    text-decoration: none;
    letter-spacing: 0.05em;
    transition: color 0.2s;
  }

  .ma-footer-link:hover { color: #C8F500; }

  .ma-footer-tag {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    color: #C8F500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* HAMBURGER */
  .ma-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .ma-hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #F5F5F0;
  }

  .ma-mobile-menu {
    background: #0D0D0D;
    border-bottom: 1px solid #1a1a1a;
    display: flex;
    flex-direction: column;
  }

  .ma-mobile-link {
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #777;
    text-decoration: none;
    padding: 16px 24px;
    border-bottom: 1px solid #111;
    letter-spacing: 0.02em;
    transition: color 0.15s;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
    display: block;
  }

  .ma-mobile-link:hover { color: #C8F500; }

  .ma-mobile-cta {
    margin: 16px 24px;
    background: #C8F500;
    color: #0A0A0A;
    border: none;
    padding: 14px 20px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 15px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    width: calc(100% - 48px);
    text-align: center;
    display: block;
  }

  @media (max-width: 768px) {
    .ma-nav { padding: 0 20px; }
    .ma-nav-links { display: none; }
    .ma-nav-right { display: none; }
    .ma-hamburger { display: flex; }
    .ma-hero { padding: 56px 24px 56px; }
    .ma-stats { flex-direction: column; }
    .ma-stat { border-right: none; border-bottom: 1px solid #161616; }
    .ma-stat:last-child { border-bottom: none; }
    .ma-tension-bar { padding: 14px 24px; }
    .ma-footer { padding: 20px 24px; flex-direction: column; align-items: flex-start; }
    .ma-footer-links { gap: 14px; }
    .ma-cta-row { flex-direction: column; align-items: stretch; }
    .ma-btn-secondary { justify-content: center; }
    .ma-btn-primary { text-align: center; }
  }

  @media (min-width: 769px) {
    .ma-hamburger { display: none !important; }
    .ma-mobile-menu { display: none !important; }
  }
`;

const AdminRoute = () => {
  const { isLoaded, isSignedIn } = useUser();
  const { isAdmin, loading } = useIsAdmin();
  if (!isLoaded || loading) return null;
  if (!isSignedIn) return <Navigate to="/" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <AdminDashboard />;
};

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return null;
  if (!isSignedIn) return <Navigate to="/" replace />;
  return children;
};

const Index = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 769) setMenuAberto(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isLoaded) return null;
  if (isSignedIn) return <DoadorDashboard />;

  return (
    <div className="ma-root">
      <style>{styles}</style>

      {/* NAVBAR */}
      <nav className="ma-nav">
        <div className="ma-nav-left">
          <Logo />
          <div className="ma-nav-links">
            <Link to="/criterios" className="ma-nav-link">Quem pode doar</Link>
            <Link to="/sobre" className="ma-nav-link">Sobre nós</Link>
          </div>
        </div>

        <div className="ma-nav-right">
          <SignInButton mode="modal">
            <button className="ma-btn-nav-enter">Entrar</button>
          </SignInButton>
          <SignInButton mode="modal">
            <button className="ma-btn-nav-cta">Criar Conta</button>
          </SignInButton>
        </div>

        <button
          className="ma-hamburger"
          onClick={() => setMenuAberto(m => !m)}
          aria-label="Abrir menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {menuAberto && (
        <div className="ma-mobile-menu">
          <Link to="/criterios" className="ma-mobile-link" onClick={() => setMenuAberto(false)}>
            Quem pode doar
          </Link>
          <Link to="/sobre" className="ma-mobile-link" onClick={() => setMenuAberto(false)}>
            Sobre nós
          </Link>
          <SignInButton mode="modal">
            <button
              className="ma-mobile-link"
              style={{ borderTop: '1px solid #111' }}
              onClick={() => setMenuAberto(false)}
            >
              Entrar
            </button>
          </SignInButton>
          <SignInButton mode="modal">
            <button className="ma-mobile-cta" onClick={() => setMenuAberto(false)}>
              Criar Conta
            </button>
          </SignInButton>
        </div>
      )}

      {/* HERO */}
      <div className="ma-hero">
        <div className="ma-eyebrow">Moveacre · Acre, Brasil · Doação de Sangue</div>

        <h1 className="ma-headline">
          NINGUÉM DEVERIA<br />
          IMPLORAR POR UM<br />
          DIREITO QUE JÁ É <span>SEU.</span>
        </h1>

        <p className="ma-sub">
          O MOVEACRE conecta doadores ao Hemoacre de forma direta —
          sem grupos de WhatsApp, sem depender de viralização.
          Você se cadastra uma vez, e o sistema{" "}
          <strong>te avisa quando o Acre precisar de você.</strong>
        </p>

        <div className="ma-cta-row">
          <SignInButton mode="modal">
            <button className="ma-btn-primary">Quero ser doador</button>
          </SignInButton>
          <SignInButton mode="modal">
            <button className="ma-btn-secondary">
              Preciso de sangue →
            </button>
          </SignInButton>
        </div>

        <div className="ma-stats">
          <div className="ma-stat">
            <span className="ma-stat-label">Tipo de doação</span>
            <span className="ma-stat-value">Voluntária</span>
            <span className="ma-stat-sub">Sem custo nenhum</span>
          </div>
          <div className="ma-stat">
            <span className="ma-stat-label">Duração</span>
            <span className="ma-stat-value">~30min</span>
            <span className="ma-stat-sub">Da chegada à saída</span>
          </div>
          <div className="ma-stat">
            <span className="ma-stat-label">Local</span>
            <span className="ma-stat-value">Hemoacre</span>
            <span className="ma-stat-sub">Rio Branco, AC</span>
          </div>
          <div className="ma-stat">
            <span className="ma-stat-label">Intervalo</span>
            <span className="ma-stat-value">60 dias</span>
            <span className="ma-stat-sub">O sistema avisa quando você pode</span>
          </div>
        </div>
      </div>

      {/* TENSION BAR */}
      <div className="ma-tension-bar">
        <div className="ma-tension-dot" />
        <p className="ma-tension-text">
          Hoje tem alguém no Acre esperando por sangue.{" "}
          <em>A plateia não salva ninguém — sai dela.</em>
        </p>
      </div>

      {/* FOOTER */}
      <footer className="ma-footer">
        <div className="ma-footer-left">
          <span className="ma-footer-copy">© 2026 MOVEACRE — Rio Branco, Acre, Brasil</span>
          <div className="ma-footer-links">
            <Link to="/criterios" className="ma-footer-link">Critérios de doação</Link>
            <Link to="/sobre" className="ma-footer-link">Sobre nós</Link>
            <Link to="/termos" className="ma-footer-link">Termos</Link>
            <Link to="/privacidade" className="ma-footer-link">Privacidade</Link>
          </div>
        </div>
        <span className="ma-footer-tag">Vamos mover o Acre.</span>
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

        <Route path="/minhas-urgencias" element={
          <ProtectedRoute><MinhasUrgencias /></ProtectedRoute>
        } />
        <Route path="/criar-urgencia" element={
          <ProtectedRoute><SyncWrapper><CriarUrgencia /></SyncWrapper></ProtectedRoute>
        } />
        <Route path="/completar-perfil" element={<CompletarPerfil />} />
        <Route path="/perfil" element={
          <ProtectedRoute><Perfil /></ProtectedRoute>
        } />
        <Route path="/historico-doador" element={
          <ProtectedRoute><HistoricoDoador /></ProtectedRoute>
        } />
        <Route path="/editar-conta" element={
          <ProtectedRoute><EditarConta /></ProtectedRoute>
        } />
        <Route path="/editar-pedido/:id" element={
          <ProtectedRoute><EditarPedido /></ProtectedRoute>
        } />
        <Route path="/listar-urgencias" element={
          <ProtectedRoute><MinhasUrgencias /></ProtectedRoute>
        } />

        <Route path="/criterios" element={<Criterios />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/privacidade" element={<Privacidade />} />

        {/* Redireciona /beneficios removida */}
        <Route path="/beneficios" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
