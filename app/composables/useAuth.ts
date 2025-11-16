export const useAuth = () => {
  const token = useCookie("auth_token");
  const isLoggedIn = computed(() => !!token.value);

  function login(newToken: string) {
    token.value = newToken;
  }

  async function logout() {
    token.value = null;

    if (import.meta.client) {
      document.cookie = "auth_token=; Max-Age=0; path=/; SameSite=Lax";
      window.location.reload();
    }
  }

  return { isLoggedIn, login, logout };
};
