"use server";

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDb } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProducts(productURL: string) {
  if (!productURL) return;

  try {
    // connection to DB
    connectToDb();
    // Scrape Product
    const scrapeProduct = await scrapeAmazonProduct(productURL);

    if (!scrapeProduct) return;

    let product = scrapeProduct;
    // check for existing product
    const existingProduct = await Product.findOne({
      url: scrapeProduct.productURL,
    });
    // if existing product then update price history
    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapeProduct.currentPrice },
      ];
      product = {
        ...scrapeProduct,
        priceHistory: updatedPriceHistory,
        lowesetPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }
    // update product in db
    const newProduct = await Product.findOneAndUpdate(
      {
        url: scrapeProduct.productURL,
      },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Failed to create/update Product: ${error.message}`);
  }
}

export async function getProductById(productID: string) {
  try {
    connectToDb();
    const product = await Product.findOne({ _id: productID });
    if (!product) return null;
    return product;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

export async function getAllProducts() {
  try {
    connectToDb();
    const productList = await Product.find();
    if (!productList) return null;
    return productList;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}

export async function getSimilarProducts(productID: string) {
  try {
    connectToDb();
    const similarProducts = await Product.find({
      _id: { $ne: productID },
    }).limit(3);
    if (!similarProducts) return null;
    return similarProducts;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
}
