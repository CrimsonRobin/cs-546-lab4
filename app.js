/*

Create a product of your choice.
Log the newly created product. (Just that product, not all products)
Create another product of your choice.
Query all products, and log them all
Create the 3rd product of your choice.
Log the newly created 3rd product. (Just that product, not all product)
Rename the first product
Log the first product with the updated name. 
Remove the second product you created.
Query all products, and log them all
Try to create a product with bad input parameters to make sure it throws errors.
Try to remove a product that does not exist to make sure it throws errors.
Try to rename a product that does not exist to make sure it throws errors.
Try to rename a product passing in invalid data for the newProductName parameter to make sure it throws errors.
Try getting a product by ID that does not exist to make sure it throws errors.

*/
import * as products from "./data/products.js";
import {dbConnection, closeConnection} from './mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

let cpu = undefined;
let gpu = undefined;
let monitor = undefined;

cpu = await products.create("i7-10700k", "Intel CPU", "12345678", 411, "Intel", 
"http://www.intel.com/content/www/us/en/homepage.html", ["CPU", "Intel", "i7", "10700k", "central processing unit", "pc"], 
["Electronics", "CPU", "Processors", "Intel Core"], "04/10/2020", false);

console.log(cpu);

gpu = await products.create("RTX 3070", "Nvidia GPU for Gamers", "23456789", 599.99, "Nvidia", 
"http://www.nvidia.com/en-us/", ["RTX", "GPU", "Gaming"], ["GPU", "Electronics", "GeForce"], "09/17/2020", false);

const allProducts = await products.getAll();
console.log(allProducts);

monitor = await products.create();

await closeConnection();