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

  .ma-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 24px;
    letter-spacing: 0.1em;
    color: #C8F500;
    text-transform: uppercase;
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

  .ma-tension {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #444;
    letter-spacing: 0.05em;
    line-height: 1.6;
    max-width: 400px;
  }

  .ma-divider {
    width: 100%;
    height: 1px;
    background: #111;
    margin: 0 40px;
    width: calc(100% - 80px);
  }

  .ma-footer {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #111;
    flex-wrap: wrap;
    gap: 8px;
  }

  .ma-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }

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
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;
  if (isSignedIn) return <DoadorDashboard />;

  return (
    <div className="ma-root">
      <style>{styles}</style>

      <nav className="ma-nav">
        <span className="ma-logo">MOVEACRE</span>
        <SignInButton mode="modal">
          <button style={{ background:"none", border:"1px solid #333", color:"#888", padding:"8px 20px", fontFamily:"JetBrains Mono,monospace", fontSize:11, cursor:"pointer", letterSpacing:"0.05em", textTransform:"uppercase" }}>
            FAZER LOGIN
          </button>
        </SignInButton>
      </nav>

      <div className="ma-hero">
        <div className="ma-eyebrow">// MOVEACRE — ACRE, BRASIL</div>

        <h1 className="ma-headline">
          VOCÊ AINDA<br />
          TÁ NA <span>PLATEIA?</span>
        </h1>

        <p className="ma-manifesto">
          Todo dia tem um pedido de sangue no WhatsApp. Todo dia a gente vê, sente um aperto, e passa adiante.{" "}
          <em>O problema não é que você passou adiante — é que mesmo quando quis ajudar, o sistema não deixou.</em>{" "}
          De tanto ver o pedido no lugar errado, virou paisagem. De tanto ser paisagem, virou normal.{" "}
          <em>O MoveAcre existe pra devolver a indignação a quem perdeu — e dar a ela um lugar pra ir.</em>
        </p>

        <div className="ma-cta-row">
          <SignInButton mode="modal">
            <button className="ma-btn-primary">SAIR DA PLATEIA</button>
          </SignInButton>
          <p className="ma-tension">
            Ou a gente se move —<br />
            ou continua dependendo de viralização<br />
            pra salvar vidas.
          </p>
        </div>
      </div>

      <footer className="ma-footer">
        <span className="ma-footer-copy">© 2026 MOVEACRE — ACRE, BRASIL</span>
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
