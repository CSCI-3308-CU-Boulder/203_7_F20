-- WARNING: THIS FILE WILL ERASE ALL DATABASE CONTENTS --

-- DROP DATABASE IF EXISTS envi;
-- DROP USER IF EXISTS envi_api_user;

-- CREATE USER envi_api_user;
-- CREATE DATABASE envi WITH OWNER envi_api_user;

-- USE DATABASE envi;

-- creates user profile table
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL, 
    username VARCHAR NOT NULL UNIQUE, 
    password VARCHAR NOT NULL,

    email_verified BOOLEAN NOT NULL DEFAULT FALSE,

    email VARCHAR NOT NULL UNIQUE, 
    name VARCHAR NOT NULL,
    birthday DATE,
    
    bio VARCHAR,
    image_id INT,
    impact_points INT NOT NULL DEFAULT 0,
    
    last_login_date TIMESTAMP DEFAULT NULL,
    updated_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users OWNER TO envi_api_user;

-- creates friends_link table which associates a user with another user (friend that they follow)
DROP TABLE IF EXISTS friends_link;
CREATE TABLE friends_link (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    friend_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (friend_id) REFERENCES users(id),

    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE friends_link OWNER TO envi_api_user;

-- creates achievments table
DROP TABLE IF EXISTS achievments;
CREATE TABLE achievments (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),

    name VARCHAR(20) NOT NULL,
    description VARCHAR(50),
    image_id INT,

    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE achievments OWNER TO envi_api_user;

-- create enum for task types
CREATE TYPE TASK_IMPACT AS ENUM ('reduce', 'reuse', 'recycle');

-- create tasks table
DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY NOT NULL, 
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),

    name VARCHAR(20) NOT NULL,
    description VARCHAR(100),
    impact TASK_IMPACT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,

    completion_date TIMESTAMP DEFAULT NULL,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE tasks OWNER TO envi_api_user;

-- create companies table
DROP TABLE IF EXISTS companies;
CREATE TABLE companies (
    id SERIAL PRIMARY KEY NOT NULL,

    name VARCHAR(100) NOT NULL,
    description VARCHAR(1000),
    url VARCHAR(100),

    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE companies OWNER TO envi_api_user;

DROP TABLE IF EXISTS donations;
CREATE TABLE donations (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(company_id) REFERENCES companies(id),

    amount DECIMAL NOT NULL,
    message VARCHAR(100),
    completed BOOLEAN NOT NULL DEFAULT TRUE,

    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE donations OWNER TO envi_api_user;

