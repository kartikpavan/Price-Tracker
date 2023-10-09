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
      console.log(updatedPriceHistory);
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
