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
      <span>Outdoor Voice</span>
      {user ? (
        <span className="button btn-logout" onClick={handleLogout}>
          Logout
        </span>
      ) : (
        <div>
          <span className="button btn-login" onClick={() => setShowLogin(true)}>
            Login
          </span>
          <span
            className="button btn-register"
            onClick={() => setShowRegister(true)}
          >
            Register
          </span>
        </div>
      )}
    </div>
  );
}
