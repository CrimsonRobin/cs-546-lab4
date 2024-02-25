// TODO: Export and implement the following functions in ES6 format
import { products } from "../config/mongoCollections.js";
import * as helper from "../helpers.js";
import {isValid, isMatch} from "date-fns";
import {ObjectId} from "mongodb";

const create = async (
  productName,
  productDescription,
  modelNumber,
  price,
  manufacturer,
  manufacturerWebsite,
  keywords,
  categories,
  dateReleased,
  discontinued
) => {
  productName = helper.checkIfString(productName);
  productDescription = helper.checkIfString(productDescription);
  modelNumber = helper.checkIfString(modelNumber);
  manufacturer = helper.checkIfString(manufacturer);
  manufacturerWebsite = helper.checkIfString(manufacturerWebsite);
  dateReleased = helper.checkIfString(dateReleased);
  price = helper.checkIfPriceValid(price);

  if(manufacturerWebsite.toLowerCase().startsWith("http://www.") === false || manufacturerWebsite.toLowerCase().endsWith(".com") === false) {
    throw new Error("given website does not start with http:/www. or ends in .com");
  }
  if(manufacturerWebsite.length < 20) {
    throw new Error("given website is not at least 20 characters long.");
  }

  helper.checkIfValidArray(keywords);
  helper.checkIfValidArray(categories);
  

  if(isValid(new Date(dateReleased)) === false || isMatch(dateReleased, "MM/dd/yyyy")) {
    throw new Error("date released is not a valid date.");
  }

  if(typeof discontinued !== "boolean") {
    throw new Error("discontinued is not a boolean.");
  }

  let newProduct = {
  productName: productName,
  productDescription: productDescription,
  modelNumber: modelNumber,
  price: price,
  manufacturer: manufacturer,
  manufacturerWebsite: manufacturerWebsite,
  keywords: keywords,
  categories: categories,
  dateReleased: dateReleased,
  discontinued: discontinued
  };

  const productCollection = await products();
  const insertInfo = await productCollection.insertOne(newProduct);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
      throw new Error("could not add product.");
    }

    const newId = insertInfo.insertedId.toString();

    const product = await this.get(newId);
    return product;

};

const getAll = async () => {};

const get = async (id) => {};

const remove = async (id) => {};

const rename = async (id, newProductName) => {};

export {create, getAll, get, remove, rename}