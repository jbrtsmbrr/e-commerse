import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthProps {
  children: ReactNode
}

type User = {
  username: string
  password: string
}

type AuthContextType = {
  user: User | null
  login: (username: string, password: string) => Promise<any>
}

const AuthContext = createContext({} as AuthContextType);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error(`Cannot 'useUseAuthContext' outside 'AuthProvider'`);

  return context;
}

const AuthProvider: React.FC<IAuthProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check from local storage...
    // else...
    if (localStorage.getItem("auth")) return JSON.parse(localStorage.getItem("auth") as string)
    return null
  });

  const login = (username: string, password: string) => {

    return new Promise((resolve, _) => {
      setTimeout(() => {
        setUser({ username, password });
        localStorage.setItem("auth", JSON.stringify({ username, password }))
        resolve(true);
      }, 2000)
    })
  }

  return <AuthContext.Provider value={{ user, login }}>
    {children}
  </AuthContext.Provider>
}

export default AuthProvider;