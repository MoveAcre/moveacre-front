import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .mu-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .mu-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 32px;
    border-bottom: 1px solid #1a1a1a;
  }

  .mu-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 0.05em;
    color: #C8F500;
    text-transform: uppercase;
    text-decoration: none;
  }

  .mu-back {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #555;
    letter-spacing: 0.05em;
    text-decoration: none;
  }

  .mu-back:hover { color: #F5F5F0; }

  .mu-body {
    flex: 1;
    padding: 48px 32px;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
  }

  .mu-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #C8F500;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  .mu-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 0.95;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 8px;
  }

  .mu-title span { color: #C8F500; }

  .mu-divider {
    width: 40px;
    height: 2px;
    background: #C8F500;
    margin-bottom: 32px;
  }

  .mu-empty {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #333;
    letter-spacing: 0.05em;
    padding: 32px 0;
    border-top: 1px solid #1a1a1a;
  }

  .mu-loading {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #555;
    letter-spacing: 0.05em;
    padding: 32px 0;
  }

  .mu-list {
    display: flex;
    flex-direction: column;
  }

  .mu-card {
    border-top: 1px solid #1a1a1a;
    padding: 20px 0;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
  }

  .mu-card:last-child {
    border-bottom: 1px solid #1a1a1a;
  }

  .mu-card-left {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  .mu-paciente {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 20px;
    text-transform: uppercase;
    color: #F5F5F0;
    letter-spacing: 0.02em;
  }

  .mu-meta {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #555;
    letter-spacing: 0.05em;
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .mu-meta span { color: #888; }

  .mu-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.05em;
    padding: 4px 10px;
    text-transform: uppercase;
    white-space: nowrap;
    align-self: flex-start;
    flex-shrink: 0;
  }

  .mu-badge-pendente {
    background: transparent;
    color: #C8F500;
    border: 1px solid #C8F500;
  }

  .mu-badge-aprovado {
    background: #C8F500;
    color: #0A0A0A;
  }

  .mu-badge-recusado {
    background: transparent;
    color: #ff3333;
    border: 1px solid #ff3333;
  }

  .mu-badge-default {
    background: transparent;
    color: #555;
    border: 1px solid #2a2a2a;
  }

  .mu-new-btn {
    background: #C8F500;
    color: #0A0A0A;
    border: none;
    padding: 14px 32px;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 16px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    border-radius: 0;
    text-decoration: none;
    display: inline-block;
    margin-top: 32px;
  }

  .mu-new-btn:hover { background: #d4ff00; }

  .mu-footer {
    padding: 16px 32px;
    border-top: 1px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .mu-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }
`;

const statusConfig = (status) => {
  const s = (status || "").toLowerCase();
  if (s === "aprovada" || s === "aprovado" || s === "ativo") return { label: status, cls: "mu-badge-aprovado" };
  if (s === "recusada" || s === "recusado" || s === "rejeitado") return { label: status, cls: "mu-badge-recusado" };
  if (s === "pendente" || s === "aguardando") return { label: status, cls: "mu-badge-pendente" };
  return { label: status || "—", cls: "mu-badge-default" };
};

export default function MinhasUrgencias() {
  const [urgencias, setUrgencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const carregar = async () => {
      try {
        const token = await getToken();
        const res = await fetch(`${API}/urgencias/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setUrgencias(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    carregar();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="mu-root">
        <nav className="mu-nav">
          <Link to="/" className="mu-logo">MOVEACRE</Link>
          <Link to="/" className="mu-back">← VOLTAR</Link>
        </nav>

        <div className="mu-body">
          <div className="mu-tag">// HISTÓRICO_DE_PEDIDOS</div>
          <h1 className="mu-title">
            MEUS<br />
            <span>PEDIDOS</span>
          </h1>
          <div className="mu-divider" />

          {loading ? (
            <div className="mu-loading">CARREGANDO...</div>
          ) : urgencias.length === 0 ? (
            <div className="mu-empty">NENHUM_PEDIDO_ENCONTRADO</div>
          ) : (
            <div className="mu-list">
              {urgencias.map((u) => {
                const { label, cls } = statusConfig(u.status);
                return (
                  <div key={u.id} className="mu-card">
                    <div className="mu-card-left">
                      <div className="mu-paciente">{u.paciente_nome}</div>
                      <div className="mu-meta">
                        {u.tipo_necessario && <span>TIPO: <span>{u.tipo_necessario}</span></span>}
                        {u.contato_solicitante && <span>CONTATO: <span>{u.contato_solicitante}</span></span>}
                        {u.criado_em && (
                          <span>
                            DATA: <span>{new Date(u.criado_em).toLocaleDateString("pt-BR")}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
                      <span className={`mu-badge ${cls}`}>{label}</span>
                      {u.status === "Pendente" && (
                        <button onClick={() => navigate(`/editar-pedido/${u.id}`)}
                          style={{ background:"transparent", color:"#C8F500", border:"1px solid #C8F500", padding:"4px 10px", fontFamily:"JetBrains Mono,monospace", fontSize:10, cursor:"pointer", textTransform:"uppercase" }}>
                          EDITAR
                        </button>
                      )}
                    </div>
                  </div>                );
              })}
            </div>
          )}

          <Link to="/criar-urgencia" className="mu-new-btn">
            + NOVO PEDIDO
          </Link>
        </div>

        <footer className="mu-footer">
          <span className="mu-footer-copy">
            © 2024 MOVEACRE_ANALYTICS // SEGURANÇA_DE_DADOS_SEC_01
          </span>
          <span className="mu-footer-copy" style={{ color: "#C8F500" }}>
            V.1.0.0-CINÉTICO
          </span>
        </footer>
      </div>
    </>
  );
}
