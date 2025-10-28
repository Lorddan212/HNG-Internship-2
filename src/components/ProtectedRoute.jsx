import { Navigate } from "react-router-dom";

// ✅ Safely check if user is authenticated
export default function ProtectedRoute({ children }) {
  const rawSession = localStorage.getItem("ticketapp_session");
  let session = null;

  try {
    session = rawSession ? JSON.parse(rawSession) : null;
  } catch (error) {
    console.error("Error parsing session:", error);
    localStorage.removeItem("ticketapp_session");
  }

  // If session missing, redirect to login
  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
