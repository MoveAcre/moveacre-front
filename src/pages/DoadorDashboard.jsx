import { useAuth, useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DoadorDashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [perfilIncompleto, setPerfilIncompleto] = useState(false);

  useEffect(() => {
    const checkPerfil = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          const res = await fetch("https://web-production-72517.up.railway.app/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
          });
          const json = await res.json();
          if (json.success && json.data.perfil_incompleto) {
            setPerfilIncompleto(true);
          }
        } catch (err) { console.error(err); }
      }
    };
    checkPerfil();
  }, [isSignedIn, getToken]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div style={{ background: '#0A0A0A', color: '#F5F5F0', minHeight: '100vh', padding: '24px', fontFamily: 'Barlow, sans-serif' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <p style={{ color: '#555', margin: 0, fontSize: '12px' }}>Olá, {user.firstName}</p>
          <h1 style={{ fontSize: '24px', color: '#C8F500', margin: 0 }}>MOVEACRE</h1>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      {perfilIncompleto && (
        <div onClick={() => navigate('/completar-perfil')} style={{ background: '#C8F500', color: '#000', padding: '15px', borderRadius: '8px', marginBottom: '24px', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center' }}>
          ⚠️ PERFIL INCOMPLETO. CLIQUE PARA FINALIZAR.
        </div>
      )}

      <div style={{ display: 'grid', gap: '16px' }}>
        
        {/* BOTÃO 1: QUERO DOAR */}
        <button onClick={() => navigate('/listar-urgencias')} style={btnStyle(true)}>
          <span style={{ fontSize: '32px' }}>🩸</span>
          <h2 style={{ color: '#C8F500', margin: '12px 0 4px 0', fontSize: '18px' }}>Quero Doar</h2>
          <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Ver quem precisa de sangue agora.</p>
        </button>

        {/* BOTÃO 2: PEDIR AJUDA */}
        <button onClick={() => navigate('/criar-urgencia')} style={btnStyle(false)}>
          <span style={{ fontSize: '32px' }}>🏥</span>
          <h2 style={{ color: '#FFF', margin: '12px 0 4px 0', fontSize: '18px' }}>Pedir Ajuda</h2>
          <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Criar um novo pedido de doação.</p>
        </button>

        {/* BOTÃO 3: MEU PAINEL (O que tinha sumido) */}
        <button onClick={() => navigate('/minhas-urgencias')} style={btnStyle(false)}>
          <span style={{ fontSize: '32px' }}>📋</span>
          <h2 style={{ color: '#FFF', margin: '12px 0 4px 0', fontSize: '18px' }}>Meu Painel</h2>
          <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Ver status dos meus pedidos feitos.</p>
        </button>

        {/* BOTÃO EXTRA: ADMIN (Só aparece se você for admin) */}
        {user?.publicMetadata?.role === "admin" && (
          <button onClick={() => navigate('/admin')} style={{ marginTop: '20px', background: 'transparent', border: '1px dashed #333', padding: '15px', color: '#555', borderRadius: '12px', cursor: 'pointer' }}>
            ⚙️ PAINEL ADMINISTRATIVO
          </button>
        )}

      </div>
    </div>
  );
}

// Estilo dos botões para ficar limpo como o Júlio pediu
const btnStyle = (primary) => ({
  background: '#1A1A1A',
  border: primary ? '2px solid #C8F500' : '1px solid #333',
  padding: '24px',
  borderRadius: '12px',
  textAlign: 'left',
  cursor: 'pointer',
  width: '100%'
});