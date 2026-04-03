import { useAuth } from "../useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const { register } = useAuth();
  let navigate = useNavigate();

  let [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await register(data);
    navigate("/login")
    setLoading(false);
  };

  function handleInput(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <>

    <div className="login-overlay">

      <div className="container">
        <div className="row mt-5">
          <div className="col-10 col-md-6 col-lg-4 mt-5 m-auto">

            <div className="card custom-float p-3 position-relative">

              <span
                className="close-btn"
                onClick={() => navigate("/")}
              >
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
                    type="text"
                    placeholder="Enter full name"
                    className="w-100 mt-2 p-2 border rounded"
                    onChange={handleInput}
                    name="name"
                    value={data.name}
                  />

                  <input
                    type="text"
                    placeholder="Enter email"
                    className="w-100 mt-3 p-2 border rounded"
                    onChange={handleInput}
                    name="email"
                    value={data.email}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-100 mt-3 p-2 border rounded"
                    onChange={handleInput}
                    name="password"
                    value={data.password}
                  />

                  <p className="mt-2">
                    <a className="fs-6">Forgot password</a>
                  </p>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Signing up..." : "Signup"}
                  </button>
                </form>

                <p className="mt-2 fs-6">
                  Already have an account?{" "}
                  <Link to="/login">Login</Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </>
  );
}
