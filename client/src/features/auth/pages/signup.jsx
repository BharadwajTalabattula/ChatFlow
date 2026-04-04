import { useAuth } from "../useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    await register(data);
    navigate('/login')
    setLoading(false);
  };

  function handleInput(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <div className="login-overlay">
      <div className="login-card">
        {/* <span className="close-btn" onClick={() => navigate("/")}>
          &times;
        </span> */}

        <div className="card-body">
          {/* Brand */}
          <div className="brand">
            <i className="fa-solid fa-dice-d6"></i>
            <span className="brand-name">Chat Flow</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Enter full name"
              name="name"
              onChange={handleInput}
              value={data.name}
            />

            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
              value={data.email}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
              value={data.password}
            />

            <a className="forgot-link">Forgot password</a>

            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}