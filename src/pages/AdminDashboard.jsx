import { useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { getToken } = useAuth();
  const [urgencias, setUrgencias] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUrgencias = async () => {
    try {
      const token = await getToken();
      const res = await fetch("https://web-production-72517.up.railway.app/urgencias?status=Pendente", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const json = await res.json();
      if (json.success) setUrgencias(json.data);
    } catch (err) {
      console.error("Erro:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAprovar = async (id) => {
    if(!confirm("Deseja aprovar esta urgência?")) return;
    try {
      const token = await getToken();
      const res = await fetch(`https://web-production-72517.up.railway.app/urgencias/${id}/aprovar`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setUrgencias(urgencias.filter(u => u.id !== id));
      }
    } catch (err) {
      alert("Erro ao aprovar.");
    }
  };

  useEffect(() => { fetchUrgencias(); }, [getToken]);

  return (
    <div style={{ background: '#0A0A0A', color: '#F5F5F0', minHeight: '100vh', padding: '40px', fontFamily: 'Barlow, sans-serif' }}>
      <h1 style={{ color: '#C8F500', textTransform: 'uppercase' }}>Painel Admin // MOVEACRE</h1>
      <Link to="/" style={{ color: '#555', textDecoration: 'none', fontSize: '12px' }}>← VOLTAR</Link>
      {loading ? <p>Carregando...</p> : (
        <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #1a1a1a', color: '#555', fontSize: '10px' }}>
              <th>ID</th><th>PACIENTE</th><th>TIPO</th><th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {urgencias.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                <td style={{ padding: '15px 0' }}>#{u.id}</td>
                <td>{u.paciente_nome}</td>
                <td>{u.tipo_necessario}</td>
                <td>
                  <button onClick={() => handleAprovar(u.id)} style={{ background: 'transparent', border: '1px solid #C8F500', color: '#C8F500', padding: '5px 10px', cursor: 'pointer', fontSize: '10px' }}>APROVAR</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}