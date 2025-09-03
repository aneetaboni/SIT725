import React, { useEffect, useState } from "react";
import api from "../api";
import BookCard from "../components/BookCard";

export default function Search() {
  const [q, setQ] = useState("");
  const [books, setBooks] = useState([]);

  const load = async () => {
    const res = await api.get("/books", { params: { q } });
    setBooks(res.data);
  };

  useEffect(() => { load(); }, []);

  const borrow = async (book) => {
    await api.post(`/books/${book._id}/borrow`, { days: 14 }, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` }
    });
    load();
  };

  const ret = async (book) => {
    await api.post(`/books/${book._id}/return`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` }
    });
    load();
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by title..." />
        <button onClick={load}>Search</button>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        {books.map(b => (
          <BookCard key={b._id} book={b} onBorrow={borrow} onReturn={ret} />
        ))}
      </div>
    </div>
  );
}
