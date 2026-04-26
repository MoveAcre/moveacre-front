import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ListarUrgencias() {
  const [urgencias, setUrgencias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadUrgencias() {
      try {
        const response = await fetch("https://web-production-72517.up.railway.app/urgencias?status=Ativo");
        const json = await response.json();
        setUrgencias(json.data || []);
      } catch (err) {
        console.error("ERRO_AO_CARREGAR:", err);
      } finally {
        setLoading(false);
      }
    }
    loadUrgencias();
  }, []);

  return (
    <div style={{ padding: "32px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
        <h1 style={{ color: "var(--acao-principal)" }}>URGENCIAS_ATIVAS</h1>
        <button 
          onClick={() => navigate("/login")}
          style={{ padding: "8px 16px", fontSize: "14px" }}
        >
          ENTRAR_NO_SISTEMA
        </button>
      </header>
      
      {loading ? <p className="label-tecnica">SINCRONIZANDO_DADOS...</p> : (
        <div style={{ display: "grid", gap: "16px" }}>
          {urgencias.length === 0 && <p>NENHUMA_URGENCIA_ENCONTRADA.</p>}
          {urgencias.map(u => (
            <div key={u.id} style={{ border: "1px solid var(--neutro)", padding: "16px", position: "relative" }}>
              <span style={{ 
                position: "absolute", top: "16px", right: "16px",
                backgroundColor: "var(--acao-principal)", color: "var(--cor-preto)", 
                padding: "2px 8px", fontWeight: "bold" 
              }}>
                {u.tipo_necessario}
              </span>
              <p className="label-tecnica" style={{ color: "var(--acao-principal)" }}>PACIENTE: {u.paciente_nome}</p>
              <p style={{ margin: "8px 0" }}>NÍVEL: {u.nivel_urgencia}</p>
              <p className="label-tecnica">CONTATO: {u.contato_solicitante}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
