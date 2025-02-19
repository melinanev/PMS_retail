import { useState, type FormEvent, type ChangeEvent } from 'react';
import Auth from '../utils/auth';
import { login } from '../api/authAPI';
import type { UserLogin } from '../interfaces/UserLogin';


const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: '',
    password: '',
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
      console.error('Failed to login', err);
    }
  };

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="header-top">
          <div className="greeting">
            <span id="current-datetime"></span>
          </div>
        </div>
        <div className="header-main">
          <h1>VETRA</h1>
          <h2>Employee Portal</h2>
        </div>
      </header>

      <main className="main-landing">
        <section className="login-container">
          <div className="login-box">
            <div className="info-box">
              <p>Go to Home Page</p>
              <p style={{ fontSize: '.8em' }}>Enter your credentials below</p>
            </div>
            <form id="login-form" onSubmit={handleSubmit}>
              🌿 🐾 🌿
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
        </section>

        <section className="login-container">
          <div className="login-box">
            <div className="info-box">
              <p>Clock In and Clock Out</p>
              <p style={{ fontSize: '.8em' }}>Enter your credentials below</p>
            </div>
            <form id="clockin-form" onSubmit={handleSubmit}>
              🌿 🐾 🌿
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
                <button type="submit" className="sign-in-btn">Clock In/Out</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <aside className="help-links">
        <a href="#" className="help-link">Forgot Username?</a>
        <a href="#" className="help-link">Forgot Password?</a>
        <a href="#" className="help-link">Request Account</a>
      </aside>

      <footer>
        <img src="../shared/images/logo v10000.jpg" alt="Cipher Claw 13 Logo" />
        <br />
        <a href="#">Contact Me</a>
        <p>
          Made with <span style={{ color: 'black' }}>&hearts;</span> by Auntie Beans
        </p>
      </footer>
    </div>
  );
};

export default Login;
