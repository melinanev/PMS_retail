import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";
import "../styles/Navbar.css";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <button className="nav-button" onClick={() => navigate("/")}>Home</button>
        <button className="nav-button" onClick={() => navigate("/app/inventory")}>Inventory</button>
        <button className="nav-button" onClick={() => navigate("/app/reports")}>Reports</button>
        <button className="nav-button" onClick={() => navigate("/settings")}>Settings</button>
      </div>

      <div className="navbar-auth">
        {loginCheck ? (
          <button className="logout-button" onClick={() => auth.logout()}>
            Log Out
          </button>
        ) : (
          <button className="login-button" onClick={() => navigate("/login")}>Log In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
