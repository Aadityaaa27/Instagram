/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router"
import { useAuth } from "./features/auth/hooks/useAuth"
import Login from "./features/auth/pages/Login"
import Register from "./features/auth/pages/Register"
import Feed from "./features/posts/pages/Feed"
import CreatePost from "./features/posts/pages/CreatePost"

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        return <main><h1>Loading...</h1></main>
    }

    return user ? children : <Navigate to="/login" replace />
}

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: <ProtectedRoute><Feed /></ProtectedRoute>
    },
    {
        path: "/create-post",
        element: <ProtectedRoute><CreatePost /></ProtectedRoute>
    }
])