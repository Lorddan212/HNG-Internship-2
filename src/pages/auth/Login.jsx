// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

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

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    // ✅ Get the user saved from signup
    const storedUserJSON = localStorage.getItem("ticketapp_user");
    if (!storedUserJSON) {
      setError("No registered user found. Please sign up first.");
      return;
    }

    const storedUser = JSON.parse(storedUserJSON);

    // ✅ Check email + password match
    if (email === storedUser.email && password === storedUser.password) {
      // Save the full user info to session (includes firstName & lastName)
      localStorage.setItem("ticketapp_session", JSON.stringify(storedUser));

      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <div className="link">
          Don't have an account? <Link to="/auth/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
