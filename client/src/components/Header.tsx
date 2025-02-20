import { useEffect, useState } from "react";
import "../styles/Header.css";
import logo from "../assets/images/Vetra-logo.png"; // ✅ Import the logo

const Header = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

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
    <header className="header">
      <div className="header-main">
        {/* ✅ Logo and Title (Side by Side) */}
        <div className="logo-title-container">
          <img src={logo} alt="Vetra Logo" className="vetra-logo" />
          <h1>VETRA</h1>
        </div>

        {/* ✅ Slogan Moved Below */}
        <h2 className="header-slogan">Your Veterinary & Retail Assistant</h2>        
      </div>

      {/* ✅ Time Greeting */}
      <p className="header-text">{currentTime}</p>
    </header>
  );
};

export default Header;
