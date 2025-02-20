import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Customers.css"; // ✅ Make sure this file exists

const Customers = () => {
  return (
    <div className="customers-container">
      <Header />
      <main className="customers-main">
        <h1>Customers</h1>
        <p>Manage customer information and records here.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Customers;
