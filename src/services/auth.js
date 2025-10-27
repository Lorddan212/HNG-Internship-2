// src/services/auth.js

// Save session in localStorage
export function saveSession(user) {
  if (!user || typeof user !== "object") return;
  localStorage.setItem("ticketapp_session", JSON.stringify(user));
}

// Get session from localStorage
export function getSession() {
  try {
    const data = localStorage.getItem("ticketapp_session");
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error("Error parsing session:", error);
    clearSession();
    return null;
  }
}

// Clear session
export function clearSession() {
  localStorage.removeItem("ticketapp_session");
}

// Check if user is authenticated
export function isAuthenticated() {
  return !!getSession();
}
