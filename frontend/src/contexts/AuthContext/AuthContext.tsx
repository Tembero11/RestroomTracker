import { ReactNode, createContext, useEffect, useState } from "react";
import { IUser, getUser } from "../../requests/user";

export enum AuthStatus {
  authenticated = "authenticated",
  loggedOut = "loggedOut",
  loading = "loading",
  error = "error",
}

interface IAuthState {
  status: AuthStatus;
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
}

const initialState: IAuthState = {
  status: AuthStatus.loading,
  user: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<IAuthState>(initialState);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState(AuthStatus.loading);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => console.log(status), [status]);

  function checkAuth() {
    setStatus(AuthStatus.loading);

    getUser()
      .then((result) => {
        setUser(result);
        setStatus(AuthStatus.authenticated);
      })
      .catch(() => {
        setStatus(AuthStatus.error);
        setUser(null);
      });
  }

  function login(user: IUser) {
    setStatus(AuthStatus.authenticated);
    setUser(user);
  }

  function logout() {
    setStatus(AuthStatus.loggedOut);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ status, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
