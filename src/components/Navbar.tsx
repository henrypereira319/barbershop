import { useState } from "react";
import { motion } from "framer-motion";
import { Scissors, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onBookNow: () => void;
}

const Navbar = ({ onBookNow }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            Barber<span className="text-primary">Club</span>
          </span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#servicos" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            Serviços
          </a>
          <a href="#equipe" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            Equipe
          </a>
          <a href="#fidelidade" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            Club VIP
          </a>
          <Button variant="gold" size="sm" onClick={onBookNow}>
            Agendar
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass border-t border-border"
        >
          <div className="container mx-auto px-6 py-4 space-y-4">
            <a href="#servicos" className="block font-body text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>
              Serviços
            </a>
            <a href="#equipe" className="block font-body text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>
              Equipe
            </a>
            <a href="#fidelidade" className="block font-body text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>
              Club VIP
            </a>
            <Button variant="gold" className="w-full" onClick={() => { onBookNow(); setIsOpen(false); }}>
              Agendar
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
