# Church Site

Site institucional para igreja com frontend React e backend Spring Boot.

## Estrutura

```
├── front/          # Frontend React + TypeScript + Vite
├── back/           # Backend Spring Boot 3 + Java 21
├── docs/           # Documentação e especificações
└── docker-compose.yml
```

## Pré-requisitos

- **Frontend:** Node.js 18+
- **Backend:** Java 21, Maven 3.9+
- **Infraestrutura:** Docker e Docker Compose

## Início Rápido

### Com Docker Compose (backend + banco + storage)

```bash
docker compose up -d
```

Isso sobe: PostgreSQL (5432), MinIO (9000/9001) e API (8080).

### Frontend (desenvolvimento)

```bash
cd front
npm install
npm run dev
```

Acesse em `http://localhost:5173`.

### Backend (desenvolvimento local)

```bash
cd back
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

API disponível em `http://localhost:8080`. Swagger UI em `http://localhost:8080/swagger-ui.html`.

## Documentação

- [Especificação do Backend](docs/backend-spec.md)
