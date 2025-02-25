import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';

import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Inventory from './pages/Inventory.tsx';
import Users from './pages/Employee.tsx'
import TimeClock from './pages/TimeClock.tsx';
import PayRoll from './pages/PayRoll.tsx';
import Customers from './pages/Customers.tsx';
import Suppliers from './pages/Suppliers.tsx';
import Services from './pages/Services.tsx';
import Reports from './pages/Reports.tsx';
import Settings from './pages/Settings.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/timeclock',
        element: <TimeClock />
      },
      {
        path: '/payroll',
        element: <PayRoll />
      },
      {
        path: '/customers',
        element: <Customers />
      },
      {
        path: '/suppliers',
        element: <Suppliers />
      },
      {
        path: '/services',
        element: <Services />
      },
      {
        path: '/inventory',
        element: <Inventory />
      },
      {
        path: '/reports',
        element: <Reports />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: "/users",
        element: <Users />
      }
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}