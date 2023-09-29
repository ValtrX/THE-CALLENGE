import { urlLocationHandler } from "./router.js";

$(document).ready(function() {
  // Add an event listener for URL changes
  $(window).on("popstate", function() {
    urlLocationHandler();
  });

  // Call the urlLocationHandler function to handle the initial URL
  urlLocationHandler();
});
