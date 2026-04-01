CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    name VARCHAR(200) NOT NULL
);

-- Senha padrão: admin123 (BCrypt hash) — TROCAR EM PRODUÇÃO
INSERT INTO admin_users (email, password, name) VALUES
    ('admin@igreja.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrador');
