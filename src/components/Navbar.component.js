export default function Navbar() {
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
      <span className="button btn-login">Login</span>
      <span className="button btn-logout">Logout</span>
      <span className="button btn-register">Register</span>
    </div>
  );
}
