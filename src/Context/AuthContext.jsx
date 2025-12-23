import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (savedToken) {
            setToken(savedToken);
        }

        setLoading(false);
    }, []);

    useEffect(() => {
        if (token) {
            getProfileData(token);
        } else {
            setUserData(null);
        }
    }, [token]);

    async function getProfileData(token) {
        try {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/users/profile-data`,
                {
                    headers: { token },
                }
            );

            if (data.message === "success") {
                setUserData(data.user);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider
            value={{ token, setToken, userData, loading, getProfileData }}
        >
            {children}
        </AuthContext.Provider>
    );

}
