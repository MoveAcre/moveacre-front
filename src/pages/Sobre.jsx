import { Link } from "react-router-dom";
import { SignInButton, useUser } from "@clerk/clerk-react";
import Logo from "../components/Logo";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sb-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .sb-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 1px solid #111;
  }

  .sb-nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .sb-nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #555;
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .sb-nav-link:hover { color: #C8F500; }

  .sb-content {
    flex: 1;
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    padding: 64px 40px;
  }

  .sb-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #C8F500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .sb-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(40px, 7vw, 72px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 16px;
  }

  .sb-title span { color: #C8F500; }

  .sb-manifesto {
    font-size: 16px;
    color: #666;
    line-height: 1.7;
    max-width: 600px;
    margin-bottom: 56px;
    border-left: 2px solid #C8F500;
    padding-left: 20px;
  }

  .sb-manifesto em { color: #F5F5F0; font-style: normal; font-weight: 500; }

  .sb-section-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #444;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid #111;
  }

  .sb-team {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1px;
    background: #111;
    border: 1px solid #111;
    margin-bottom: 56px;
  }

  .sb-member {
    background: #0A0A0A;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .sb-member-role {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: #C8F500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .sb-member-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 22px;
    text-transform: uppercase;
    color: #F5F5F0;
  }

  .sb-member-ig {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #555;
    text-decoration: none;
  }
  .sb-member-ig:hover { color: #C8F500; }

  .sb-propósito {
    background: #111;
    border-left: 4px solid #C8F500;
    padding: 32px;
    margin-bottom: 56px;
  }

  .sb-propósito-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 22px;
    text-transform: uppercase;
    color: #C8F500;
    margin-bottom: 12px;
  }

  .sb-propósito-text {
    font-size: 15px;
    color: #888;
    line-height: 1.7;
  }

  .sb-footer {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #111;
    flex-wrap: wrap;
    gap: 8px;
  }

  .sb-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }

  @media (max-width: 600px) {
    .sb-nav { padding: 16px 20px; }
    .sb-content { padding: 40px 20px; }
    .sb-footer { padding: 16px 20px; }
  }
`;

const equipa = [
  {
    role: "Desenvolvimento",
    name: "Tomas Souza",
    ig: "@tomnuvk",
  },
  {
    role: "Desenvolvimento",
    name: "Julio Cesar",
    ig: "@julio.szax",
  },
  {
    role: "Gestão de Produto",
    name: "Kelvin Lieberman",
    ig: "@lieberman07",
  },
];

export default function Sobre() {
  const { isSignedIn } = useUser();

  return (
    <div className="sb-root">
      <style>{styles}</style>

      <nav className="sb-nav">
        <Logo />
        <div className="sb-nav-links">
          <Link to="/criterios" className="sb-nav-link">Quem pode doar</Link>
          <Link to="/beneficios" className="sb-nav-link">Benefícios</Link>
          {isSignedIn ? (
            <Link to="/" className="sb-nav-link" style={{ color: "#C8F500" }}>Meu painel</Link>
          ) : (
            <SignInButton mode="modal">
              <button style={{ background:"none", border:"1px solid #333", color:"#888", padding:"8px 20px", fontFamily:"JetBrains Mono,monospace", fontSize:11, cursor:"pointer", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                ENTRAR
              </button>
            </SignInButton>
          )}
        </div>
      </nav>

      <div className="sb-content">
        <div className="sb-eyebrow">// Quem somos</div>
        <h1 className="sb-title">
          Feito no <span>Acre.</span><br />
          Para o Acre.
        </h1>

        <p className="sb-manifesto">
          Todo dia aparece um pedido urgente de sangue no grupo da família.
          A gente compartilha, sente o aperto — e fica por isso mesmo.{" "}
          <em>Não porque não quer ajudar. Mas porque o sistema nunca facilitou.</em>{" "}
          O MOVEACRE nasceu disso: da indignação de ver vidas em risco por falta de organização.
        </p>

        <div className="sb-propósito">
          <div className="sb-propósito-title">Nosso propósito</div>
          <p className="sb-propósito-text">
            Conectar quem precisa de sangue a quem pode ajudar, de forma rápida, direta e sem depender de viralização.
            Porque salvar uma vida não pode depender de um post viral.
            O MOVEACRE organiza doadores, notifica quem é compatível e garante que o pedido chegue a quem pode agir.
          </p>
        </div>

        <div className="sb-section-title">// A equipa</div>
        <div className="sb-team">
          {equipa.map((m, i) => (
            <div className="sb-member" key={i}>
              <span className="sb-member-role">{m.role}</span>
              <span className="sb-member-name">{m.name}</span>
              <a
                href={`https://instagram.com/${m.ig.replace("@", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sb-member-ig"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight:5, verticalAlign:"middle" }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                {m.ig}
              </a>
            </div>
          ))}
        </div>
      </div>

      <footer className="sb-footer">
        <span className="sb-footer-copy">© 2026 MOVEACRE — Rio Branco, Acre, Brasil</span>
        <span className="sb-footer-copy" style={{ color:"#C8F500" }}>VAMOS MOVER O ACRE.</span>
      </footer>
    </div>
  );
}
