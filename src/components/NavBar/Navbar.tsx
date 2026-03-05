import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Navbar.css";

const Navbar = () => {
  const userContext = useContext(UserContext);
  const isLoggedIn = userContext?.isLoggedIn;
  const user = userContext?.user;
  const id = user?.id;

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
  };

  return (
    <div className="nav-bar">
      <Link className="home-btn" to="/">
        AuctionHouse
      </Link>
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for title"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>
      </div>
      {isLoggedIn ? (
        <div className="log-display-container">
          <Link className="create-auction-link" to="/create">
            Create New Auction
          </Link>
          <Link className="user-display" to={`/user/${id}`}>
            Welcom, {user?.userName} ▼
          </Link>
        </div>
      ) : (
        <div className="log-display-container">
          <Link className="user-display" to="/signup">
            Signup
          </Link>
          <Link className="user-display" to="/login">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
