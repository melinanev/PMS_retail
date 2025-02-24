import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>
        Made with <FontAwesomeIcon icon={faPaw} style={{ color: "black" }} /> by Team 4 and our Furry Friends
      </p>
    </footer>
  );
};

export default Footer;
