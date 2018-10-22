CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NOT NULL,
	price DECIMAL(10) NOT NULL,
    stock_quantity INT(10) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone charging cable", "electronics", 15, 250), 
	("USB Drive", "electronics", 25, 250), 
    ("crayons", "stationary", 2, 150), 
	("paint", "stationary", 5, 100), 
	("paper", "stationary", 10, 350), 
	("vitamin C", "health", 8.99, 550), 
	("bandages", "health", 2, 1050), 
	("baloons", "party-supplies", 3, 150), 
	("boots", "shoes", 39, 150), 
	("legos", "toys", 45, 50);