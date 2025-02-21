import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"; // Hides Navbar only on Login

  return (
    <div className="layout-container">
      
      {!hideNavbar && <Navbar />} {/*  Ensure Navbar is always included except on login */}
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer /> {/* Ensure Footer is always rendered */}
    </div>
  );
}

export default App;
