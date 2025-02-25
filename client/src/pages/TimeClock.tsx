import { useNavigate } from "react-router-dom";
import "../styles/TimeClock.css";

const TimeClock = () => {
  const navigate = useNavigate();

  return (
      <main className="timeclock-main">
        <div className="timeclock-container">
        <h1 className="timeclock-header">Time Clock</h1>
        <div className="clock-display">12:00 PM</div>
        <div className="timeclock-buttons">
          <button className="timeclock-button">Clock In</button>
          <button className="timeclock-button">Clock Out</button>
        </div>
        </div>
      </main>      
  );
};

export default TimeClock;