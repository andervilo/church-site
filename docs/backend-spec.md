# Especificação do Backend — Church Site

## 1. Visão Geral

Backend para o site da igreja, responsável por gerenciar conteúdo dinâmico (eventos, ministérios, equipe pastoral), autenticação de administradores e envio de formulários de contato.

**Stack:**

- **Framework:** Spring Boot 3.x (Java 21)
- **Banco de dados:** PostgreSQL
- **ORM:** Spring Data JPA / Hibernate
- **Autenticação:** Spring Security + JWT
- **Storage:** Amazon S3 (ou MinIO para desenvolvimento local)
- **E-mail:** Spring Mail (JavaMailSender) com SMTP
- **Documentação da API:** SpringDoc OpenAPI (Swagger)
- **Build:** Maven
- **Deploy:** Docker + Docker Compose

---

## 2. Modelagem do Banco de Dados (JPA Entities)

### 2.1 `ministries` — Ministérios

| Coluna            | Tipo                          | JPA                                      | Descrição                    |
|-------------------|-------------------------------|------------------------------------------|------------------------------|
| id                | uuid (PK)                     | `@Id @GeneratedValue(strategy = UUID)`   | Identificador único          |
| slug              | varchar(100) UNIQUE           | `@Column(unique = true)`                 | URL amigável (ex: `jovens`)  |
| name              | varchar(200)                  | `@Column(nullable = false)`              | Nome do ministério           |
| description       | text                          | `@Column(columnDefinition = "TEXT")`     | Descrição completa           |
| short_description | varchar(500)                  | `@Column(length = 500)`                  | Descrição curta (para cards) |
| image_url         | text                          |                                          | URL da imagem de capa        |
| leader_name       | varchar(200)                  |                                          | Nome do líder responsável    |
| meeting_day       | varchar(50)                   |                                          | Dia de reunião               |
| meeting_time      | time                          | `LocalTime`                              | Horário de reunião           |
| is_active         | boolean DEFAULT true          |                                          | Se está ativo no site        |
| created_at        | timestamp DEFAULT now()       | `@CreatedDate`                           | Data de criação              |
| updated_at        | timestamp DEFAULT now()       | `@LastModifiedDate`                      | Última atualização           |

### 2.2 `events` — Eventos

| Coluna      | Tipo                                    | JPA                                    | Descrição                         |
|-------------|-----------------------------------------|----------------------------------------|-----------------------------------|
| id          | uuid (PK)                               | `@Id @GeneratedValue(strategy = UUID)` | Identificador único               |
| title       | varchar(300)                            | `@Column(nullable = false)`            | Título do evento                  |
| description | text                                    | `@Column(columnDefinition = "TEXT")`   | Descrição completa                |
| type        | varchar(20)                             | `@Enumerated(EnumType.STRING)`         | `WEEKLY`, `SPECIAL`, `MINISTRY`   |
| image_url   | text                                    |                                        | Imagem de capa                    |
| start_date  | timestamp                               | `ZonedDateTime`                        | Data/hora de início               |
| end_date    | timestamp                               | `ZonedDateTime`                        | Data/hora de término              |
| location    | varchar(300)                            |                                        | Local do evento                   |
| ministry_id | uuid (FK → ministries)                  | `@ManyToOne(fetch = LAZY)`             | Ministério relacionado (opcional) |
| is_featured | boolean DEFAULT false                   |                                        | Destaque na home                  |
| is_active   | boolean DEFAULT true                    |                                        | Se está visível no site           |
| created_at  | timestamp DEFAULT now()                 | `@CreatedDate`                         | Data de criação                   |
| updated_at  | timestamp DEFAULT now()                 | `@LastModifiedDate`                    | Última atualização                |

### 2.3 `pastoral_team` — Equipe Pastoral

| Coluna        | Tipo                    | JPA                                    | Descrição                |
|---------------|-------------------------|----------------------------------------|--------------------------|
| id            | uuid (PK)               | `@Id @GeneratedValue(strategy = UUID)` | Identificador único      |
| name          | varchar(200)            | `@Column(nullable = false)`            | Nome completo            |
| role          | varchar(200)            |                                        | Cargo (ex: Pastor Titular) |
| bio           | text                    | `@Column(columnDefinition = "TEXT")`   | Biografia                |
| photo_url     | text                    |                                        | Foto de perfil           |
| email         | varchar(200)            |                                        | E-mail de contato        |
| expertise     | text                    | `@ElementCollection`                   | Áreas de atuação (List)  |
| office_hours  | varchar(200)            |                                        | Horário de atendimento   |
| display_order | integer DEFAULT 0       |                                        | Ordem de exibição        |
| is_active     | boolean DEFAULT true    |                                        | Se está visível no site  |
| created_at    | timestamp DEFAULT now() | `@CreatedDate`                         | Data de criação          |

### 2.4 `contact_messages` — Mensagens de Contato

| Coluna     | Tipo                    | JPA                                    | Descrição               |
|------------|-------------------------|----------------------------------------|-------------------------|
| id         | uuid (PK)               | `@Id @GeneratedValue(strategy = UUID)` | Identificador único     |
| name       | varchar(200)            | `@Column(nullable = false)`            | Nome do remetente       |
| email      | varchar(200)            | `@Column(nullable = false)`            | E-mail do remetente     |
| phone      | varchar(30)             |                                        | Telefone (opcional)     |
| subject    | varchar(300)            |                                        | Assunto                 |
| message    | text                    | `@Column(columnDefinition = "TEXT")`   | Conteúdo da mensagem    |
| is_read    | boolean DEFAULT false   |                                        | Se foi lida pelo admin  |
| created_at | timestamp DEFAULT now() | `@CreatedDate`                         | Data de envio           |

### 2.5 `site_settings` — Configurações do Site

| Coluna     | Tipo                    | JPA                                    | Descrição                   |
|------------|-------------------------|----------------------------------------|-----------------------------|
| id         | uuid (PK)               | `@Id @GeneratedValue(strategy = UUID)` | Identificador único         |
| key        | varchar(100) UNIQUE     | `@Column(unique = true)`               | Chave (ex: `church_name`)   |
| value      | jsonb                   | `@JdbcTypeCode(SqlTypes.JSON)`         | Valor da configuração       |
| updated_at | timestamp DEFAULT now() | `@LastModifiedDate`                    | Última atualização          |

Exemplos de chaves: `church_name`, `address`, `phone`, `email`, `service_times`, `social_links`, `hero_title`, `hero_subtitle`, `hero_image`.

---

## 3. Autenticação e Autorização

### 3.1 Modelo de Acesso

- **Público (`permitAll`):** Leitura de ministérios, eventos, equipe pastoral e configurações. Envio de mensagens de contato.
- **Admin (`ROLE_ADMIN`):** CRUD completo em todas as tabelas. Leitura de mensagens de contato.

### 3.2 Spring Security — Configuração

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .cors(Customizer.withDefaults())
            .sessionManagement(sm -> sm.sessionPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Endpoints públicos (leitura)
                .requestMatchers(GET, "/api/ministries/**").permitAll()
                .requestMatchers(GET, "/api/events/**").permitAll()
                .requestMatchers(GET, "/api/team/**").permitAll()
                .requestMatchers(GET, "/api/settings/**").permitAll()
                .requestMatchers(POST, "/api/contact").permitAll()
                // Swagger UI
                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                // Login
                .requestMatchers(POST, "/api/auth/login").permitAll()
                // Tudo mais exige autenticação (admin)
                .anyRequest().hasRole("ADMIN")
            )
            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}
```

### 3.3 JWT — Fluxo de Autenticação

1. `POST /api/auth/login` com `{ email, password }` → retorna `{ accessToken, refreshToken }`
2. Frontend armazena tokens e envia `Authorization: Bearer <accessToken>` em todas as requisições admin
3. `JwtAuthenticationFilter` valida o token e injeta o `Authentication` no `SecurityContext`
4. Access token expira em **1 hora**, refresh token em **7 dias**
5. `POST /api/auth/refresh` com `{ refreshToken }` → retorna novo access token

### 3.4 Gestão de Usuários Admin

- Sem registro público — contas admin criadas via seed no banco ou endpoint protegido
- Senhas hasheadas com `BCryptPasswordEncoder`
- Rota `/admin` no frontend protegida por guard de autenticação

---

## 4. API REST — Endpoints

Base URL: `/api`

### 4.1 Ministérios

| Método | Rota                   | Acesso  | Descrição                  |
|--------|------------------------|---------|----------------------------|
| GET    | `/ministries`          | Público | Listar ministérios ativos  |
| GET    | `/ministries/{slug}`   | Público | Detalhes de um ministério  |
| POST   | `/ministries`          | Admin   | Criar ministério           |
| PUT    | `/ministries/{id}`     | Admin   | Atualizar ministério       |
| DELETE | `/ministries/{id}`     | Admin   | Desativar ministério       |

### 4.2 Eventos

| Método | Rota                      | Acesso  | Descrição                       |
|--------|---------------------------|---------|----------------------------------|
| GET    | `/events`                 | Público | Listar eventos futuros ativos    |
| GET    | `/events/{id}`            | Público | Detalhes de um evento            |
| GET    | `/events?type=WEEKLY`     | Público | Filtrar por tipo                 |
| GET    | `/events?month=2026-04`   | Público | Filtrar por mês (calendário)     |
| POST   | `/events`                 | Admin   | Criar evento                     |
| PUT    | `/events/{id}`            | Admin   | Atualizar evento                 |
| DELETE | `/events/{id}`            | Admin   | Desativar evento                 |

### 4.3 Equipe Pastoral

| Método | Rota              | Acesso  | Descrição                       |
|--------|-------------------|---------|----------------------------------|
| GET    | `/team`           | Público | Listar membros ativos            |
| GET    | `/team/{id}`      | Público | Detalhes de um membro            |
| POST   | `/team`           | Admin   | Adicionar membro                 |
| PUT    | `/team/{id}`      | Admin   | Atualizar membro                 |
| DELETE | `/team/{id}`      | Admin   | Desativar membro                 |

### 4.4 Contato

| Método | Rota                  | Acesso  | Descrição                       |
|--------|-----------------------|---------|----------------------------------|
| POST   | `/contact`            | Público | Enviar mensagem de contato       |
| GET    | `/contact`            | Admin   | Listar mensagens recebidas       |
| PATCH  | `/contact/{id}/read`  | Admin   | Marcar como lida                 |

### 4.5 Configurações do Site

| Método | Rota                  | Acesso  | Descrição                       |
|--------|-----------------------|---------|----------------------------------|
| GET    | `/settings`           | Público | Listar todas as configurações    |
| GET    | `/settings/{key}`     | Público | Buscar configuração por chave    |
| PUT    | `/settings/{key}`     | Admin   | Atualizar configuração           |

### 4.6 Autenticação

| Método | Rota              | Acesso  | Descrição                       |
|--------|-------------------|---------|----------------------------------|
| POST   | `/auth/login`     | Público | Login com e-mail e senha         |
| POST   | `/auth/refresh`   | Público | Renovar access token             |

### 4.7 Upload de Arquivos

| Método | Rota                       | Acesso | Descrição                       |
|--------|----------------------------|--------|----------------------------------|
| POST   | `/files/upload`            | Admin  | Upload de imagem (multipart)     |
| DELETE | `/files/{filename}`        | Admin  | Remover arquivo                  |

---

## 5. Storage — Arquivos e Imagens

### 5.1 Opções de Armazenamento

| Ambiente        | Solução                | Descrição                                    |
|-----------------|------------------------|----------------------------------------------|
| Desenvolvimento | MinIO (Docker)         | S3-compatible local, sem custo               |
| Produção        | Amazon S3 ou Cloudflare R2 | Escalável, CDN integrada               |

### 5.2 Organização dos Diretórios

```
church-site-bucket/
├── ministries/       # Imagens de capa dos ministérios
├── events/           # Imagens de capa dos eventos
├── team/             # Fotos da equipe pastoral
└── site/             # Logo, hero images, ícones
```

Upload restrito a usuários autenticados (admin) via `POST /api/files/upload`.

---

## 6. Tarefas Agendadas (Scheduled Tasks)

### 6.1 Limpeza de Eventos Passados

```java
@Component
public class EventCleanupTask {

    @Scheduled(cron = "0 0 2 * * MON") // toda segunda às 02:00
    public void deactivatePastEvents() {
        eventRepository.deactivateEventsBeforeDate(ZonedDateTime.now());
    }
}
```

### 6.2 Notificação de Contato por E-mail

```java
@Component
public class ContactNotificationListener {

    @EventListener
    public void onContactMessageCreated(ContactMessageCreatedEvent event) {
        mailService.sendNotification(
            adminEmail,
            "Nova mensagem de contato: " + event.getSubject(),
            event.getMessage()
        );
    }
}
```

---

## 7. Variáveis de Ambiente

### 7.1 Backend (Spring Boot — `application.yml`)

```yaml
spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:churchdb}
    username: ${DB_USER:postgres}
    password: ${DB_PASSWORD:postgres}
  jpa:
    hibernate:
      ddl-auto: validate
    open-in-view: false
  mail:
    host: ${SMTP_HOST}
    port: ${SMTP_PORT:587}
    username: ${SMTP_USER}
    password: ${SMTP_PASSWORD}

app:
  jwt:
    secret: ${JWT_SECRET}
    access-expiration: 3600000    # 1 hora
    refresh-expiration: 604800000 # 7 dias
  storage:
    type: ${STORAGE_TYPE:s3}      # s3 | minio
    bucket: ${S3_BUCKET:church-site-bucket}
    endpoint: ${S3_ENDPOINT:}     # apenas para MinIO
    access-key: ${S3_ACCESS_KEY}
    secret-key: ${S3_SECRET_KEY}
  admin:
    email: ${ADMIN_NOTIFICATION_EMAIL}
```

### 7.2 Frontend (Vite)

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 8. Estrutura do Projeto Spring Boot

```
church-api/
├── pom.xml
├── Dockerfile
├── docker-compose.yml            # PostgreSQL + MinIO + App
├── src/main/java/com/church/
│   ├── ChurchApplication.java
│   ├── config/
│   │   ├── SecurityConfig.java
│   │   ├── CorsConfig.java
│   │   ├── StorageConfig.java
│   │   └── OpenApiConfig.java
│   ├── auth/
│   │   ├── AuthController.java
│   │   ├── AuthService.java
│   │   ├── JwtService.java
│   │   ├── JwtAuthenticationFilter.java
│   │   └── dto/
│   │       ├── LoginRequest.java
│   │       ├── LoginResponse.java
│   │       └── RefreshRequest.java
│   ├── ministry/
│   │   ├── Ministry.java          # Entity
│   │   ├── MinistryRepository.java
│   │   ├── MinistryService.java
│   │   ├── MinistryController.java
│   │   └── dto/
│   │       ├── MinistryRequest.java
│   │       └── MinistryResponse.java
│   ├── event/
│   │   ├── Event.java
│   │   ├── EventType.java         # Enum
│   │   ├── EventRepository.java
│   │   ├── EventService.java
│   │   ├── EventController.java
│   │   ├── EventCleanupTask.java
│   │   └── dto/
│   │       ├── EventRequest.java
│   │       └── EventResponse.java
│   ├── team/
│   │   ├── PastoralMember.java
│   │   ├── PastoralMemberRepository.java
│   │   ├── TeamService.java
│   │   ├── TeamController.java
│   │   └── dto/
│   │       ├── MemberRequest.java
│   │       └── MemberResponse.java
│   ├── contact/
│   │   ├── ContactMessage.java
│   │   ├── ContactMessageRepository.java
│   │   ├── ContactService.java
│   │   ├── ContactController.java
│   │   ├── ContactMessageCreatedEvent.java
│   │   ├── ContactNotificationListener.java
│   │   └── dto/
│   │       └── ContactRequest.java
│   ├── settings/
│   │   ├── SiteSetting.java
│   │   ├── SiteSettingRepository.java
│   │   ├── SettingsService.java
│   │   ├── SettingsController.java
│   │   └── dto/
│   │       └── SettingRequest.java
│   ├── storage/
│   │   ├── StorageService.java
│   │   ├── S3StorageService.java
│   │   └── FileController.java
│   └── common/
│       ├── BaseEntity.java        # id, createdAt, updatedAt
│       └── exception/
│           ├── GlobalExceptionHandler.java
│           └── ResourceNotFoundException.java
└── src/main/resources/
    ├── application.yml
    ├── application-dev.yml
    ├── application-prod.yml
    └── db/migration/              # Flyway migrations
        ├── V1__create_ministries.sql
        ├── V2__create_events.sql
        ├── V3__create_pastoral_team.sql
        ├── V4__create_contact_messages.sql
        ├── V5__create_site_settings.sql
        └── V6__create_admin_user.sql
```

---

## 9. Docker Compose (Desenvolvimento)

```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: churchdb
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"

  api:
    build: .
    depends_on: [db, minio]
    environment:
      DB_HOST: db
      DB_NAME: churchdb
      DB_USER: postgres
      DB_PASSWORD: postgres
      JWT_SECRET: dev-secret-change-in-production
      STORAGE_TYPE: minio
      S3_ENDPOINT: http://minio:9000
      S3_ACCESS_KEY: minioadmin
      S3_SECRET_KEY: minioadmin
      S3_BUCKET: church-site-bucket
    ports:
      - "8080:8080"

volumes:
  pgdata:
```

---

## 10. Integração com o Frontend

### 10.1 Alterações no Frontend React

Substituir os dados mock por chamadas HTTP usando `fetch` ou `axios`:

```typescript
// src/lib/api.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const api = {
  getMinistries: () => fetch(`${API_BASE}/ministries`).then(r => r.json()),
  getEvents: (params?: URLSearchParams) =>
    fetch(`${API_BASE}/events?${params}`).then(r => r.json()),
  getTeam: () => fetch(`${API_BASE}/team`).then(r => r.json()),
  getSettings: () => fetch(`${API_BASE}/settings`).then(r => r.json()),
  sendContact: (data: ContactRequest) =>
    fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),
};
```

### 10.2 CORS

Configurar no Spring Boot para aceitar requisições do frontend:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins("http://localhost:5173") // Vite dev
            .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

---

## 11. Prioridade de Implementação

1. **Fase 1 — Setup:** Projeto Spring Boot, Docker Compose, entidades JPA, migrations Flyway, CORS.
2. **Fase 2 — API pública:** Controllers GET para ministérios, eventos, equipe e configurações. Conectar frontend.
3. **Fase 3 — Contato:** `POST /api/contact` + notificação por e-mail.
4. **Fase 4 — Autenticação:** Spring Security + JWT, login de admin.
5. **Fase 5 — Admin CRUD:** Endpoints POST/PUT/DELETE para todas as entidades.
6. **Fase 6 — Storage:** Upload de imagens via S3/MinIO.
7. **Fase 7 — Painel admin no frontend:** Tela de login, CRUD de eventos/ministérios, leitura de mensagens.
