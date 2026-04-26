import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const styles = `
  .admin-root { background: #0A0A0A; color: #F5F5F0; min-height: 100vh; padding: 40px; font-family: "Barlow", sans-serif; }
  .admin-title { font-family: "Barlow Condensed", sans-serif; font-weight: 900; font-size: 32px; color: #C8F500; margin-bottom: 24px; text-transform: uppercase; }
  .admin-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
  .admin-table th { text-align: left; border-bottom: 1px solid #1a1a1a; padding: 12px; font-family: "JetBrains Mono", monospace; font-size: 10px; color: #555; }
  .admin-table td { padding: 12px; border-bottom: 1px solid #1a1a1a; font-size: 14px; }
  .btn-aprovar { color: #C8F500; border: 1px solid #C8F500; padding: 4px 8px; cursor: pointer; background: transparent; font-size: 12px; }
`;

export default function AdminDashboard() {
  const { getToken } = useAuth();
  const [urgencias, setUrgencias] = useState([]);

  useEffect(() => {
    const fetchUrgencias = async () => {
      try {
        const token = await getToken();
        const res = await fetch("https://web-production-72517.up.railway.app/urgencias?status=Pendente", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const json = await res.json();
        if (json.success) setUrgencias(json.data);
      } catch (err) {
        console.error("Erro ao carregar dashboard:", err);
      }
    };
    fetchUrgencias();
  }, [getToken]);

  return (
    <>
      <style>{styles}</style>
      <div className="admin-root">
        <h1 className="admin-title">Painel Administrativo // MOVEACRE</h1>
        <Link to="/" style={{ color: "#555", textDecoration: "none", fontSize: "12px" }}>← VOLTAR</Link>
        
        <table className="admin-table">
          <thead>
            <tr>
              <th>PACIENTE</th>
              <th>TIPO</th>
              <th>STATUS</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {urgencias.map((u) => (
              <tr key={u.id}>
                <td>{u.paciente_nome}</td>
                <td>{u.tipo_necessario}</td>
                <td style={{ color: "#C8F500" }}>{u.status}</td>
                <td>
                  <button className="btn-aprovar">ANALISAR</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}