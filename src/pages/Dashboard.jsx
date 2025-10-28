import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, clearSession } from "../services/auth";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const [userName, setUserName] = useState("User");
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    const loadUser = () => {
      if (session && session.firstName) {
        setUserName(`${session.firstName} ${session.lastName || ""}`);
      } else if (session?.email) {
        setUserName(session.email);
      } else {
        navigate("/auth/login");
      }
    };

    const loadTicketStats = () => {
      const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
      setStats({
        total: storedTickets.length,
        open: storedTickets.filter((t) => t.status === "open").length,
        inProgress: storedTickets.filter((t) => t.status === "in_progress").length,
        closed: storedTickets.filter((t) => t.status === "closed").length,
      });
    };

    loadUser();
    loadTicketStats();

    // Listen for updates (e.g., when tickets change)
    const handleUpdate = () => loadTicketStats();
    window.addEventListener("tickets-updated", handleUpdate);

    return () => {
      window.removeEventListener("tickets-updated", handleUpdate);
    };
  }, [navigate, session]);

  const handleLogout = () => {
    clearSession();
    navigate("/auth/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h2>Welcome, {userName} 👋</h2>
        <p className="subtitle">Manage your tickets efficiently with TicketPro</p>

        {/* 📊 Ticket Statistics */}
        <div className="stats-container">
          <div className="stat-card total">
            <h2>{stats.total}</h2>
            <p>Total Tickets</p>
          </div>
          <div className="stat-card open">
            <h2>{stats.open}</h2>
            <p>Open</p>
          </div>
          <div className="stat-card progress">
            <h2>{stats.inProgress}</h2>
            <p>In Progress</p>
          </div>
          <div className="stat-card closed">
            <h2>{stats.closed}</h2>
            <p>Closed</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="dashboard-buttons">
          <Link to="/tickets" className="btn primary-btn">
            Manage Tickets
          </Link>
          <button className="btn logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
