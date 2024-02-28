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
import {dbConnection, closeConnection} from './config/mongoConnection.js';

const db = await dbConnection();
await db.dropDatabase();

let cpu = undefined;
let gpu = undefined;
let monitor = undefined;
let badProduct = undefined;

try {
    cpu = await products.create("i7-10700k", "Intel CPU", "12345678", 411, "Intel", 
    "http://www.intel.com", ["CPU", "Intel", "i7", "10700k", "central processing unit", "pc"], 
    ["Electronics", "CPU", "Processors", "Intel Core"], "04/10/2020", false);
    console.log("First Product has been created!");
    console.log("Log of First Product:");
    console.log(cpu);
} catch (error) {
    console.log(error.message);
}
try {
    gpu = await products.create("RTX 3070", "Nvidia GPU for Gamers", "23456789", 599.99, "Nvidia", 
    "http://www.nvidia.com", ["RTX", "GPU", "Gaming"], ["GPU", "Electronics", "GeForce"], "09/17/2020", false);
    console.log("Second Product has been created!");
} catch (error) {
    console.log(error.message);
}

try {
    const allProducts = await products.getAll();
    console.log("Log of all products:");
    console.log(allProducts);
} catch (error) {
    console.log(error.message);
}

try {
    monitor = await products.create("M27Q P Gaming Monitor", "World's first KVM monitor", "34567891", 299.99, "Gigabyte",
    "http://www.gigabyte.com", ["Free Sync Premium", "KVM", "HDR", "1ms", "165Hz"], ["IPS", "2560 x 1440", ], "04/29/2022", false);
    console.log("Third Product has been created.");
    console.log("Log of Third Product:");
    console.log(monitor);
} catch (error) {
    console.log(error.message);
}

try {
    cpu = await products.rename(cpu._id.toString(), "i9-10900k");
    console.log("Renamed Product:");
    console.log(cpu);
} catch (error) {
    console.error(error.message);
}

try {
    await products.remove(gpu._id.toString());
} catch (error) {
    console.error(error.message);
}

try {
    const allProducts = await products.getAll();
    console.log("Log of all products:");
    console.log(allProducts);
} catch (error) {
    console.log(error);
}

//Test Cases meant to throw Errors
try {
    badProduct = await products.create(90);
    console.log("You shouldn't be seeing this. Line 92");
} catch (error) {
    console.error(error.message);
}

try {
    badProduct = await products.create("Test", true, "test", 9, "test", "test", [], [], "", true);
    console.log("You shouldn't be seeing this. Line 99");
} catch (error) {
    console.error(error.message);
}

try {
    badProduct = await products.create("test", "test", "test", "badinput", "test", "test", [], [], "20", true);
    console.log("You shouldn't be seeing this. Line 106");
} catch (error) {
    console.error(error.message);
}

try {
    badProduct = await products.create("test", "test", "test", 99.99999, "test", "test", [], [], "20", true);
    console.log("You shouldn't be seeing this. Line 106");
} catch (error) {
    console.error(error.message);
}

try {
    badProduct = await products.create("test", "test", "test", 90, "tst", "badinput", [], [], "20", true);
    console.log("You shouldn't be seeing this. Line 113");
} catch (error) {
    console.error(error.message);
}

try {
    badProduct = await products.create("test", "test", "test", 90, "tst", "http://www.com", [], [], "20", true);
    console.log("You shouldn't be seeing this. Line 120");
} catch (error) {
    console.error(error.message);
}

try {
    badProduct = await products.create("test", "test", "test", 90, "tst", "http://www.abdc{}}}5667.com", [], [], "20", true);
    console.log("You shouldn't be seeing this. Line 127");
} catch (error) {
    console.error(error.message);
}

try {
    badProduct = await products.create("test", "test", "test", 90, "tst", "http://www.google.com", "badinput", [], "20", true);
    console.log("You shouldn't be seeing this. Line 134");
} catch (error) {
    console.error(error.message);
}

try {
    badProduct = await products.create("test", "test", "test", 90, "tst", "http://www.google.com", 
    ["Good input", "good input", 90, false], [], "20", true);
    console.log("You shouldn't be seeing this. Line 142");
} catch (error) {
    console.error(error.message);
}

try {
    badProduct = await products.create("test", "test", "test", 90, "tst", "http://www.google.com", ["Good input", "good input"], 
    ["good input"], "2020-10-02", true);
    console.log("You shouldn't be seeing this. Line 150");
} catch (error) {
    console.error(error.message);
}

try {
    badProduct = await products.create("test", "test", "test", 90, "tst", "http://www.google.com", ["Good input", "good input"], 
    ["good input"], "02/10/2020", 100);
    console.log("You shouldn't be seeing this. Line 158");
} catch (error) {
    console.error(error.message);
}

try {
    await products.remove("67890123");
    console.log("You shouldn't be seeing this. Line 165");
} catch (error) {
    console.log(error.message);
}

try {
    await products.rename("5427652", "new name");
    console.log("You shouldn't be seeing this. Line 172");
} catch (error) {
    console.log(error.message);
}

try {
    await products.rename(monitor._id.toString(), 300);
    console.log("You shouldn't be seeing this. Line 179");
} catch (error) {
    console.log(error.message);
}

try {
    badProduct = await products.get("4444444");
    console.log("You shouldn't be seeing this. Line 186");
} catch (error) {
    console.error(error.message);
}

await closeConnection();