import { useState, useEffect } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import "./TicketForm.css";
import { createTicket, getTicketById, updateTicket } from "../../services/ticketService";

export default function TicketForm({ editMode = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
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
  }, [editMode, id, location.key]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
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

    // ✅ Instantly redirect to Tickets page
    navigate("/tickets", { replace: true });
  };

  return (
    <div className="ticketform-page">
      <div className="ticketform-container">
        <form onSubmit={handleSubmit} className="ticketform">
          <h1>{editMode ? "Edit Ticket ✏️" : "Create New Ticket 🎫"}</h1>

          {error && <p className="error">{error}</p>}

          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter ticket title"
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
              placeholder="Enter details about the ticket..."
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary-btn">
              {editMode ? "Update Ticket" : "+ Create Ticket"}
            </button>

            {/* ✅ Back button — instant redirect */}
            <Link to="/tickets" className="btn secondary-btn">
              ← Back to Tickets
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
