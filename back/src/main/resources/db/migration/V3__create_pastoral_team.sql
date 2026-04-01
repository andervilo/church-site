CREATE TABLE pastoral_team (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(200) NOT NULL,
    role VARCHAR(200),
    bio TEXT,
    photo_url TEXT,
    email VARCHAR(200),
    office_hours VARCHAR(200),
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE pastoral_member_expertise (
    member_id UUID NOT NULL REFERENCES pastoral_team(id) ON DELETE CASCADE,
    expertise VARCHAR(255) NOT NULL
);
