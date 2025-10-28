// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveSession } from "../../services/auth";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (email === "admin@example.com" && password === "123456") {
  saveSession({
    firstName: "Admin",
    lastName: "User",
    email,
  });

  navigate("/dashboard", { replace: true });
}


    // Retrieve saved user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("ticketapp_user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      // Save user session
      saveSession({
        firstName: storedUser.firstName,
        lastName: storedUser.lastName,
        email,
      });

      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to manage your tickets efficiently</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        <p className="switch-link">
          Don't have an account? <Link to="/auth/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
