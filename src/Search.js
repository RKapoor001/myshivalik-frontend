import React, { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [classSection, setClassSection] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://127.0.0.1:5000/api/users/search?name=${query}&classSection=${classSection}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Poppins, sans-serif" }}>
      <h1>🔍 Search Students</h1>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: "0.5rem", width: "200px", marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Class (e.g. 10-A)"
          value={classSection}
          onChange={(e) => setClassSection(e.target.value)}
          style={{ padding: "0.5rem", width: "120px", marginRight: "0.5rem" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>Searching...</p>}

      {Array.isArray(results) && results.length > 0 ? (
  results.map((u) => (
    <div
      key={u._id}
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "1.8rem",
        marginBottom: "1rem",
        backgroundColor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "pointer",

      }}
      onMouseEnter={(e) => {
  e.currentTarget.style.transform = "scale(1.03)";
  e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.15)";
}}
onMouseLeave={(e) => {
  e.currentTarget.style.transform = "scale(1)";
  e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.08)";
}}

    >
      {/* LEFT SIDE - PROFILE PICTURE + NAME */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img
          src={
            u.profilePic ||
            "https://i.postimg.cc/QN6VbVnJ/default-avatar.png"
          }
          alt={u.name}
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #a91101",
          }}
        />
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#222",
            }}
          >
            {u.name}
          </h3>
          <p style={{ margin: "2px 0", color: "#555" }}>
            Class / Section : {u.classSection}
          </p>
          {u.joinedAt && (
            <p style={{ margin: 0, fontSize: "0.85rem", color: "#777" }}>
              Joined : {new Date(u.joinedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>

      {/* RIGHT SIDE - VIEW PROFILE BUTTON */}
      <button
        onClick={() => (window.location.href = `/profile?id=${u._id}`)}
        style={{
          background: "#a91101",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          padding: "8px 14px",
          cursor: "pointer",
          fontWeight: 600,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        View Profile
      </button>
    </div>
  ))
) : (
  !loading && <p>No results yet.</p>
)}

    </div>
  );
}
