import { createContext, useState, useEffect, useContext } from 'react';
import { validateToken } from '../services/huggingFace';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('hf_token') || '');
    const [isValid, setIsValid] = useState(false);
    const [isValidating, setIsValidating] = useState(false);

    useEffect(() => {
        const checkToken = async () => {
            if (!token) {
                setIsValid(false);
                return;
            }

            // Si ya validamos recientemente, podríamos saltar esto, 
            // pero por seguridad validamos al montar si hay token
            setIsValidating(true);
            const result = await validateToken(token);
            setIsValid(result.valid);
            setIsValidating(false);

            if (result.valid) {
                localStorage.setItem('hf_token', token);
            }
        };

        checkToken();
    }, [token]);

    const updateToken = (newToken) => {
        setToken(newToken);
        if (!newToken) {
            localStorage.removeItem('hf_token');
            setIsValid(false);
        }
    };

    return (
        <TokenContext.Provider value={{ token, updateToken, isValid, isValidating }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);
