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
    element: <Navigate to="/login" replace />, // Redirect users to login first
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />, // Correctly show Login Page
  },
  {
    path: "/app",
    element: <App />, // Wrap the rest of the app inside App
    children: [
      {
        index: true,
        element: <Home />, // Home is inside /app
      },
      {
        path: "inventory", // ✅ This should be relative (no `/` at the beginning)
        element: <Inventory />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}


