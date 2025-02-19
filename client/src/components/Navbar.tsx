import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import "../styles/Navbar.css";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <Link to="/">
          <button className="nav-button">Home</button>
        </Link>
        <Link to="/inventory">
          <button className="nav-button">Inventory</button>
        </Link>
        <Link to="/reports">
          <button className="nav-button">Reports</button>
        </Link>
        <Link to="/settings">
          <button className="nav-button">Settings</button>
        </Link>
      </div>

      <div className="navbar-auth">
        {loginCheck ? (
          <button className="logout-button" onClick={() => auth.logout()}>
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <button className="login-button">Log In</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
