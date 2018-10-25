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
    diaplayItems();
  });

function diaplayItems() {
    
    // display all items availabel for sale in databse
    connection.query("SELECT * FROM  products", function(err, results) {
        if (err) throw err;
        console.table(results);
        
        purchasePrompt(results);
        // results.forEach(item => {
            // console.log(`ID: ${item.item_id}  Name: ${item.product_name}`);
            
        // });
   
    });
}

function purchasePrompt(inventory){
    inquirer.prompt([
        {
            type: "list",
            name: "confirmPurchase",
            message: "Would you like to buy something",
            choices: ["yes", "no"]

        }
    ])
    .then(function(answer) {
        if (answer.confirmPurchase == "yes") {

            customerInput(inventory);
        }

        else {
            console.log("Thank you for visting");
            process.exit(0);
        }
    })
}
function customerInput(inventory) {
    inquirer
        .prompt([
            {    // ask customer ID of product thet will like to buy
                name: "item_id",
                type: "input",
                message: "Enter the ID of item you would like to buy: ",
                validate: function(value){
                    return !isNaN(value) && value > 0
                }
            },

            {   // ask customer quatity of product thet will like to buy
                name: "quantity",
                type: "input",
                message: "Enter the quantity of item you would like to buy: ",
                validate: function(value){
                    return !isNaN(value) && value > 0
                }
            }

        ])
        .then(function(answer){
            // get quantity form results and check to see if there is  enough
            for (var i = 0; i < inventory.length; i++) {
                if (inventory[i].item_id == answer.item_id) {
                    var itemChosen = inventory[i];

                    
                }
            }
            if (itemChosen){
                if (answer.quantity <= itemChosen.stock_quantity) {
                    updateQuantity (answer.quantity, itemChosen);
                }

                else {
                    console.log("Insuffient quantity. Please choose another item");
                    diaplayItems();
                }

            }
            else {
                console.log("Sorry, we do not carry this item. Please choose another item from the list");
                diaplayItems();
            }

       

              
            
        
    });  
}

function updateQuantity(userQuantity, itemChosen) {
    let new_quantity = itemChosen.stock_quantity - userQuantity;
    
   var query1 = "UPDATE products SET stock_quantity = ? WHERE ?";
   connection.query(query1, [new_quantity, {item_id: itemChosen.item_id}], function(err, result){
       if (err) {
           console.log(err);
       }
       console.log(result.affectedRows);
       console.log(`Total purchase price is $: ${userQuantity * itemChosen.price}`);
        diaplayItems();
    });
}