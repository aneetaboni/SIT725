import React, { useEffect, useState } from "react";
import api from "../api";

export default function Admin() {
  const [form, setForm] = useState({ title: "", author: "", isbn: "" });
  const [books, setBooks] = useState([]);

  const load = async () => {
    const res = await api.get("/books");
    setBooks(res.data);
  };
  useEffect(() => { load(); }, []);

  const save = async () => {
    await api.post("/books", form, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` }
    });
    setForm({ title: "", author: "", isbn: "" });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/books/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` }
    });
    load();
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <h2>Admin — Manage Books</h2>
      <div style={{ display: "grid", gap: 8, maxWidth: 400 }}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Author" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
        <input placeholder="ISBN" value={form.isbn} onChange={e => setForm({ ...form, isbn: e.target.value })} />
        <button onClick={save}>Save</button>
      </div>
      <ul>
        {books.map(b => (
          <li key={b._id}>
            {b.title} — {b.author} ({b.isbn}){" "}
            <button onClick={() => remove(b._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
