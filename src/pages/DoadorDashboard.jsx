// src/pages/DoadorDashboard.jsx
import { UserButton } from "@clerk/clerk-react";
export default function DoadorDashboard() {
  return (
    <div style={{ padding: "32px" }}>
      <header style={{ borderBottom: "2px solid #C8F500", paddingBottom: "16px", marginBottom: "32px", display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "#C8F500" }}>PAINEL_DOADOR</h1>
        <UserButton afterSignOutUrl="/" />
      </header>
      <div style={{ border: "1px solid #F5F5F0", padding: "24px" }}>
        <p className="label-tecnica">STATUS: DOADOR_ATIVO</p>
        <h2 style={{ margin: "16px 0" }}>BEM_VINDO_VOLUNTARIO</h2>
        <a href="/criar-urgencia" style={{ background: "#C8F500", color: "#0A0A0A", padding: "12px 24px", textDecoration: "none", fontWeight: "bold", display: "inline-block" }}>CRIAR_PEDIDO_URGENCIA</a>
      </div>
    </div>
  );
}
