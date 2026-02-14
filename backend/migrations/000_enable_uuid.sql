CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--create priority enum
CREATE TYPE priority AS ENUM ('low', 'medium', 'high');