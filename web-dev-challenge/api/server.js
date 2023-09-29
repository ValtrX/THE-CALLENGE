import cors from "cors";
import products from "./products.js";
import stockPrices from "./stock-price.js";

import express from "express";
const app = express();
const port = 3000; // Port that the API server will be excecuted
app.use(cors());


// Every 8 Seconds the price of the first beer change
setInterval(() => {
  stockPrices['10167'].price++ 
}, 8000);

// Endpoint to get product price by code
app.get("/stockprice/:key", (req, res) => {
  const key = req.params.key;
  const response = stockPrices[key];
  if (response) {
    res.json(response);
  } else {
    res.status(404).json({ error: "Product stock and price not found" });
  }
});

// Endpoint to get product by id
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const response = products.find((product) => product.id === id);

  if (response) {
    res.json(response);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Get all products endpoint
app.get("/products/", (req, res) => {
  const response = products;
  if (response) {
    res.json(response);
  } else {
    res.status(404).json({ error: "Products not found" });
  }
});


// Initiate the server
app.listen(port, () => {
  console.log(`Listening server in port number: ${port}`);
});
