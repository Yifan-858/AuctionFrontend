import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AuctionDetails from "../pages/AuctionDetails";
import CreateAuction from "../pages/CreateAuction";
import UserDetails from "../pages/UserDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auction/:id" element={<AuctionDetails />} />
      <Route path="/user/:id" element={<UserDetails />} />
      <Route path="/create" element={<CreateAuction />} />
    </Routes>
  );
};

export default AppRoutes;
