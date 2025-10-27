import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TicketForm.css";
import {
  createTicket,
  getTicketById,
  updateTicket,
} from "../../services/ticketService";

export default function TicketForm({ editMode = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("open");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editMode && id) {
      const ticketToEdit = getTicketById(id);
      if (ticketToEdit) {
        setTitle(ticketToEdit.title);
        setStatus(ticketToEdit.status);
        setDescription(ticketToEdit.description || "");
      }
    }
  }, [editMode, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title) {
      setError("Title is required");
      return;
    }

    if (!["open", "in_progress", "closed"].includes(status)) {
      setError("Invalid status");
      return;
    }

    const ticketData = { title, status, description };

    if (editMode) {
      updateTicket(id, ticketData);
      alert("✅ Ticket updated successfully!");
    } else {
      createTicket(ticketData);
      alert("✅ Ticket created successfully!");
    }

    navigate("/tickets");
  };

  return (
    <div className="ticketform-page">
      <div className="ticketform-container">
        <form onSubmit={handleSubmit} className="ticket-form">
          <h1>{editMode ? "Edit Ticket" : "Create New Ticket"}</h1>

          {error && <p className="error-text">{error}</p>}

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="btn primary-btn">
              {editMode ? "Update Ticket" : "Create Ticket"}
            </button>

            {/* ✅ Back Button */}
            <button
              type="button"
              onClick={() => navigate("/tickets")}
              className="btn back-btn"
            >
              ← Back to Tickets
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
