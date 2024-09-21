import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  // useEffect(() => {
  //   users();
  // }, []);

  // const users = async () => {
  //   const response = await fetch("http://localhost:3001/users");
  //   const data = await response.json();
  //   console.log(data);
  //   return data;
  // };

  const submited = async (e) => {
    try {
      e.preventDefault();
      if (
        userName.trim() === "" ||
        email.trim() === "" ||
        password.trim() === "" ||
        confirmPassword.trim() === ""
      ) {
        return alert("Please enter details");
      }

      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }

      const response = await fetch("http://localhost:3001/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      });
      const data = await response.json();
      localStorage.setItem("curentUser", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">Sign Up</h2>
        <form>
          <div className="input-group">
            <User className="input-icon" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
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
          <div className="input-group">
            <Lock className="input-icon" size={20} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="input-field"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="password-toggle"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button onClick={submited} className="signup-button">
            Sign Up
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
