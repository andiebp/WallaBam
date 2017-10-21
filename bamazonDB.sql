drop database if exists bamazonDB;
create database bamazonDB;
use bamazonDB;
create table products (
item_id integer not null primary key,
product_name varchar(100) not null,
department_name varchar(100) null,
price decimal (10,2) not null default 0,
stock_quantity decimal (10,0) not null default 0
); 

