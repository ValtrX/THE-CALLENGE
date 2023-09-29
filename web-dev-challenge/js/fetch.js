import { addDynamicRoutes } from "./routes.js";
import { centToDollar } from "./utils.js";

// Get the products list from the API 
export async function fetchProducts() {
  const data = await fetch("http://localhost:3000/products/")
    .then((response) => response.json())
    .then((data) => {
      addDynamicRoutes(data);
      return data;
    })
    .catch((error) => {
      console.error("Error retrieving product list:", error);
    });

  return data;
}

// Get Product price by the sku code
export async function fetchPrices(code) {
  const data = await fetch(`http://localhost:3000/stockprice/${code}`)
    .then((response) => response.json())
    .then((priceData) => {
      return priceData;
    })
    .catch((error) => {
      console.error("Error retrieving product price:", error);
    });
  return data;
}

// Get products list with prices included
export async function getFullProducts() {
  const products = await fetchProducts();

  const fullProducts = await Promise.all(
    products.map(async (product) => {
      return {
        ...product,
        prices: await Promise.all(
          product.skus.map(async (sku) => {
            const prices = await fetchPrices(sku.code);
            return { sku: sku.code, price: prices.price, stock: prices.stock };
          })
        ),
      };
    })
  );
  return fullProducts.map((product) => {
    return {
      ...product,
      prices: product.prices.map((price) => {
        return { price: centToDollar(price.price), stock: price.stock };
      }),
    };
  });
}
