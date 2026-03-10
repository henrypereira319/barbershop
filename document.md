# Especificações: Aplicativo de Barbearia Premium

## 1. Visão Geral de Design (Clean & Premium)
O objetivo do design é transmitir sofisticação, exclusividade e modernidade.
*   **Paleta de Cores:** Focada em tons escuros e metálicos. Predominância de preto absoluto, cinza chumbo (#1A1A1A), contrastando com detalhes em dourado (#D4AF37), cobre ou branco champanhe.
*   **Tipografia:** Letras sem serifa que transmitem elegância e clareza, como *Montserrat*, *Inter* ou *SF Pro*. Pesos leves para o corpo de texto e negritos sutis para destaques.
*   **Interface (UI):** Uso intenso de espaço em branco (negative space) para evitar poluição visual. Bordas suavemente arredondadas, glassmorphism (efeito vidro) em modais e menus, e suporte nativo e padronizado ao *Dark Mode*.
*   **Microinterações (UX):** Transições fluidas, animações de botão suaves ao clique, haptic feedback (vibração do celular) ao confirmar um agendamento e skeleton screens durante o carregamento de imagens.
*   **Fotografia:** Imagens de altíssima qualidade. O app premium depende muito de recursos visuais de barbearias limpas, bem iluminadas e cortes impecáveis.

---

## 2. Funcionalidades (Visão do Cliente)
*   **Onboarding & Autenticação:**
    *   Login expresso e seguro via Apple, Google e número de celular (OTP via WhatsApp/SMS).
    *   Criação de perfil rápido (Pular etapas de preenchimento longo no início).
*   **Exploração:**
    *   **Catálogo de Serviços:** Visualização limpa com foto, nome do serviço, duração aproximada e preço.
    *   **Perfis dos Barbeiros:** Página com foto do profissional, bio breve, portfólio de cortes (estilo Instagram) e especialidades (ex: "Deus do Degradê", "Mestre em Barba").
*   **Fluxo de Agendamento (Frictionless):**
    *   Seleção visual intuitiva em poucos cliques: Serviço -> Barbeiro -> Data -> Horário.
    *   Possibilidade de adicionar serviços complementares (Upsell: Máscara preta, sobrancelha, bebida premium).
*   **Aba "Minha Agenda":**
    *   Gestão simples de agendamentos futuros (reagendar ou cancelar com 1 clique).
    *   Histórico de cortes passados e botão "Agendar Novamente" para repetir a última configuração exata.
*   **Fidelidade Premium:**
    *   Programa de recompensas gamificado e sutil (ex: "Complete 10 cortes VIP e ganhe um grooming completo").
    *   Visualização clara do progresso do cliente.
*   **Notificações & Lembretes:**
    *   Notificações Push inteligentes e via WhatsApp informando proximidade do horário (ex: 2h antes).
    *   Alertas automáticos como "Faz 3 semanas desde seu último corte. Que tal agendar?".
*   **Área de Pagamento (Opcional):**
    *   Integração para pagamento in-app via Pix (Copia e Cola/QR Code), Apple Pay, Google Pay ou Cartão de Crédito salvo para check-out rápido na loja ("Uberização" do pagamento).

## 3. Funcionalidades (Visão do Profissional / Barbeiro)
*   **Minha Agenda:**
    *   Visualização diária limpa dos clientes do dia.
    *   Botão fácil para dar "Check-in" e "Check-out" no cliente.
*   **Gestão de Tempo:**
    *   Poder de adicionar bloqueios de horário personalizáveis (almoço, pausas longas, urgências).
*   **CRM de Bolso (Dados do Cliente):**
    *   Anotações particulares sobre o cliente: preferências de corte (ex: "Pente 2 na lateral, disfarce baixo") e preferências de ambiente (ex: "Gosta de silêncio", "Bebe cerveja IPA").
*   **Painel de Performance:**
    *   Métricas rápidas: Total ganhos do dia/semana, comissões recebidas, tickets médios e pontuação de avaliação dos clientes.

---

## 4. Funcionalidades (Visão da Barbearia / Gestão)
*   **Dashboard Executivo:**
    *   Faturamento em tempo real, serviços mais rentáveis, taxa de ocupação dos barbeiros e ticket médio.
*   **Configurações do Estabelecimento:**
    *   Definição e alteração de horários de funcionamento, incluindo feriados programados.
    *   Cadastro de equipe, definição de permissões e atribuição de serviços específicos por profissional.
*   **Marketing & Avisos:**
    *   Ferramenta para envio prático de push notifications ou WhatsApp para a base (ex: "Sextou: Chopp em dobro hoje!").
    *   Criação de cupons promocionais ("PRIMEIROCORTE", "VIP20").
*   **Financeiro (Split de Pagamento):**
    *   Configuração e gestão automática das comissões entre barbearia e barbeiro.

---

## 5. Regras de Negócios (Business Rules)
Estas são as regras sistêmicas vitais para que o produto funcione perfeitamente sem gerar dores de cabeça operacionais.

1.  **Regra de Overbooking Estrita:**
    *   Um barbeiro não pode ter múltiplos clientes no mesmo slot de tempo. O tempo total do agendamento é a soma exata das durações dos serviços escolhidos pelo cliente.
2.  **Tolerância de Atraso e "No-Show":**
    *   O aplicativo deve ter um limite de antecedência para agendamentos (ex: no mínimo 30 min no futuro, máximo 45 dias para frente).
    *   **Tolerância:** Atrasos além de limite configurável (ex: 10-15 min) podem cancelar o agendamento automaticamente, priorizando o próximo da fila.
    *   **Taxa de No-Show:** Para evitar que o cliente prejudique o faturamento da loja reservando e não indo, deve existir uma regra onde o cliente que atingir "X" faltas precisa inserir cartão de crédito e pagar adiantado (ou uma multa) para futuros agendamentos.
3.  **Regra de Cancelamento / Reagendamento:**
    *   Usuários só podem cancelar ou reagendar sem penalidades (como perda de taxa de reserva) até um tempo limite (ex: 4 horas antes do corte). Modificações muito próximas ao horário ficam bloqueadas ou sujeitam à confirmação direta com a loja.
4.  **Fila de Espera Inteligente:**
    *   Se todos os barbeiros estão ocupados em um sábado, um cliente novo pode entrar na aba "Avisar se vagar". Se o cliente X cancelar seu horário, a Fila de Espera é notificada imediatamente via Push garantindo que a cadeira não fique vazia.
5.  **Comissionamento Dinâmico:**
    *   A regra de rateio financeiro acompanha o item vendido: Corte pode ter 50% de comissão para o barbeiro; Venda de pomada de cabelo, 15%. O aplicativo separa isso de forma automatizada no painel do barbeiro.
6.  **Disponibilidade Condicional:**
    *   Somente listar barbeiros aptos para o serviço. (Se o serviço é "Dreadlocks", e apenas 2 de 5 barbeiros tem essa especialidade, o app filtra a agenda apenas para esses dois no momento da escolha).

---

## 6. Regras de Negócio Avançadas (Gestão e Atendimento)

Estas regras visam evitar furos na agenda e melhorar o *ticket médio* no momento do atendimento.

1.  **Regra de Comanda Aberta (Cross-sell no meio do corte):**
    *   O sistema deve permitir que o barbeiro adicione itens à comanda virtual do cliente *durante* ou *logo antes/após* o atendimento (ex: decidiu fazer a barba na hora, comprou uma pomada, consumiu uma bebida premium).
    *   O check-out final (no app do cliente ou no totem/recepção) deve puxar essa comanda unificada automaticamente.
2.  **Gap Time Automático (Tempo de Transição/Limpeza):**
    *   O sistema pode ter uma configuração para adicionar automaticamente um *gap* (ex: 5 a 10 minutos) entre um cliente e outro.
    *   Esse tempo **não fica visível** para o cliente na hora de agendar, mas no painel do barbeiro serve como respiro e momento de preparação da bancada, evitando o efeito cascata de atrasos.
3.  **Férias, Afastamentos e Bloqueios em Massa:**
    *   O painel de gestão deve ter uma ferramenta para colocar o profissional em "Férias" ou "Licença".
    *   Ao ativar, a agenda do profissional sumirá para os clientes naquele período.
    *   Se houver agendamentos prévios nesses dias, o sistema deve **alertar/notificar** todos os clientes afetados para efetuarem o reagendamento com outro profissional, ou a recepção deve ser notificada para fazer o contato ativo.

---

## 7. Sugestão de Arquitetura e Tech Stack (Foco Premium e Rápido)

Para entregar a experiência fluida, limpa e responsiva (com animações de botão e microinterações de qualidade) que um app nível "AppBarber" exige, as tecnologias recomendadas são:

### Mobile App (Visão Cliente e Profissional)
*   **Framework:** **React Native (usando Expo)** ou **Flutter**.
*   *Por que?* Ambos permitem criar uma interface muito próxima ao código nativo (iOS e Android) usando a mesma base de código. Trazem bibliotecas maravilhosas para animações complexas, transições de tela suaves e *bottom sheets* (modais que sobem pela tela), perfeitos para fluxos longos como a escolha de horários.

### Painel Administrativo / Dashboard (Visão Gestão/Barbearia)
*   **Framework:** **Next.js (React)** ou **Vite (React/Vue)**.
*   **Estilização:** **Tailwind CSS** em conjunto com **Shadcn/UI** ou Radix UI.
*   *Por que?* Cria painéis de administração web (acessados pelo computador da loja) que têm cara de SaaS premium (Software as a Service). Permite fácil implementação de *Dark Mode*, gráficos limpos (Recharts) e tabelas de gestão rápidas.

### Backend (Regras de Negócio e APIs)
*   **Servidor:** **Node.js** com **NestJS** (para grandes estruturas orientadas a objetos e alta escalabilidade com Typescript) ou **Express/Fastify** (mais direto ao ponto).
*   **Banco de Dados:** **PostgreSQL** (Relacional).
*   *Por que?* Um app financeiro e de agendamento lidará massivamente com checagem de concorrência (duas pessoas tentando agendar às 15:00 ao mesmo tempo). O Postgres é o rei para lidar com transações consistentes (ACID) e tabelas relacionais fortes (ex: O *Agendamento* X pertence ao *Cliente* Y, pro *Barbeiro* Z, no *Serviço* W).
*   **Cache (Fila de Espera/Disponibilidade em tempo real):** **Redis**.
*   *Por que?* Muito mais rápido buscar horários disponíveis de 10 barbeiros no Redis do que ficar consultando a tabela do Postgres toda vez que alguém abre o app no sábado de manhã.

### Gateway de Pagamento e Menageria de Split
*   **Fornecedores:** **Stripe**, **Pagar.me** (focado no Brasil) ou **Mercado Pago**.
*   *Por que?* Essencial para a funcionalidade de "split de pagamento" automático (a comissão do barbeiro vai direto para a conta dele e a taxa da loja de forma automática), emissão de cobranças automáticas e armazenamento de cartões de forma criptografada e em conformidade (PCI Compliance).
