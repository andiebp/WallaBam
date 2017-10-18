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

//=======================================
//CODE BEGINS HERE
//=======================================


connection.connect();

//DISPLAYING PRODUCTS TO CUSTOMERS IN A TABLE FORMAT
connection.query('SELECT item_id AS "Item ID", product_name AS "Item Name",  CONCAT("$", FORMAT(price,2)) AS "Price" FROM products', function (err, res, fields) {
	if (err) throw err;
	console.log('');
	console.table(res);

	//CREATES AN ARRAY OF IDS FROM RES
	var ids = res.map(function (rowdata) {
		return rowdata['Item ID'];
	});
	console.log('');
	purchase(ids);
});

connection.end();

//PROMPTS USER TO PURCHASE A PRODUCT
function purchase(ids) {
	inquirer
		.prompt(
			[{
				name: "id",
				type: "input",
				message: "Which item would you like to buy? Please enter the ID.",
				validate: function (value) {

					//VALIDATES IF INPUT IS EMPTY
					if (value.trim() === "")
						return false;
					//VALIDATES IF INPUT IS A NUMBER
					if (isNaN(value) === true) {
						return false;
					}
					//PARSES ID STRING INTO INTEGER
					var id = parseInt(value);
					//VALIDATES -T OR F- IF ID IS INCLUDED IN IDS ARRAY
					return ids.includes(id);
				}
			}]
		)
}
