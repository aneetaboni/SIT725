import React from "react";

export default function BookCard({ book, onBorrow, onReturn }) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8, display: "grid", gap: 8 }}>
      <strong>{book.title}</strong>
      <span>{book.author}</span>
      <small>{book.isbn}</small>
      {book.available ? (
        <button onClick={() => onBorrow?.(book)}>
          Borrow
        </button>
      ) : (
        <button onClick={() => onReturn?.(book)}>
          Return
        </button>
      )}
    </div>
  );
}
