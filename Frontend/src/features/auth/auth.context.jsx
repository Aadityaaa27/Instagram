/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        let mounted = true

        getMe()
            .then((response) => {
                if (mounted) {
                    setUser(response.user)
                }
            })
            .catch((error) => {
                if (error.response?.status !== 401) {
                    console.error("Unable to restore the current session.", error)
                }
            })
            .finally(() => {
                if (mounted) {
                    setLoading(false)
                }
            })

        return () => {
            mounted = false
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setLoading }} >
            {children}
        </AuthContext.Provider>
    )

}