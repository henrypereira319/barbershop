import { Scissors, Clock, Star, ChevronRight } from "lucide-react";

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  icon: "scissors" | "clock" | "star";
}

export interface Barber {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  specialties: string[];
  bio: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const SERVICES: Service[] = [
  { id: "1", name: "Corte Executivo", description: "Corte clássico com acabamento perfeito", duration: 40, price: 75, icon: "scissors" },
  { id: "2", name: "Barba Premium", description: "Barba esculpida com toalha quente e óleo", duration: 30, price: 55, icon: "star" },
  { id: "3", name: "Degradê Artístico", description: "Degradê com técnica exclusiva de transição", duration: 50, price: 90, icon: "scissors" },
  { id: "4", name: "Combo VIP", description: "Corte + Barba + Sobrancelha + Hidratação", duration: 90, price: 160, icon: "star" },
  { id: "5", name: "Pigmentação", description: "Coloração e pigmentação capilar profissional", duration: 60, price: 120, icon: "clock" },
  { id: "6", name: "Relaxamento Capilar", description: "Tratamento de alisamento e hidratação", duration: 45, price: 85, icon: "clock" },
];

export const BARBERS: Barber[] = [
  {
    id: "1",
    name: "Rafael Silva",
    title: "Mestre em Degradê",
    avatar: "",
    rating: 4.9,
    specialties: ["Degradê", "Corte Executivo", "Pigmentação"],
    bio: "15 anos de experiência. Especialista em transições perfeitas e cortes de precisão.",
  },
  {
    id: "2",
    name: "Lucas Mendes",
    title: "Deus da Barba",
    avatar: "",
    rating: 4.8,
    specialties: ["Barba", "Combo VIP", "Relaxamento"],
    bio: "Artista da barba. Cada fio no lugar certo, cada detalhe conta.",
  },
  {
    id: "3",
    name: "André Costa",
    title: "Artista Capilar",
    avatar: "",
    rating: 4.95,
    specialties: ["Degradê Artístico", "Pigmentação", "Design"],
    bio: "Campeão estadual de barbeiros 2024. Transformando cortes em obras de arte.",
  },
];

export const generateTimeSlots = (date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let h = 9; h <= 20; h++) {
    for (const m of [0, 30]) {
      if (h === 20 && m === 30) continue;
      const time = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
      slots.push({ time, available: Math.random() > 0.3 });
    }
  }
  return slots;
};
