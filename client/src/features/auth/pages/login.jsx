import { useAuth } from "../useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingPage from "../../../shared/components/LoadingPage"

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(data);

    if (success) {
      navigate("/");
    } else {
      setLoading(false);
    }
  };

  function handleInput(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  // ← full screen loading page while API call is in progress
  if (loading) return <LoadingPage />;

  return (
    <div className="login-overlay">
      <div className="login-card">
        <div className="card-body">
          <div className="brand">
            <i className="fa-solid fa-dice-d6"></i>
            <span className="brand-name">Chat Flow</span>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleInput}
              value={data.email}
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
              value={data.password}
              autoComplete="current-password"
            />

            <a className="forgot-link">Forgot password</a>

            <button type="submit" className="btn-primary">
              Login
            </button>
          </form>

          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}