import { motion } from "framer-motion";
import { Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-barbershop.jpg";

interface HeroSectionProps {
  onBookNow: () => void;
}

const HeroSection = ({ onBookNow }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Interior premium da barbearia"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-gradient-gold" />
            <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
              Barbearia Premium
            </span>
          </motion.div>

          <h1 className="font-display text-6xl md:text-8xl font-bold leading-[0.9] mb-6">
            <span className="text-foreground">A Arte do</span>
            <br />
            <span className="text-gradient-gold">Corte Perfeito</span>
          </h1>

          <p className="font-body text-muted-foreground text-lg md:text-xl max-w-lg mb-10 font-light leading-relaxed">
            Onde tradição encontra sofisticação. Cada detalhe pensado para uma experiência única.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="gold"
              size="lg"
              onClick={onBookNow}
              className="text-base px-8 py-6"
            >
              <Scissors className="w-5 h-5 mr-2" />
              Agendar Agora
            </Button>
            <Button
              variant="gold-outline"
              size="lg"
              className="text-base px-8 py-6"
            >
              Conheça a Casa
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
