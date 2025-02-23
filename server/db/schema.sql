-- DROP DATABASE
DROP DATABASE IF EXISTS authUser_db;

-- CREATE DATABASE
CREATE DATABASE authUser_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  sku VARCHAR(50) UNIQUE NOT NULL,
  category VARCHAR(50),
  image TEXT,
  createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE WORK_SESSION (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    clock_in TIMESTAMP NOT NULL,
    clock_out TIMESTAMP,
    total_hours INTERVAL DEFAULT '0 hours'
);

