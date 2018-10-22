var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    diaplayItems();
  });

function diaplayItems() {
    
    // display all items availabel for sale in databse
    connection.query("SELECT * FROM  products", function(err, results) {
        if (err) throw err;
        results.forEach(item => {
            console.log(`ID: ${item.item_id}  Name: ${item.product_name}`);
            
        });
    customerInput();
    });
}

function customerInput() {
    inquirer
        .prompt([
            {    // ask customer ID of product thet will like to buy
                name: "item_id",
                type: "input",
                message: "Enter the ID of item you would like to buy: "
            },

            {   // ask customer quatity of product thet will like to buy
                name: "quantity",
                type: "input",
                message: "Enter the quantity of item you would like to buy: "
            }

        ])
        .then(function(answer){
            // get quantity form databse and chekc to see if there is  enough
            var query = "SELECT stock_quantity, price FROM products WHERE ?";
            connection.query(query, { item_id: answer.item_id}, function(err, res) {
            console.log(`quantity available is: ${res[0].stock_quantity}`);
            console.log(`price per unit is: ${res[0].price}`);
            console.log(res);

            if (answer.quantity > res[0].stock_quantity) {
                console.log("Insufficeient quantity!");
            } else {

               let new_quantity = (res[0].stock_quantity) - (answer.quantity);
               console.log(`Total purchase price is: ${answer.quantity * (res[0].price)}`);
               console.log(`new quantity is: ${new_quantity}`);
              var query1 = "UPDATE products SET stock_quantity = 'new_quantity' WHERE ?";
              connection.query(query1, { item_id: answer.item_id}, function(err, result){
                  console.log(result.affectedRows);
                //   console.log(`Updated quantity is: ${result[0].stock_quantity}`);
              }); 
            }
        });
    });  
}