import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Check, Calendar, Clock, User, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateTimeSlots } from "@/data/barbershop";
import type { Service, Barber } from "@/types/database";
import { useBarbershopData } from "@/hooks/useBarbershopData";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import barber3 from "@/assets/barber-3.jpg";

const barberImages: Record<string, string> = { "1": barber1, "2": barber2, "3": barber3 };

type Step = "service" | "barber" | "datetime" | "confirm";
const STEPS: Step[] = ["service", "barber", "datetime", "confirm"];
const STEP_LABELS: Record<Step, string> = {
  service: "Serviço",
  barber: "Barbeiro",
  datetime: "Data & Hora",
  confirm: "Confirmar",
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: Service | null;
  initialBarber?: Barber | null;
}

const BookingModal = ({ isOpen, onClose, initialService, initialBarber }: BookingModalProps) => {
  const [step, setStep] = useState<Step>(
    initialService ? (initialBarber ? "datetime" : "barber") : "service"
  );
  const [selectedService, setSelectedService] = useState<Service | null>(initialService || null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(initialBarber || null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { services, barbers, isLoading } = useBarbershopData();
  const { session, user } = useAuth();
  const navigate = useNavigate();

  const stepIndex = STEPS.indexOf(step);

  const next = () => {
    if (stepIndex < STEPS.length - 1) setStep(STEPS[stepIndex + 1]);
  };
  const back = () => {
    if (stepIndex > 0) setStep(STEPS[stepIndex - 1]);
  };

  // Generate next 14 days
  const dates = useMemo(() => {
    const d: Date[] = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      d.push(date);
    }
    return d;
  }, []);

  const timeSlots = useMemo(() => selectedDate ? generateTimeSlots(selectedDate) : [], [selectedDate]);

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const handleConfirm = async () => {
    if (!session || !user) {
      toast.error("Você precisa estar logado para agendar.");
      onClose();
      navigate("/auth");
      return;
    }

    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) {
      toast.error("Preencha todos os dados do agendamento.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Combina a data selecionada com o horário (HH:MM)
      const [hours, minutes] = selectedTime.split(":");
      const startDateTime = new Date(selectedDate);
      startDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
      
      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(startDateTime.getMinutes() + selectedService.duration_minutes);

      const { error } = await supabase.from("appointments").insert({
        client_id: user.id,
        barber_id: selectedBarber.id,
        service_id: selectedService.id,
        start_time: startDateTime.toISOString(),
        end_time: endDateTime.toISOString(),
        status: "PENDING",
        total_price: selectedService.price,
      });

      if (error) throw error;
      
      toast.success("Agendamento confirmado com sucesso!");
      
      // Reseta os estados internos para o proximo abrir
      setTimeout(() => {
        setStep("service");
        setSelectedService(null);
        setSelectedBarber(null);
        setSelectedDate(null);
        setSelectedTime(null);
        onClose();
      }, 1000);
      
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro ao gravar o agendamento.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative glass rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <div className="flex items-center gap-3">
              {stepIndex > 0 && (
                <button onClick={back} className="text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <h3 className="font-display text-xl font-bold text-foreground">
                {STEP_LABELS[step]}
              </h3>
            </div>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress */}
          <div className="flex gap-1 px-5 pt-4">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= stepIndex ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="p-5 overflow-y-auto max-h-[60vh] custom-scrollbar">
            <AnimatePresence mode="wait">
              {step === "service" && (
                <motion.div
                  key="service"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {isLoading ? (
                    <div className="text-center py-4 opacity-50 font-body text-sm">Carregando catálogo de serviços...</div>
                  ) : services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => { setSelectedService(service); next(); }}
                      className={`group relative w-full overflow-hidden rounded-2xl p-5 text-left transition-all duration-300 flex items-center justify-between
                        ${selectedService?.id === service.id 
                          ? "bg-gold/10 border border-gold shadow-[0_0_20px_rgba(212,175,55,0.15)]" 
                          : "bg-background/40 backdrop-blur-md border border-white/5 hover:border-gold/30 hover:bg-background/60"
                        }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                      
                      <div className="relative z-10">
                        <p className="font-body font-semibold text-lg text-foreground group-hover:text-gold-light transition-colors">{service.name}</p>
                        <p className="font-body text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {service.duration_minutes} min
                        </p>
                      </div>
                      <span className="relative z-10 font-display text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 group-hover:from-gold-light group-hover:to-gold-dark transition-all duration-300">
                        R${Number(service.price).toFixed(2).replace('.', ',')}
                      </span>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === "barber" && (
                <motion.div
                  key="barber"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  {isLoading ? (
                    <div className="text-center py-4 opacity-50 font-body text-sm">Carregando profissionais...</div>
                  ) : barbers.map((barber) => (
                    <button
                      key={barber.id}
                      onClick={() => { setSelectedBarber(barber); next(); }}
                      className="w-full glass-subtle rounded-xl p-4 text-left transition-all duration-200 hover:border-primary/30 flex items-center gap-4"
                    >
                      <img
                        src={barber.avatar_url || barberImages[barber.id] || barberImages["1"]}
                        alt={barber.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-body font-semibold text-foreground">{barber.name}</p>
                        <p className="font-body text-xs text-primary">{barber.title}</p>
                      </div>
                      <span className="text-sm text-primary font-body">★ {barber.rating}</span>
                    </button>
                  ))}
                </motion.div>
              )}

              {step === "datetime" && (
                <motion.div
                  key="datetime"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Date picker */}
                  <div>
                    <p className="font-body text-sm text-muted-foreground mb-3">Escolha o dia</p>
                    <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                      {dates.map((date) => {
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        const isToday = date.toDateString() === new Date().toDateString();
                        return (
                          <button
                            key={date.toISOString()}
                            onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                            className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-all duration-200 ${
                              isSelected
                                ? "bg-primary text-primary-foreground"
                                : "glass-subtle hover:border-primary/30"
                            }`}
                          >
                            <p className="text-xs font-body opacity-70">{dayNames[date.getDay()]}</p>
                            <p className="text-lg font-bold font-body mt-1">{date.getDate()}</p>
                            <p className="text-[10px] font-body opacity-60">{monthNames[date.getMonth()]}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time slots */}
                  {selectedDate && (
                    <div>
                      <p className="font-body text-sm text-muted-foreground mb-3">Horários disponíveis</p>
                      <div className="grid grid-cols-4 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            disabled={!slot.available}
                            onClick={() => setSelectedTime(slot.time)}
                            className={`py-2.5 rounded-lg text-sm font-body transition-all duration-200 ${
                              selectedTime === slot.time
                                ? "bg-primary text-primary-foreground font-semibold"
                                : slot.available
                                ? "glass-subtle hover:border-primary/30 text-foreground"
                                : "bg-muted/30 text-muted-foreground/30 cursor-not-allowed"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedTime && (
                    <Button variant="gold" className="w-full py-6" onClick={next}>
                      Continuar
                    </Button>
                  )}
                </motion.div>
              )}

              {step === "confirm" && (
                <motion.div
                  key="confirm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="glass-subtle rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <Scissors className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Serviço</p>
                        <p className="font-body font-semibold text-foreground">{selectedService?.name}</p>
                      </div>
                    </div>
                    <div className="line-gold" />
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Barbeiro</p>
                        <p className="font-body font-semibold text-foreground">{selectedBarber?.name}</p>
                      </div>
                    </div>
                    <div className="line-gold" />
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Data</p>
                        <p className="font-body font-semibold text-foreground">
                          {selectedDate && `${dayNames[selectedDate.getDay()]}, ${selectedDate.getDate()} de ${monthNames[selectedDate.getMonth()]}`}
                        </p>
                      </div>
                    </div>
                    <div className="line-gold" />
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-xs text-muted-foreground font-body">Horário</p>
                        <p className="font-body font-semibold text-foreground">{selectedTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <span className="font-body text-muted-foreground">Total</span>
                    <span className="font-display text-3xl font-bold text-primary">
                      R${selectedService?.price}
                    </span>
                  </div>

                  <Button disabled={isSubmitting} variant="gold" className="w-full py-6 text-base" onClick={handleConfirm}>
                    <Check className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Processando Agendamento..." : "Confirmar Agendamento"}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;
