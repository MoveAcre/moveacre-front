import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Logo from "../components/Logo";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .pf-root {
    background: #0A0A0A;
    color: #F5F5F0;
    font-family: 'Barlow', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .pf-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 32px;
    border-bottom: 1px solid #1a1a1a;
  }

  .pf-logo {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 22px;
    letter-spacing: 0.05em;
    color: #C8F500;
    text-transform: uppercase;
    text-decoration: none;
  }

  .pf-back {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #555;
    letter-spacing: 0.05em;
    text-decoration: none;
  }

  .pf-back:hover { color: #F5F5F0; }

  .pf-body {
    flex: 1;
    padding: 48px 32px;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
  }

  .pf-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #C8F500;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  .pf-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 40px;
    line-height: 0.95;
    text-transform: uppercase;
    color: #F5F5F0;
    margin-bottom: 8px;
  }

  .pf-title span { color: #C8F500; }

  .pf-divider {
    width: 40px;
    height: 2px;
    background: #C8F500;
    margin-bottom: 32px;
  }

  .pf-section {
    background: #111;
    border: 1px solid #222;
    padding: 24px;
    margin-bottom: 24px;
  }

  .pf-subtitle {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px;
    color: #C8F500;
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  .pf-row {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid #1a1a1a;
  }
  
  .pf-row:last-child { border-bottom: none; }

  .pf-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #555;
  }

  .pf-value {
    font-weight: bold;
    color: #F5F5F0;
  }

  .pf-btn {
    background: transparent;
    color: #F5F5F0;
    border: 1px solid #333;
    padding: 12px 24px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    cursor: pointer;
    text-transform: uppercase;
    margin-right: 12px;
    margin-top: 16px;
  }
  
  .pf-btn:hover { border-color: #C8F500; color: #C8F500; }

  .pf-btn-danger {
    border-color: #ff3333;
    color: #ff3333;
  }
  .pf-btn-danger:hover { background: #ff3333; color: #0A0A0A; }

  .pf-footer {
    padding: 16px 32px;
    border-top: 1px solid #1a1a1a;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pf-footer-copy {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #333;
    letter-spacing: 0.05em;
  }

  .pf-modal {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .pf-modal-content {
    background: #111;
    border: 1px solid #333;
    padding: 32px;
    width: 100%;
    max-width: 400px;
  }

  .pf-modal-input {
    width: 100%;
    padding: 10px;
    background: transparent;
    border: 1px solid #333;
    color: white;
    margin-bottom: 20px;
    margin-top: 10px;
  }
`;

export default function Perfil() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const [dataDoacao, setDataDoacao] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Abre modal automaticamente se vier de CriarUrgencia
  useEffect(() => {
    if (location.state?.abrirDeclarar) {
      setShowModal(true);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = await getToken();
        const email = user?.primaryEmailAddress?.emailAddress;
        if (!email) return;

        const res = await fetch(`${API}/doadores/me?email=${email}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        
        if (json.success && json.data && Object.keys(json.data).length > 0) {
            setPerfil(json.data);
        } else {
            setPerfil({
                tipo_sangue: 'Nao cadastrado',
                genero: 'Nao cadastrado',
                telefone: 'Nao cadastrado',
                idade: 'Nao cadastrado',
                cidade: 'Nao cadastrado',
                ultima_doacao: 'Nao cadastrado',
                tipo: 'Nao cadastrado',
                nivel: 'Nao cadastrado'
            });
        }
        setLoading(false);
      } catch (err) { console.error(err); setLoading(false); }
    };
    if (user) {
        fetchPerfil();
    }
  }, [getToken, user]);

  const handleDelete = async () => {
    if (window.confirm("Ação irreversível! Deseja mesmo desativar sua conta?")) {
      try {
        const token = await getToken();
        const email = user?.primaryEmailAddress?.emailAddress;
        await fetch(`${API}/doadores/desativar`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
      } catch (err) { console.error(err); }
      navigate("/");
    }
  };

  const handleEnviarDoacao = async (e) => {
    e.preventDefault();
    if (!arquivo) { alert("Selecione o atestado."); return; }
    if (!dataDoacao) { alert("Informe a data da doação."); return; }

    setEnviando(true);
    try {
      const token = await getToken();
      const email = user?.primaryEmailAddress?.emailAddress;

      const formData = new FormData();
      formData.append("email", email);
      formData.append("data_doacao", dataDoacao);
      formData.append("atestado", arquivo);

      const res = await fetch(`${API}/doadores/declarar-doacao`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const json = await res.json();
      if (json.success) {
        alert("Atestado enviado! Aguardando aprovação do administrador. Seu nível será atualizado após a aprovação.");
        setShowModal(false);
        setArquivo(null);
        setDataDoacao("");
      } else {
        alert("Erro: " + (json.message || "Tente novamente."));
      }
    } catch (err) {
      alert("Erro ao enviar: " + err.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="pf-root">
        <nav className="pf-nav">
          <Logo />
          <Link to="/" className="pf-back">VOLTAR</Link>
        </nav>

        <div className="pf-body">
          <div className="pf-tag">// MINHA_CONTA</div>
          <h1 className="pf-title">MEU <span>PERFIL</span></h1>
          <div className="pf-divider" />

          {loading ? <p>Carregando...</p> : (
            <>
              <div className="pf-section">
                <h2 className="pf-subtitle">DADOS DA CONTA</h2>
                <div className="pf-row">
                    <span className="pf-label">NOME</span>
                    <span className="pf-value">{user?.fullName}</span>
                </div>
                <div className="pf-row">
                    <span className="pf-label">EMAIL</span>
                    <span className="pf-value">{user?.primaryEmailAddress?.emailAddress}</span>
                </div>
                <div className="pf-row">
                    <span className="pf-label">TIPO</span>
                    <span className="pf-value" style={{ color: '#C8F500' }}>{perfil?.tipo}</span>
                </div>
                <div className="pf-row">
                    <span className="pf-label">NIVEL DOADOR</span>
                    <span className="pf-value" style={{ color: '#C8F500' }}>{perfil?.nivel || 'BRONZE'}</span>
                </div>
              </div>

              <div className="pf-section">
                <h2 className="pf-subtitle">INFORMACOES MEDICAS E CONTATO</h2>
                <div className="pf-row">
                    <span className="pf-label">TIPO SANGUINEO</span>
                    <span className="pf-value">{perfil?.tipo_sangue}</span>
                </div>
                <div className="pf-row">
                    <span className="pf-label">IDADE</span>
                    <span className="pf-value">{perfil?.idade}</span>
                </div>
                <div className="pf-row">
                    <span className="pf-label">CIDADE</span>
                    <span className="pf-value">{perfil?.cidade}</span>
                </div>
                <div className="pf-row">
                    <span className="pf-label">ULTIMA DOACAO</span>
                    <span className="pf-value">{perfil?.ultima_doacao}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <button className="pf-btn" onClick={() => navigate('/completar-perfil')}>EDITAR CONTA</button>
                <button className="pf-btn" onClick={() => navigate('/historico-doador')}>HISTÓRICO DE DOAÇÕES</button>
                <button className="pf-btn" onClick={() => setShowModal(true)}>DECLARAR DOAÇÃO</button>
                <button className="pf-btn pf-btn-danger" onClick={handleDelete}>DESATIVAR CONTA</button>
              </div>
            </>
          )}
        </div>

        <footer className="pf-footer">
          <span className="pf-footer-copy">2024 MOVEACRE_ANALYTICS</span>
        </footer>

        {showModal && (
          <div className="pf-modal">
            <div className="pf-modal-content">
              <h2 className="pf-subtitle">ENVIAR ATESTADO DE DOACAO</h2>
              <form onSubmit={handleEnviarDoacao}>
                <label className="pf-label">Data da doação</label>
                <input
                  type="date"
                  className="pf-modal-input"
                  required
                  value={dataDoacao}
                  onChange={(e) => setDataDoacao(e.target.value)}
                />
                <label className="pf-label">Anexe o PDF ou Foto do atestado</label>
                <input 
                  type="file" 
                  className="pf-modal-input" 
                  required 
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => setArquivo(e.target.files[0])}
                />
                <button type="submit" className="pf-btn" style={{ width: '100%' }} disabled={enviando}>
                  {enviando ? "ENVIANDO..." : "ENVIAR ATESTADO"}
                </button>
                <button type="button" className="pf-btn pf-btn-danger" style={{ width: '100%', marginTop: '10px' }} onClick={() => setShowModal(false)}>CANCELAR</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
