import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Inventory from "./pages/Inventory.tsx";
import Reports from "./pages/Reports.tsx";
import TimeClock from "./pages/TimeClock.tsx";
import PayRoll from "./pages/PayRoll.tsx"; 
import Customers from "./pages/Customers.tsx"; 
import Suppliers from "./pages/Suppliers.tsx"; 
import Services from "./pages/Services.tsx";
import Billing from "./pages/Billing.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "time-clock",
        element: <TimeClock />,
      },
      {
        path: "payroll",
        element: <PayRoll />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "suppliers",
        element: <Suppliers />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "billing",
        element: <Billing />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}