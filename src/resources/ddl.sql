CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    registration VARCHAR(11) NOT NULL,
    type ENUM('STUDENT', 'TEACHER') NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(60) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(250),
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(30) NOT NULL,
    `condition` ENUM('NEW', 'USED', 'PARTIALLY_FUNCTIONAL') NOT NULL
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updated_at TIMESTAMP,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE material_lists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    semester INT NOT NULL,
    discipline VARCHAR(30) NOT NULL,
    teacher_id INT NOT NULL,
    active BOOLEAN NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES users(id)
);

CREATE TABLE material_lists_itens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(250) NOT NULL,
    mandatory BOOLEAN NOT NULL,
    material_list_id INT NOT NULL,
    FOREIGN KEY (material_list_id) REFERENCES material_lists(id)
);
