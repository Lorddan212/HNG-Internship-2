import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getTickets, deleteTicket } from "../../services/ticketService";
import "./Tickets.css";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const location = useLocation(); // ✅ Detects navigation change

  const loadTickets = () => {
    const data = getTickets();
    setTickets(data);
  };

  useEffect(() => {
    loadTickets();
  }, [location.pathname]); // ✅ Reload when route changes

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      deleteTicket(id);
      loadTickets();
    }
  };

  const statusColors = {
    open: "bg-green-200 text-green-800",
    in_progress: "bg-amber-200 text-amber-800",
    closed: "bg-gray-200 text-gray-800",
  };

  return (
    <div className="tickets-page">
      <div className="tickets-container">
        <div className="page-header">
          <h1>🎟️ Your Tickets</h1>

          <div className="buttons">
            {/* ✅ Back to Dashboard button */}
            <Link to="/dashboard" className="btn secondary-btn">
              ← Back Dashboard
            </Link>

            <Link
              to="/tickets/new"
              className="btn primary-btn"
            >
              + Create New Ticket
            </Link>
          </div>
        </div>

        <div className="tickets-grid">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-card">
              <h2>{ticket.title}</h2>
              <span className={`status ${statusColors[ticket.status]}`}>
                {ticket.status}
              </span>
              <div className="actions">
                <Link to={`/tickets/${ticket.id}/edit`} className="edit-link">
                  Edit
                </Link>
                <button
                  className="delete-link"
                  onClick={() => handleDelete(ticket.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {tickets.length === 0 && (
          <p className="no-tickets">No tickets found. Click on + Create New Ticket to create one!</p>
        )}
      </div>
    </div>
  );
}
