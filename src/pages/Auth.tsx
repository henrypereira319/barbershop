import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate, Navigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, LogIn } from "lucide-react";
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Se já tiver logado, redireciona para a home
  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Login realizado com sucesso!");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Conta criada! Verifique seu email para confirmar.");
      }
    } catch (error: any) {
      toast.error(error.message || "Ocorreu um erro na autenticação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-6 sm:p-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full" />
      </div>

      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-8 left-8 sm:top-12 sm:left-12 flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors font-body z-20"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar à página inicial
      </motion.button>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-3">
            {isLogin ? "Bem-vindo de volta" : "Sua nova assinatura"}
          </h1>
          <p className="font-body text-muted-foreground text-sm sm:text-base">
            {isLogin ? "Faça login para gerenciar seus horários." : "Crie uma conta para viver a experiência premium."}
          </p>
        </div>

        <div className="glass rounded-2xl p-8 sm:p-10 border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-8 -mt-8" />
          
          <form onSubmit={handleEmailAuth} className="space-y-6 relative z-10">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="email" 
                  placeholder="Seu E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-body"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input 
                  type="password" 
                  placeholder="Sua Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-background/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all font-body"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gold hover:bg-gold-light text-charcoal font-bold py-6 text-base rounded-xl transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50"
            >
              {loading ? "Aguarde..." : (isLogin ? "Entrar na Conta" : "Criar Conta")}
            </Button>
          </form>

          <div className="relative my-8 z-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#121212] px-4 text-muted-foreground font-body tracking-wider">Ou continue com</span>
            </div>
          </div>

          <button 
            type="button"
            onClick={signInWithGoogle}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-foreground font-body font-medium flex items-center justify-center gap-3 py-4 rounded-xl transition-all relative z-10"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 bg-white rounded-full p-0.5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>

          <p className="mt-8 text-center text-sm text-muted-foreground font-body relative z-10">
            {isLogin ? "Ainda não é cliente? " : "Já possui um perfil? "}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gold hover:text-gold-light hover:underline font-medium transition-colors"
            >
              {isLogin ? "Crie sua conta" : "Entre agora"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
