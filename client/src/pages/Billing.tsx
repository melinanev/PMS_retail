import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Billing.css"; // ✅ Ensure this file exists

const Billing = () => {
  return (
    <div className="billing-container">
      <Header />
      <main className="billing-main">
        <h1>Billing</h1>
        <p>Manage customer invoices and payments.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Billing;
