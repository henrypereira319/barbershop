import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Barber } from "@/types/database";
import { useBarbershopData } from "@/hooks/useBarbershopData";
import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import barber3 from "@/assets/barber-3.jpg";

const barberImages = [barber1, barber2, barber3];

interface BarbersSectionProps {
  onSelectBarber: (barber: Barber) => void;
}

const BarbersSection = ({ onSelectBarber }: BarbersSectionProps) => {
  const { barbers, isLoading } = useBarbershopData();

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm tracking-[0.3em] uppercase">
            Nossa Equipe
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Mestres do Ofício
          </h2>
          <div className="line-gold w-24 mx-auto mt-6" />
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {barbers.map((barber, i) => (
              <motion.button
                key={barber.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelectBarber(barber)}
                className="group text-left"
              >
                <div className="relative overflow-hidden rounded-xl mb-5 aspect-[3/4]">
                  <img
                    src={barber.avatar_url || barberImages[i % barberImages.length]}
                    alt={barber.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                       <span className="glass-subtle text-xs px-3 py-1 rounded-full text-foreground/80 font-body">Cortes Clássicos</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm text-primary font-body font-medium">
                    {barber.rating}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {barber.name}
                </h3>
                <p className="font-body text-sm text-primary font-medium">
                  {barber.title}
                </p>
                <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                  {barber.bio}
                </p>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BarbersSection;
