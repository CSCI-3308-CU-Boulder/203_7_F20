-- creates user profile table
CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR NOT NULL UNIQUE, 
    password VARCHAR NOT NULL, 
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL UNIQUE, 
    image_id INT,
    birthday DATE,
    num_bottles INT NOT NULL,
    level INT default = 0,
    signupdate timestamp default current_timestamp
);

-- -- creates linking table to array of friends
CREATE TABLE friend_link (
    user_id INT NOT NULL, 
    friends_id_array int[], 
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE actions_link (
    user_id INT NOT NULL, 
    actions_id_array int[], 
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE achievments (
    user_id INT NOT NULL, 
    achievments_id_array int[], 
    FOREIGN KEY(user_id) REFERENCES users(id)
);

CREATE TABLE  achievments_list (
    achievments_id INT PRIMARY KEY NOT NULL, 
    achievment_name VARCHAR NOT NULL
);

CREATE TABLE actions_list (
    actions_id INT NOT NULL, 
    action_name VARCHAR NOT NULL
);

