import { createBrowserRouter, Outlet } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Verify from '../pages/Verify';
import Forgot from '../pages/Forgot';
import Reset from '../pages/Reset';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
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
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <PublicRoute>
            <Register />
          </PublicRoute>
        ),
      },
      { path: '/verify', element: <Verify /> },
      { path: '/forgot', element: <Forgot /> },
      { path: '/reset-password/:token', element: <Reset /> },
    ],
  },
]);
