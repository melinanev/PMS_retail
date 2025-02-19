import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import "../styles/NavBar.css";

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    setLoginCheck(auth.loggedIn());
  }, []);

  return (
    <nav className="navbar">

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>
      </div>

      {/* Authentication Options */}
      <div className="navbar-auth">
        {loginCheck ? (
          <button className="logout-button" onClick={() => auth.logout()}>
            Log Out
          </button>
        ) : (
          <Link to="/login" className="login-button">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
