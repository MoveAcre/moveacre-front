import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export default function Sync() {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function validar() {
      try {
        const token = await getToken();
        const res = await fetch("https://web-production-72517.up.railway.app/auth/me", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const json = await res.json();

        // LOG PARA VOCÊ VER NO F12
        console.log("RESPOSTA_AUTH_ME:", json.data.auth);

        if (json.data.auth.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          // Se cair aqui, o backend enviou role "doador"
          if (json.data.perfil_incompleto) {
            navigate("/completar-perfil");
          } else {
            navigate("/doador/dashboard");
          }
        }
      } catch (err) {
        navigate("/login");
      }
    }
    validar();
  }, [getToken, navigate]);

  return (
    <div style={{ padding: "64px", textAlign: "center" }}>
      <p className="label-tecnica">VERIFICANDO_NIVEL_DE_ACESSO...</p>
    </div>
  );
}
