import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const items = [
    { path: "/feed", label: "Feed", icon: "🏠" },
    { path: "/search", label: "Search", icon: "🔍" },
    { path: "/friends", label: "Friends", icon: "👥" },
    { path: "/profile", label: "Profile", icon: "👤" },
  ];

  return (
    <nav
      className="bottom-nav"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        background: "#A91101",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "8px 0",
        color: "#fff",
        zIndex: 999,
      }}
    >
      {items.map((item) => {
        const active = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              color: active ? "#fff" : "#f5dada",
              textDecoration: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "1rem",
              fontWeight: active ? 700 : 500,
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

