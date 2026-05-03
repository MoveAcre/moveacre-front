import { Link } from "react-router-dom";
import { SignInButton, useUser } from "@clerk/clerk-react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pg-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .pg-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 40px;
    border-bottom: 1px solid #111;
  }

  .pg-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 24px;
    letter-spacing: 0.1em;
    color: #C8F500;
    text-decoration: none;
  }

  .pg-nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .pg-nav-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #555;
    text-decoration: none;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    transition: color 0.2s;
  }
  .pg-nav-link:hover { color: #C8F500; }

  .pg-content {
    flex: 1;
    max-width: 860px;
    width: 100%;
    margin: 0 auto;
    padding: 64px 40px;
  }

  .pg-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #C8F500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .pg-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: clamp(40px, 7vw, 72px);
    line-height: 0.95;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 16px;
  }

  .pg-title span { color: #C8F500; }

  .pg-subtitle {
    font-size: 16px;
    color: #666;
    line-height: 1.6;
    max-width: 520px;
    margin-bottom: 56px;
    border-left: 2px solid #C8F500;
    padding-left: 20px;
  }

  .pg-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 1px;
    background: #111;
    border: 1px solid #111;
    margin-bottom: 56px;
  }

  .pg-card {
    background: #0A0A0A;
    padding: 32px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .pg-card-icon {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #444;
    letter-spacing: 0.1em;
    line-height: 1;
  }

  .pg-card-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
    color: #F5F5F0;
    letter-spacing: 0.03em;
  }

  .pg-card-text {
    font-size: 14px;
    color: #666;
    line-height: 1.65;
  }

  .pg-card-tag {
    display: inline-block;
    margin-top: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: #C8F500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: rgba(200,245,0,0.07);
    padding: 4px 8px;
    border-radius: 2px;
    width: fit-content;
  }

  .pg-highlight {
    background: #111;
    border-left: 4px solid #C8F500;
    padding: 32px;
    margin-bottom: 56px;
  }

  .pg-highlight-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 22px;
    text-transform: uppercase;
    color: #C8F500;
    margin-bottom: 12px;
  }

  .pg-highlight-text {
    font-size: 15px;
    color: #888;
    line-height: 1.7;
  }

  .pg-cta {
    text-align: center;
    padding: 48px 0 0;
    border-top: 1px solid #111;
  }

  .pg-cta-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 36px;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 16px;
  }

  .pg-cta-text {
    font-size: 14px;
    color: #555;
    margin-bottom: 32px;
  }

  .pg-btn-primary {
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
  .pg-btn-primary:hover { background: #d4ff00; transform: translateY(-1px); }

  .pg-footer {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #111;
    flex-wrap: wrap;
    gap: 8px;
  }
  .pg-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }
  .pg-footer-links {
    display: flex;
    gap: 16px;
  }
  .pg-footer-link {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #444;
    text-decoration: none;
    letter-spacing: 0.05em;
  }
  .pg-footer-link:hover { color: #C8F500; }
`;

const beneficios = [
  {
    icon: "01",
    title: "Saúde monitorada",
    text: "Antes de cada doação você passa por uma triagem clínica gratuita: pressão arterial, hemoglobina, peso e temperatura. É como um mini-check-up sem custo.",
    tag: "Benefício direto",
  },
  {
    icon: "02",
    title: "Renovação do sangue",
    text: "A doação estimula a medula óssea a produzir novas células sanguíneas. Seu corpo renova completamente o volume doado em cerca de 24 horas.",
    tag: "Benefício fisiológico",
  },
  {
    icon: "03",
    title: "Saúde cardiovascular",
    text: "Estudos associam a doação regular à redução do excesso de ferro no sangue, o que pode diminuir o risco de doenças cardiovasculares.",
    tag: "Evidência científica",
  },
  {
    icon: "04",
    title: "Exames laboratoriais gratuitos",
    text: "Cada bolsa de sangue é testada para hepatite B e C, HIV, sífilis, doença de Chagas e HTLV. Você recebe notificação caso algum resultado precise de atenção.",
    tag: "Gratuito",
  },
  {
    icon: "05",
    title: "Carteirinha de doador",
    text: "Doadores cadastrados no MOVEACRE recebem a carteirinha digital de doador, que comprova seu histórico de doações e pode ser apresentada em hospitais parceiros.",
    tag: "Exclusivo MOVEACRE",
  },
  {
    icon: "06",
    title: "Sistema de níveis",
    text: "Quanto mais você doa, mais alto é seu nível: Bronze, Prata, Ouro. Doadores Ouro têm reconhecimento especial e são os primeiros a receber novidades da plataforma.",
    tag: "Bronze · Prata · Ouro",
  },
  {
    icon: "07",
    title: "Comunidade que salva vidas",
    text: "Fazer parte do MOVEACRE significa estar numa rede de pessoas que realmente se mobilizam quando alguém precisa. Não é só plataforma — é movimento.",
    tag: "Comunidade",
  },
  {
    icon: "08",
    title: "Histórico digital",
    text: "Todas as suas doações ficam registradas no seu perfil. Você pode acompanhar seu impacto, compartilhar com quem quiser e usar como comprovante.",
    tag: "Seu impacto registrado",
  },
];

import Logo from "../components/Logo";

export default function Beneficios() {
  const { isSignedIn } = useUser();

  return (
    <div className="pg-root">
      <style>{styles}</style>

      <nav className="pg-nav">
        <Logo />
        <div className="pg-nav-links">
          <Link to="/criterios" className="pg-nav-link">Critérios</Link>
          {isSignedIn ? (
            <Link to="/" className="pg-nav-link" style={{ color: "#C8F500" }}>Meu painel</Link>
          ) : (
            <SignInButton mode="modal">
              <button style={{ background:"none", border:"1px solid #333", color:"#888", padding:"8px 20px", fontFamily:"JetBrains Mono,monospace", fontSize:11, cursor:"pointer", letterSpacing:"0.05em", textTransform:"uppercase" }}>
                ENTRAR
              </button>
            </SignInButton>
          )}
        </div>
      </nav>

      <div className="pg-content">
        <div className="pg-eyebrow">// Por que ser doador?</div>
        <h1 className="pg-title">
          Você ganha<br />
          enquanto <span>salva.</span>
        </h1>
        <p className="pg-subtitle">
          Ser doador de sangue não é só altruísmo — é também cuidar de si mesmo.
          Veja o que você ganha ao fazer parte do MOVEACRE.
        </p>

        <div className="pg-grid">
          {beneficios.map((b, i) => (
            <div className="pg-card" key={i}>
              <span className="pg-card-icon">{b.icon}</span>
              <span className="pg-card-title">{b.title}</span>
              <p className="pg-card-text">{b.text}</p>
              <span className="pg-card-tag">{b.tag}</span>
            </div>
          ))}
        </div>

        <div className="pg-highlight">
          <div className="pg-highlight-title">Uma doação. Até quatro vidas.</div>
          <p className="pg-highlight-text">
            Cada bolsa de sangue é separada em componentes: hemácias, plaquetas e plasma.
            Isso significa que uma única doação sua pode salvar até quatro pessoas diferentes.
            No Acre, onde o estoque do Hemoacre vive no limite, cada doador conta — e muito.
          </p>
        </div>

        <div className="pg-cta">
          <div className="pg-cta-title">Pronto para começar?</div>
          <p className="pg-cta-text">Cadastre-se gratuitamente e faça parte da rede.</p>
          {isSignedIn ? (
            <Link to="/" style={{ display: "inline-block" }}>
              <button className="pg-btn-primary">IR PARA MEU PAINEL</button>
            </Link>
          ) : (
            <SignInButton mode="modal">
              <button className="pg-btn-primary">QUERO SER DOADOR</button>
            </SignInButton>
          )}
        </div>
      </div>

      <footer className="pg-footer">
        <span className="pg-footer-copy">© 2026 MOVEACRE — Rio Branco, Acre, Brasil</span>
        <div className="pg-footer-links">
          <Link to="/criterios" className="pg-footer-link">Critérios de doação</Link>
          <Link to="/beneficios" className="pg-footer-link">Benefícios</Link>
        </div>
      </footer>
    </div>
  );
}
