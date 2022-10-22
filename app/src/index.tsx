import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Register from 'pages/Register'
import Login from 'pages/Login'
import App from 'pages/App'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/management" replace={true} />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/management',
        element: <App />,
    },
])

ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
).render(
    <RouterProvider router={router} />
)