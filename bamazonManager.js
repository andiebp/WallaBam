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

connection.connect();

function managerMenu() {
	inquirer
		.prompt({
			name: "action",
			type: "list",
			message: "Which menu do you want to enter?",
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
