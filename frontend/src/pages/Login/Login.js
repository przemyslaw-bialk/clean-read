import { useState } from "react";
import FeedbackMessage from "../../components/FeedbackMessage/FeedbackMessage";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error, success } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div className="login">
      <h3 className="login__header">Log in</h3>
      <p>for testing please use:</p>
      <p>login: test@test.com</p>
      <p>password: test</p>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label">Mail</label>
        <input
          className="login__input"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className="login__label">Password</label>
        <input
          className="login__input"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="login__button" disabled={isLoading}>
          Log in
        </button>
        {error && <FeedbackMessage message={error} />}
        {success && <FeedbackMessage message={"logged in :)"} />}
      </form>
    </div>
  );
};

export default Login;
