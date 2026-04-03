import { useAuth } from "../useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
    const { login } = useAuth();
  let navigate = useNavigate();

  let [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(data);
    navigate("/")
    setLoading(false);
  };

  function handleInput(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="login-overlay">
        <div className="login-card">
          <span className="close-btn" onClick={() => navigate("/")}>
            &times;
          </span>

          <div className="card-body">
            <div className="w-100 mb-2 d-flex justify-content-center p-1">
              <span className="fs-3">
                <i className="fa-solid fa-dice-d6"></i> Chat Flow
              </span>
            </div>

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Enter email"
                className="w-100 mt-3 p-2 border rounded"
                name="email"
                onChange={handleInput}
                value={data.email}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-100 mt-3 p-2 border rounded"
                name="password"
                onChange={handleInput}
                value={data.password}
              />

              <a className="mt-3 d-block">Forgot password</a>

              <button
  type="submit"
  disabled={loading}
  className="btn btn-primary w-100 mt-4"
>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-2">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
