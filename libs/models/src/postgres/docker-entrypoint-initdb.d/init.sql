CREATE DATABASE users; 

\c users

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100) UNIQUE
  create_at TIMESTAMP
  deleted_at TIMESTAMP
);

INSERT INTO users (name, email, create_at) VALUES
  ('example', 'alpha@example.com', CURRENT_TIMESTAMP),

