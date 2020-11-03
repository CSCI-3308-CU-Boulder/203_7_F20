-- creates user profile table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR NOT NULL UNIQUE, 
    password VARCHAR NOT NULL, 
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE, 
    image_id INT,
    birthday DATE,
    num_bottles INT NOT NULL,
    level INT default 0,
    signupdate timestamp default current_timestamp
);

-- -- creates linking table to array of friends
CREATE TABLE IF NOT EXISTS friend_link (
    user_id INT NOT NULL, 
    friends_id_array int[], 
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS actions_link (
    user_id INT NOT NULL, 
    actions_id_array int[], 
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS achievments (
    user_id INT NOT NULL, 
    achievments_id_array int[], 
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE  IF NOT EXISTS achievments_list (
    achievments_id INT PRIMARY KEY NOT NULL, 
    achievment_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS actions_list (
    actions_id INT NOT NULL, 
    action_name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS company (
    company_id INT PRIMARY KEY NOT NULL,
    company_name VARCHAR(100) NOT NULL,
    description VARCHAR(1000),
    url VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS donations (
    user_id INT NOT NULL,
    company_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(company_id) REFERENCES company(company_id),
    amount DECIMAL NOT NULL,
    message VARCHAR(100)
);

