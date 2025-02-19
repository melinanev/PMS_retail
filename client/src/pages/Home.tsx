import { useEffect, useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        `Hello, Employee! The current local time is: ${new Date().toLocaleString()}`
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-main">
          <img src="../src/assets/images/Vetra-logo.png" alt="Vetra Logo" className="vetra-logo" />
          <div className="vetra-text">
            <h1>VETRA</h1>
            <h2>Your Veterinary & Retail Assistant</h2>
          </div>
        </div>
        <p className="greeting">{currentTime}</p>
      </header>

      {/* BUTTON NAVIGATION */}
      <main>
        <div className="buttons-container">
          <button className="button" onClick={() => navigate("/time-clock")}>Time Clock</button>
          <button className="button" onClick={() => navigate("/payroll")}>Payroll</button>
          <button className="button" onClick={() => navigate("/customers")}>Customers</button>
          <button className="button" onClick={() => navigate("/suppliers")}>Suppliers</button>
          <button className="button" onClick={() => navigate("/services")}>Services</button>
           <button className="button" onClick={() => navigate("/billing")}>Billing</button>
          <button className="button">PLACEHOLDER</button>
        </div>
      </main>

      {/* FOOTER DECORATION */}
      <div className="footer-decorator"></div>

      {/* FOOTER */}
      <footer className="footer">
        <img
          src="../shared/images/logo_v10000.jpg"
          alt="Cipher Claw 13 Logo"
          className="footer-logo"
        />
        <br />
        <a href="#" className="footer-link">
          Contact Me
        </a>
        <p>
          Made with <span style={{ color: "black" }}>&hearts;</span> by Auntie
          Beans
        </p>
      </footer>
    </div>
  );
};

export default Home;
