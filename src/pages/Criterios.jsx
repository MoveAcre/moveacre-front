import { Link } from "react-router-dom";
import { SignInButton, useUser } from "@clerk/clerk-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cr-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .cr-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 1px solid #111;
  }

  .cr-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 24px;
    letter-spacing: 0.1em;
    color: #C8F500;
    text-decoration: none;
  }

  .cr-nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .cr-nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #555;
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .cr-nav-link:hover { color: #C8F500; }

  .cr-content {
    flex: 1;
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    padding: 64px 40px;
  }

  .cr-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #C8F500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .cr-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(40px, 7vw, 72px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 16px;
  }

  .cr-title span { color: #C8F500; }

  .cr-subtitle {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    max-width: 520px;
    margin-bottom: 56px;
    border-left: 2px solid #C8F500;
    padding-left: 20px;
  }

  .cr-section {
    margin-bottom: 48px;
  }

  .cr-section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #111;
  }

  .cr-section-icon {
    width: 36px;
    height: 36px;
    background: rgba(200,245,0,0.1);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .cr-section-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 22px;
    text-transform: uppercase;
    color: #F5F5F0;
    letter-spacing: 0.03em;
  }

  .cr-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .cr-item {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px 20px;
    background: #0D0D0D;
    border: 1px solid #111;
  }

  .cr-item-ok { border-left: 3px solid #C8F500; }
  .cr-item-no { border-left: 3px solid #FF4444; }
  .cr-item-info { border-left: 3px solid #888; }

  .cr-item-dot-ok { color: #C8F500; font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .cr-item-dot-no { color: #FF4444; font-size: 16px; flex-shrink: 0; margin-top: 1px; }
  .cr-item-dot-info { color: #888; font-size: 16px; flex-shrink: 0; margin-top: 1px; }

  .cr-item-text {
    font-size: 14px;
    color: #888;
    line-height: 1.6;
  }

  .cr-item-text strong {
    color: #F5F5F0;
    font-weight: 500;
  }

  .cr-alert {
    background: rgba(255,68,68,0.05);
    border: 1px solid rgba(255,68,68,0.2);
    border-left: 4px solid #FF4444;
    padding: 24px;
    margin-bottom: 48px;
  }

  .cr-alert-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 18px;
    text-transform: uppercase;
    color: #FF4444;
    margin-bottom: 10px;
  }

  .cr-alert-text {
    font-size: 14px;
    color: #888;
    line-height: 1.65;
  }

  .cr-highlight {
    background: #111;
    border-left: 4px solid #C8F500;
    padding: 28px;
    margin-bottom: 48px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cr-highlight-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    color: #C8F500;
  }

  .cr-highlight-text {
    font-size: 14px;
    color: #777;
    line-height: 1.65;
  }

  .cr-intervals {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: #111;
    border: 1px solid #111;
    margin-bottom: 48px;
  }

  .cr-interval-card {
    background: #0A0A0A;
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .cr-interval-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: #444;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }

  .cr-interval-value {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 36px;
    font-weight: 900;
    color: #C8F500;
  }

  .cr-interval-sub {
    font-size: 13px;
    color: #555;
  }

  .cr-cta {
    text-align: center;
    padding: 48px 0 0;
    border-top: 1px solid #111;
  }

  .cr-cta-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 36px;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 12px;
  }

  .cr-cta-text {
    font-size: 14px;
    color: #555;
    margin-bottom: 32px;
  }

  .cr-btn-primary {
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
  .cr-btn-primary:hover { background: #d4ff00; transform: translateY(-1px); }

  .cr-footer {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #111;
    flex-wrap: wrap;
    gap: 8px;
  }
  .cr-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }
  .cr-footer-links {
    display: flex;
    gap: 16px;
  }
  .cr-footer-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #444;
    text-decoration: none;
    letter-spacing: 0.05em;
  }
  .cr-footer-link:hover { color: #C8F500; }

  @media (max-width: 600px) {
    .cr-nav { padding: 16px 20px; }
    .cr-content { padding: 40px 20px; }
    .cr-intervals { grid-template-columns: 1fr; }
    .cr-footer { padding: 16px 20px; }
  }
`;

export default function Criterios() {
  const { isSignedIn } = useUser();

  return (
    <div className="cr-root">
      <style>{styles}</style>

      <nav className="cr-nav">
        <Link to="/" className="cr-logo">MOVEACRE</Link>
        <div className="cr-nav-links">
          <Link to="/beneficios" className="cr-nav-link">Benefícios</Link>
          {isSignedIn ? (
            <Link to="/" className="cr-nav-link" style={{ color: "#C8F500" }}>Meu painel</Link>
          ) : (
            <SignInButton mode="modal">
              <button style={{ background:"none", border:"1px solid #333", color:"#888", padding:"8px 20px", fontFamily:"JetBrains Mono,monospace", fontSize:11, cursor:"pointer", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                ENTRAR
              </button>
            </SignInButton>
          )}
        </div>
      </nav>

      <div className="cr-content">
        <div className="cr-eyebrow">// Quem pode ser doador?</div>
        <h1 className="cr-title">
          Critérios de<br />
          <span>doação.</span>
        </h1>
        <p className="cr-subtitle">
          A doação de sangue é simples, mas existem alguns critérios de saúde
          que garantem a segurança do doador e do receptor. Veja abaixo.
        </p>

        {/* Requisitos básicos */}
        <div className="cr-section">
          <div className="cr-section-header">
            <div className="cr-section-icon">✅</div>
            <span className="cr-section-title">Requisitos básicos</span>
          </div>
          <div className="cr-list">
            {[
              { text: <><strong>Idade:</strong> entre 16 e 69 anos. Menores de 18 anos precisam de autorização dos responsáveis.</> },
              { text: <><strong>Peso mínimo:</strong> 50 kg.</> },
              { text: <><strong>Saúde:</strong> estar em boas condições de saúde no dia da doação, sem febre, gripe ou mal-estar.</> },
              { text: <><strong>Alimentação:</strong> não estar em jejum. Evite alimentos gordurosos nas 4 horas anteriores.</> },
              { text: <><strong>Sono:</strong> ter dormido pelo menos 6 horas na noite anterior.</> },
              { text: <><strong>Documentação:</strong> apresentar documento de identidade com foto.</> },
            ].map((item, i) => (
              <div className="cr-item cr-item-ok" key={i}>
                <span className="cr-item-dot-ok">▸</span>
                <p className="cr-item-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Intervalos entre doações */}
        <div className="cr-section">
          <div className="cr-section-header">
            <div className="cr-section-icon">⏱️</div>
            <span className="cr-section-title">Intervalo entre doações</span>
          </div>
          <div className="cr-intervals">
            <div className="cr-interval-card">
              <span className="cr-interval-label">Homens</span>
              <span className="cr-interval-value">60 dias</span>
              <span className="cr-interval-sub">Máximo de 4 doações por ano</span>
            </div>
            <div className="cr-interval-card">
              <span className="cr-interval-label">Mulheres</span>
              <span className="cr-interval-value">90 dias</span>
              <span className="cr-interval-sub">Máximo de 3 doações por ano</span>
            </div>
          </div>
        </div>

        {/* Impedimentos temporários */}
        <div className="cr-section">
          <div className="cr-section-header">
            <div className="cr-section-icon">⏳</div>
            <span className="cr-section-title">Impedimentos temporários</span>
          </div>
          <div className="cr-list">
            {[
              <><strong>Gripe ou resfriado:</strong> aguardar 7 dias após a cura completa.</>,
              <><strong>Vacinação:</strong> depende do tipo de vacina — entre 48h e 4 semanas de espera.</>,
              <><strong>Tatuagem ou piercing:</strong> aguardar 12 meses após o procedimento.</>,
              <><strong>Endoscopia ou colonoscopia:</strong> aguardar 6 meses.</>,
              <><strong>Gestação e amamentação:</strong> aguardar 12 semanas após o parto e 12 meses após o fim da amamentação.</>,
              <><strong>Uso de antibióticos:</strong> aguardar 7 dias após o término do tratamento.</>,
              <><strong>Extração dentária:</strong> aguardar 72 horas.</>,
              <><strong>Cirurgia de pequeno porte:</strong> aguardar 3 meses.</>,
            ].map((text, i) => (
              <div className="cr-item cr-item-info" key={i}>
                <span className="cr-item-dot-info">◦</span>
                <p className="cr-item-text">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Impedimentos permanentes */}
        <div className="cr-section">
          <div className="cr-section-header">
            <div className="cr-section-icon">🚫</div>
            <span className="cr-section-title">Impedimentos permanentes</span>
          </div>
          <div className="cr-list">
            {[
              <><strong>Hepatite B ou C</strong> após os 11 anos de idade.</>,
              <><strong>HIV/AIDS, HTLV I e II.</strong></>,
              <><strong>Doença de Chagas.</strong></>,
              <><strong>Uso de drogas injetáveis</strong> (mesmo que no passado).</>,
              <><strong>Doenças cardíacas graves</strong> ou coagulopatias.</>,
            ].map((text, i) => (
              <div className="cr-item cr-item-no" key={i}>
                <span className="cr-item-dot-no">✕</span>
                <p className="cr-item-text">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cr-alert">
          <div className="cr-alert-title">⚠️ Sempre consulte o Hemoacre</div>
          <p className="cr-alert-text">
            Esta página apresenta os critérios gerais baseados nas normas do Ministério da Saúde.
            Situações específicas de saúde são avaliadas individualmente na triagem presencial.
            Em caso de dúvida, ligue para o Hemoacre: <strong style={{ color: "#F5F5F0" }}>(68) 3248-1380</strong>.
          </p>
        </div>

        <div className="cr-highlight">
          <div className="cr-highlight-title">📍 Onde doar em Rio Branco</div>
          <p className="cr-highlight-text">
            <strong style={{ color: "#F5F5F0" }}>Hemoacre — Hemocentro do Acre</strong><br />
            Av. Getúlio Vargas, 2787 - Bosque, Rio Branco, AC — CEP 69900-607<br />
            📞 (68) 3248-1380 · Funciona de segunda a sábado, das 7h às 17h.
          </p>
        </div>

        <div className="cr-cta">
          <div className="cr-cta-title">Você se encaixa nos critérios?</div>
          <p className="cr-cta-text">Cadastre-se no MOVEACRE e comece a fazer diferença.</p>
          {isSignedIn ? (
            <Link to="/" style={{ display: "inline-block" }}>
              <button className="cr-btn-primary">IR PARA MEU PAINEL</button>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="cr-btn-primary">QUERO SER DOADOR</button>
            </SignInButton>
          )}
        </div>
      </div>

      <footer className="cr-footer">
        <span className="cr-footer-copy">© 2026 MOVEACRE — Rio Branco, Acre, Brasil</span>
        <div className="cr-footer-links">
          <Link to="/criterios" className="cr-footer-link">Critérios de doação</Link>
          <Link to="/beneficios" className="cr-footer-link">Benefícios</Link>
        </div>
      </footer>
    </div>
  );
}
