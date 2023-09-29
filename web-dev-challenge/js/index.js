import { urlLocationHandler } from "./router.js";

// add an event listener to the window that watches for url changes
window.onpopstate = urlLocationHandler;

// call the urlLocationHandler function to handle the initial url
urlLocationHandler();
