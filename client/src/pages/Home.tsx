import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      

      {/* BUTTON NAVIGATION */}
      <main>
        <div className="buttons-container">
          <button className="button" onClick={() => navigate("/timeclock")}>Time Clock</button>
          <button className="button" onClick={() => navigate("/payroll")}>Payroll</button>
          <button className="button" onClick={() => navigate("/customers")}>Customers</button>
          <button className="button" onClick={() => navigate("/suppliers")}>Suppliers</button>
          <button className="button" onClick={() => navigate("/services")}>Services</button>
          <button className="button" onClick={() => navigate("/inventory")}>Inventory</button>
          <button className="button" onClick={() => navigate("/users")}>Employees</button>
        </div>
      </main>

    </div>
  );
};

export default Home;








