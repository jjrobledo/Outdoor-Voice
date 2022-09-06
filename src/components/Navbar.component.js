import "./Navbar.component.css";
export default function Navbar({ props }) {
  const { handleLogout, user, setShowLogin, setShowRegister } = props;

  return (
    <div
      style={{
        padding: 20,
        fontFamily: "sans-serif",
        color: "#fff",
        backgroundColor: "#000",
      }}
    >
      <span className="page-title">Outdoor Voice</span>
      {user ? (
        <>
          <span className="nav-username">{user.username}</span>
          <span className="btn" onClick={handleLogout}>
            Logout
          </span>
        </>
      ) : (
        <div className="login-buttons">
          <span className="btn" onClick={() => setShowLogin(true)}>
            Login
          </span>
          <span
            className="btn btn-register"
            onClick={() => setShowRegister(true)}
          >
            Register
          </span>
        </div>
      )}
    </div>
  );
}
