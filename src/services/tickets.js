const API_URL = "http://localhost:5000/tickets";

// ✅ Get all tickets
export async function getTickets() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to load tickets");
  return res.json();
}

// ➕ Create a new ticket
export async function createTicket(ticket) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ticket),
  });
  if (!res.ok) throw new Error("Failed to create ticket");
  return res.json();
}

// ✏️ Update a ticket
export async function updateTicket(id, updatedData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Failed to update ticket");
  return res.json();
}

// ❌ Delete ticket
export async function deleteTicket(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete ticket");
}

// 🔍 Get single ticket
export async function getTicketById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch ticket");
  return res.json();
}
