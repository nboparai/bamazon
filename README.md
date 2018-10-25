# bamazon app takes in orders from customers and deplete stock from the store's inventory.

Components:

- MySQL Database called bamazon.
- Table inside of that database called products.
 -- products table has each of the following columns:
    -item_id (unique id for each product)
    -product_name (Name of product)
    -department_name
    -price (cost to customer)
    -stock_quantity (how much of the product is available in stores)

Application: 
     -ask user the ID of the product they would like to buy.
    - ask how many units of the product they would like to buy.
    -Once the customer has placed the order, your application checks if store has enough of the     product to meet the customer's request.
    -   If not, the app would log a Insufficient quantity!, and then prevent the order from going through.
    -if store does have enough of the product, fulfill the customer's order.
    -This means updating the SQL database to reflect the remaining quantity.
    -Once the update goes through, show the customer the total cost of their purchase.