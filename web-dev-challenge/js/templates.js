import { formatBrandUrl } from "./utils.js";
import { urlLocationHandler } from "./router.js";
import { getFullProducts } from "./fetch.js";

// Render the product information for the PDP Page
export async function appendDataToPDP(product, html) {
  const products = await getFullProducts();
  const beer = products.find((beer) => {
    return product.id == beer.id;
  });

  // select the proper ids and change the values with the given data
  document.querySelector("#product-detail-name").innerText = beer.brand;
  document.querySelector("#product-detail-image").src = ".." + beer.image;
  document.querySelector("#product-detail-price").innerText =
    "$" + beer.prices[0].price;
  document.querySelector("#product-detail-stock").innerText =
    "Origin: " + beer.origin + " | " + "Stock: " + beer.prices[0].stock;
  document.querySelector("#product-detail-information").innerText =
    beer.information;

  document.querySelector("#product-detail-skus").innerHTML = "";
  // create a button for each sku and change the stock and price values
  beer.skus.map((sku, index) => {
    const skuButton = document.createElement("li");
    skuButton.classList.add("mb-3")
    skuButton.innerHTML = html;
    skuButton.querySelector("#product-detail-sku").innerText = sku.name;
    document.querySelector("#product-detail-skus").appendChild(skuButton);

    // add onclick event to each sku button to change the stock and price values
    skuButton.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#product-detail-price").innerText =
        "$" + beer.prices[index].price;
      document.querySelector("#product-detail-stock").innerText =
        "Origin: " + beer.origin + " | " + "Stock: " + beer.prices[index].stock;
    });
  });
}

//Render the products information for the PLP Page
export function appendDataToHome(products, html) {
  const productContainer = document.querySelector("#product-cards");

  // create a product card for each product retrieved
  products.map((product) => {
    const card = document.createElement("a");
    card.innerHTML = html;
    card.href = formatBrandUrl(product.id, product.brand);
    card.querySelector("#product-name").innerText = product.brand;
    card.querySelector("#product-image").src = ".." + product.image;
    card.querySelector("#product-price").innerText =
      "$" + product.prices[0].price;

    // add onclick event to redirect the user to the PDP page
    card.addEventListener("click", function (event) {
      event.preventDefault();

      const newURL = this.getAttribute("href"); // Obtiene la URL del atributo href
      history.pushState({}, "", newURL);

      urlLocationHandler();
    });
    productContainer.appendChild(card);
  });
}
