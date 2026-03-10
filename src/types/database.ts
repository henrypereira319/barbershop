export type UserRole = "CLIENT" | "BARBER" | "ADMIN";
export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "NO_SHOW" | "COMPLETED";

export interface Profile {
  id: string;
  role: UserRole;
  full_name: string | null;
  phone_number: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  duration_minutes: number;
  image_url: string | null;
  icon: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Barber {
  id: string;
  profile_id: string | null;
  name: string;
  title: string | null;
  bio: string | null;
  rating: number | null;
  avatar_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  barber_id: string;
  service_id: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  notes: string | null;
  total_price: number;
  created_at: string;
}
