import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .tc-root { background: #0A0A0A; color: #F5F5F0; font-family: 'Barlow', sans-serif; min-height: 100vh; display: flex; flex-direction: column; }
  .tc-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 1px solid #111; }
  .tc-back { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #555; text-decoration: none; }
  .tc-back:hover { color: #C8F500; }
  .tc-content { flex: 1; max-width: 760px; width: 100%; margin: 0 auto; padding: 64px 40px; }
  .tc-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #C8F500; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }
  .tc-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: clamp(36px, 6vw, 64px); line-height: 0.95; text-transform: uppercase; color: #F5F5F0; margin-bottom: 8px; }
  .tc-title span { color: #C8F500; }
  .tc-date { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #444; margin-bottom: 48px; }
  .tc-section { margin-bottom: 40px; }
  .tc-section-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 20px; text-transform: uppercase; color: #C8F500; margin-bottom: 12px; letter-spacing: 0.03em; }
  .tc-text { font-size: 14px; color: #777; line-height: 1.8; }
  .tc-text strong { color: #F5F5F0; font-weight: 500; }
  .tc-divider { border: none; border-top: 1px solid #111; margin: 40px 0; }
  .tc-footer { padding: 20px 40px; border-top: 1px solid #111; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .tc-footer-copy { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #333; }
  .tc-footer-link { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #444; text-decoration: none; }
  .tc-footer-link:hover { color: #C8F500; }
  @media (max-width: 600px) {
    .tc-nav { padding: 14px 20px; }
    .tc-content { padding: 40px 20px; }
    .tc-footer { padding: 16px 20px; }
  }
`;

export default function Termos() {
  return (
    <div className="tc-root">
      <style>{styles}</style>
      <nav className="tc-nav">
        <Logo />
        <Link to="/" className="tc-back">← VOLTAR</Link>
      </nav>

      <div className="tc-content">
        <div className="tc-eyebrow">// LEGAL</div>
        <h1 className="tc-title">Termos e<br /><span>Condições</span></h1>
        <p className="tc-date">Última atualização: maio de 2026</p>

        <div className="tc-section">
          <div className="tc-section-title">1. Aceitação dos Termos</div>
          <p className="tc-text">
            Ao aceder e utilizar a plataforma MOVEACRE, disponível em <strong>moveacre.com.br</strong>, o utilizador declara ter lido, compreendido e aceite integralmente os presentes Termos e Condições de Uso. Caso não concorde com qualquer disposição, deverá abster-se de utilizar a plataforma.
          </p>
        </div>

        <div className="tc-section">
          <div className="tc-section-title">2. Descrição do Serviço</div>
          <p className="tc-text">
            O MOVEACRE é uma plataforma digital de intermediação entre doadores voluntários de sangue e pessoas que necessitam de doação no estado do Acre, Brasil. A plataforma <strong>não substitui</strong> os serviços do Hemoacre ou de qualquer hemocentro, hospital ou serviço de saúde. O MOVEACRE atua exclusivamente como canal de comunicação e organização.
          </p>
        </div>

        <div className="tc-section">
          <div className="tc-section-title">3. Cadastro e Conta</div>
          <p className="tc-text">
            Para utilizar as funcionalidades da plataforma, o utilizador deve criar uma conta com informações verdadeiras, completas e atualizadas. O utilizador é responsável pela confidencialidade das suas credenciais de acesso e por todas as atividades realizadas na sua conta. O MOVEACRE reserva-se o direito de suspender ou encerrar contas que violem estes termos.
          </p>
        </div>

        <div className="tc-section">
          <div className="tc-section-title">4. Responsabilidades do Utilizador</div>
          <p className="tc-text">
            O utilizador compromete-se a:<br /><br />
            — Fornecer informações verídicas sobre o seu estado de saúde e elegibilidade para doação;<br />
            — Não utilizar a plataforma para fins fraudulentos, ilegais ou que causem dano a terceiros;<br />
            — Respeitar os critérios médicos de doação estabelecidos pelo Ministério da Saúde do Brasil;<br />
            — Não criar pedidos de urgência falsos ou com informações incorretas;<br />
            — Manter os seus dados de perfil atualizados.
          </p>
        </div>

        <div className="tc-section">
          <div className="tc-section-title">5. Limitação de Responsabilidade</div>
          <p className="tc-text">
            O MOVEACRE não se responsabiliza por:<br /><br />
            — Decisões médicas tomadas com base nas informações da plataforma;<br />
            — A efetivação ou não de doações de sangue;<br />
            — Danos diretos ou indiretos decorrentes do uso ou impossibilidade de uso da plataforma;<br />
            — Informações incorretas fornecidas pelos utilizadores;<br />
            — Indisponibilidade temporária da plataforma por razões técnicas.
          </p>
        </div>

        <div className="tc-section">
          <div className="tc-section-title">6. Propriedade Intelectual</div>
          <p className="tc-text">
            Todo o conteúdo da plataforma MOVEACRE — incluindo marca, logótipo, design, textos e código — é propriedade exclusiva dos seus criadores e está protegido pela legislação brasileira de propriedade intelectual. É proibida a reprodução, distribuição ou utilização sem autorização prévia e expressa.
          </p>
        </div>

        <div className="tc-section">
          <div className="tc-section-title">7. Modificações</div>
          <p className="tc-text">
            O MOVEACRE reserva-se o direito de alterar estes Termos a qualquer momento. As alterações entram em vigor imediatamente após a publicação na plataforma. O uso continuado da plataforma após as alterações constitui aceitação dos novos termos.
          </p>
        </div>

        <div className="tc-section">
          <div className="tc-section-title">8. Lei Aplicável</div>
          <p className="tc-text">
            Estes Termos são regidos pela legislação brasileira. Quaisquer disputas serão submetidas ao foro da comarca de Rio Branco, Acre, Brasil.
          </p>
        </div>

        <hr className="tc-divider" />

        <p className="tc-text" style={{ fontSize: 12 }}>
          Dúvidas? Entre em contacto: <strong>moveacre@gmail.com</strong>
        </p>
      </div>

      <footer className="tc-footer">
        <span className="tc-footer-copy">© 2026 MOVEACRE — Rio Branco, Acre, Brasil</span>
        <Link to="/privacidade" className="tc-footer-link">Política de Privacidade</Link>
      </footer>
    </div>
  );
}
