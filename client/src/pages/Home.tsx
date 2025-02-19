import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Header /> {/* No need to pass props anymore */}

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

      <Footer />
    </div>
  );
};

export default Home;
