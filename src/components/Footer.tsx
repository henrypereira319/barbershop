import { Scissors, Instagram, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-5 h-5 text-primary" />
              <span className="font-display text-xl font-bold text-foreground">
                Barber<span className="text-primary">Club</span>
              </span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Onde tradição encontra sofisticação. A arte do corte perfeito desde 2018.
            </p>
          </div>

          <div>
            <h4 className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
              Contato
            </h4>
            <div className="space-y-3 font-body text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Rua Augusta, 1200 — São Paulo, SP</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>(11) 99999-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-primary" />
                <span>@barberclub.sp</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-body text-sm tracking-[0.2em] uppercase text-primary mb-4">
              Horários
            </h4>
            <div className="space-y-2 font-body text-sm text-muted-foreground">
              <p>Seg — Sex: 09:00 – 21:00</p>
              <p>Sábado: 09:00 – 18:00</p>
              <p>Domingo: Fechado</p>
            </div>
          </div>
        </div>

        <div className="line-gold mt-12 mb-6" />
        <p className="text-center font-body text-xs text-muted-foreground">
          © 2026 BarberClub. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
