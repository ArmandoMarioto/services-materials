import { api } from "@/backend/api";
import { createContext, useCallback, useContext, useState } from "react";
interface AuthContextType {
    token: TokenState;
    login: ({ username, password }: User) => Promise<void>;
    userLogger: () => boolean;
  }
  
  interface User {
    username: string;
    password: string;
  }
  interface TokenState{
    token: string;
  }

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {

    const [token, setToken] = useState<TokenState>(() => {
        const tokenLocal = localStorage.getItem('@PermissionToken');
        if (tokenLocal) {
            const token = tokenLocal.replace(/_ponto_/g, '.');
            api.defaults.headers.authorization = `Bearer ${token}`;
            return {token};
          }
          return {} as TokenState;
    });


     const login = useCallback( async ({username, password}: User) => {
        const response =  await api.post('/auth/login', {username, password});
        const {access_token:token} = response.data;
        localStorage.setItem('@PermissionToken', token);
        setToken(token);
    }, []);

    const userLogger = useCallback(() => {
        const token = localStorage.getItem('@PermissionToken');
        return !!token;
      }, []);


    return (
        <AuthContext.Provider value={{token, login, userLogger}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };