# Especificação do Backend — Church Site

## 1. Visão Geral

Backend para o site da igreja, responsável por gerenciar conteúdo dinâmico (eventos, ministérios, equipe pastoral), autenticação de administradores e envio de formulários de contato.

**Stack recomendada:** Supabase (já presente como dependência no projeto)

- **Banco de dados:** PostgreSQL (gerenciado pelo Supabase)
- **Autenticação:** Supabase Auth
- **Storage:** Supabase Storage (imagens de eventos, ministérios e equipe)
- **API:** Supabase Client SDK (já instalado: `@supabase/supabase-js`)
- **Funções serverless:** Supabase Edge Functions (Deno) para lógica customizada

---

## 2. Modelagem do Banco de Dados

### 2.1 `ministries` — Ministérios

| Coluna        | Tipo                     | Descrição                        |
|---------------|--------------------------|----------------------------------|
| id            | uuid (PK)                | Identificador único              |
| slug          | varchar(100) UNIQUE      | URL amigável (ex: `jovens`)      |
| name          | varchar(200)             | Nome do ministério               |
| description   | text                     | Descrição completa               |
| short_description | varchar(500)         | Descrição curta (para cards)     |
| image_url     | text                     | URL da imagem de capa            |
| leader_name   | varchar(200)             | Nome do líder responsável        |
| meeting_day   | varchar(50)              | Dia de reunião                   |
| meeting_time  | time                     | Horário de reunião               |
| is_active     | boolean DEFAULT true     | Se está ativo no site            |
| created_at    | timestamptz DEFAULT now()| Data de criação                  |
| updated_at    | timestamptz DEFAULT now()| Última atualização               |

### 2.2 `events` — Eventos

| Coluna        | Tipo                     | Descrição                        |
|---------------|--------------------------|----------------------------------|
| id            | uuid (PK)                | Identificador único              |
| title         | varchar(300)             | Título do evento                 |
| description   | text                     | Descrição completa               |
| type          | enum('weekly','special','ministry') | Tipo do evento        |
| image_url     | text                     | Imagem de capa                   |
| start_date    | timestamptz              | Data/hora de início              |
| end_date      | timestamptz              | Data/hora de término             |
| location      | varchar(300)             | Local do evento                  |
| ministry_id   | uuid (FK → ministries)   | Ministério relacionado (opcional)|
| is_featured   | boolean DEFAULT false    | Destaque na home                 |
| is_active     | boolean DEFAULT true     | Se está visível no site          |
| created_at    | timestamptz DEFAULT now()| Data de criação                  |
| updated_at    | timestamptz DEFAULT now()| Última atualização               |

### 2.3 `pastoral_team` — Equipe Pastoral

| Coluna        | Tipo                     | Descrição                        |
|---------------|--------------------------|----------------------------------|
| id            | uuid (PK)                | Identificador único              |
| name          | varchar(200)             | Nome completo                    |
| role          | varchar(200)             | Cargo (ex: Pastor Titular)       |
| bio           | text                     | Biografia                        |
| photo_url     | text                     | Foto de perfil                   |
| email         | varchar(200)             | E-mail de contato                |
| expertise     | text[]                   | Áreas de atuação                 |
| office_hours  | varchar(200)             | Horário de atendimento           |
| display_order | integer DEFAULT 0        | Ordem de exibição                |
| is_active     | boolean DEFAULT true     | Se está visível no site          |
| created_at    | timestamptz DEFAULT now()| Data de criação                  |

### 2.4 `contact_messages` — Mensagens de Contato

| Coluna        | Tipo                     | Descrição                        |
|---------------|--------------------------|----------------------------------|
| id            | uuid (PK)                | Identificador único              |
| name          | varchar(200)             | Nome do remetente                |
| email         | varchar(200)             | E-mail do remetente              |
| phone         | varchar(30)              | Telefone (opcional)              |
| subject       | varchar(300)             | Assunto                          |
| message       | text                     | Conteúdo da mensagem             |
| is_read       | boolean DEFAULT false    | Se foi lida pelo admin           |
| created_at    | timestamptz DEFAULT now()| Data de envio                    |

### 2.5 `site_settings` — Configurações do Site

| Coluna        | Tipo                     | Descrição                        |
|---------------|--------------------------|----------------------------------|
| id            | uuid (PK)                | Identificador único              |
| key           | varchar(100) UNIQUE      | Chave (ex: `church_name`)        |
| value         | jsonb                    | Valor da configuração            |
| updated_at    | timestamptz DEFAULT now()| Última atualização               |

Exemplos de chaves: `church_name`, `address`, `phone`, `email`, `service_times`, `social_links`, `hero_title`, `hero_subtitle`, `hero_image`.

---

## 3. Autenticação e Autorização

### 3.1 Modelo de Acesso

- **Público (anon):** Leitura de ministérios, eventos, equipe pastoral e configurações. Envio de mensagens de contato.
- **Admin (authenticated):** CRUD completo em todas as tabelas. Leitura de mensagens de contato.

### 3.2 Row Level Security (RLS)

```sql
-- Ministérios: leitura pública, escrita apenas admin
ALTER TABLE ministries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ministérios visíveis publicamente"
  ON ministries FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin gerencia ministérios"
  ON ministries FOR ALL
  USING (auth.role() = 'authenticated');

-- Eventos: leitura pública, escrita apenas admin
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Eventos visíveis publicamente"
  ON events FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admin gerencia eventos"
  ON events FOR ALL
  USING (auth.role() = 'authenticated');

-- Mensagens de contato: envio público, leitura apenas admin
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer pessoa envia mensagem"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admin lê mensagens"
  ON contact_messages FOR SELECT
  USING (auth.role() = 'authenticated');
```

### 3.3 Login de Administrador

- Autenticação via e-mail/senha pelo Supabase Auth
- Sem registro público — contas admin criadas manualmente via dashboard do Supabase
- Rota `/admin` no frontend protegida por guard de autenticação

---

## 4. API — Endpoints Principais

O Supabase Client SDK gera automaticamente os endpoints REST. Exemplos de uso no frontend:

```typescript
// Listar eventos futuros
const { data: events } = await supabase
  .from('events')
  .select('*, ministries(name, slug)')
  .gte('start_date', new Date().toISOString())
  .order('start_date', { ascending: true });

// Listar ministérios ativos
const { data: ministries } = await supabase
  .from('ministries')
  .select('*')
  .eq('is_active', true);

// Enviar mensagem de contato
const { error } = await supabase
  .from('contact_messages')
  .insert({ name, email, phone, subject, message });

// Buscar configurações do site
const { data: settings } = await supabase
  .from('site_settings')
  .select('key, value');
```

---

## 5. Supabase Storage — Buckets

| Bucket           | Acesso             | Uso                              |
|------------------|--------------------|----------------------------------|
| `ministry-images`| Público (leitura)  | Imagens de capa dos ministérios  |
| `event-images`   | Público (leitura)  | Imagens de capa dos eventos      |
| `team-photos`    | Público (leitura)  | Fotos da equipe pastoral         |
| `site-assets`    | Público (leitura)  | Logo, hero images, ícones        |

Upload restrito a usuários autenticados (admin).

---

## 6. Edge Functions (Supabase Functions)

### 6.1 `send-contact-notification`

- **Trigger:** Inserção em `contact_messages`
- **Ação:** Envia e-mail de notificação ao admin da igreja (via Resend ou SendGrid)

### 6.2 `cleanup-past-events`

- **Trigger:** Cron job semanal
- **Ação:** Marca eventos passados como `is_active = false`

---

## 7. Variáveis de Ambiente

```env
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_ANON_KEY=<anon-key>
```

Essas variáveis já devem ser prefixadas com `VITE_` para serem acessíveis no frontend (Vite).

---

## 8. Estrutura de Arquivos Sugerida (Frontend)

```
src/
├── lib/
│   └── supabase.ts          # Cliente Supabase inicializado
├── hooks/
│   ├── useEvents.ts          # Hook para buscar eventos
│   ├── useMinistries.ts      # Hook para buscar ministérios
│   ├── useTeam.ts            # Hook para buscar equipe
│   └── useSiteSettings.ts    # Hook para configurações
├── types/
│   └── supabase.ts           # Tipos gerados (já existe)
└── components/
    └── admin/
        ├── AdminLayout.tsx    # Layout do painel admin
        ├── EventForm.tsx      # Formulário de evento
        ├── MinistryForm.tsx   # Formulário de ministério
        └── MessageList.tsx    # Lista de mensagens recebidas
```

---

## 9. Prioridade de Implementação

1. **Fase 1 — Dados dinâmicos:** Criar tabelas, configurar RLS, conectar frontend ao Supabase para leitura de ministérios, eventos e equipe pastoral.
2. **Fase 2 — Formulário de contato:** Implementar envio de mensagens e notificação por e-mail.
3. **Fase 3 — Painel admin:** Tela de login, CRUD de eventos e ministérios, leitura de mensagens.
4. **Fase 4 — Storage:** Upload de imagens pelo painel admin.
5. **Fase 5 — Configurações dinâmicas:** Permitir edição de textos do site (hero, horários, contato) via `site_settings`.
