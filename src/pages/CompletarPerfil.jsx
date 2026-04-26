import { useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cp-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .cp-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 32px;
    border-bottom: 1px solid #1a1a1a;
  }

  .cp-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 0.05em;
    color: #C8F500;
    text-transform: uppercase;
    text-decoration: none;
  }

  .cp-back {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #555;
    letter-spacing: 0.05em;
    text-decoration: none;
  }

  .cp-back:hover { color: #F5F5F0; }

  .cp-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 32px;
  }

  .cp-card {
    width: 100%;
    max-width: 480px;
  }

  .cp-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #C8F500;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  .cp-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 0.95;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 8px;
  }

  .cp-title span { color: #C8F500; }

  .cp-sub {
    font-family: 'Barlow', sans-serif;
    font-size: 13px;
    color: #555;
    line-height: 1.5;
    margin-bottom: 8px;
  }

  .cp-divider {
    width: 40px;
    height: 2px;
    background: #C8F500;
    margin-bottom: 32px;
  }

  .cp-form {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .cp-field {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #1a1a1a;
    padding: 16px 0;
  }

  .cp-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #555;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }

  .cp-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid #2a2a2a;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    padding: 8px 0;
    outline: none;
    width: 100%;
  }

  .cp-input:focus { border-bottom-color: #C8F500; }
  .cp-input::placeholder { color: #333; }

  .cp-select {
    background: #0A0A0A;
    border: none;
    border-bottom: 1px solid #2a2a2a;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    padding: 8px 0;
    outline: none;
    width: 100%;
    cursor: pointer;
    appearance: none;
    -webkit-appearance: none;
  }

  .cp-select:focus { border-bottom-color: #C8F500; }

  .cp-select option {
    background: #111;
    color: #F5F5F0;
  }

  .cp-submit {
    background: #C8F500;
    color: #0A0A0A;
    border: none;
    padding: 16px 32px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 18px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 0;
    width: 100%;
    margin-top: 32px;
  }

  .cp-submit:hover { background: #d4ff00; }
  .cp-submit:active { background: #b8e000; }
  .cp-submit:disabled {
    background: #2a2a2a;
    color: #555;
    cursor: not-allowed;
  }

  .cp-footer {
    padding: 16px 32px;
    border-top: 1px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cp-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }
`;

export default function CompletarPerfil() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const dados = {
      tipo_sangue: e.target.tipo_sangue.value,
      genero: e.target.genero.value,
      telefone: e.target.telefone.value,
      nome_completo: user.fullName,
      email: user.primaryEmailAddress.emailAddress,
    };

    try {
      const token = await getToken();

      await fetch("https://web-production-72517.up.railway.app/doadores/sync", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ nome_completo: dados.nome_completo, email: dados.email }),
      });

      const res = await fetch("https://web-production-72517.up.railway.app/doadores/me", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (res.ok) {
        alert("Perfil pronto! Agora você pode solicitar ajuda.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cp-root">
        <nav className="cp-nav">
          <Link to="/" className="cp-logo">MOVEACRE</Link>
          <Link to="/" className="cp-back">← VOLTAR</Link>
        </nav>

        <div className="cp-body">
          <div className="cp-card">
            <div className="cp-tag">// CONFIGURAÇÃO_INICIAL</div>
            <h1 className="cp-title">
              COMPLETE<br />
              SEU <span>PERFIL</span>
            </h1>
            <p className="cp-sub">Precisamos disso para validar suas solicitações.</p>
            <div className="cp-divider" />

            <form className="cp-form" onSubmit={handleSubmit}>
              <div className="cp-field">
                <label className="cp-label">TIPO_SANGUÍNEO</label>
                <select className="cp-select" name="tipo_sangue" required>
                  <option value="">Selecione</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="cp-field">
                <label className="cp-label">GÊNERO</label>
                <select className="cp-select" name="genero" required>
                  <option value="">Selecione</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>

              <div className="cp-field">
                <label className="cp-label">TELEFONE</label>
                <input
                  className="cp-input"
                  name="telefone"
                  placeholder="(xx) xxxxx-xxxx"
                  required
                />
              </div>

              <button type="submit" className="cp-submit" disabled={loading}>
                {loading ? "SALVANDO..." : "FINALIZAR CADASTRO"}
              </button>
            </form>
          </div>
        </div>

        <footer className="cp-footer">
          <span className="cp-footer-copy">
            © 2024 MOVEACRE_ANALYTICS // SEGURANÇA_DE_DADOS_SEC_01
          </span>
          <span className="cp-footer-copy" style={{ color: "#C8F500" }}>
            V.1.0.0-CINÉTICO
          </span>
        </footer>
      </div>
    </>
  );
}