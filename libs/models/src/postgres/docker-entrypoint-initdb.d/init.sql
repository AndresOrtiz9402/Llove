CREATE DATABASE users; 

\c users

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100) UNIQUE
);

INSERT INTO users (name, email) VALUES
  ('hola', 'alpha@example.com'),
  ('mundo', 'beta@example.com'),
  ('precioso', 'gamma@example.com');

