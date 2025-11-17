import React, { useEffect, useState } from "react";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));
    const userId = decoded.id;

    fetch(`http://127.0.0.1:5000/api/users/${userId}/friends`)
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching friends:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading friends...</p>;

  return (
    <div
      style={{
        padding: "1.5rem",
        background: "#f9f9f9",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <h1 style={{ color: "#a91101", marginBottom: "1rem" }}>👥 My Friends</h1>
      {friends.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0.8rem",
          }}
        >
          {friends.map((f) => (
            <div
  key={f._id}
  style={{
    background: "#fff",
    borderRadius: "10px",
    padding: "1.2rem",
    border: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
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

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
  <img
    src={f.profilePic || "https://i.postimg.cc/QN6VbVnJ/default-avatar.png"}
    alt={f.name}
    style={{
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #a91101",
    }}
  />
  <div>
    <strong>{f.name}</strong>
    <p style={{ color: "#555", margin: 0 }}>
      Class: {f.classSection}
    </p>
  </div>
</div>

              <button
                onClick={() => (window.location.href = `/profile?id=${f._id}`)}
                style={{
                  marginTop: "0.6rem",
                  background: "#a91101",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You don’t have any friends yet 😅</p>
      )}
    </div>
  );
}
