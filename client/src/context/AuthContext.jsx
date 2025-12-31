import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client/react";
import { ME_QUERY } from "../graphql/queries";

// A Global State Store and Rohit Here :)
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const {loading, data} = useQuery(ME_QUERY, {
        skip: !token,   // Token nahi to no query run
    })

    // Setting the user if any change in data
    useEffect(() => {
        if(data?.me) {
            setUser(data.me);
        }
    }, [data]);

    const login = (newToken, userData) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(userData);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    } 

    // Context Value = States + State Modifiers 
    const value = {
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
    
}


// Custom Hook Creation no default export
export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}