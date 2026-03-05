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
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for items, sellers, or categories..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>
        {isLoggedIn ? (
          <>
            <Link className="create-new-auction" to="/create">
              Create New Auction
            </Link>
            <Link to={`/user/${id}`}>{user?.userName}</Link>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
