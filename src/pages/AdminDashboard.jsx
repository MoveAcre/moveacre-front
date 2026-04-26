import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { apiFetch } from "../services/api";

export default function AdminDashboard() {
  const { getToken } = useAuth();
  const [urgencias, setUrgencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aba, setAba] = useState("Pendente");

  const [filtroAtual, setFiltroAtual] = useState("Pendente");
  const carregarUrgencias = async (status) => {
    setFiltroAtual(status);
    try {
      const res = await fetch(`https://web-production-72517.up.railway.app/urgencias?status=${status}`);
      const data = await res.json();
      if (data.success) setUrgencias(data.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { carregarUrgencias("Pendente"); }, []);

  const verLaudo = async (id) => {
    try {
      const res = await apiFetch(`/urgencias/${id}/laudo`, {}, getToken);
      window.open(res.data.url, '_blank');
    } catch (err) {
      alert("FALHA_AO_ACESSAR_LAUDO: " + err.message);
    }
  };

  const aprovar = async (id) => {
    try {
      const res = await fetch(`https://web-production-72517.up.railway.app/urgencias/${id}/aprovar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      if (res.ok) { 
        alert("SUCESSO: Urgência aprovada!"); 
        window.location.reload(); 
      } else { 
        alert("Erro no servidor. Verifique o log do Railway."); 
      }
    } catch (err) { alert("Erro de conexão."); }
  };

  const reprovar = async (id) => {
    const motivo = prompt("MOTIVO_DA_REPROVACAO:");
    if (!motivo) return;

    try {
      await apiFetch(`/urgencias/${id}/reprovar`, {
        method: "POST",
        body: JSON.stringify({ motivo })
      }, getToken);
      alert("SOLICITACAO_REPROVADA");
      carregarUrgencias("Pendente");
    } catch (err) {
      alert("FALHA_AO_REPROVAR");
    }
  };

  return (
    <div style={{ padding: "32px" }}>
      <h1 style={{ color: "var(--acao-principal)", marginBottom: "24px" }}>PAINEL_ADMIN_OPERACIONAL</h1>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "32px" }}>
        <button onClick={() => carregarUrgencias("Pendente")} style={{ background: aba === "Pendente" ? "var(--acao-principal)" : "transparent", color: aba === "Pendente" ? "black" : "white" }}>
          FILTRAR_PENDENTES
        </button>
        <button onClick={() => carregarUrgencias("Ativo")} style={{ background: aba === "Ativo" ? "var(--acao-principal)" : "transparent", color: aba === "Ativo" ? "black" : "white" }}>
          VER_ATIVAS
        </button>
      </div>

      {loading ? <p className="label-tecnica">PROCESSANDO_REQUISICAO...</p> : (
        <div style={{ display: "grid", gap: "16px" }}>
          {urgencias.map(u => (
            <div key={u.id} style={{ border: "1px solid var(--neutro)", padding: "24px", background: "#050505" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                <h3 style={{ color: "var(--acao-principal)" }}>PACIENTE: {u.paciente_nome}</h3>
                <span className="label-tecnica">STATUS: {u.status}</span>
              </div>
              
              <p style={{ marginBottom: "20px", fontSize: "14px", color: "#AAA" }}>TIPO_NECESSARIO: {u.tipo_necessario}</p>

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <button onClick={() => verLaudo(u.id)} style={{ background: "transparent", border: "1px solid white", color: "white" }}>
                  VISUALIZAR_LAUDO
                </button>
                
                {u.status === "Pendente" && (
                  <>
                    <button onClick={() => aprovar(u.id)} style={{ background: "var(--acao-principal)", color: "black" }}>
                      APROVAR
                    </button>
                    <button onClick={() => reprovar(u.id)} style={{ background: "#FF3B30", color: "white", border: "none" }}>
                      REPROVAR
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}





