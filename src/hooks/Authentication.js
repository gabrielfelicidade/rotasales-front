import { createContext, useState } from "react"
import Api from "../services/Api"
import { toast } from 'react-toastify';

export const AuthContext = createContext({})

export const useAuth = () => {

    const isTokenExpired = (token) => {
        const decodedToken = token ? JSON.parse(Buffer.from(token.split('.')[1], 'base64')) : null;

        if(token && decodedToken.exp * 1000 > Date.now() + 5 * 60 * 1000) {
            return false;
        }

        return true;
    }

    const loadToken = () => {
        const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhc2lwZWNhIiwiZXhwIjoxNjM0MDQzMjc5fQ.KQekaw5TCGBMlkIq8hCCTteGi_mwLQcQHnKbiwbeJyUZQY0g_ugaMU_aJSJkw0F5bx6hPrUOrNJcatIHf3e8kg';
        
        if(isTokenExpired(token)) {
            return null;
        }

        Api.defaults.headers.Authorization = `Bearer ${token}`;

        return token;
    }

    const [token, setToken] = useState(loadToken());
    
    const login = async (username, password) => {
        const res = await Api.post('/users/login', {
            username: username,
            password: password
        })
        .then(res => res.data)
        .then(res => {
            localStorage.setItem('token', res.token);
            Api.defaults.headers.Authorization = `Bearer ${res.token}`;
            setToken(res.token);
            toast.success('Sucesso ao realizar login!')
            return res;
        })
        .catch(_ => toast.error('Erro ao realizar login'));

        return res;
    }

    const isAuthenticated = () => true;

    const logoff = () => {
        localStorage.removeItem('token');
        setToken(null);
    }

    return {
        isAuthenticated,
        login,
        logoff,
        token
    }

}

export const AuthProvider = ({ children }) => (
    <AuthContext.Provider value={useAuth()}>
        {children}
    </AuthContext.Provider>
)