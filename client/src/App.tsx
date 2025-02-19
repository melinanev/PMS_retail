import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ Make sure this path is correct
import Footer from "./components/Footer"; // ✅ Ensure Footer is globally included
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // ✅ Hides Navbar only on Login

  return (
    <div className="layout-container">
      {!hideNavbar && <Navbar />} {/* ✅ Ensure Navbar is always included except on login */}
      <main className="main-content">
        <Outlet />
      </main>
      <Footer /> {/* ✅ Ensure Footer is always rendered */}
    </div>
  );
}

export default App;
