import { createBrowserRouter, Outlet } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Verify from '../pages/Verify';
import Forgot from '../pages/Forgot';
import Reset from '../pages/Reset';

import ProtectedRoute from './ProtectedRoute';
import Layout from '../layout/Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      { path: '/verify', element: <Verify /> },
      { path: '/forgot', element: <Forgot /> },
      { path: '/reset-password/:token', element: <Reset /> },
    ],
  },
]);
