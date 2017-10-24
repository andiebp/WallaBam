//LOADING MODULES
var mysql = require('mysql');
var inquirer = require('inquirer');
var consoleTable = require('console.table');
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazonDB'
});

// CONNECTING TO DATABASE
connection.connect(function (err) {
	if (err) throw err;
	managerMenu();
});

//LOADING MANAGER MENU
function managerMenu() {
	inquirer
		.prompt({
			name: "action",
			type: "list",
			message: "Which menu do you want to access?",
			choices: [
			"View Products for Sale",
			"View Low Inventory",
			"Add to Inventory",
			"Add New Product"
		]
		})
		.then(function (answer) {
			switch (answer.action) {
				case "View Products for Sale":
					forSale();
					break;
				case "View Low Inventory":
					lowStock();
					break;
				case "Add to Inventory":
					addStock();
					break;
				case "Add New Product":
					addProduct();
					break;
			}
		});

}

//VIEW PRODUCTS FOR SALE
function forSale() {
	var query = connection.query("SELECT product_name AS Products FROM products",
		function (err, res, fields) {
			if (err) throw err;
			console.log("");
			console.table(res);
		});
	connection.end();
	managerMenu();
}

//VIEW LOW INVENTORY
function lowStock() {
	var query = connection.query("SELECT product_name AS Products, stock_quantity AS Stock FROM products WHERE stock_quantity < 5",
		function (err, res, fields) {
			if (err) throw err;
			console.log('');
			console.table(res);
		});
	connection.end();
	managerMenu();
}
