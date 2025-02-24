import { Outlet, useLocation } from "react-router-dom";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname === "/login";

  return (
    <div className="layout-container">
      
      {!hideNavbar && <Navbar />} 
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer /> 
    </div>
  );
}

export default App;
