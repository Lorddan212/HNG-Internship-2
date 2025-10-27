// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tickets from "./pages/tickets/Tickets.jsx";
import TicketForm from "./pages/tickets/TicketForm.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import "./styles/global.css";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/auth/signup", element: <Signup /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tickets",
    element: (
      <ProtectedRoute>
        <Tickets />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tickets/new",
    element: (
      <ProtectedRoute>
        <TicketForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/tickets/:id/edit",
    element: (
      <ProtectedRoute>
        <TicketForm editMode />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* ✅ Add Toaster provider */}
    <Toaster position="top-center" reverseOrder={false} />
  </React.StrictMode>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
