var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

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
    runTask();
  });

  function runTask() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          saleProducts();
          break;
  
        case "View Low Inventory":
          lowInventory();
          break;
  
        case "Add to Inventory":
          addInventory();
          break;
  
        case "Add New Product":
          addNewProduct();
          break;
        }
      });
  }

  function saleProducts () {
    // If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
    connection.query("SELECT * FROM  products", function(err, results) {
      if (err) throw err;
      console.table(results);
    });
}

  function lowInventory () {
    // If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
    var query = "SELECT * FROM  products WHERE stock_quantity <=5"
    connection.query(query, function(err, results) {
      if (err) throw err;
      console.table(results);
    });
  }

  function addInventory () {
    
    // If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
    inquirer
    .prompt([
        {    // ask manger ID of product that will need to update inventory
            name: "item_id",
            type: "input",
            message: "Enter the ID of item you would like to add invemtory for: ",
            validate: function(value){
                return !isNaN(value) && value > 0
            }
        },

        {   // ask customer quatity of product thet will like to add
            name: "quantity",
            type: "input",
            message: "Enter the quantity of item you would like to add: ",
            validate: function(value){
                return !isNaN(value) && value > 0
            }
        }

    ])
    .then(function(answer){
      connection.query("SELECT stock_quantity FROM  products WHERE ?", {item_id: answer.item_id}, function(err, results) {
        if (err) throw err;
        console.log(results);
        let x = results[0].stock_quantity + answer.quantity;
        console.log(x);
      });

      console.log(`Updating qunatity for item_id ${answer.item_id}`);
      
      var query1 = "UPDATE products SET stock_quantity = ? WHERE ?";
      connection.query(query1, [x, {item_id: answer.item_id}], function(err, res) {
          console.log(res.affectedRows + " products updated!\n");
          // Call deleteProduct AFTER the UPDATE completes
          
        });
    
     
    });
  
  }
  function addNewProduct () {
    // If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
  }