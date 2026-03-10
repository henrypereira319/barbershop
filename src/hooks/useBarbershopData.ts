import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Service, Barber } from "@/types/database";

// Fallback de dados iniciais enquanto o usuário não conecta o Supabase real
const fallbackServices: Service[] = [
  { id: "1", name: 'Corte Clássico', description: 'Corte tradicional nas tesouras ou máquina com acabamento luxuoso.', price: 60, duration_minutes: 45, icon: 'scissors', is_active: true, created_at: new Date().toISOString(), image_url: null },
  { id: "2", name: 'Barba Terapia', description: 'Modelagem da barba com toalha quente e massagem facial.', price: 45, duration_minutes: 30, icon: 'star', is_active: true, created_at: new Date().toISOString(), image_url: null },
  { id: "3", name: 'Combo Premium', description: 'Corte clássico + Barba Terapia. Acompanha bebida cortesia.', price: 95, duration_minutes: 75, icon: 'star', is_active: true, created_at: new Date().toISOString(), image_url: null },
];

const fallbackBarbers: Barber[] = [
  { id: "1", profile_id: null, name: 'Marcos Silva', title: 'Mestre Barbeiro', bio: 'Especialista em cortes clássicos.', rating: 4.9, avatar_url: null, is_active: true, created_at: new Date().toISOString() },
  { id: "2", profile_id: null, name: 'João Costa', title: 'Especialista', bio: 'Expert em fade e cortes modernos.', rating: 5.0, avatar_url: null, is_active: true, created_at: new Date().toISOString() },
  { id: "3", profile_id: null, name: 'Diego Santos', title: 'Barbeiro Sênior', bio: 'Mais de 10 anos de experiência.', rating: 4.8, avatar_url: null, is_active: true, created_at: new Date().toISOString() },
];

export const useBarbershopData = () => {
  // Busca os serviços
  const { 
    data: services = fallbackServices, 
    isLoading: isLoadingServices 
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_active", true)
        .order("price", { ascending: true });
      
      if (error) {
        console.warn("Erro ao buscar serviços no Supabase (usando fallback):", error.message);
        return fallbackServices;
      }
      return data && data.length > 0 ? (data as Service[]) : fallbackServices;
    },
    staleTime: 1000 * 60 * 5, // 5 minutos de cache
  });

  // Busca os barbeiros
  const { 
    data: barbers = fallbackBarbers, 
    isLoading: isLoadingBarbers 
  } = useQuery({
    queryKey: ["barbers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("barbers")
        .select("*")
        .eq("is_active", true);
      
      if (error) {
        console.warn("Erro ao buscar barbeiros no Supabase (usando fallback):", error.message);
        return fallbackBarbers;
      }
      return data && data.length > 0 ? (data as Barber[]) : fallbackBarbers;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    services,
    barbers,
    isLoading: isLoadingServices || isLoadingBarbers,
  };
};
