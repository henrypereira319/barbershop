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
      <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col justify-center items-center md:items-start h-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex items-center justify-center md:justify-start gap-4 mb-8"
          >
            <div className="h-[2px] w-16 bg-gradient-to-r from-gold to-gold-light rounded-full" />
            <span className="text-gold-light font-body text-xs md:text-sm tracking-[0.4em] uppercase font-semibold">
              A Experiência Premium
            </span>
          </motion.div>

          <h1 className="font-display text-7xl md:text-8xl lg:text-[8rem] font-bold leading-[0.85] mb-8 drop-shadow-2xl">
            <motion.span 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-foreground block"
            >
              A Arte do
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-dark block mt-2"
            >
              Corte Perfeito
            </motion.span>
          </h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="font-body text-muted-foreground/90 text-lg md:text-2xl max-w-xl mb-12 font-light leading-relaxed mx-auto md:mx-0"
          >
            Onde a tradição da barbearia clássica encontra o luxo contemporâneo. Cada detalhe da nossa casa foi pensado para o seu conforto.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start"
          >
            <Button
              className="relative group overflow-hidden bg-gold hover:bg-gold-light text-charcoal font-bold text-lg px-8 py-7 rounded-none border-none shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300"
              onClick={onBookNow}
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative flex items-center gap-3">
                <Scissors className="w-6 h-6" />
                Agendar Agora
              </span>
            </Button>
            
            <Button
              variant="outline"
              className="group text-lg px-8 py-7 rounded-none border-border/50 bg-background/20 backdrop-blur-md hover:bg-background/40 hover:border-gold/50 transition-all duration-300"
            >
              <span className="group-hover:text-gold transition-colors duration-300">Conheça a Casa</span>
            </Button>
          </motion.div>
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
