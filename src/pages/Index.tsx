import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BarbersSection from "@/components/BarbersSection";
import LoyaltySection from "@/components/LoyaltySection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { type Service, type Barber } from "@/data/barbershop";

const Index = () => {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [initialService, setInitialService] = useState<Service | null>(null);
  const [initialBarber, setInitialBarber] = useState<Barber | null>(null);

  const openBooking = (service?: Service, barber?: Barber) => {
    setInitialService(service || null);
    setInitialBarber(barber || null);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onBookNow={() => openBooking()} />
      <HeroSection onBookNow={() => openBooking()} />
      <div id="servicos">
        <ServicesSection onSelectService={(s) => openBooking(s)} />
      </div>
      <div id="equipe">
        <BarbersSection onSelectBarber={(b) => openBooking(undefined, b)} />
      </div>
      <div id="fidelidade">
        <LoyaltySection />
      </div>
      <Footer />
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        initialService={initialService}
        initialBarber={initialBarber}
      />
    </div>
  );
};

export default Index;
