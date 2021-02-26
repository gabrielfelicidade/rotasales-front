import { createContext, useState } from "react"
import Api from "../services/Api"

export const AuthContext = createContext({})

export const useAuth = () => {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    
    const login = async (username, password) => {
        const res = await Api.post('/users/login', {
            username: username,
            password: password
        })
        .then(res => res.data)
        .then(res => {
            setToken(res.token);
            setAuthenticated(true);
            return res;
        })
        .catch(_ => console.log('error while logging in'));

        return res;
    }

    return {
        isAuthenticated,
        login,
        token
    }

}

export const AuthProvider = ({ children }) => (
    <AuthContext.Provider value={useAuth()}>
        {children}
    </AuthContext.Provider>
)