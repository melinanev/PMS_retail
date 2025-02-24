import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      

      {/* BUTTON NAVIGATION */}
      <main>
        <div className="buttons-container">
          <button className="button" onClick={() => navigate("/app/time-clock")}>Time Clock</button>
          <button className="button" onClick={() => navigate("/app/payroll")}>Payroll</button>
          <button className="button" onClick={() => navigate("/app/customers")}>Customers</button>
          <button className="button" onClick={() => navigate("/app/suppliers")}>Suppliers</button>
          <button className="button" onClick={() => navigate("/app/services")}>Services</button>
          <button className="button" onClick={() => navigate("/inventory")}>Inventory</button>
          <button className="button" onClick={() => navigate("/users")}>Employees</button>
        </div>
      </main>

    </div>
  );
};

export default Home;








