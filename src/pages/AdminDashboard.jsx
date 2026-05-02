import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const TIPOS = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const NIVEIS_URG = ["BAIXA","MEDIA","ALTA","CRITICA"];
const NIVEIS_DOA = ["BRONZE","PRATA","OURO"];
const nivelCor  = { CRITICA:"#FF3333", ALTA:"#FF8800", MEDIA:"#C8F500", BAIXA:"#44FF88" };
const statusCor = { Pendente:"#C8F500", Aprovada:"#44FF88", Recusada:"#FF3333", Desativado:"#555" };

const s = {
  root:    { background:"#0A0A0A", color:"#F5F5F0", minHeight:"100vh", fontFamily:"Barlow,sans-serif" },
  nav:     { display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 32px", borderBottom:"1px solid #1a1a1a" },
  logo:    { color:"#C8F500", fontWeight:900, fontSize:20, textDecoration:"none", letterSpacing:"0.05em" },
  tabs:    { display:"flex", borderBottom:"1px solid #1a1a1a", padding:"0 32px", overflowX:"auto" },
  body:    { padding:"32px" },
  th:      { padding:"10px 12px", color:"#444", fontSize:10, textAlign:"left", borderBottom:"1px solid #1a1a1a", whiteSpace:"nowrap" },
  td:      { padding:"14px 12px", borderBottom:"1px solid #111", fontSize:13, verticalAlign:"top" },
  table:   { width:"100%", borderCollapse:"collapse" },
  input:   { background:"#111", border:"1px solid #222", color:"#F5F5F0", padding:"8px 12px", fontSize:12, outline:"none", fontFamily:"JetBrains Mono,monospace" },
  select:  { background:"#111", border:"1px solid #222", color:"#F5F5F0", padding:"8px 12px", fontSize:12, outline:"none", cursor:"pointer" },
  statBox: { background:"#111", border:"1px solid #1a1a1a", padding:"20px 24px", flex:1, minWidth:140 },
};

const Bdg = ({ cor, txt }) => (
  <span style={{ background:cor, color:cor==="#C8F500"||cor==="#44FF88"?"#000":"#fff", padding:"2px 8px", fontSize:10, fontWeight:"bold", display:"inline-block" }}>{txt}</span>
);
const Btn = ({ bg, c="#000", label, onClick }) => (
  <button onClick={onClick} style={{ background:bg, color:c, border:"none", padding:"6px 12px", fontSize:10, cursor:"pointer", fontWeight:"bold", marginLeft:4 }}>{label}</button>
);

function Modal({ onClose, titulo, children }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.92)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:200 }}>
      <div style={{ background:"#111", border:"1px solid #333", padding:32, minWidth:320, maxWidth:480, width:"100%" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ color:"#C8F500", fontSize:16, fontWeight:900 }}>{titulo}</h3>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#555", cursor:"pointer", fontSize:18 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function TabelaUsuarios({ rows, onDeletar, onDesativar }) {
  return (
    <table style={s.table}>
      <thead>
        <tr>{["ID","NOME","EMAIL","TIPO","SANGUE","NÍVEL","CIDADE","ONLINE","AÇÕES"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map(u => (
          <tr key={u.id}>
            <td style={s.td}><span style={{ color:"#555" }}>#{u.id}</span></td>
            <td style={s.td}><b>{u.nome_completo}</b></td>
            <td style={s.td}><span style={{ fontSize:11, color:"#888" }}>{u.email}</span></td>
            <td style={s.td}><span style={{ color:"#C8F500", fontSize:11 }}>{u.tipo}</span></td>
            <td style={s.td}><b>{u.tipo_sangue||"—"}</b></td>
            <td style={s.td}>{u.nivel||"—"}</td>
            <td style={s.td}><span style={{ fontSize:11, color:"#888" }}>{u.cidade||"—"}</span></td>
            <td style={s.td}><span style={{ color:u.online?"#44FF88":"#555", fontSize:11 }}>{u.online?"●":"○"}</span></td>
            <td style={s.td}>
              <Btn bg="#333" c="#F5F5F0" label="DESATIVAR" onClick={() => onDesativar(u.id)} />
              <Btn bg="#FF3333" c="#fff" label="DELETAR" onClick={() => onDeletar(u.id)} />
            </td>
          </tr>
        ))}
        {rows.length === 0 && (
          <tr><td colSpan={9} style={{ ...s.td, color:"#333", fontFamily:"JetBrains Mono,monospace", fontSize:11 }}>NENHUM REGISTRO</td></tr>
        )}
      </tbody>
    </table>
  );
}

import Logo from "../components/Logo";

export default function AdminDashboard() {
  const { getToken } = useAuth();
  const [aba, setAba]               = useState("pedidos");
  const [loading, setLoading]       = useState(false);
  const [pedidos, setPedidos]       = useState([]);
  const [doadores, setDoadores]     = useState([]);
  const [receptores, setReceptores] = useState([]);
  const [usuarios, setUsuarios]     = useState([]);
  const [doacoes, setDoacoes]       = useState([]);
  const [online, setOnline]         = useState([]);
  const [stats, setStats]           = useState(null);
  const [filtros, setFiltros]       = useState({ status:"Pendente", tipo_sangue:"", nivel:"", busca:"", ordem:"nome", idade_min:"", idade_max:"", tipo:"", online:"" });
  const [modalAprovar, setModalAprovar]     = useState(null);
  const [modalNotificar, setModalNotificar] = useState(null);
  const [notifResult, setNotifResult]       = useState(null);

  const api = useCallback(async (path, opts = {}) => {
    const token = await getToken();
    const isForm = opts.body instanceof FormData;
    const res = await fetch(`${API}${path}`, {
      ...opts,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(!isForm && { "Content-Type": "application/json" }),
        ...(opts.headers || {}),
      },
    });
    return res.json();
  }, [getToken]);

  const setFiltro = (k, v) => setFiltros(f => ({ ...f, [k]: v }));

  const carregar = useCallback(async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      Object.entries(filtros).forEach(([k, v]) => v && q.set(k, v));
      if (aba === "pedidos")    { const j = await api(`/admin/pedidos?${q}`);    if (j.success) { setPedidos(j.data); setStats(j.stats); } }
      else if (aba === "doadores")   { const j = await api(`/admin/doadores?${q}`);   if (j.success) setDoadores(j.data); }
      else if (aba === "receptores") { const j = await api(`/admin/receptores?${q}`); if (j.success) setReceptores(j.data); }
      else if (aba === "usuarios")   { const j = await api(`/admin/usuarios?${q}`);   if (j.success) { setUsuarios(j.data); setStats(j.stats); } }
      else if (aba === "doacoes")    { const j = await api(`/admin/doacoes?${q}`);    if (j.success) setDoacoes(j.data); }
      else if (aba === "online")     { const j = await api("/admin/online");           if (j.success) setOnline(j.data); }
      else if (aba === "stats")      { const j = await api("/admin/stats");            if (j.success) setStats(j.data); }
    } finally { setLoading(false); }
  }, [aba, filtros, api]);

  useEffect(() => { carregar(); }, [carregar]);

  const aprovar = async (id, nivel) => {
    await api(`/admin/pedidos/${id}/aprovar`, { method: "POST", body: JSON.stringify({ nivel }) });
    setPedidos(p => p.filter(u => u.id !== id));
    setModalAprovar(null);
  };

  const recusar = async (id) => {
    const motivo = prompt("Motivo da recusa:");
    if (!motivo) return;
    await api(`/admin/pedidos/${id}/reprovar`, { method: "POST", body: JSON.stringify({ motivo }) });
    setPedidos(p => p.filter(u => u.id !== id));
  };

  const verLaudo = async (id) => {
    const j = await api(`/urgencias/${id}/laudo`);
    const url = j.success && j.url
      ? j.url.replace("http://localhost:5000", API)
      : "https://www.w3.org/WAI/WCAG21/Techniques/pdf/sample.pdf";
    window.open(url, "_blank");
  };

  const deletarUsuario = async (id) => {
    if (!window.confirm("Deletar permanentemente?")) return;
    await api(`/admin/usuarios/${id}`, { method: "DELETE" });
    [setUsuarios, setDoadores, setReceptores].forEach(fn => fn(u => u.filter(x => x.id !== id)));
  };

  const desativarUsuario = async (id) => {
    if (!window.confirm("Desativar conta?")) return;
    await api(`/admin/usuarios/${id}/desativar`, { method: "POST" });
    carregar();
  };

  const notificar = async (id, canal) => {
    setNotifResult(null);
    const j = await api(`/admin/pedidos/${id}/notificar`, { method: "POST", body: JSON.stringify({ canal }) });
    setNotifResult(j.stats || j);
  };

  const notificarRecorrencia = async () => {
    const canal = prompt("Canal (email / whatsapp / ambos):", "ambos");
    if (!canal) return;
    const j = await api("/admin/recorrencia/notificar", { method: "POST", body: JSON.stringify({ canal }) });
    alert(`Aptos: ${j.aptos} | Emails: ${j.enviados_email} | WhatsApps: ${j.enviados_whatsapp}`);
  };

  const aprovarDoacao = async (id) => {
    if (!window.confirm("Aprovar esta doação? O nível do doador será atualizado.")) return;
    const j = await api(`/admin/doacoes/${id}/aprovar`, { method: "POST" });
    if (j.success) { alert(`Doação aprovada! Novo nível: ${j.nivel}`); carregar(); }
    else alert("Erro: " + j.message);
  };

  const reprovarDoacao = async (id) => {
    if (!window.confirm("Reprovar esta doação?")) return;
    await api(`/admin/doacoes/${id}/reprovar`, { method: "POST" });
    carregar();
  };

  const Tab = ({ id, label }) => (
    <button
      onClick={() => { setAba(id); setFiltros(f => ({ ...f, status: id === "pedidos" ? "Pendente" : "" })); }}
      style={{ background:"none", border:"none", borderBottom: aba === id ? "2px solid #C8F500" : "2px solid transparent",
        color: aba === id ? "#C8F500" : "#555", padding:"14px 20px", cursor:"pointer",
        fontFamily:"JetBrains Mono,monospace", fontSize:11, whiteSpace:"nowrap" }}>
      {label}
    </button>
  );

  const StatBoxes = ({ items }) => (
    <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
      {items.map(([l, v, c = "#C8F500"]) => (
        <div key={l} style={{ ...s.statBox, borderColor: c }}>
          <div style={{ color:"#555", fontSize:10, fontFamily:"JetBrains Mono,monospace", marginBottom:6 }}>{l}</div>
          <div style={{ fontSize:32, fontWeight:900, color: c }}>{v ?? 0}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div style={s.root}>
      <nav style={s.nav}>
        <Logo suffix="// ADMIN" />
        <Link to="/" style={{ color:"#555", textDecoration:"none", fontSize:11, border:"1px solid #333", padding:"5px 14px" }}>VOLTAR</Link>
      </nav>

      <div style={s.tabs}>
        <Tab id="pedidos"    label="PEDIDOS" />
        <Tab id="doadores"   label="DOADORES" />
        <Tab id="receptores" label="RECEPTORES" />
        <Tab id="usuarios"   label="USUÁRIOS" />
        <Tab id="doacoes"    label="DOAÇÕES" />
        <Tab id="online"     label="ONLINE" />
        <Tab id="stats"      label="ESTATÍSTICAS" />
      </div>

      <div style={s.body}>
        {loading && <p style={{ color:"#555", fontFamily:"JetBrains Mono,monospace", fontSize:11 }}>CARREGANDO...</p>}

        {aba === "pedidos" && !loading && (
          <>
            <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
              <select style={s.select} value={filtros.status} onChange={e => setFiltro("status", e.target.value)}>
                <option value="">Todos</option>
                {["Pendente","Aprovada","Recusada","Desativado"].map(v => <option key={v}>{v}</option>)}
              </select>
              <select style={s.select} value={filtros.tipo_sangue} onChange={e => setFiltro("tipo_sangue", e.target.value)}>
                <option value="">Tipo sanguíneo</option>
                {TIPOS.map(t => <option key={t}>{t}</option>)}
              </select>
              <select style={s.select} value={filtros.nivel} onChange={e => setFiltro("nivel", e.target.value)}>
                <option value="">Nível</option>
                {NIVEIS_URG.map(n => <option key={n}>{n}</option>)}
              </select>
              <input style={s.input} placeholder="Buscar paciente..." value={filtros.busca} onChange={e => setFiltro("busca", e.target.value)} />
              <button style={{ background:"#333", color:"#F5F5F0", border:"none", padding:"8px 14px", fontSize:11, cursor:"pointer", fontWeight:"bold" }} onClick={notificarRecorrencia}>
                NOTIF. RECORRÊNCIA
              </button>
            </div>
            {stats && <StatBoxes items={[["TOTAL", stats.total], ["PENDENTES", stats.pendentes], ["APROVADAS", stats.aprovadas]]} />}
            <table style={s.table}>
              <thead>
                <tr>{["ID","PACIENTE / MOTIVO","SANGUE","NÍVEL","STATUS","CONTATO","DATA","AÇÕES"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {pedidos.map(u => (
                  <tr key={u.id}>
                    <td style={s.td}><span style={{ color:"#555" }}>#{u.id}</span></td>
                    <td style={s.td}><b>{u.paciente_nome}</b><div style={{ fontSize:11, color:"#555" }}>{u.motivo}</div></td>
                    <td style={s.td}><b style={{ color:"#C8F500" }}>{u.tipo_necessario}</b></td>
                    <td style={s.td}><Bdg cor={nivelCor[u.nivel_urgencia_sugerido] || "#555"} txt={u.nivel_urgencia_sugerido || "—"} /></td>
                    <td style={s.td}><Bdg cor={statusCor[u.status] || "#555"} txt={u.status} /></td>
                    <td style={s.td}><span style={{ fontSize:11, color:"#888" }}>{u.contato_solicitante || "—"}</span></td>
                    <td style={s.td}><span style={{ fontSize:11, color:"#555" }}>{u.criado_em ? new Date(u.criado_em).toLocaleDateString("pt-BR") : "—"}</span></td>
                    <td style={s.td}>
                      <Btn bg="#333" c="#F5F5F0" label="LAUDO" onClick={() => verLaudo(u.id)} />
                      {u.status === "Pendente" && <>
                        <Btn bg="#C8F500" c="#000" label="APROVAR" onClick={() => setModalAprovar(u.id)} />
                        <Btn bg="#FF3333" c="#fff" label="RECUSAR" onClick={() => recusar(u.id)} />
                      </>}
                      {u.status === "Aprovada" && (
                        <Btn bg="#4488FF" c="#fff" label="NOTIFICAR" onClick={() => { setModalNotificar(u); setNotifResult(null); }} />
                      )}
                    </td>
                  </tr>
                ))}
                {pedidos.length === 0 && <tr><td colSpan={8} style={{ ...s.td, color:"#333", fontFamily:"JetBrains Mono,monospace", fontSize:11 }}>NENHUM PEDIDO</td></tr>}
              </tbody>
            </table>
          </>
        )}

        {aba === "doadores" && !loading && (
          <>
            <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
              <select style={s.select} value={filtros.tipo_sangue} onChange={e => setFiltro("tipo_sangue", e.target.value)}>
                <option value="">Tipo sanguíneo</option>{TIPOS.map(t => <option key={t}>{t}</option>)}
              </select>
              <select style={s.select} value={filtros.nivel} onChange={e => setFiltro("nivel", e.target.value)}>
                <option value="">Nível</option>{NIVEIS_DOA.map(n => <option key={n}>{n}</option>)}
              </select>
              <select style={s.select} value={filtros.ordem} onChange={e => setFiltro("ordem", e.target.value)}>
                <option value="nome">A–Z</option>
                <option value="nivel">Por nível</option>
                <option value="ultima_doacao">Última doação</option>
              </select>
              <input style={s.input} placeholder="Buscar cidade..." value={filtros.busca} onChange={e => setFiltro("busca", e.target.value)} />
            </div>
            <TabelaUsuarios rows={doadores} onDeletar={deletarUsuario} onDesativar={desativarUsuario} />
          </>
        )}

        {aba === "receptores" && !loading && (
          <>
            <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
              <select style={s.select} value={filtros.tipo_sangue} onChange={e => setFiltro("tipo_sangue", e.target.value)}>
                <option value="">Tipo sanguíneo</option>{TIPOS.map(t => <option key={t}>{t}</option>)}
              </select>
              <input style={{ ...s.input, width:80 }} placeholder="Idade mín" type="number" value={filtros.idade_min} onChange={e => setFiltro("idade_min", e.target.value)} />
              <input style={{ ...s.input, width:80 }} placeholder="Idade máx" type="number" value={filtros.idade_max} onChange={e => setFiltro("idade_max", e.target.value)} />
              <select style={s.select} value={filtros.ordem} onChange={e => setFiltro("ordem", e.target.value)}>
                <option value="nome">A–Z</option>
                <option value="idade">Por idade</option>
              </select>
            </div>
            <TabelaUsuarios rows={receptores} onDeletar={deletarUsuario} onDesativar={desativarUsuario} />
          </>
        )}

        {aba === "usuarios" && !loading && (
          <>
            <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
              <select style={s.select} value={filtros.tipo} onChange={e => setFiltro("tipo", e.target.value)}>
                <option value="">Todos</option>
                <option value="DOADOR">Doadores</option>
                <option value="RECEPTOR">Receptores</option>
              </select>
              <select style={s.select} value={filtros.tipo_sangue} onChange={e => setFiltro("tipo_sangue", e.target.value)}>
                <option value="">Tipo sanguíneo</option>{TIPOS.map(t => <option key={t}>{t}</option>)}
              </select>
              <select style={s.select} value={filtros.online} onChange={e => setFiltro("online", e.target.value)}>
                <option value="">Status</option>
                <option value="1">Online</option>
                <option value="0">Offline</option>
              </select>
              <input style={s.input} placeholder="Buscar nome ou email..." value={filtros.busca} onChange={e => setFiltro("busca", e.target.value)} />
            </div>
            {stats && <StatBoxes items={[["TOTAL", stats.total], ["DOADORES", stats.doadores], ["RECEPTORES", stats.receptores], ["ONLINE", stats.online]]} />}
            <TabelaUsuarios rows={usuarios} onDeletar={deletarUsuario} onDesativar={desativarUsuario} />
          </>
        )}

        {aba === "doacoes" && !loading && (
          <>
            <input style={{ ...s.input, marginBottom:20 }} placeholder="Buscar nome ou email..." value={filtros.busca} onChange={e => setFiltro("busca", e.target.value)} />
            <table style={s.table}>
              <thead>
                <tr>{["ID","DOADOR","EMAIL","SANGUE","SEXO","DATA DOAÇÃO","STATUS","ATESTADO","AÇÕES"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {doacoes.map(d => (
                  <tr key={d.id}>
                    <td style={s.td}><span style={{ color:"#555" }}>#{d.id}</span></td>
                    <td style={s.td}><b>{d.nome_completo || "—"}</b></td>
                    <td style={s.td}><span style={{ fontSize:11, color:"#888" }}>{d.doador_email}</span></td>
                    <td style={s.td}><b style={{ color:"#C8F500" }}>{d.tipo_sangue || "—"}</b></td>
                    <td style={s.td}>{d.genero === "M" ? "Masculino" : d.genero === "F" ? "Feminino" : "—"}</td>
                    <td style={s.td}>{d.data_doacao || "—"}</td>
                    <td style={s.td}>
                      <Bdg
                        cor={d.status === "Aprovada" ? "#44FF88" : d.status === "Reprovada" ? "#FF3333" : "#C8F500"}
                        txt={d.status || "Pendente"}
                      />
                    </td>
                    <td style={s.td}>
                      {d.atestado_url
                        ? <Btn bg="#333" c="#F5F5F0" label="VER" onClick={() => window.open(d.atestado_url.startsWith("http") ? d.atestado_url : `${API}/uploads/${d.atestado_url}`, "_blank")} />
                        : <span style={{ color:"#333", fontSize:11 }}>—</span>}
                    </td>
                    <td style={s.td}>
                      {(!d.status || d.status === "Pendente") && <>
                        <Btn bg="#44FF88" c="#000" label="APROVAR" onClick={() => aprovarDoacao(d.id)} />
                        <Btn bg="#FF3333" c="#fff" label="REPROVAR" onClick={() => reprovarDoacao(d.id)} />
                      </>}
                    </td>
                  </tr>
                ))}
                {doacoes.length === 0 && <tr><td colSpan={9} style={{ ...s.td, color:"#333", fontFamily:"JetBrains Mono,monospace", fontSize:11 }}>NENHUMA DOAÇÃO</td></tr>}
              </tbody>
            </table>
          </>
        )}

        {aba === "online" && !loading && (
          <TabelaUsuarios rows={online} onDeletar={deletarUsuario} onDesativar={desativarUsuario} />
        )}

        {aba === "stats" && !loading && stats && (
          <div>
            <StatBoxes items={[
              ["DOADORES", stats.total_doadores],
              ["RECEPTORES", stats.total_receptores],
              ["PEDIDOS PENDENTES", stats.pedidos_pendentes],
              ["PEDIDOS APROVADOS", stats.pedidos_aprovados],
              ["DOAÇÕES DECLARADAS", stats.total_doacoes],
              ["ONLINE AGORA", stats.online],
            ]} />
            <StatBoxes items={[
              ["BRONZE", stats.niveis?.bronze, "#CD7F32"],
              ["PRATA",  stats.niveis?.prata,  "#C0C0C0"],
              ["OURO",   stats.niveis?.ouro,   "#FFD700"],
            ]} />
          </div>
        )}
      </div>

      {modalAprovar && (
        <Modal onClose={() => setModalAprovar(null)} titulo="DEFINIR NÍVEL DE URGÊNCIA">
          <div style={{ display:"grid", gap:10 }}>
            {NIVEIS_URG.map(n => (
              <button key={n} onClick={() => aprovar(modalAprovar, n)}
                style={{ background:nivelCor[n], color:"#000", border:"none", padding:14, cursor:"pointer", fontWeight:900, fontSize:14 }}>
                {n}
              </button>
            ))}
          </div>
        </Modal>
      )}

      {modalNotificar && (
        <Modal onClose={() => { setModalNotificar(null); setNotifResult(null); }} titulo="NOTIFICAR DOADORES">
          <p style={{ color:"#888", fontSize:12, marginBottom:20 }}>
            Pedido #{modalNotificar.id} — <b style={{ color:"#C8F500" }}>{modalNotificar.tipo_necessario}</b> — {modalNotificar.nivel_urgencia_sugerido}
          </p>
          {!notifResult ? (
            <div style={{ display:"grid", gap:10 }}>
              {[["VIA EMAIL","email"],["VIA WHATSAPP","whatsapp"],["EMAIL + WHATSAPP","ambos"]].map(([l, c]) => (
                <button key={c} onClick={() => notificar(modalNotificar.id, c)}
                  style={{ background:"#C8F500", color:"#000", border:"none", padding:12, cursor:"pointer", fontWeight:900 }}>
                  {l}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ fontFamily:"JetBrains Mono,monospace", fontSize:12, lineHeight:1.8 }}>
              <p style={{ color:"#C8F500", marginBottom:8, fontWeight:"bold" }}>RESULTADO DA FILTRAGEM</p>
              <p>Compatíveis: <b>{notifResult.total_compativeis}</b></p>
              <p>Elegíveis: <b>{notifResult.total_elegiveis}</b></p>
              <p>Doações esperadas: <b>{notifResult.doacoes_esperadas}</b></p>
              <p>Probabilidade média: <b>{notifResult.probabilidade_media ? (notifResult.probabilidade_media * 100).toFixed(0) + "%" : "—"}</b></p>
              <hr style={{ borderColor:"#1a1a1a", margin:"12px 0" }} />
              <p>Emails enviados: <b style={{ color:"#44FF88" }}>{notifResult.enviados_email}</b></p>
              <p>WhatsApps enviados: <b style={{ color:"#44FF88" }}>{notifResult.enviados_whatsapp}</b></p>
              {notifResult.erros > 0 && <p style={{ color:"#FF3333" }}>Erros: {notifResult.erros}</p>}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
