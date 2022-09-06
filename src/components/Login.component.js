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
    <div className="modal-bg">
      <div className="modal modal-login">
        <div className="modal-inner">
          <span className="modal-title">Sign in</span>
          <form className="modal-form" onSubmit={handleSubmit}>
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
              <span className="close-modal" onClick={() => setShowLogin(false)}>
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
