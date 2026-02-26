import { createContext, useContext, useState, type ReactNode } from "react";
import type {User} from "../types/auth";
import {useNavigate, Link} from "react-router-dom";

interface AuthContextType {
    user: User |null;
    token: string |null;
    login: (token:string,user:User) => void;
    logout: ()=>void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}:{children:ReactNode}) =>{
   // const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null> (null);
    
    const login = (token:string,user:User) =>{
        localStorage.setItem("token",token);
        setToken(token);
        setUser(user);

    };
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
       // navigate("/");

    };

    return (
        <AuthContext.Provider value = {
            {user, token, login, logout}
        }>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

