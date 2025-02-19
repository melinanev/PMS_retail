import { useState, type FormEvent, type ChangeEvent } from "react";
import Header from "../components/Header"; // ✅ Include full header with time
import Footer from "../components/Footer";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";
import type { UserLogin } from "../interfaces/UserLogin";
import "../styles/Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  return (
    <div className="login-container">
      <Header /> {/* ✅ Full header is included with time */}

      {/* LOGIN FORM */}
      <main className="login-main">
        <div className="login-box">
          <h2>Sign In</h2>
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                required
                autoComplete="username"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                autoComplete="current-password"
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="sign-in-btn">Sign In</button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
