// src/pages/Landing.jsx
import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Welcome to <span className="highlight">TicketPro</span>
          </h1>
          <p>
            Manage your tickets effortlessly — create, track, and resolve issues in one place.
          </p>

          <div className="buttons">
            <Link to="/auth/login" className="btn primary-btn">
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
