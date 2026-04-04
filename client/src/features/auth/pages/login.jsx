import { useAuth } from "../useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
   let success =  await login(data);
   console.log(success);
   if(success){
    
    navigate("/");
   }

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
          <form onSubmit={handleLogin}>
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
              {loading ? "Logging in..." : "Login"}
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