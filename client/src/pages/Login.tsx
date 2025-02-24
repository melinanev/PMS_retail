import { useState, type FormEvent, type ChangeEvent } from "react";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";
import { register } from "../api/authAPI";  
import type { UserLogin } from "../interfaces/UserLogin";
import "../styles/Login.css";

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<{
    username: string
    password: string;
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({
    username: "",
    password: "",
  });
  const [isRegistering, setIsRegistering] = useState<boolean>(false);  // To toggle between login and register form

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await register(registerData.username, registerData.password, registerData.firstName || '', registerData.lastName || '', registerData.email || '');
      console.log("Registration successful", data);
      setIsRegistering(false);
    } catch (err) {
      console.error("Failed to register", err);
    }
  };
  

  return (
    <div className="login-container">
      <main className="login-main">
        <div className="login-box">
          <h2>{isRegistering ? "Register" : "Welcome!"}</h2>

          {isRegistering ? (
            <form id="register-form" onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  autoComplete="username"
                  onChange={handleRegisterChange}
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
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleRegisterChange}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="sign-in-btn">Register</button>
              </div>
            </form>
          ) : (
            <form id="login-form" onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  autoComplete="username"
                  onChange={handleLoginChange}
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
                  onChange={handleLoginChange}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="sign-in-btn">Login</button>
              </div>
            </form>
          )}

          <div className="form-group">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="switch-btn"
            >
              {isRegistering ? "Already have an account? Sign In" : "Don't have an account? Register"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
