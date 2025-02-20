import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Services.css"; // ✅ Ensure this file exists

const Services = () => {
  return (
    <div className="services-container">
      <Header />
      <main className="services-main">
        <h1>Services</h1>
        <p>Manage the services offered by the store.</p>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
