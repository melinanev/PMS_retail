import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />
      <Header />

      {/* BUTTON NAVIGATION */}
      <main>
        <div className="buttons-container">
          <button className="button" onClick={() => navigate("/app/time-clock")}>Time Clock</button>
          <button className="button" onClick={() => navigate("/app/payroll")}>Payroll</button>
          <button className="button" onClick={() => navigate("/app/customers")}>Customers</button>
          <button className="button" onClick={() => navigate("/app/suppliers")}>Suppliers</button>
          <button className="button" onClick={() => navigate("/app/services")}>Services</button>
          <button className="button" onClick={() => navigate("/app/billing")}>Billing</button>
          <button className="button">PLACEHOLDER</button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
