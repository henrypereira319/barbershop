import { motion } from "framer-motion";
import { Trophy, Gift, Crown } from "lucide-react";

const LoyaltySection = () => {
  const progress = 7; // out of 10
  const total = 10;

  return (
    <section className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
              Programa de Fidelidade
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
              Club VIP
            </h2>
            <div className="line-gold w-24 mx-auto mt-6" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-body text-foreground font-semibold">Nível Gold</p>
                <p className="font-body text-sm text-muted-foreground">
                  {progress}/{total} cortes para a recompensa
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-6">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(progress / total) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute h-full bg-gradient-gold rounded-full"
              />
            </div>

            {/* Dots */}
            <div className="flex justify-between mb-8">
              {Array.from({ length: total }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-body ${
                    i < progress
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < progress ? "✓" : i + 1}
                </div>
              ))}
            </div>

            {/* Reward */}
            <div className="glass-subtle rounded-xl p-5 flex items-center gap-4">
              <Gift className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-body font-semibold text-foreground">
                  Grooming Completo Grátis
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Complete {total - progress} cortes VIP e ganhe um tratamento premium completo
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltySection;
