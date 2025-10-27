// src/services/ticketService.js
export async function fetchTickets() {
  const res = await fetch("http://localhost:5000/tickets");
  if (!res.ok) throw new Error("Failed to fetch tickets");
  return await res.json();
}

// Get all tickets
export const getTickets = () => {
  const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
  return tickets;
};

// Get one ticket by ID
export const getTicketById = (id) => {
  const tickets = getTickets();
  return tickets.find((t) => t.id === id);
};

// Create a new ticket
export const createTicket = (ticket) => {
  const tickets = getTickets();
  ticket.id = Date.now().toString(); // unique ID
  tickets.push(ticket);
  localStorage.setItem("tickets", JSON.stringify(tickets));
};

// Update a ticket
export const updateTicket = (id, updatedData) => {
  const tickets = getTickets();
  const updatedTickets = tickets.map((t) =>
    t.id === id ? { ...t, ...updatedData } : t
  );
  localStorage.setItem("tickets", JSON.stringify(updatedTickets));
};

// Delete a ticket
export const deleteTicket = (id) => {
  const tickets = getTickets();
  const filtered = tickets.filter((t) => t.id !== id);
  localStorage.setItem("tickets", JSON.stringify(filtered));
};
