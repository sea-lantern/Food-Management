import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './pages/Register';
import Login from './pages/Login';
import App from './pages/App';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace={true} />,
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)