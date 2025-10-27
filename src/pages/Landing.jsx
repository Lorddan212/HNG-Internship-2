import { Link } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <h1>Welcome to <span>TicketPro</span></h1>
        <p>Streamline your support requests and manage tickets effortlessly.</p>
        <div className="landing-buttons">
          <Link to="/auth/login" className="cta-btn">
          Get Started
        </Link>
        </div>
      </div>
    </div>
  );
}
