import { useState } from "react";
import { useSignup } from "../hooks/useSignup.hook";
import { useAuthContext } from "../hooks/useAuthContext.hook";

import "./Register.component.css";

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
    <div className="modal-bg">
      <div className="modal">
        <div className="modal-inner">
          <span className="modal-title">Create Account</span>
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="field">
              <label className="modal-label">Username</label>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="field">
              <label className="modal-label">Email</label>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="field">
              <label className="modal-label">Password</label>
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="field">
              <input
                type="submit"
                /*                 onClick={handleSubmit}
                disabled={isLoading}*/
                className="btn-submit"
              />
            </div>
            <div className="modal-footer">
              <span
                className="close-modal"
                onClick={() => setShowRegister(false)}
              >
                Close
              </span>
              {error && <span className="error-msg">{error}</span>}{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="register-card">
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
</div> */
}
