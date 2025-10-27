const API_URL = "http://localhost:5000";

// === USERS ===
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/users?email=${email}&password=${password}`);
  const data = await res.json();
  return data[0]; // return first match or undefined
}

export async function signupUser(userData) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
}

// === TICKETS ===
export async function getTickets() {
  const res = await fetch(`${API_URL}/tickets`);
  return res.json();
}

export async function createTicket(ticket) {
  const res = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
  return res.json();
}

export async function updateTicket(id, ticket) {
  const res = await fetch(`${API_URL}/tickets/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
  return res.json();
}

export async function deleteTicket(id) {
  await fetch(`${API_URL}/tickets/${id}`, { method: "DELETE" });
}
