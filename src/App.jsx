import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/clerk-react";
import AdminDashboard from "./pages/AdminDashboard";
import MinhasUrgencias from "./pages/MinhasUrgencias";
import CriarUrgencia from "./pages/CriarUrgencia";
import CompletarPerfil from "./pages/CompletarPerfil";
import SyncWrapper from "./components/SyncWrapper";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap');

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
    padding: 12px 32px;
    border-bottom: 1px solid #1a1a1a;
  }

  .ma-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 0.05em;
    color: #C8F500;
    text-transform: uppercase;
    text-decoration: none;
  }

  .ma-hero {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 64px 32px;
    text-align: center;
  }

  .ma-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(52px, 8vw, 80px);
    line-height: 0.92;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 24px;
  }

  .ma-title-accent { color: #C8F500; }

  .ma-divider {
    width: 40px;
    height: 2px;
    background: #C8F500;
    margin: 0 auto 24px;
  }

  .ma-sub {
    font-family: 'Barlow', sans-serif;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.6;
    color: #888;
    max-width: 480px;
    margin-bottom: 40px;
  }

  .ma-signed-out-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #555;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  .ma-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    max-width: 300px;
  }

  .ma-btn-primary {
    background: #C8F500;
    color: #0A0A0A;
    border: none;
    padding: 14px 32px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 16px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 0;
    width: 100%;
    text-align: center;
    text-decoration: none;
    display: block;
  }

  .ma-btn-primary:hover { background: #d4ff00; }
  .ma-btn-primary:active { background: #b8e000; }

  .ma-btn-outline {
    background: transparent;
    color: #C8F500;
    border: 2px solid #C8F500;
    padding: 12px 32px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 0;
    width: 100%;
    text-align: center;
    text-decoration: none;
    display: block;
  }

  .ma-btn-outline:hover { background: #C8F500; color: #0A0A0A; }

  .ma-btn-admin {
    background: #ff3333;
    color: #fff;
    border: none;
    padding: 12px 32px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 0;
    width: 100%;
    text-align: center;
    text-decoration: none;
    display: block;
    margin-top: 12px;
  }

  .ma-btn-admin:hover { background: #ff5555; }

  .ma-footer {
    padding: 16px 32px;
    border-top: 1px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .ma-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }
`;

const Index = () => {
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "moveacre@gmail.com";

  return (
    <div className="ma-root">
      <style>{styles}</style>
      <nav className="ma-nav">
        <span className="ma-logo">MOVEACRE</span>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>

      <div className="ma-hero">
        <h1 className="ma-title">
          NINGUÉM<br />
          DEVERIA <span className="ma-title-accent">IMPLORAR</span><br />
          POR UM <span className="ma-title-accent">DIREITO</span><br />
          QUE JÁ É SEU.
        </h1>
        <div className="ma-divider" />
        <p className="ma-sub">
          O Acre está parado. O sistema atual faz o desespero depender de viralização.
          O MoveAcre existe para transformar sua indignação em movimento.
        </p>

        <SignedOut>
          <div className="ma-actions">
            <p className="ma-signed-out-label">A plateia não salva ninguém.</p>
            <SignInButton mode="modal">
              <button className="ma-btn-primary">SAIR DA PLATEIA</button>
            </SignInButton>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="ma-actions">
            <Link to="/criar-urgencia" className="ma-btn-primary">
              SOLICITAR AJUDA
            </Link>
            <Link to="/minhas-urgencias" className="ma-btn-outline">
              MEUS PEDIDOS
            </Link>
            {isAdmin && (
              <Link to="/admin" className="ma-btn-admin">
                PAINEL OPERACIONAL
              </Link>
            )}
          </div>
        </SignedIn>
      </div>

      <footer className="ma-footer">
        <span className="ma-footer-copy">
          © 2024 MOVEACRE_ANALYTICS // SEGURANÇA_DE_DADOS_SEC_01
        </span>
        <span className="ma-footer-copy" style={{ color: "#C8F500" }}>
          V.1.0.0-CINÉTICO
        </span>
      </footer>
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
      </Routes>
    </Router>
  );
}