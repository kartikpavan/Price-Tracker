"use server";

import { scrapeAmazonProduct } from "../scraper";

export async function scrapeAndStoreProducts(productURL: string) {
  if (!productURL) return;

  try {
    // Scrape Product
    const scrapeProduct = await scrapeAmazonProduct(productURL);
    if (!scrapeProduct) return;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Failed to create/update Product: ${error.message}`);
  }
}
