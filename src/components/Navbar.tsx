import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, User as UserIcon } from "lucide-react";

interface NavbarProps {
  onBookNow: () => void;
}

const Navbar = ({ onBookNow }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { session, user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    setProfileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">
            Barber<span className="text-primary">Club</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/#servicos" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            Serviços
          </a>
          <a href="/#equipe" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            Equipe
          </a>
          <a href="/#fidelidade" className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors">
            Club VIP
          </a>
          <Button variant="gold" size="sm" onClick={onBookNow}>
            Agendar
          </Button>

          <div className="w-px h-6 bg-border mx-2" />

          {session ? (
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 text-sm font-body font-medium hover:text-gold transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold">
                  {user?.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )}
                </div>
                Minha Conta
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-3 w-48 glass rounded-xl border border-white/10 shadow-xl overflow-hidden py-1"
                  >
                    <div className="px-4 py-2 border-b border-white/5 mb-1">
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm font-body hover:bg-white/5 transition-colors">
                      Meus Agendamentos
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm font-body hover:bg-white/5 transition-colors">
                      Configurações
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-body text-red-400 hover:bg-red-400/10 transition-colors flex items-center gap-2 mt-1 border-t border-white/5 pt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair da Conta
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => navigate("/auth")} className="border-white/10 hover:border-gold hover:text-gold transition-colors">
              <UserIcon className="w-4 h-4 mr-2" />
              Entrar
            </Button>
          )}
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 space-y-6">
              <div className="space-y-4">
                <a href="/#servicos" className="block font-body text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>
                  Serviços
                </a>
                <a href="/#equipe" className="block font-body text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>
                  Equipe
                </a>
                <a href="/#fidelidade" className="block font-body text-sm text-muted-foreground" onClick={() => setIsOpen(false)}>
                  Club VIP
                </a>
              </div>
              
              <div className="space-y-3 pt-4 border-t border-white/10">
                <Button variant="gold" className="w-full" onClick={() => { onBookNow(); setIsOpen(false); }}>
                  Agendar Horário
                </Button>
                
                {session ? (
                  <>
                    <Button variant="outline" className="w-full border-white/10" onClick={() => setIsOpen(false)}>
                      Meus Agendamentos
                    </Button>
                    <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-400/10" onClick={handleLogout}>
                      Sair da Conta
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" className="w-full border-white/10 hover:text-gold hover:border-gold" onClick={() => { navigate("/auth"); setIsOpen(false); }}>
                    Entrar na Conta
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
