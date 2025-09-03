import React, { useEffect, useState } from "react";
import api from "../api";

export default function Profile() {
  const [me, setMe] = useState(null);
  const [borrowed, setBorrowed] = useState([]);

  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    (async () => {
      if (!token) return;
      const meRes = await api.get("/users/me", { headers: { Authorization: `Bearer ${token}` } });
      setMe(meRes.data);
      const booksRes = await api.get(`/users/${meRes.data._id}/borrowed`, { headers: { Authorization: `Bearer ${token}` } });
      setBorrowed(booksRes.data);
    })();
  }, [token]);

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {!token && <p>Please log in (use seed users) to view your profile.</p>}
      {me && <div><strong>{me.name}</strong> — {me.email} ({me.role})</div>}
      <h3>Borrowed Books</h3>
      <ul>
        {borrowed.map(b => (
          <li key={b._id}>{b.title} — due {b.dueDate ? new Date(b.dueDate).toLocaleDateString() : "-"}</li>
        ))}
      </ul>
    </div>
  );
}
