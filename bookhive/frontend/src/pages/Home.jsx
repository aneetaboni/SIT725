import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <p>Welcome to BookHive — search, borrow, and manage library books online.</p>
      <div style={{ display: "flex", gap: 12 }}>
        <Link to="/search">Search Books</Link>
        <Link to="/admin">Admin Panel</Link>
      </div>
    </div>
  );
}
