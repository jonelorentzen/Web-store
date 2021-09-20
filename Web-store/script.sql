USE dat310;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(20) NOT NULL,
  `price` int NOT NULL,
  `discount` int NOT NULL,
  `img` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `details` text NOT NULL,
  PRIMARY KEY(`product_id`)
);
CREATE TABLE `orders`(
  `order_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `street` varchar(20) NOT NULL,
  `city` varchar(20) NOT NULL,
  `postcode` int NOT NULL,
  PRIMARY KEY(`order_id`)
);
CREATE TABLE `order_row` (
  `row_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  `count` int NOT NULL,
  `size` varchar(20) NOT NULL,
  PRIMARY KEY(`row_id`),
  FOREIGN KEY(`product_id`) REFERENCES products(`product_id`),
  FOREIGN KEY(`order_id`) REFERENCES orders(`order_id`)
);
-- add insert to insert products
-- add create statement for orders and order_rows