import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const ROTAS_LIVRES = ["/completar-perfil", "/"];

export default function SyncWrapper({ children }) {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const checkStatus = async () => {
      try {
        const token = await getToken();

        // Sync primeiro — garante que o usuário existe no banco
        await fetch("https://web-production-72517.up.railway.app/doadores/sync", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome_completo: user.fullName,
            email: user.primaryEmailAddress.emailAddress,
          }),
        });

        const res = await fetch("https://web-production-72517.up.railway.app/doadores/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        const json = await res.json();
        const data = json.data ?? json;
        console.log("[MOVEACRE] SyncWrapper data:", JSON.stringify(data));

        const perfilCompleto =
          data &&
          data.tipo_sangue && data.tipo_sangue.trim() !== "" &&
          data.genero && data.genero.trim() !== "" &&
          data.telefone && data.telefone.trim() !== "";

        console.log("[MOVEACRE] perfilCompleto:", perfilCompleto);

        const rotaAtual = window.location.pathname;
        const rotaLivre = ROTAS_LIVRES.includes(rotaAtual);

        if (!perfilCompleto && !rotaLivre) {
          navigate("/completar-perfil");
        } else {
          setReady(true);
        }
      } catch (err) {
        console.error("[MOVEACRE] Erro ao verificar perfil:", err);
        setReady(true);
      }
    };

    checkStatus();
  }, [isLoaded, user]);

  if (!ready) return null;

  return children;
}