import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import type { Service } from "@/types/database";
import { useBarbershopData } from "@/hooks/useBarbershopData";

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
}

const ServicesSection = ({ onSelectService }: ServicesSectionProps) => {
  const { services, isLoading } = useBarbershopData();

  return (
    <section className="py-24 bg-gradient-dark">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
            Nossos Serviços
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Experiências Exclusivas
          </h2>
          <div className="line-gold w-24 mx-auto mt-6" />
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative group h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                <div className="relative h-full bg-background/40 backdrop-blur-xl border border-white/5 group-hover:border-gold/30 rounded-2xl p-8 cursor-pointer transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
                  onClick={() => onSelectService(service)}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150" />
                  
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-background to-background border border-white/10 flex items-center justify-center shadow-lg shadow-black/50 group-hover:border-gold/50 transition-colors duration-500">
                        {service.icon === "star" ? (
                          <Star className="w-6 h-6 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                        ) : (
                          <Clock className="w-6 h-6 text-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
                        )}
                      </div>
                      <span className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 group-hover:from-gold-light group-hover:to-gold-dark transition-all duration-500">
                        R${Number(service.price).toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <h3 className="font-body font-semibold text-xl text-foreground mb-3 tracking-wide">
                      {service.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-gold/70 text-xs font-body font-medium uppercase tracking-widest mt-8 pt-6 border-t border-white/5 group-hover:border-gold/20 transition-colors duration-500">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration_minutes} min</span>
                    <div className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-gold">
                      Agendar →
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
