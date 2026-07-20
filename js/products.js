/* =============================================================================
   SHOP DATA LOADER
   -----------------------------------------------------------------------------
   Your content is NO LONGER hardcoded here. It now lives in two data files that
   the admin panel (/admin) edits for you:

       data/settings.json  — WhatsApp number, delivery note, minimums, range names
       data/products.json  — the product list (name, price, stock, image, etc.)

   This file just loads those, then the app starts. You normally never edit this.
   (You CAN still edit the two JSON files by hand if you ever want to.)
   ============================================================================= */

let CONFIG = {};
let PRODUCTS = [];

// Kicks off as soon as the page loads; app.js waits for this before rendering.
const DATA_READY = (async function loadShopData() {
  try {
    const [settings, products] = await Promise.all([
      fetch("data/settings.json").then((r) => r.json()),
      fetch("data/products.json").then((r) => r.json()),
    ]);
    CONFIG = settings;
    PRODUCTS = products;
    // Give each product a stable id (range + name) for the cart & buttons.
    PRODUCTS.forEach((p) => {
      if (!p.id) {
        p.id = (p.range + "-" + p.name).toLowerCase()
          .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      }
    });
  } catch (e) {
    console.error("Could not load shop data:", e);
  }
  return { CONFIG, PRODUCTS };
})();
