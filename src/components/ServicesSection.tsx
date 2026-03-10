import { motion } from "framer-motion";
import { Clock, Star } from "lucide-react";
import { SERVICES, type Service } from "@/data/barbershop";

interface ServicesSectionProps {
  onSelectService: (service: Service) => void;
}

const ServicesSection = ({ onSelectService }: ServicesSectionProps) => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.button
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectService(service)}
              className="glass rounded-xl p-6 text-left group cursor-pointer transition-all duration-300 hover:border-primary/30"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  {service.icon === "star" ? (
                    <Star className="w-5 h-5 text-primary" />
                  ) : (
                    <Clock className="w-5 h-5 text-primary" />
                  )}
                </div>
                <span className="text-2xl font-display font-bold text-primary">
                  R${service.price}
                </span>
              </div>

              <h3 className="font-body font-semibold text-lg text-foreground mb-2">
                {service.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-4">
                {service.description}
              </p>

              <div className="flex items-center gap-2 text-muted-foreground text-xs font-body">
                <Clock className="w-3.5 h-3.5" />
                <span>{service.duration} min</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
