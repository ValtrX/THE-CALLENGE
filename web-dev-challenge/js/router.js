import { urlRoutes } from "./routes.js";
import { getFullProducts } from "./fetch.js";
import { appendDataToHome, appendDataToPDP } from "./templates.js";

// create a function that handles the url location
export async function urlLocationHandler() {
  const location = window.location.pathname; // get the url path

  // if the path length is 0, set it to primary page route
  if (location.length === 0) {
    location = "/";
  }

  // Get list with all products and data
  const products = await getFullProducts();

  // Render the HTML templates
  await handleHtml(location, products);
}

async function handleHtml(location, products) {
  // get the route object from the urlRoutes object
  const route = urlRoutes[location];
  // get the html from the template
  const html = await fetch(route.template).then((response) => response.text());
  // set the content of the content div to the html
  document.getElementById("content").innerHTML = html;
  // set the title of the document to the title of the route
  document.title = route.title;
  // set the description of the document to the description of the route
  document
    .querySelector('meta[name="description"]')
    .setAttribute("content", route.description);

  // If it's the main page get product cards template and render it
  if (location === "/" || location === "/index.html") {
    const html = await fetch("../templates/productCard.html").then((response) =>
      response.text()
    );
    return appendDataToHome(products, html);
  }

  // If it's a PDP get the ID from the url
  const locationid = location.match(/\d+/);

  //get the skus template
  const skus = await fetch("../templates/skus.html").then((response) =>
    response.text()
  );

  // Find the correct product by the locationid to render it
  const product = products.find(
    (product) => product.id === Number(locationid[0])
  );

  // do the first render of the PDP
  await appendDataToPDP(product, skus);

  // Each 8 second PDP refresh and display new prices
  setInterval(async () => {
    await appendDataToPDP(product, skus);
  }, 5000);
}
