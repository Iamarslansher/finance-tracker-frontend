import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submited = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message !== "logged") {
        alert(data.message);
        return;
      }

      localStorage.setItem("curentUser", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Log In</h2>
        <form onSubmit={submited}>
          <div className="input-group">
            <Mail className="input-icon" size={20} />
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="password-toggle"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <p className="signup-link">
          Don't have an account? <a href="/signup">Sign up here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
