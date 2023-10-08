import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";

export async function scrapeAmazonProduct(productURL: string) {
  if (!productURL) return;
  // BrightData API PROXY SETTINGS
  const username: string = String(process.env.BRIGHT_DATA_USERNAME);
  const password: string = String(process.env.BRIGHT_DATA_PASSWORD);
  const port: number = 22225;
  const session_id = (10000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${username}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnauthorized: false,
  };
  try {
    // scraping the data using Bright_data_Proxy
    const { data } = await axios.get(productURL, options);
    // Parsing the HTML/JS/CSS
    const $ = cheerio.load(data);

    const productTitle = $("#productTitle").text().trim();
    const currentPrice = extractPrice(
      $(".priceToPay span.a-price-whole"),
      $("a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen")
    );
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";
    const images = $("#landingImage").attr("data-a-dynamic-image") || "{}";
    const productImageURLs = Object.keys(JSON.parse(images));
    const currency = extractCurrency($(".a-price-symbol"));
    const discountRate = $(".savingsPercentage").text().replace(/[-%]/g, "");
    const reviewCount = $(".averageStarRatingNumerical")
      .text()
      .replace(/[\D]/g, "");
    const stars = $(".AverageCustomerReviews").text().slice(0, 3);
    // console.log({
    //   productTitle,
    //   currentPrice,
    //   originalPrice,
    //   outOfStock,
    //   productImageURLs,
    //   currency,
    //   discountRate,
    //   reviewCount,
    //   stars,
    // });
    // data object
    const productData = {
      productURL,
      productTitle,
      currency: currency || "₹",
      image: productImageURLs[0],
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      discountRate: Number(discountRate),
      reviewCount: Number(reviewCount) || 100,
      stars: Number(stars) || 4,
      isOutOfStock: outOfStock,
      category: "category",
      priceHistory: [],
      lowesetPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    };
    console.log(productData);
    return productData;
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`BRIGHT_DATA_PRODUCT_FETCH_FAIL:${error.message}`);
  }
}
