import "../styles/TimeClock.css";

const TimeClock = () => {
  return (
    <div className="timeclock-container">      
      <main className="timeclock-main">
        <h1 className="timeclock-header">Time Clock</h1>
        <div className="clock-display">12:00 PM</div>
        <div className="timeclock-buttons">
          <button className="timeclock-button">Clock In</button>
          <button className="timeclock-button">Clock Out</button>
        </div>
      </main>      
    </div>
  );
};

export default TimeClock;

{/* ok i dont get whatever the home page is doing with the header and footer need tobe implented in the time clock. the home page is set so the only thing really get edit is in <main> right? so if thats the case change the inventory tsx css to match what the home page is doing leave the <miam> alone in i */}