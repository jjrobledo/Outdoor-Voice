import { useState } from "react";
import { useSignup } from "../hooks/useSignup.hook";
import { useAuthContext } from "../hooks/useAuthContext.hook";

export default function Register({ setShowRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();
  const { user } = useAuthContext();

  if (user) {
    setShowRegister(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(username, email, password);
  };

  return (
    <div className="register-card">
      <div>Outdoor Voice</div>
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <span
          onClick={handleSubmit}
          disabled={isLoading}
          className="button btn-register"
        >
          Register
        </span>
        {error && <span style={{ color: "red" }}>{error}</span>}{" "}
      </form>
      <span onClick={() => setShowRegister(false)}>Close</span>
    </div>
  );
}
