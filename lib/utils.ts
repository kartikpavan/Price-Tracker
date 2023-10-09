export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) return priceText.replace(/\D/g, "");
  }
  return "";
}

export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

export function getLowestPrice(priceHistory: any) {
  let lowestPrice = priceHistory[0];
  for (let i = 0; i < priceHistory.length; i++) {
    if (priceHistory[i].price < lowestPrice.price) {
      lowestPrice = priceHistory[i];
    }
  }
  return lowestPrice.price;
}

export function getHighestPrice(priceHistory: any) {
  let highestPrice = priceHistory[0];
  for (let i = 0; i < priceHistory.length; i++) {
    if (priceHistory[i].price > highestPrice.price) {
      highestPrice = priceHistory[i];
    }
  }
  return highestPrice.price;
}

export function getAveragePrice(priceHistory: any) {
  const sum = priceHistory.reduce(
    (total: any, current: any) => total + current.price,
    0
  );
  const avgPrice = sum / priceHistory.length || 0;
  return avgPrice;
}
