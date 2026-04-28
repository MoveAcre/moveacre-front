import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const nivelCor = { OURO:"#FFD700", PRATA:"#C0C0C0", BRONZE:"#CD7F32" };

export default function HistoricoDoador() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [doacoes, setDoacoes] = useState([]);
  const [perfil, setPerfil]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      const email = user?.primaryEmailAddress?.emailAddress;
      if (!email) return;
      const token = await getToken();
      const headers = { Authorization: `Bearer ${token}` };

      const [rPerfil, rDoacoes] = await Promise.all([
        fetch(`${API}/doadores/me?email=${email}`, { headers }),
        fetch(`${API}/doadores/historico-doacoes?email=${email}`, { headers }),
      ]);
      const jPerfil  = await rPerfil.json();
      const jDoacoes = await rDoacoes.json();

      if (jPerfil.success)  setPerfil(jPerfil.data);
      if (jDoacoes.success) setDoacoes(jDoacoes.data);
      setLoading(false);
    };
    if (user) carregar();
  }, [user, getToken]);

  const nivel = perfil?.nivel || "BRONZE";
  const cor   = nivelCor[nivel] || "#CD7F32";

  return (
    <div style={{ background:"#0A0A0A", color:"#F5F5F0", minHeight:"100vh", fontFamily:"Barlow,sans-serif", display:"flex", flexDirection:"column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap');`}</style>

      <nav style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 32px", borderBottom:"1px solid #1a1a1a" }}>
        <Link to="/" style={{ fontFamily:"Barlow Condensed,sans-serif", fontWeight:900, fontSize:22, color:"#C8F500", textDecoration:"none", textTransform:"uppercase" }}>MOVEACRE</Link>
        <Link to="/perfil" style={{ fontFamily:"JetBrains Mono,monospace", fontSize:11, color:"#555", textDecoration:"none" }}>← VOLTAR</Link>
      </nav>

      <div style={{ flex:1, padding:"48px 32px", maxWidth:680, width:"100%", margin:"0 auto" }}>
        <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, color:"#C8F500", letterSpacing:"0.05em", marginBottom:12 }}>// HISTÓRICO_DO_DOADOR</div>
        <h1 style={{ fontFamily:"Barlow Condensed,sans-serif", fontWeight:900, fontSize:40, textTransform:"uppercase", lineHeight:0.95, marginBottom:8 }}>
          MINHAS <span style={{ color:"#C8F500" }}>DOAÇÕES</span>
        </h1>
        <div style={{ width:40, height:2, background:"#C8F500", marginBottom:32 }} />

        {loading ? <p style={{ color:"#555", fontFamily:"JetBrains Mono,monospace", fontSize:11 }}>CARREGANDO...</p> : (<>

          {/* Card de nível */}
          <div style={{ background:"#111", border:`1px solid ${cor}`, padding:24, marginBottom:32, display:"flex", alignItems:"center", gap:24 }}>
            <div style={{ fontSize:48, fontWeight:900, color:cor, fontFamily:"Barlow Condensed,sans-serif" }}>{nivel}</div>
            <div>
              <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, color:"#555", marginBottom:4 }}>NÍVEL DO DOADOR</div>
              <div style={{ fontSize:13, color:"#888" }}>
                {doacoes.length} doação{doacoes.length!==1?"ões":""} declarada{doacoes.length!==1?"s":""}
              </div>
              <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, color:"#555", marginTop:8 }}>
                {nivel==="BRONZE" && `Faltam ${3-doacoes.length>0?3-doacoes.length:0} para PRATA`}
                {nivel==="PRATA"  && `Faltam ${6-doacoes.length>0?6-doacoes.length:0} para OURO`}
                {nivel==="OURO"   && "Nível máximo atingido!"}
              </div>
            </div>
          </div>

          {/* Barra de progresso */}
          <div style={{ marginBottom:32 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"JetBrains Mono,monospace", fontSize:10, color:"#555", marginBottom:8 }}>
              <span>BRONZE</span><span>PRATA (3)</span><span>OURO (6)</span>
            </div>
            <div style={{ background:"#1a1a1a", height:6, position:"relative" }}>
              <div style={{ background:cor, height:"100%", width:`${Math.min((doacoes.length/6)*100,100)}%`, transition:"width 0.5s" }} />
            </div>
          </div>

          {/* Lista de doações */}
          <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, color:"#C8F500", letterSpacing:"0.05em", marginBottom:16 }}>REGISTRO DE DOAÇÕES</div>
          {doacoes.length === 0 ? (
            <p style={{ color:"#333", fontFamily:"JetBrains Mono,monospace", fontSize:11, padding:"24px 0", borderTop:"1px solid #1a1a1a" }}>NENHUMA DOAÇÃO DECLARADA</p>
          ) : (
            <div>
              {doacoes.map((d, i) => (
                <div key={d.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"16px 0", borderTop:"1px solid #1a1a1a" }}>
                  <div>
                    <div style={{ fontFamily:"Barlow Condensed,sans-serif", fontWeight:700, fontSize:18, textTransform:"uppercase" }}>
                      Doação #{doacoes.length - i}
                    </div>
                    <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:10, color:"#555", marginTop:4 }}>
                      DATA: {d.data_doacao || "—"} &nbsp;|&nbsp; REGISTRADO: {d.criado_em ? new Date(d.criado_em).toLocaleDateString("pt-BR") : "—"}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                    {d.atestado_url && (
                      <button onClick={() => window.open(`${API}/uploads/${d.atestado_url}`, "_blank")}
                        style={{ background:"transparent", color:"#C8F500", border:"1px solid #C8F500", padding:"6px 12px", fontFamily:"JetBrains Mono,monospace", fontSize:10, cursor:"pointer" }}>
                        VER ATESTADO
                      </button>
                    )}
                    <span style={{ color:"#44FF88", fontSize:18 }}>✓</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>)}
      </div>
    </div>
  );
}
