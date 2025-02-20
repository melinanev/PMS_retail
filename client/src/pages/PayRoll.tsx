import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/PayRoll.css"; // ✅ Updated filename to match your naming

const PayRoll = () => {
  return (
    <div className="payroll-container">
      <Header />
      <main className="payroll-main">
        <h1>Payroll</h1>
        <p>Manage employee payroll and salaries here.</p>
      </main>
      <Footer />
    </div>
  );
};

export default PayRoll;
