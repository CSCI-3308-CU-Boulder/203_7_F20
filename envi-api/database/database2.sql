-- creates user profile table
CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR NOT NULL, 
    password VARCHAR NOT NULL, 
    firstname VARCHAR NOT NULL, 
    lastname VARCHAR NOT NULL, 
    email VARCHAR NOT NULL, 
    birthday VARCHAR, 
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

