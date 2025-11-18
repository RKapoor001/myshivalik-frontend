import React, { useState } from "react";

export default function Signup() {
  const [name, setName] = useState("");
  const [classOnly, setClassOnly] = useState("");    // e.g., "10"
  const [sectionOnly, setSectionOnly] = useState(""); // e.g., "A"
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus("");

    if (!name.trim() || !classOnly.trim() || !sectionOnly.trim() || !password.trim() || !confirm.trim()) {
      setStatus("❌ Please fill all fields.");
      return;
    }
    if (password !== confirm) {
      setStatus("❌ Passwords do not match.");
      return;
    }

    const classSection = `${classOnly}-${sectionOnly.toUpperCase()}`;

    try {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("classSection", classSection);
    formData.append("password", password);
    if (profilePic) formData.append("image", profilePic);

    const res = await fetch("https://myshivalik-backend.onrender.com/api/auth/signup", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Signup successful!");
      window.location.href = "/login";
    } else {
      alert(data.error || "Signup failed. Try again.");
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("⚠️ Something went wrong.");
  }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="auth-titlebar">Sign Up</div>
        <img src="/logo.jpg" alt="Logo" className="auth-logo" />
        <div className="auth-body">
          <form onSubmit={handleSignup}>
            <div className="auth-row">
              <input
                className="auth-input"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="auth-row two">
              <input
                className="auth-input"
                placeholder="Class (e.g., 10)"
                value={classOnly}
                onChange={(e) => setClassOnly(e.target.value)}
                required
              />
              <input
                className="auth-input"
                placeholder="Section (e.g., A)"
                value={sectionOnly}
                onChange={(e) => setSectionOnly(e.target.value)}
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
              <input
                type="password"
                className="auth-input"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            <div className="auth-row">
  <label style={{ fontWeight: "500", marginBottom: "4px" }}>
   
  </label>
  <div style={{ marginBottom: "1rem" }}>
  <label style={{ display: "block", fontWeight: 600 }}>Profile Picture (optional)</label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setProfilePic(file); // store file object for upload
        setPreview(URL.createObjectURL(file)); // temporary preview url
      }
    }}
    style={{
      marginTop: "4px",
      cursor: "pointer",
      padding: "6px",
      border: "1px solid #a91101",
      borderRadius: "6px",
      width: "100%",
    }}
  />

  {/* 👇 live preview circle */}
  {preview && (
    <img
      src={preview}
      alt="Preview"
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #a91101",
        marginTop: "10px",
      }}
    />
  )}
</div>

</div>


            <div className="auth-actions">
              <button className="auth-btn" type="submit">Sign up</button>
            </div>
          </form>

          {status && <p className="auth-status">{status}</p>}
<p style={{ marginTop: "10px", textAlign: "center" }}>
  Already have an account?{" "}
  <a href="/login" style={{ color: "#a91101", fontWeight: 600, textDecoration: "none" }}>
    Login
  </a>
</p>
        </div>
      </div>
    </div>
  );
}
