import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import type { UserSignup } from "../types/User";
import "./Page.css";

const Signup = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState<UserSignup>({
    UserName: "",
    Email: "",
    Password: "",
  });
  const [feedback, setFeedback] = useState("");

  if (!userContext) {
    return null;
  }
  const { signup } = userContext;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup(form);
      setFeedback("Signup successful! Going to login page...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setFeedback("Signup failed");
    }
  };

  return (
    <div className="form-page">
      <Link className="home-btn-arrow" to="/">
        ◀ Home
      </Link>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="UserName"
          placeholder="Username"
          value={form.UserName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="Email"
          placeholder="Email"
          value={form.Email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="Password"
          placeholder="Password"
          value={form.Password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      <p>{feedback}</p>
    </div>
  );
};

export default Signup;
