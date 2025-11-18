import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Search from "./Search";
import "./App.css"; // ✅ import the color theme CSS
import Signup from "./Signup";
import Login from "./Login";
import Friends from "./Friends";
import BottomNav from "./BottomNav.js";
import ComingSoon from "./ComingSoon";


function Navbar() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem("token")
  );

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <header
      className="navbar"
      style={{
        background: "#A91101",
        color: "#fff",
        padding: "20px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        zIndex: 1000,
      }}
    >
      <Link
  to="/feed"
  style={{
    color: "#fff",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: isMobile ? "1.8rem" : "2.4rem",
    letterSpacing: "3.0px",
  }}
>
  MyShivalik
</Link>


      {/* ---- DESKTOP ---- */}
      {!isMobile && (
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            fontWeight: 500,
          }}
        >
          {isLoggedIn ? (
            <>
              <a href="/feed" style={{ color: "#fff", textDecoration: "none" }}>
                Feed
              </a>
              <a
                href="/search"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Search
              </a>
              <a
                href="/profile"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Profile
              </a>
              <button
                onClick={handleLogout}
                style={{
                  background: "#fff",
                  color: "#A91101",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Login
              </a>
              <a
                href="/signup"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Signup
              </a>
            </>
          )}
        </nav>
      )}

      {/* ---- MOBILE ---- */}
      {isMobile && (
        <>
          <button
            onClick={toggleMenu}
            style={{
              background: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "1.8rem",
              cursor: "pointer",
            }}
          >
            ☰
          </button>

          {menuOpen && (
            <div
              style={{
                position: "absolute",
                top: "58px",
                right: "10px",
                background: "#A91101",
                borderRadius: "8px",
                padding: "10px 0",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                display: "flex",
                flexDirection: "column",
                width: "170px",
              }}
            >
              {isLoggedIn ? (
                <>
                  {["Feed", "Search", "Friends", "Profile"].map((label) => (
                    <a
                      key={label}
                      href={`/${label.toLowerCase()}`}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        padding: "10px 14px",
                        fontWeight: 500,
                      }}
                    >
                      {label}
                    </a>
                  ))}
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    style={{
                      background: "#fff",
                      color: "#A91101",
                      border: "none",
                      borderRadius: "6px",
                      padding: "8px 12px",
                      margin: "6px 10px 0 10px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      padding: "10px 14px",
                      fontWeight: 500,
                    }}
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    style={{
                      color: "#fff",
                      textDecoration: "none",
                      padding: "10px 14px",
                      fontWeight: 500,
                    }}
                  >
                    Signup
                  </a>
                </>
              )}
            </div>
          )}
        </>
      )}
    </header>
  );
}




function App() {
  
  return (
    <Router>
      <div className="app">
        <Navbar />
       

        {/* 🔹 Main layout */}
        <main className="layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <h3 style={{ 
  fontSize: "2.1rem", 
  fontWeight: "800",
  marginBottom: "15px",
   color: "#fff",
   fontStyle: "italic",
    textDecoration: "underline",
    textUnderlineOffset: "4px",   // nicer underline spacing
    textDecorationThickness: "2px",
    textShadow: "1px 1px 3px rgba(0,0,0,0.3)",   
}}>
  Quick Links
</h3>

            <ul>
              <li style={{ marginBottom: "12px" }}>
              <Link to="/updates" style={{ textDecoration: "none", color: "#fff", fontSize: "1.3rem",fontWight: "600" }}>👉School Updates</Link> 
              </li>
              <li style={{ marginBottom: "12px" }}>
               <Link to="/friends" style={{ textDecoration: "none", color: "#fff", fontSize: "1.5rem",fontWight: "600" }}> 👉 Friends👥 </Link>
                </li>
              <li style={{ marginBottom: "12px" }}>
              <Link to="/studygroup" style={{ textDecoration: "none", color: "#fff", fontSize: "1.5rem",fontWight: "600" }}> 👉Study Group </Link> 
              </li>
            </ul>
          </aside>

          {/* Page content */}
          <section className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/signup" replace />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/search" element={<Search />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/updates" element={<ComingSoon />} />
              <Route path="/studygroup" element={<ComingSoon />} />


            </Routes>
             <BottomNav />
          </section>
        </main>
      </div>
    </Router>
  );
}

/* ---------------- FEED COMPONENT ---------------- */
function Feed() {
  React.useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }
}, []);

  const [posts, setPosts] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetch("https://myshivalik-backend.onrender.com/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      // 🔹 Replace this with your actual user ID from MongoDB
      // Get user id from token (backend will verify later)
const token = localStorage.getItem("token");
const decoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
const authorId = decoded ? decoded.id : null;
      await fetch("https://myshivalik-backend.onrender.com/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authorId, content }),
      });
      setContent("");
      // reload posts
      const res = await fetch("https://myshivalik-backend.onrender.com/api/posts");
      const newData = await res.json();
      setPosts(newData);
    } catch (err) {
      console.error("Error creating post:", err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>🧠 MyShivalik Feed</h1>

      {/* ---------- Create Post Form ---------- */}
      <form onSubmit={handleSubmit} className="create-post">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          rows="3"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </form>

      {/* ---------- Posts ---------- */}
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((p) => (
         <article
  key={p._id}
  style={{
    background: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    marginBottom: "1rem",
    boxShadow: "0 0 8px rgba(0,0,0,0.08)",
  }}
>
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <img
      src={p.author?.profilePic || "https://i.postimg.cc/QN6VbVnJ/default-avatar.png"}
      alt="profile"
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        objectFit: "cover",
        border: "2px solid #a91101",
      }}
    />
    <div>
      <h3 style={{ margin: 0 }}>{p.author?.name}</h3>
      <small style={{ color: "#555" }}>{p.author?.classSection}</small>
    </div>
  </div>

  <p style={{ marginTop: "0.8rem" }}>{p.content}</p>
  <small>{new Date(p.createdAt).toLocaleString()}</small>

  {/* 🔹 Like + Comment section */}
  <div style={{ marginTop: "10px" }}>
    <LikeButton postId={p._id} likes={p.likes?.length || 0} />
  </div>
</article>
        ))
      ) : (
        <p>No posts yet or failed to load.</p>
      )}
    </div>
  );
}
function LikeButton({ postId, likes }) {
  const [likeCount, setLikeCount] = React.useState(likes);
  const [liked, setLiked] = React.useState(false);

  const token = localStorage.getItem("token");
  const decoded = token ? JSON.parse(atob(token.split(".")[1])) : null;
  const userId = decoded ? decoded.id : null;

  const handleLike = async () => {
    try {
      const res = await fetch(`https://myshivalik-backend.onrender.com/api/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      setLikeCount(data.likes);
      setLiked(!liked);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleLike}
      style={{
        background: liked ? "#a91101" : "transparent",
        border: liked ? "1px solid #a91101" : "1px solid #ccc",
        color: liked ? "#fff" : "#a91101",
        fontWeight: 600,
        borderRadius: "8px",
        padding: "6px 12px",
        cursor: "pointer",
        transition: "all 0.2s",
        marginTop: "8px",
      }}
    >
      ❤️ {liked ? "Liked" : "Like"} ({likeCount})
    </button>
  );
}
/* ---------------- PROFILE PLACEHOLDER ---------------- */
function Profile() {
  const [user, setUser] = React.useState(null);
  const [posts, setPosts] = React.useState([]);
  const [friendStatus, setFriendStatus] = React.useState("none"); // "none", "sent", "friends", "self"

  React.useEffect(() => {
    // Read token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login"; // not logged in → go login
      return;
    }

    // Decode JWT to get current user id
   // Decode JWT to get current user id
const decoded = JSON.parse(atob(token.split(".")[1]));
const currentUserId = decoded.id;

// Get profile id from URL (if viewing someone else)
const urlParams = new URLSearchParams(window.location.search);
const profileId = urlParams.get("id") || currentUserId;


   // Fetch profile info (own or others)
fetch(`https://myshivalik-backend.onrender.com/api/users/${profileId}`)
  .then((res) => res.json())
  .then((data) => {
    setUser(data);

    // ✅ check friendship relation
    if (profileId === currentUserId) {
      setFriendStatus("self");
    } else if (data.friends?.includes(currentUserId)) {
      setFriendStatus("friends");
    } else if (data.friendRequests?.includes(currentUserId)) {
      setFriendStatus("sent");
    } else {
      setFriendStatus("none");
    }
  })
  .catch((err) => console.error(err));

// Fetch that profile’s posts
fetch(`https://myshivalik-backend.onrender.com/api/posts/user/${profileId}`)
  .then((res) => res.json())
  .then((data) => setPosts(data))
  .catch((err) => console.error(err));

  }, []);

  // 🔹 Handle Add Friend
  const handleAddFriend = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const senderId = decoded.id;

      const res = await fetch(`https://myshivalik-backend.onrender.com/api/users/${user._id}/send-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId }),
      });

      const data = await res.json();
      if (res.ok) {
        setFriendStatus("sent");
      } else {
        alert(data.error || "Error sending request");
      }
    } catch (err) {
      console.error(err);
    }
  };
  // 🔹 Accept Friend Request
const handleAcceptRequest = async (senderId) => {
  try {
    const token = localStorage.getItem("token");
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const receiverId = decoded.id;

    const res = await fetch(
      `https://myshivalik-backend.onrender.com/api/users/${senderId}/accept-request`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiverId }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert("✅ Friend request accepted!");
      // Refresh user data
      fetch(`https://myshivalik-backend.onrender.com/api/users/${receiverId}`)
        .then((res) => res.json())
        .then((data) => setUser(data));
    } else {
      alert(data.error || "Error accepting request");
    }
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div>
      {user ? (
        <>
          <h1>{user.name}</h1>
          <h3>Class / Section: {user.classSection}</h3>

          {/* 🔹 Profile Picture Upload Section */}
<div style={{ marginBottom: "1rem", textAlign: "center" }}>
  <img
    src={user.profilePic || "https://i.postimg.cc/QN6VbVnJ/default-avatar.png"}
    alt="Profile"
    style={{
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "3px solid #a91101",
      marginBottom: "0.5rem",
    }}
  />
  <br />
 <input
  type="file"
  accept="image/*"
  onChange={async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem("token");
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const userId = decoded.id;

    const formData = new FormData();
    formData.append("image", file); // 👈 key name must match upload.single("image")

    try {
      const res = await fetch(
        `https://myshivalik-backend.onrender.com/api/users/${userId}/upload-pic`,
        {
          method: "POST",
          body: formData, // no headers! the browser sets them automatically
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("✅ Profile picture updated!");
        window.location.reload();
      } else {
        alert(data.error || "Error uploading picture");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("⚠️ Upload failed. Please try again.");
    }
  }}
  style={{
    marginTop: "0.5rem",
    cursor: "pointer",
    background: "#fff",
    border: "1px solid #a91101",
    borderRadius: "6px",
    padding: "6px 10px",
  }}
/>
</div>


          {/* 🔹 Friend Requests Inbox (only on your own profile) */}
{friendStatus === "self" && user.friendRequests && user.friendRequests.length > 0 && (
  <div style={{
    marginTop: "1rem",
    padding: "1rem",
    background: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 6px rgba(0,0,0,0.1)"
  }}>
    <h3>📬 Friend Requests</h3>
    {user.friendRequests.map((req) => (
      <div key={req._id} style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "0.6rem"
      }}>
        <span>{req.name} ({req.classSection})</span>
        <button
          onClick={() => handleAcceptRequest(req._id)}
          style={{
            background: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "6px 10px",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Accept
        </button>
      </div>
    ))}
  </div>
)}


          {/* 🔹 Friend Button Section */}
          {friendStatus !== "self" && (
            <div style={{ marginBottom: "1rem" }}>
              {friendStatus === "none" && (
                <button
                  onClick={handleAddFriend}
                  style={{
                    background: "#a91101",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  ➕ Add Friend
                </button>
              )}

              {friendStatus === "sent" && (
                <button
                  disabled
                  style={{
                    background: "#91A3B0",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontWeight: 600,
                  }}
                >
                  🕓 Request Sent
                </button>
              )}

              {friendStatus === "friends" && (
                <button
                  disabled
                  style={{
                    background: "#4CAF50",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    fontWeight: 600,
                  }}
                >
                  ✅ Friends
                </button>
              )}
            </div>
          )}

          <hr />
          <h2>📚 Posts</h2>
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((p) => (
              <article key={p._id}>
                <p>{p.content}</p>
                <small>{new Date(p.createdAt).toLocaleString()}</small>
              </article>
            ))
          ) : (
            <p>No posts yet.</p>
          )}
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default App;



