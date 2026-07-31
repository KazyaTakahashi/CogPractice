import { createContext, useContext, useMemo, useState } from "react";
import { getUserFromStorage, login, logout, register } from "../lib/authApi";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = useState(getUserFromStorage());

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    async login(payload) {
      const session = await login(payload);
      setUser(session.user);
      return session.user;
    },
    async register(payload) {
      const session = await register(payload);
      setUser(session.user);
      return session.user;
    },
    async logout() {
      await logout();
      setUser(null);
    }
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
