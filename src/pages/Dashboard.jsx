import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSession, clearSession } from "../services/auth";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
  });

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    const open = tickets.filter((t) => t.status === "open").length;
    const inProgress = tickets.filter((t) => t.status === "in_progress").length;
    const closed = tickets.filter((t) => t.status === "closed").length;

    setStats({
      total: tickets.length,
      open,
      inProgress,
      closed,
    });
  }, []);

  const handleLogout = () => {
    clearSession();
    navigate("/auth/login");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>Welcome, {session?.firstName} {session?.lastName || ""} 👋</h1>
        <p className="subtitle">Here’s an overview of your ticket activity.</p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Tickets</h3>
            <p>{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3>Open</h3>
            <p>{stats.open}</p>
          </div>
          <div className="stat-card">
            <h3>In Progress</h3>
            <p>{stats.inProgress}</p>
          </div>
          <div className="stat-card">
            <h3>Closed</h3>
            <p>{stats.closed}</p>
          </div>
        </div>

        <div className="dashboard-buttons">
          <Link to="/tickets" className="btn primary-btn">
            Manage Tickets
          </Link>
          <button onClick={handleLogout} className="btn logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
