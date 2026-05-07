import { useState } from "react";
import { Link } from "react-router-dom";
import { SignInButton, useUser } from "@clerk/clerk-react";
import Logo from "../components/Logo";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .sb-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* NAVBAR */
  .sb-nav {
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

  .sb-nav-left { display: flex; align-items: center; gap: 40px; }
  .sb-nav-links { display: flex; align-items: center; gap: 4px; }

  .sb-nav-link {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #666;
    text-decoration: none;
    padding: 6px 12px;
    letter-spacing: 0.02em;
    transition: color 0.15s;
  }

  .sb-nav-link:hover { color: #F5F5F0; }
  .sb-nav-link-active { color: #C8F500 !important; }

  .sb-nav-right { display: flex; align-items: center; gap: 10px; }

  .sb-btn-nav-enter {
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

  .sb-btn-nav-enter:hover { border-color: #444; color: #F5F5F0; opacity: 1; }

  .sb-btn-nav-cta {
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

  .sb-btn-nav-cta:hover { background: #d4ff00; opacity: 1; transform: none; }

  /* PAGE HEADER */
  .sb-header {
    border-bottom: 1px solid #111;
    padding: 64px 40px 56px;
    max-width: 920px;
    width: 100%;
    margin: 0 auto;
  }

  .sb-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #C8F500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 28px;
  }

  .sb-eyebrow::before {
    content: '';
    display: block;
    width: 28px;
    height: 1px;
    background: #C8F500;
  }

  .sb-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(44px, 7vw, 80px);
    line-height: 0.92;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 24px;
    letter-spacing: -0.01em;
  }

  .sb-title span { color: #C8F500; }

  .sb-subtitle {
    font-size: 16px;
    color: #666;
    line-height: 1.7;
    max-width: 560px;
    font-weight: 400;
  }

  /* CONTENT */
  .sb-content {
    flex: 1;
    width: 100%;
    max-width: 920px;
    margin: 0 auto;
    padding: 0 40px 80px;
  }

  /* BLOCKS */
  .sb-block {
    padding: 56px 0;
    border-bottom: 1px solid #111;
  }

  .sb-block:last-child { border-bottom: none; }

  .sb-block-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #444;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid #111;
  }

  /* PROPÓSITO */
  .sb-proposito {
    background: #0D0D0D;
    border-left: 4px solid #C8F500;
    padding: 36px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .sb-proposito-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 28px;
    text-transform: uppercase;
    color: #C8F500;
    letter-spacing: 0.02em;
  }

  .sb-proposito-text {
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    color: #777;
    line-height: 1.75;
    max-width: 600px;
  }

  .sb-proposito-text strong { color: #D0D0C8; font-weight: 600; }

  /* QUOTE */
  .sb-quote {
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .sb-quote-mark {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 80px;
    color: #1a1a1a;
    line-height: 0.6;
    user-select: none;
  }

  .sb-quote-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: clamp(24px, 4vw, 36px);
    color: #F5F5F0;
    line-height: 1.15;
    text-transform: uppercase;
    max-width: 640px;
  }

  .sb-quote-author {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #444;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* TEAM */
  .sb-team {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 2px;
  }

  .sb-member {
    background: #0D0D0D;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-left: 3px solid #1a1a1a;
    transition: border-color 0.15s;
  }

  .sb-member:hover { border-left-color: #C8F500; }

  .sb-member-role {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: #C8F500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .sb-member-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 22px;
    text-transform: uppercase;
    color: #F5F5F0;
    letter-spacing: 0.02em;
  }

  .sb-member-ig {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #444;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 4px;
    transition: color 0.15s;
  }

  .sb-member-ig:hover { color: #C8F500; }

  /* MANIFESTO HIGHLIGHTS */
  .sb-manifesto-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }

  .sb-manifesto-item {
    background: #0D0D0D;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .sb-manifesto-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: #333;
    letter-spacing: 0.1em;
  }

  .sb-manifesto-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 18px;
    text-transform: uppercase;
    color: #C8F500;
    letter-spacing: 0.03em;
  }

  .sb-manifesto-desc {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    color: #666;
    line-height: 1.65;
  }

  /* CTA */
  .sb-cta {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .sb-cta-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(28px, 4vw, 44px);
    text-transform: uppercase;
    color: #F5F5F0;
    line-height: 0.95;
  }

  .sb-cta-sub {
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    color: #555;
    max-width: 400px;
    line-height: 1.6;
  }

  .sb-btn-primary {
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
    margin-top: 8px;
  }

  .sb-btn-primary:hover { background: #d4ff00; transform: translateY(-1px); opacity: 1; }

  /* FOOTER */
  .sb-footer {
    padding: 24px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #111;
    flex-wrap: wrap;
    gap: 12px;
  }

  .sb-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #2e2e2e;
    letter-spacing: 0.05em;
  }

  .sb-footer-tag {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 13px;
    color: #C8F500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* HAMBURGER */
  .sb-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .sb-hamburger span { display: block; width: 22px; height: 2px; background: #F5F5F0; }

  .sb-mobile-menu {
    background: #0D0D0D;
    border-bottom: 1px solid #1a1a1a;
    display: flex;
    flex-direction: column;
  }

  .sb-mobile-link {
    font-family: 'Barlow', sans-serif;
    font-size: 14px;
    font-weight: 500;
    color: #777;
    text-decoration: none;
    padding: 16px 24px;
    border-bottom: 1px solid #111;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    cursor: pointer;
    text-align: left;
    width: 100%;
    display: block;
  }

  .sb-mobile-cta {
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
    .sb-nav { padding: 0 20px; }
    .sb-nav-links { display: none; }
    .sb-nav-right { display: none; }
    .sb-hamburger { display: flex; }
    .sb-header { padding: 48px 24px 40px; }
    .sb-content { padding: 0 24px 60px; }
    .sb-manifesto-grid { grid-template-columns: 1fr; }
    .sb-footer { padding: 20px 24px; flex-direction: column; align-items: flex-start; }
    .sb-block { padding: 40px 0; }
  }

  @media (min-width: 769px) {
    .sb-hamburger { display: none !important; }
    .sb-mobile-menu { display: none !important; }
  }
`;

const equipa = [
  { role: "Desenvolvimento", name: "Tomas Souza", ig: "@tomnuvk" },
  { role: "Desenvolvimento", name: "Julio Cesar", ig: "@julio.szax" },
  { role: "Gestão de Produto", name: "Kelvin Lieberman", ig: "@lieberman07" },
];

const IgIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function Sobre() {
  const { isSignedIn } = useUser();
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="sb-root">
      <style>{styles}</style>

      {/* NAVBAR */}
      <nav className="sb-nav">
        <div className="sb-nav-left">
          <Logo />
          <div className="sb-nav-links">
            <Link to="/criterios" className="sb-nav-link">Quem pode doar</Link>
            <Link to="/sobre" className="sb-nav-link sb-nav-link-active">Sobre nós</Link>
          </div>
        </div>

        <div className="sb-nav-right">
          {isSignedIn ? (
            <Link to="/" style={{ fontFamily: "'Barlow', sans-serif", fontSize: 13, color: '#C8F500', textDecoration: 'none', fontWeight: 500 }}>
              Meu painel →
            </Link>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="sb-btn-nav-enter">Entrar</button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="sb-btn-nav-cta">Criar Conta</button>
              </SignInButton>
            </>
          )}
        </div>

        <button className="sb-hamburger" onClick={() => setMenuAberto(m => !m)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      {menuAberto && (
        <div className="sb-mobile-menu">
          <Link to="/criterios" className="sb-mobile-link" onClick={() => setMenuAberto(false)}>Quem pode doar</Link>
          <Link to="/sobre" className="sb-mobile-link" onClick={() => setMenuAberto(false)}>Sobre nós</Link>
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="sb-mobile-cta" onClick={() => setMenuAberto(false)}>Criar Conta</button>
            </SignInButton>
          )}
        </div>
      )}

      {/* PAGE HEADER */}
      <div className="sb-header">
        <div className="sb-eyebrow">Quem somos</div>
        <h1 className="sb-title">
          Feito no <span>Acre.</span><br />
          Para o Acre.
        </h1>
        <p className="sb-subtitle">
          Todo dia aparece um pedido de sangue no grupo da família.
          A gente compartilha, sente o aperto — e fica por isso mesmo.
          Não por falta de vontade. Por falta de um sistema que funcionasse.
          O MOVEACRE nasceu dessa indignação.
        </p>
      </div>

      {/* CONTENT */}
      <div className="sb-content">

        {/* PROPÓSITO */}
        <div className="sb-block">
          <div className="sb-proposito">
            <div className="sb-proposito-title">Nosso propósito</div>
            <p className="sb-proposito-text">
              Conectar quem precisa de sangue a quem pode ajudar —
              de forma rápida, direta e <strong>sem depender de viralização</strong>.
              O MOVEACRE organiza doadores, notifica quem é compatível
              e garante que o pedido chegue a quem pode agir.
              Porque salvar uma vida não pode depender de um post viral.
            </p>
          </div>
        </div>

        {/* QUOTE */}
        <div className="sb-block">
          <div className="sb-quote">
            <div className="sb-quote-mark">"</div>
            <p className="sb-quote-text">
              Ninguém deveria implorar por um direito que já é seu.
            </p>
            <span className="sb-quote-author">— MOVEACRE</span>
          </div>
        </div>

        {/* COMO FUNCIONA */}
        <div className="sb-block">
          <div className="sb-block-label">// Como funciona</div>
          <div className="sb-manifesto-grid">
            {[
              {
                num: "01",
                label: "Você se cadastra",
                desc: "Informa seu tipo sanguíneo, localização e histórico de doações. Leva menos de 3 minutos.",
              },
              {
                num: "02",
                label: "O sistema te rastreia",
                desc: "Calculamos automaticamente quando você estará apto para doar de novo.",
              },
              {
                num: "03",
                label: "O Acre te chama",
                desc: "Quando há urgência compatível com seu tipo e proximidade, você recebe o alerta diretamente.",
              },
              {
                num: "04",
                label: "Você age",
                desc: "Sem grupo de WhatsApp. Sem viralização. Só você, no momento certo, no lugar certo.",
              },
            ].map((item, i) => (
              <div className="sb-manifesto-item" key={i}>
                <span className="sb-manifesto-num">{item.num}</span>
                <span className="sb-manifesto-label">{item.label}</span>
                <p className="sb-manifesto-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EQUIPE */}
        <div className="sb-block">
          <div className="sb-block-label">// A equipe</div>
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
                  <IgIcon />
                  {m.ig}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="sb-block">
          <div className="sb-cta">
            <h2 className="sb-cta-title">Sai da plateia.<br />Entra no movimento.</h2>
            <p className="sb-cta-sub">
              Cada pessoa cadastrada é uma resposta que o Acre não vai precisar implorar.
            </p>
            {isSignedIn ? (
              <Link to="/" style={{ display: "inline-block" }}>
                <button className="sb-btn-primary">Ir para meu painel</button>
              </Link>
            ) : (
              <SignInButton mode="modal">
                <button className="sb-btn-primary">Quero ser doador</button>
              </SignInButton>
            )}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="sb-footer">
        <span className="sb-footer-copy">© 2026 MOVEACRE — Rio Branco, Acre, Brasil</span>
        <span className="sb-footer-tag">Vamos mover o Acre.</span>
      </footer>
    </div>
  );
}
