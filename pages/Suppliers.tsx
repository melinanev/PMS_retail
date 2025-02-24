import { useNavigate } from "react-router-dom";
import SoonCome from '../assets/images/SoonCome.png';
import "../styles/TimeClock.css";

const Suppliers = () => {
  const navigate = useNavigate();

  return (
    <main className="soon-container"><div className="soon-image">
        <img className="soon-png" src={SoonCome} alt="Coming soon placeholder" />
      </div>
      <div className="soon-text">
        <h2>Hang tight! The Time Clock feature is coming soon!</h2>
        <button className="soon-button" onClick={() => navigate("/home")}>Go Back Home</button>
      </div>
      
    </main>
  );
};

export default Suppliers;