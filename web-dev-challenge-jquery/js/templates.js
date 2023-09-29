import { formatBrandUrl } from "./utils.js";
import { urlLocationHandler } from "./router.js";
import { getFullProducts } from "./fetch.js";

// Render the product information for the PDP Page
export async function appendDataToPDP(product, html) {
  const products = await getFullProducts();
  const beer = products.find((beer) => {
    return product.id == beer.id;
  });

  // Select the proper IDs and change the values with the given data
  $("#product-detail-name").text(beer.brand);
  $("#product-detail-image").attr("src", ".." + beer.image);
  $("#product-detail-price").text("$" + beer.prices[0].price);
  $("#product-detail-stock").text("Origin: " + beer.origin + " | " + "Stock: " + beer.prices[0].stock);
  $("#product-detail-information").text(beer.information);

  $("#product-detail-skus").empty();
  // Create a button for each SKU and change the stock and price values
  $.each(beer.skus, function(index, sku) {
    const skuButton = $("<li>").addClass("mb-3");
    skuButton.html(html);
    skuButton.find("#product-detail-sku").text(sku.name);
    $("#product-detail-skus").append(skuButton);

    // Add onclick event to each SKU button to change the stock and price values
    skuButton.on("click", function(event) {
      event.preventDefault();
      $("#product-detail-price").text("$" + beer.prices[index].price);
      $("#product-detail-stock").text("Origin: " + beer.origin + " | " + "Stock: " + beer.prices[index].stock);
    });
  });
}

// Render the products information for the PLP Page
export function appendDataToHome(products, html) {
  const productContainer = $("#product-cards");

  // Create a product card for each product retrieved
  $.each(products, function(index, product) {
    const card = $("<a>");
    card.html(html);
    card.attr("href", formatBrandUrl(product.id, product.brand));
    card.find("#product-name").text(product.brand);
    card.find("#product-image").attr("src", ".." + product.image);
    card.find("#product-price").text("$" + product.prices[0].price);

    // Add onclick event to redirect the user to the PDP page
    card.on("click", function(event) {
      event.preventDefault();

      const newURL = $(this).attr("href");
      history.pushState({}, "", newURL);

      urlLocationHandler();
    });
    productContainer.append(card);
  });
}