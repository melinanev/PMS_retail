import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(`Hello, Employee! The current local time is: ${new Date().toLocaleString()}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); 
    return () => clearInterval(interval); 
  }, []);

  const Button = ({ label, onClick }: { label: string; onClick?: () => void }) => (
    <button className="btn btn-primary mx-1 my-1" onClick={onClick}>
      {label}
    </button>
  );

  return (
    <div className="mint-green text-center min-100-vh">
      <header className="header bg-info py-3">
        🐾 🌿
        <button id="home-button" className="btn btn-light">
          <img src="../shared/images/home.png" alt="Home Button" title="Home Page Button" />
        </button>
        🐾 🌿
        <div className="header-top my-2">
          <span className="text-dark">{currentTime}</span>
        </div>
        <div className="header-main">
          <h1 className="text-white">VETRA</h1>
          <h2 id="page-title" className="text-white">Home Page</h2>
        </div>
      </header>

      <main className="p-4">
        <div className="flex-row justify-center">
          <Button label="Time Clock" />
          <Button label="Payroll" />
          <Button label="Inventory" onClick={() => navigate('/inventory')} />
          <Button label="Customers" />
        </div>

        <div className="flex-row justify-center mt-3">
          <Button label="Reports" />
          <Button label="Settings" />
          <Button label="Log Out" />
          <Button label="Billing" />
          <Button label="PLACEHOLDER" />
        </div>
      </main>

      <footer className="bg-dark text-white py-3">
        <img src="../shared/images/logo v10000.jpg" alt="Cipher Claw 13 Logo" className="mb-2" />
        <br />
        <a href="#" className="text-link">Contact Me</a>
        <p>Made with <span style={{ color: 'black' }}>&hearts;</span> by Auntie Beans</p>
      </footer>
    </div>
  );
};

export default Home;
