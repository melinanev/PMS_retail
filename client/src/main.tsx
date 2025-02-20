import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";

import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Inventory from "./pages/Inventory.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />, // ✅ Redirects users to login first
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />, // ✅ Correctly shows Login Page
  },
  {
    path: "/app",
    element: <App />, // ✅ Wraps entire app inside layout
    children: [
      {
        index: true,
        element: <Home />, // ✅ Home is now correctly inside App
      },
      {
        path: "inventory",
        element: <Inventory />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}


