import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/TimeClock.css";

const TimeClock = () => {
  return (
    <div className="timeclock-container">
      <Header />
      <main className="timeclock-main">
        <h1 className="timeclock-header">Time Clock</h1>
        <div className="clock-display">12:00 PM</div>
        <div className="timeclock-buttons">
          <button className="timeclock-button">Clock In</button>
          <button className="timeclock-button">Clock Out</button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TimeClock;
