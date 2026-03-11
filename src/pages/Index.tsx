import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BarbersSection from "@/components/BarbersSection";
import LoyaltySection from "@/components/LoyaltySection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { type Service, type Barber } from "@/data/barbershop";
import { SplineSceneBasic } from "@/components/ui/demo";

import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-background selection:bg-gold/30 selection:text-gold-light"
      >
        <Navbar onBookNow={() => openBooking()} />
        <HeroSection onBookNow={() => openBooking()} />
        
        {/* Interactive 3D Section */}
        <div id="interactive-3d">
          <SplineSceneBasic />
        </div>
        
        <div id="servicos" className="scroll-mt-20">
          <ServicesSection onSelectService={(s) => openBooking(s)} />
        </div>
        
        <div id="equipe" className="scroll-mt-20">
          <BarbersSection onSelectBarber={(b) => openBooking(undefined, b)} />
        </div>
        
        <div id="fidelidade" className="scroll-mt-20">
          <LoyaltySection />
        </div>
        
        <Footer />
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          initialService={initialService}
          initialBarber={initialBarber}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
