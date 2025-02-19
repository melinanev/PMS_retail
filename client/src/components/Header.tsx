import { useEffect, useState } from "react";
import "../styles/Header.css";

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
        <h1>VETRA</h1>
        <h2>Your Veterinary & Retail Assistant</h2>
      </div>
      <p className="header-text">{currentTime}</p> {/* Always display the greeting */}
    </header>
  );
};

export default Header;
