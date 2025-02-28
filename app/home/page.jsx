// App.jsx
import Navbar from "../components/homepage/navbar1";
import EmergencyBanner from "../components/homepage/emergencie";
import HeroSection from "../components/homepage/hero";
import ServicesSection from "../components/homepage/sections";
import RegisterLoginSection from "../components/homepage/regester";
import Footer from "../components/homepage/footer";
const App=()=>{
  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <EmergencyBanner />
      <HeroSection />
      <ServicesSection />
      <RegisterLoginSection />
      <Footer />
    </div>
  );
}

export default App;

