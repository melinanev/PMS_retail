import { useNavigate } from "react-router-dom";
import "../styles/ErrorPage.css";
import errorDog from '../assets/images/dogimg.png';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-text">
        <h1>404</h1>
        <h2>Ooopps! Did someone say squirrel?</h2>
        <button className="error-button" onClick={() => navigate("/home")}>Go Back Home</button>
      </div>
      <div className="error-image">
      <img className="error-png" src={errorDog} alt="Dog ripping through page" />
      </div>
    </div>
  );
};

export default ErrorPage;