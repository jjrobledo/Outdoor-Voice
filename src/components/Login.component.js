import { useState } from "react";
import { useLogin } from "../hooks/useLogin.hook";
import { useAuthContext } from "../hooks/useAuthContext.hook";

export default function Login({ setShowLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const { user } = useAuthContext();

  if (user) {
    setShowLogin(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    console.log(user);
  };

  return (
    <div className="login-card">
      <div>Outdoor Voice</div>
      <form className="login-form" onSubmit={handleSubmit}>
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
          className="button btn-login"
        >
          Login
        </span>
        {error && <span style={{ color: "red" }}>{error}</span>}{" "}
      </form>
      <span onClick={() => setShowLogin(false)}>Close</span>
    </div>
  );
}
