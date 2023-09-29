import { formatBrandUrl } from "./utils.js";

const pageTitle = "Beer e-commerce";

// create an object that maps the url to the template, title, and description
export const urlRoutes = {
  "/": {
    template: "../templates/home.html",
    title: `Home | ${pageTitle}`,
    description: "This is the home page",
  },
  "/index.html": {
    template: "../templates/home.html",
    title: `Home | ${pageTitle}`,
    description: "This is the home page",
  },
};

// Dynamically create all the routes per product in database
export function addDynamicRoutes(products) {
  products.forEach((product) => {
    urlRoutes[formatBrandUrl(product.id, product.brand)] = {
      template: "../templates/productDetail.html",
      title: `${product.brand} | ${pageTitle}`,
      description: product.information,
    };
  });
}
