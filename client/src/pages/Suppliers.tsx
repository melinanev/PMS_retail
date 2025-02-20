import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Suppliers.css"; // 

const Suppliers = () => {
  return (
    <div className="suppliers-container">
      <Header />
      <main className="suppliers-main">
        <h1>Suppliers</h1>
        <p>Manage supplier information and records here.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Suppliers;
