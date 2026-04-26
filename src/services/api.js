const API_URL = "https://web-production-72517.up.railway.app";

export async function apiFetch(endpoint, options = {}, getToken) {
  const token = await getToken();
  
  if (!token) {
    console.error("ERRO: Nenhum token foi gerado pelo Clerk!");
  }

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    "Authorization": `Bearer ${token}`,
    ...options.headers,
  };

  console.log(`Chamando API: ${endpoint}`);
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Se der 401, vamos logar o motivo real
  if (response.status === 401) {
    console.error("Erro 401: O backend rejeitou o token. Verifique se o CLERK_JWKS_URL no backend está correto.");
  }

  const data = await response.json();
  if (!data.success) throw new Error(data.message || "Erro na requisição");
  return data;
}
