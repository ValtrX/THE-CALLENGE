import { urlRoutes } from "./routes.js";
import { getFullProducts } from "./fetch.js";
import { appendDataToHome, appendDataToPDP } from "./templates.js";

// Create a function that handles the URL location
export async function urlLocationHandler() {
  let location = window.location.pathname; // Get the URL path

  // If the path length is 0, set it to the primary page route
  if (location.length === 0) {
    location = "/";
  }

  // Get a list with all products and data
  const products = await getFullProducts();

  // Render the HTML templates
  await handleHtml(location, products);
}

async function handleHtml(location, products) {
  // Get the route object from the urlRoutes object
  const route = urlRoutes[location];

  // Get the HTML from the template using jQuery's $.ajax()
  const html = await $.ajax(route.template);

  // Set the content of the content div to the HTML
  $("#content").html(html);

  // Set the title of the document to the title of the route
  document.title = route.title;

  // Set the description of the document to the description of the route
  $('meta[name="description"]').attr("content", route.description);

  // If it's the main page, get the product cards template and render it
  if (location === "/" || location === "/index.html") {
    const productCardHtml = await $.ajax("../templates/productCard.html");
    return appendDataToHome(products, productCardHtml);
  }

  // If it's a PDP, get the ID from the URL
  const locationid = location.match(/\d+/);

  // Get the SKUs template using jQuery's $.ajax()
  const skus = await $.ajax("../templates/skus.html");

  // Find the correct product by the locationid to render it
  const product = products.find(
    (product) => product.id === Number(locationid[0])
  );

  // Do the first render of the PDP
  await appendDataToPDP(product, skus);

  // Every 8 seconds, refresh and display new prices for the PDP
  setInterval(async () => {
    await appendDataToPDP(product, skus);
  }, 8000); // Changed from 5000 to 8000 for 8 seconds interval
}