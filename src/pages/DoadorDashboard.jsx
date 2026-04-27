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
          // Regra técnica do documento: verifica se o perfil precisa de dados
          if (json.success && json.data.perfil_incompleto) {
            setPerfilIncompleto(true);
          }
        } catch (err) {
          console.error("Erro ao validar perfil:", err);
        }
      }
    };
    checkPerfil();
  }, [isSignedIn, getToken]);

  if (!isLoaded || !isSignedIn) return null;

  return (
    <div style={{ background: '#0A0A0A', color: '#F5F5F0', minHeight: '100vh', padding: '24px', fontFamily: 'Barlow, sans-serif' }}>

      {/* Header com UserButton mantido, mas estilizado */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #1A1A1A', paddingBottom: '20px' }}>
        <div>
          <p style={{ color: '#555', margin: 0, fontSize: '12px' }}>Bem-vindo,</p>
          <h1 style={{ fontSize: '24px', color: '#C8F500', margin: 0 }}>{user.firstName}</h1>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* Alerta de Perfil Incompleto - Regra de Negócio */}
      {perfilIncompleto && (
        <div
          onClick={() => navigate('/completar-perfil')}
          style={{ background: '#C8F500', color: '#0A0A0A', padding: '16px', borderRadius: '8px', marginBottom: '24px', fontWeight: 'bold', textAlign: 'center', cursor: 'pointer' }}
        >
          ⚠️ COMPLETE SEU CADASTRO PARA LIBERAR TODAS AS FUNÇÕES
        </div>
      )}

      {/* Grid de Ações: O que o Júlio pediu (Mais botão, ícones claros) */}
      <div style={{ display: 'grid', gap: '16px' }}>

        <button
          onClick={() => navigate('/listar-urgencias')}
          style={{ background: '#1A1A1A', border: '2px solid #C8F500', padding: '24px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '32px' }}>🩸</span>
          <h2 style={{ color: '#C8F500', margin: '12px 0 4px 0', fontSize: '18px' }}>Quero Doar</h2>
          <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Veja os pedidos de urgência ativos agora.</p>
        </button>

        <button
          onClick={() => navigate('/criar-urgencia')}
          style={{ background: '#1A1A1A', border: '1px solid #333', padding: '24px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '32px' }}>🏥</span>
          <h2 style={{ color: '#FFF', margin: '12px 0 4px 0', fontSize: '18px' }}>Pedir Ajuda</h2>
          <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Cadastre um novo pedido de doação de sangue.</p>
        </button>

        <button
          onClick={() => navigate('/minhas-urgencias')}
          style={{ background: '#1A1A1A', border: '1px solid #333', padding: '24px', borderRadius: '12px', textAlign: 'left', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '32px' }}>📋</span>
          <h2 style={{ color: '#FFF', margin: '12px 0 4px 0', fontSize: '18px' }}>Meus Pedidos</h2>
          <p style={{ color: '#666', fontSize: '12px', margin: 0 }}>Acompanhe o status das suas solicitações enviadas.</p>
        </button>

      </div>
    </div>
  );
}
