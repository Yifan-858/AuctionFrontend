import React, { useEffect, useState, useContext } from "react";
import { API_URL } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import type { User } from "../types/User";

const UserDetails = () => {
  const { id } = useParams();
  const { token, logout } = useContext(UserContext)!;
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return setFeedback("Enter a new password");

    try {
      const res = await fetch(`${API_URL}/user/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });
      if (!res.ok) throw new Error("Failed to update password");
      setFeedback("Password updated successfully!");
      setNewPassword("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>User not found</p>;

  return (
    <div className="user-details-container">
      <h2>User Details</h2>
      <p>
        <strong>Username:</strong> {user.userName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <button
        onClick={() => setShowPasswordForm(!showPasswordForm)}
        style={{ margin: "10px 0" }}
      >
        {showPasswordForm ? "Cancel" : "Update Password"}
      </button>

      {showPasswordForm && (
        <form onSubmit={handlePasswordUpdate}>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
      )}

      {feedback && <p>{feedback}</p>}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserDetails;
