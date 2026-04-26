import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cu-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .cu-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 32px;
    border-bottom: 1px solid #1a1a1a;
  }

  .cu-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 0.05em;
    color: #C8F500;
    text-transform: uppercase;
    text-decoration: none;
  }

  .cu-back {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #555;
    letter-spacing: 0.05em;
    text-decoration: none;
    cursor: pointer;
  }

  .cu-back:hover { color: #F5F5F0; }

  .cu-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 48px 32px;
  }

  .cu-card {
    width: 100%;
    max-width: 480px;
  }

  .cu-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #C8F500;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  .cu-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 0.95;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 8px;
  }

  .cu-title span { color: #C8F500; }

  .cu-divider {
    width: 40px;
    height: 2px;
    background: #C8F500;
    margin-bottom: 32px;
  }

  .cu-form {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .cu-field {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #1a1a1a;
    padding: 16px 0;
  }

  .cu-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #555;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }

  .cu-input {
    background: transparent;
    border: none;
    border-bottom: 1px solid #2a2a2a;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    font-size: 15px;
    padding: 8px 0;
    outline: none;
    width: 100%;
    transition: border-color 0s;
  }

  .cu-input:focus { border-bottom-color: #C8F500; }
  .cu-input::placeholder { color: #333; }

  .cu-select {
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

  .cu-select:focus { border-bottom-color: #C8F500; }

  .cu-select option {
    background: #111;
    color: #F5F5F0;
  }

  .cu-file-label {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }

  .cu-file-btn {
    background: transparent;
    color: #C8F500;
    border: 1px solid #C8F500;
    padding: 8px 16px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 0;
    white-space: nowrap;
  }

  .cu-file-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cu-file-name.selected { color: #C8F500; }

  .cu-submit {
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

  .cu-submit:hover { background: #d4ff00; }
  .cu-submit:active { background: #b8e000; }
  .cu-submit:disabled {
    background: #2a2a2a;
    color: #555;
    cursor: not-allowed;
  }

  .cu-footer {
    padding: 16px 32px;
    border-top: 1px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cu-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }
`;

export default function CriarUrgencia() {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    try {
      const token = await getToken();
      const res = await fetch("https://web-production-72517.up.railway.app/urgencias", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (res.ok) {
        alert("Pedido enviado! Aguarde aprovação.");
        navigate("/minhas-urgencias");
      } else {
        const body = await res.json();
        console.error("ERRO API:", res.status, body);
        alert(`Erro ${res.status}: ${body.message}`);
      }
    } catch (err) {
      console.error("CATCH:", err);
      alert("Erro de rede: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cu-root">
        <nav className="cu-nav">
          <Link to="/" className="cu-logo">MOVEACRE</Link>
          <Link to="/" className="cu-back">← VOLTAR</Link>
        </nav>

        <div className="cu-body">
          <div className="cu-card">
            <div className="cu-tag">// NOVA_SOLICITAÇÃO</div>
            <h1 className="cu-title">
              URGÊNCIA<br />
              DE <span>SANGUE</span>
            </h1>
            <div className="cu-divider" />

            <form className="cu-form" onSubmit={handleSubmit}>
              <div className="cu-field">
                <label className="cu-label">NOME_DO_PACIENTE</label>
                <input
                  className="cu-input"
                  name="paciente_nome"
                  placeholder="Nome completo"
                  required
                />
              </div>

              <div className="cu-field">
                <label className="cu-label">TIPO_SANGUÍNEO_NECESSÁRIO</label>
                <select className="cu-select" name="tipo_necessario" required>
                  <option value="">Selecione</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="cu-field">
                <label className="cu-label">CONTATO_WHATSAPP</label>
                <input
                  className="cu-input"
                  name="contato_solicitante"
                  placeholder="(xx) xxxxx-xxxx"
                  required
                />
              </div>

              <div className="cu-field">
                <label className="cu-label">LAUDO_MÉDICO</label>
                <label className="cu-file-label">
                  <span className="cu-file-btn">ANEXAR ARQUIVO</span>
                  <span className={`cu-file-name ${fileName ? "selected" : ""}`}>
                    {fileName || "PDF, JPG ou PNG"}
                  </span>
                  <input
                    type="file"
                    name="laudo"
                    accept=".pdf,.jpg,.jpeg,.png"
                    required
                    style={{ display: "none" }}
                    onChange={(e) =>
                      setFileName(e.target.files[0]?.name || null)
                    }
                  />
                </label>
              </div>

              <button type="submit" className="cu-submit" disabled={loading}>
                {loading ? "ENVIANDO..." : "ENVIAR SOLICITAÇÃO"}
              </button>
            </form>
          </div>
        </div>

        <footer className="cu-footer">
          <span className="cu-footer-copy">
            © 2024 MOVEACRE_ANALYTICS // SEGURANÇA_DE_DADOS_SEC_01
          </span>
          <span className="cu-footer-copy" style={{ color: "#C8F500" }}>
            V.1.0.0-CINÉTICO
          </span>
        </footer>
      </div>
    </>
  );
}