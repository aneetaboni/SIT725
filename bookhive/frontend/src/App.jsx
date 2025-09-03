import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import Admin from "./pages/Admin.jsx";
import Profile from "./pages/Profile.jsx";

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", margin: "0 auto", maxWidth: 900, padding: 24 }}>
      <header style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
        <h1 style={{ marginRight: "auto" }}>📚 BookHive</h1>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/search">Search</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}
