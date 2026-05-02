import { useAuth, useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../components/Logo";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "moveacre@gmail.com").split(",").map(e => e.trim());

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .dd-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .dd-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 32px;
    border-bottom: 1px solid #1a1a1a;
  }

  .dd-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 0.05em;
    color: #C8F500;
    text-transform: uppercase;
    text-decoration: none;
  }

  .dd-body {
    flex: 1;
    padding: 48px 32px;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
  }

  .dd-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #C8F500;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  .dd-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 0.95;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 8px;
  }

  .dd-title span { color: #C8F500; }

  .dd-divider {
    width: 40px;
    height: 2px;
    background: #C8F500;
    margin-bottom: 32px;
  }

  .dd-alert {
    background: #C8F500;
    color: #000;
    padding: 15px;
    margin-bottom: 24px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
  }

  .dd-grid {
    display: grid;
    gap: 16px;
  }

  .dd-btn {
    background: #1A1A1A;
    border: 1px solid #333;
    padding: 24px;
    text-align: left;
    cursor: pointer;
    width: 100%;
    text-decoration: none;
    display: block;
    transition: all 0.2s;
  }

  .dd-btn:hover {
    border-color: #C8F500;
  }

  .dd-btn-primary {
    border-color: #C8F500;
  }

  .dd-btn-icon {
    font-size: 32px;
    margin-bottom: 12px;
    display: block;
  }

  .dd-btn-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 4px;
  }

  .dd-btn-title.primary {
    color: #C8F500;
  }

  .dd-btn-desc {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #666;
  }

  .dd-footer {
    padding: 16px 32px;
    border-top: 1px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .dd-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }
`;

export default function DoadorDashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [perfilIncompleto, setPerfilIncompleto] = useState(false);

  useEffect(() => {
    const checkPerfil = async () => {
      if (isSignedIn) {
        // Admin não precisa completar perfil
        const email = user?.primaryEmailAddress?.emailAddress || "";
        if (ADMIN_EMAILS.includes(email)) return;

        try {
          const token = await getToken();
          const res = await fetch(`${API}/doadores/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const json = await res.json();
          const data = json.data ?? json;
          const completo =
            data &&
            data.tipo_sangue && data.tipo_sangue.trim() !== "" &&
            data.genero && data.genero.trim() !== "" &&
            data.telefone && data.telefone.trim() !== "";
          if (!completo) {
            // Redireciona imediatamente — obrigatório completar perfil
            navigate("/completar-perfil", { replace: true });
          }
        } catch (err) { console.error(err); }
      }
    };
    checkPerfil();
  }, [isSignedIn, getToken]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="dd-root">
        <nav className="dd-nav">
          <Logo />
          <UserButton afterSignOutUrl="/" />
        </nav>

        <div className="dd-body">
          <div className="dd-tag">// BEM_VINDO</div>
          <h1 className="dd-title">
            OLA, <br />
            <span>{user.firstName}</span>
          </h1>
          <div className="dd-divider" />



          <div className="dd-grid">
            <button onClick={() => navigate('/criar-urgencia')} className="dd-btn">
              <span className="dd-btn-icon">!</span>
              <h2 className="dd-btn-title">ABRIR PEDIDO DE SANGUE</h2>
              <p className="dd-btn-desc">Criar um novo pedido de transfusão de sangue.</p>
            </button>

            <button onClick={() => navigate('/minhas-urgencias')} className="dd-btn">
              <span className="dd-btn-icon">-</span>
              <h2 className="dd-btn-title">MEUS PEDIDOS</h2>
              <p className="dd-btn-desc">Ver status dos meus pedidos feitos.</p>
            </button>
            
            <button onClick={() => navigate('/perfil')} className="dd-btn">
              <span className="dd-btn-icon">*</span>
              <h2 className="dd-btn-title">MINHA CONTA / DOADOR</h2>
              <p className="dd-btn-desc">Historico, CRUD da Conta, e Declarar Doacao.</p>
            </button>

            {user?.publicMetadata?.role === "admin" && (
              <button onClick={() => navigate('/admin')} className="dd-btn">
                <span className="dd-btn-icon">#</span>
                <h2 className="dd-btn-title primary">PAINEL ADMINISTRATIVO</h2>
                <p className="dd-btn-desc">Gestao de usuarios, doadores e pedidos.</p>
              </button>
            )}
          </div>
        </div>

        <footer className="dd-footer">
          <span className="dd-footer-copy">
            © 2026 MOVEACRE — Rio Branco, Acre, Brasil
          </span>
          <span className="dd-footer-copy" style={{ color: "#C8F500" }}>
            VAMOS MOVER O ACRE.
          </span>
        </footer>
      </div>
    </>
  );
}
