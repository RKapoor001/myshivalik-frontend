import React, { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Logging in...");
    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", name);

      setStatus("✅ Login successful!");
      setName(""); setPassword("");
      window.location.href = "/"; // to feed
    } catch (err) {
      setStatus("❌ " + err.message);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-titlebar">Login</div>
        <img src="/logo.jpg" alt="Logo" className="auth-logo" />
        <div className="auth-body">
          <form onSubmit={handleLogin}>
            <div className="auth-row">
              <input
                className="auth-input"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="auth-row">
              <input
                type="password"
                className="auth-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="auth-actions">
              <button className="auth-btn" type="submit">Login</button>
            </div>
          </form>

          {status && <p className="auth-status">{status}</p>}
<p style={{ marginTop: "10px", textAlign: "center" }}>
  New to MyShivalik?{" "}
  <a href="/signup" style={{ color: "#a91101", fontWeight: 600, textDecoration: "none" }}>
    Sign up
  </a>
</p>
        </div>
      </div>
    </div>
  );
}

