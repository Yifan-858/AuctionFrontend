import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import type { UserLogin } from "../types/User";
import "./Page.css";

const Login = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState<UserLogin>({
    Email: "",
    Password: "",
  });
  const [feedback, setFeedback] = useState("");

  if (!userContext) {
    return null;
  }
  const { login } = userContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(form);
      setFeedback("Login successful! Redirecting to homepage...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      setFeedback("Login failed");
    }
  };

  return (
    <div className="form-page">
      <Link className="home-btn-arrow" to="/">
        ◀ Home
      </Link>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={form.Email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={form.Password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{feedback}</p>
    </div>
  );
};

export default Login;
