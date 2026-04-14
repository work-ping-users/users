import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import httpClient from '@/helpers/httpClient';

const AuthContext = createContext(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  // ── FOR DEVELOPMENT: Forced Auth Enabled ──────────────────────────────────
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authLoading, setAuthLoading]         = useState(false);
  const [user, setUser]                       = useState({
    _id: "dev-id",
    name: "Developer Mode",
    email: "dev@workping.live",
    role: "admin",
    profileImage: null
  });

  // ── verifySession disabled during dev stage ────────────────────────────────
  const verifySession = useCallback(async () => {
    // try {
    //   const res  = await httpClient.get('/verify-cookie', { silent: true });
    //   const data = res.data?.data ?? {};
    //   setUser(data);
    //   setIsAuthenticated(true);
    // } catch {
    //   setUser(null);
    //   setIsAuthenticated(false);
    // } finally {
    //   setTimeout(() => setAuthLoading(false), 1000); 
    // }
  }, []);

  useEffect(() => {
    // verifySession(); // disabled for dev
  }, [verifySession]);

  // ── Called from LoginForm after POST /login succeeds ─────────────────────
  const login  = useCallback(() => verifySession(), [verifySession]);

  // ── Called from sign-up flow after account creation ──────────────────────
  const signUp = useCallback(() => verifySession(), [verifySession]);

  // ── Clears local state (backend cookie managed server-side) ──────────────
  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authLoading,
        user,
        userId: user?._id   ?? null,
        role:   user?.role  ?? null,
        login,
        signUp,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}