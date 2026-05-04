import { Link } from "react-router-dom";
import Logo from "../components/Logo";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;500;700&family=JetBrains+Mono:wght@400;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .pv-root { background: #0A0A0A; color: #F5F5F0; font-family: 'Barlow', sans-serif; min-height: 100vh; display: flex; flex-direction: column; }
  .pv-nav { display: flex; justify-content: space-between; align-items: center; padding: 20px 40px; border-bottom: 1px solid #111; }
  .pv-back { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #555; text-decoration: none; }
  .pv-back:hover { color: #C8F500; }
  .pv-content { flex: 1; max-width: 760px; width: 100%; margin: 0 auto; padding: 64px 40px; }
  .pv-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #C8F500; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 20px; }
  .pv-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 900; font-size: clamp(36px, 6vw, 64px); line-height: 0.95; text-transform: uppercase; color: #F5F5F0; margin-bottom: 8px; }
  .pv-title span { color: #C8F500; }
  .pv-date { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #444; margin-bottom: 48px; }
  .pv-section { margin-bottom: 40px; }
  .pv-section-title { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 20px; text-transform: uppercase; color: #C8F500; margin-bottom: 12px; letter-spacing: 0.03em; }
  .pv-text { font-size: 14px; color: #777; line-height: 1.8; }
  .pv-text strong { color: #F5F5F0; font-weight: 500; }
  .pv-divider { border: none; border-top: 1px solid #111; margin: 40px 0; }
  .pv-footer { padding: 20px 40px; border-top: 1px solid #111; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; }
  .pv-footer-copy { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #333; }
  .pv-footer-link { font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #444; text-decoration: none; }
  .pv-footer-link:hover { color: #C8F500; }
  @media (max-width: 600px) {
    .pv-nav { padding: 14px 20px; }
    .pv-content { padding: 40px 20px; }
    .pv-footer { padding: 16px 20px; }
  }
`;

export default function Privacidade() {
  return (
    <div className="pv-root">
      <style>{styles}</style>
      <nav className="pv-nav">
        <Logo />
        <Link to="/" className="pv-back">← VOLTAR</Link>
      </nav>

      <div className="pv-content">
        <div className="pv-eyebrow">// LEGAL</div>
        <h1 className="pv-title">Política de<br /><span>Privacidade</span></h1>
        <p className="pv-date">Última atualização: maio de 2026</p>

        <div className="pv-section">
          <div className="pv-section-title">1. Introdução</div>
          <p className="pv-text">
            O MOVEACRE respeita a privacidade dos seus utilizadores e está comprometido com a proteção dos dados pessoais em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)</strong>. Esta Política descreve como recolhemos, utilizamos, armazenamos e protegemos as suas informações.
          </p>
        </div>

        <div className="pv-section">
          <div className="pv-section-title">2. Dados Recolhidos</div>
          <p className="pv-text">
            Recolhemos os seguintes dados pessoais:<br /><br />
            — <strong>Dados de identificação:</strong> nome completo, endereço de email;<br />
            — <strong>Dados de saúde:</strong> tipo sanguíneo, género, idade, data da última doação;<br />
            — <strong>Dados de contacto:</strong> número de telefone, cidade;<br />
            — <strong>Documentos:</strong> atestados de doação e laudos médicos enviados voluntariamente;<br />
            — <strong>Dados técnicos:</strong> endereço IP, tipo de dispositivo, logs de acesso.
          </p>
        </div>

        <div className="pv-section">
          <div className="pv-section-title">3. Finalidade do Tratamento</div>
          <p className="pv-text">
            Os dados são utilizados exclusivamente para:<br /><br />
            — Gerir o cadastro e perfil do utilizador na plataforma;<br />
            — Enviar notificações de urgência compatíveis com o tipo sanguíneo;<br />
            — Verificar a elegibilidade para doação de sangue;<br />
            — Manter o histórico de doações do utilizador;<br />
            — Garantir a segurança e integridade da plataforma.
          </p>
        </div>

        <div className="pv-section">
          <div className="pv-section-title">4. Dados de Saúde</div>
          <p className="pv-text">
            Os dados de saúde (tipo sanguíneo, histórico de doações, atestados) são considerados <strong>dados sensíveis</strong> nos termos da LGPD. O seu tratamento é realizado com base no consentimento expresso do titular e exclusivamente para as finalidades descritas nesta política. Estes dados nunca são partilhados com terceiros para fins comerciais.
          </p>
        </div>

        <div className="pv-section">
          <div className="pv-section-title">5. Partilha de Dados</div>
          <p className="pv-text">
            O MOVEACRE não vende, aluga ou partilha dados pessoais com terceiros, exceto:<br /><br />
            — <strong>Prestadores de serviço técnico</strong> necessários ao funcionamento da plataforma (Supabase para base de dados, Railway para hospedagem, Clerk para autenticação, Resend para email) — todos sujeitos a acordos de confidencialidade;<br />
            — <strong>Autoridades competentes</strong> quando exigido por lei ou ordem judicial.
          </p>
        </div>

        <div className="pv-section">
          <div className="pv-section-title">6. Armazenamento e Segurança</div>
          <p className="pv-text">
            Os dados são armazenados em servidores seguros com encriptação em trânsito (HTTPS) e em repouso. Os ficheiros enviados (atestados e laudos) são armazenados no Supabase Storage com acesso controlado. Implementamos medidas técnicas e organizacionais para proteger os dados contra acesso não autorizado, perda ou destruição.
          </p>
        </div>

        <div className="pv-section">
          <div className="pv-section-title">7. Direitos do Titular</div>
          <p className="pv-text">
            Nos termos da LGPD, o utilizador tem direito a:<br /><br />
            — <strong>Acesso:</strong> consultar os dados que temos sobre si;<br />
            — <strong>Correção:</strong> atualizar dados incorretos ou desatualizados;<br />
            — <strong>Eliminação:</strong> solicitar a exclusão dos seus dados pessoais;<br />
            — <strong>Portabilidade:</strong> receber os seus dados em formato estruturado;<br />
            — <strong>Revogação do consentimento:</strong> retirar o consentimento a qualquer momento.<br /><br />
            Para exercer estes direitos, contacte-nos em <strong>moveacre@gmail.com</strong>.
          </p>
        </div>

        <div className="pv-section">
          <div className="pv-section-title">8. Retenção de Dados</div>
          <p className="pv-text">
            Os dados são mantidos enquanto a conta estiver ativa. Após a desativação da conta, os dados são retidos por até <strong>12 meses</strong> para fins legais e de auditoria, sendo depois eliminados permanentemente, salvo obrigação legal em contrário.
          </p>
        </div>

        <div className="pv-section">
          <div className="pv-section-title">9. Cookies</div>
          <p className="pv-text">
            A plataforma utiliza cookies técnicos essenciais para o funcionamento da autenticação e sessão do utilizador. Não utilizamos cookies de rastreamento ou publicidade.
          </p>
        </div>

        <div className="pv-section">
          <div className="pv-section-title">10. Contacto</div>
          <p className="pv-text">
            Para questões relacionadas com privacidade e proteção de dados:<br /><br />
            <strong>MOVEACRE</strong><br />
            Rio Branco, Acre, Brasil<br />
            Email: <strong>moveacre@gmail.com</strong>
          </p>
        </div>

        <hr className="pv-divider" />

        <p className="pv-text" style={{ fontSize: 12 }}>
          Esta política pode ser atualizada periodicamente. Recomendamos a consulta regular desta página.
        </p>
      </div>

      <footer className="pv-footer">
        <span className="pv-footer-copy">© 2026 MOVEACRE — Rio Branco, Acre, Brasil</span>
        <Link to="/termos" className="pv-footer-link">Termos e Condições</Link>
      </footer>
    </div>
  );
}
