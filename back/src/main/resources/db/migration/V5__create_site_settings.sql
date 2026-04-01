CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) NOT NULL UNIQUE,
    value JSONB,
    updated_at TIMESTAMP NOT NULL DEFAULT now()
);

INSERT INTO site_settings (key, value) VALUES
    ('church_name', '"Igreja Evangélica"'),
    ('address', '"Rua da Igreja, 123 - Centro"'),
    ('phone', '"(11) 1234-5678"'),
    ('email', '"contato@igreja.com"'),
    ('service_times', '[{"day": "Domingo", "times": ["09:00", "11:00"]}, {"day": "Quarta-feira", "times": ["19:00"]}]'),
    ('social_links', '{"facebook": "", "instagram": "", "youtube": ""}');
