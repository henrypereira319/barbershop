-- Criar Enum para os papéis (Roles) dos usuários e status dos agendamentos
CREATE TYPE user_role AS ENUM ('CLIENT', 'BARBER', 'ADMIN');
CREATE TYPE appointment_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'NO_SHOW', 'COMPLETED');

-- 1. Profiles (Extensão natural da tabela de usuários auth.users do Supabase)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'CLIENT',
  full_name TEXT,
  phone_number TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativar RLS (Row Level Security) na tabela profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de Profile: Qualquer um pode ver o perfil de um barbeiro, mas só o dono edita o próprio
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger para criar um profile sempre que um usuário faz signup/login pelo Google
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Serviços (Cortes de cabelo, barba, etc.)
CREATE TABLE public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  image_url TEXT,
  icon TEXT DEFAULT 'scissors',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
-- Qualquer um pode consultar o catálogo de serviços
CREATE POLICY "Services are viewable by everyone." ON public.services FOR SELECT USING (true);
-- Mas só ADMINs poderiam editar no futuro (RLS por Role ficaria aqui). Por ora deixaremos default = view only.

-- 3. Barbeiros (Equipe)
CREATE TABLE public.barbers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Se ele tiver uma conta logada
  name TEXT NOT NULL,
  title TEXT DEFAULT 'Barbeiro Mestre',
  bio TEXT,
  rating DECIMAL(3,1) DEFAULT 5.0,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.barbers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Barbers are viewable by everyone." ON public.barbers FOR SELECT USING (true);

-- 4. Agendamentos (Appointments)
CREATE TABLE public.appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) NOT NULL,
  barber_id UUID REFERENCES public.barbers(id) NOT NULL,
  service_id UUID REFERENCES public.services(id) NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  status appointment_status DEFAULT 'PENDING',
  notes TEXT,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- O cliente só enxerga os PRÓPRIOS agendamentos.
CREATE POLICY "Users can view own appointments." ON public.appointments
  FOR SELECT USING (auth.uid() = client_id);

-- O cliente pode INSERIR o próprio agendamento.
CREATE POLICY "Users can insert own appointments." ON public.appointments
  FOR INSERT WITH CHECK (auth.uid() = client_id);

-- O cliente pode atualizar status (ex: CANCELAR) do próprio agendamento.
CREATE POLICY "Users can update own appointments." ON public.appointments
  FOR UPDATE USING (auth.uid() = client_id);

-- -- -- INSERT DE DADOS INICIAIS DE EXEMPLO -- -- --
INSERT INTO public.services (name, description, price, duration_minutes, icon) VALUES 
('Corte Clássico', 'Corte tradicional nas tesouras ou máquina com acabamento em navalha.', 60.00, 45, 'scissors'),
('Barba Terapia', 'Modelagem da barba com toalha quente e ozonioterapia.', 45.00, 30, 'star'),
('Combo Premium', 'Corte clássico + Barba Terapia. Acompanha bebida premium.', 95.00, 75, 'star');

INSERT INTO public.barbers (name, title, bio, rating) VALUES 
('Marcos Silva', 'Mestre Barbeiro', 'Especialista em cortes clássicos e barboterapia.', 4.9),
('João Costa', 'Especialista', 'Mago das tesouras, expert em cortes modernos.', 5.0),
('Diego Santos', 'Barbeiro Sênior', 'Velocidade e precisão. Mais de 10 anos de experiência.', 4.8);
