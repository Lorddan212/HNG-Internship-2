import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getTickets, deleteTicket } from "../../services/ticketService";
import "./Tickets.css";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const loadTickets = () => {
    const data = getTickets();
    setTickets(data);
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      deleteTicket(id);
      loadTickets();
    }
  };

  const statusColors = {
    open: "status-open",
    in_progress: "status-progress",
    closed: "status-closed",
  };

  return (
    <div className="tickets-page">
      <div className="tickets-container">
        <div className="tickets-header">
          <h1>🎟️ Tickets</h1>
          <div className="tickets-actions">
            <button
              onClick={() => navigate("/dashboard")}
              className="back-dashboard-btn"
            >
              ← Back to Dashboard
            </button>

            <Link to="/tickets/new" className="new-ticket-btn">
              + Create New Ticket
            </Link>
          </div>
        </div>

        <div className="tickets-grid">
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <div key={ticket.id} className="ticket-card">
                <h2>{ticket.title}</h2>
                <span className={statusColors[ticket.status]}>
                  {ticket.status.replace("_", " ")}
                </span>
                <div className="ticket-actions">
                  <Link to={`/tickets/${ticket.id}/edit`} className="edit-btn">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(ticket.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-tickets">No tickets found. Create one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}
