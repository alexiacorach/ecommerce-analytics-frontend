import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });
       const { token, user } = res.data;

      //save token in localstorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);

      // Redirigimos según rol
    if (user.role === "admin") {
      navigate("/admin/orders");
    } else {
      navigate("/");
    }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

 return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px", borderRadius: "1rem" }}>
        <h2 className="text-center mb-4" style={{ color: "#8b5cf6" }}>Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "#8b5cf6" }}
          >
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account? <Link to="/register" style={{ color: "#ec4899" }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
