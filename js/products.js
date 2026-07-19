/* =============================================================================
   EDIT THIS FILE TO RUN YOUR SHOP
   -----------------------------------------------------------------------------
   Everything the website needs — your WhatsApp number and your products —
   lives here. You never need to touch any other file to update prices,
   add a product, mark something sold out, or change your number.
   ============================================================================= */

const CONFIG = {
  /* Your business WhatsApp number, with country code, digits only.
     South Africa is 27, then the number WITHOUT the leading 0.
     Example:  076 017 5956   ->   "27760175956"                                */
  whatsappNumber: "27832279481",        //  <-- EDIT ME (currently Derik's cell)

  currency: "R",
  businessName: "Excellent Venison",
  orderClosingLine: "Please confirm availability and delivery. Thank you!",

  /* Customers must order at least this many items in total before they can
     check out on WhatsApp. Change the number to adjust the minimum.          */
  minimumOrderItems: 10,

  /* Short delivery line shown on the site. Leave as "" to hide it.           */
  deliveryNote: "Free delivery in Centurion & Pretoria",
};

/* -----------------------------------------------------------------------------
   YOUR PRODUCTS
   -----------------------------------------------------------------------------
   Each product has:
     category    -> the top-level tab it appears under: "Beef", "Venison", "Pork"
                    (the filter tabs on the site build themselves from these)
     meat        -> the specific animal, used as the sub-heading: "Beef", "Kudu"
     type        -> "Biltong", "Droëwors", "Cabanossi"...
     price       -> Rand per packet  (EDIT these to your real prices)
     weight      -> e.g. "60g" or "80g"
     image       -> a file inside images/products/  (use the placeholder until
                    you have a real photo)
     description -> the short line shown on the FRONT of the card
     about       -> the tempting blurb shown on the BACK of the card (the photo
                    flips over on hover / tap). Keep it appealing, not technical —
                    ingredient / allergen detail lives on the packaging.
     soldOut     -> true or false. Set to true to show "(Sold Out)" and stop
                    people adding it to the cart. THIS IS HOW YOU MANAGE STOCK.

   TO ADD A PRODUCT:   copy one block, paste it, change the details.
   TO CHANGE A PRICE:  edit the "price" number.
   TO MARK SOLD OUT:   change  soldOut: false  to  soldOut: true
   ----------------------------------------------------------------------------- */
const PRODUCTS = [

  /* ---------------------------- BEEF ---------------------------- */
  {
    id: "beef-biltong",
    category: "Beef",
    meat: "Beef",
    type: "Biltong",
    name: "Beef Biltong",
    weight: "60g",
    price: 35,                          //  <-- EDIT ME
    image: "images/products/beef-biltong.jpg",
    description: "Classic and familiar. Seasoned with salt and coriander, traditionally cured. A crowd-pleaser.",
    about: "The one everyone reaches for. Deep, savoury and moreish — proper beef biltong that always disappears first.",
    soldOut: false,
  },
  {
    id: "beef-droewors",
    category: "Beef",
    meat: "Beef",
    type: "Droëwors",
    name: "Beef Droëwors",
    weight: "80g",
    price: 35,                          //  <-- EDIT ME
    image: "images/products/beef-droewors.jpg",
    description: "Premium beef, lightly seasoned with coriander and slowly dried to perfection. Made for every journey.",
    about: "Soft, rich and full of flavour. A road-trip and braai-day favourite that never lasts long in the bag.",
    soldOut: false,
  },
  {
    id: "beef-sweet-chili-bites",
    category: "Beef",
    meat: "Beef",
    type: "Sweet Chili Bites",
    name: "Beef Sweet Chili Bites",
    weight: "60g",
    price: 35,                          //  <-- EDIT ME
    image: "images/products/beef-sweet-chili-bites.jpg",
    description: "Tender beef with a sweet chilli glaze, balancing gentle heat with subtle sweetness.",
    about: "A little sweet, a little heat. Tender bites with a sticky sweet-chilli finish that keep you coming back.",
    soldOut: false,
  },

  /* --------------------------- VENISON (Kudu) --------------------------- */
  {
    id: "kudu-biltong",
    category: "Venison",
    meat: "Kudu",
    type: "Biltong",
    name: "Kudu Biltong",
    weight: "60g",
    price: 35,                          //  <-- EDIT ME
    image: "images/products/kudu-biltong.jpg",
    description: "Lean kudu meat with a delicate game flavour, traditionally cured for exceptional taste.",
    about: "Lean, tender and full of that distinctive kudu game flavour. A refined snack for true venison lovers.",
    soldOut: true,
  },
  {
    id: "kudu-droewors",
    category: "Venison",
    meat: "Kudu",
    type: "Droëwors",
    name: "Kudu Droëwors",
    weight: "80g",
    price: 35,                          //  <-- EDIT ME
    image: "images/products/kudu-droewors.jpg",
    description: "Lean kudu meat, delicately seasoned and slowly dried for an authentic game experience.",
    about: "Delicate game flavour in a soft, slow-dried wors. Rich, lean and unmistakably kudu.",
    soldOut: true,
  },
  {
    id: "kudu-sweet-chili-bites",
    category: "Venison",
    meat: "Kudu",
    type: "Sweet Chili Bites",
    name: "Kudu Sweet Chili Bites",
    weight: "60g",
    price: 35,                          //  <-- EDIT ME
    image: "images/products/kudu-sweet-chili-bites.jpg",
    description: "Lean kudu meat paired with sweet chilli for a rich game flavour and gentle heat.",
    about: "Lean kudu with a gentle sweet-chilli kick. Game flavour and a touch of heat in every bite.",
    soldOut: true,
  },

  /* --------------------------- VENISON (Springbok) --------------------------- */
  {
    id: "springbok-biltong",
    category: "Venison",
    meat: "Springbok",
    type: "Biltong",
    name: "Springbok Biltong",
    weight: "60g",
    price: 35,                          //  <-- EDIT ME
    image: "images/products/springbok-biltong.jpg",
    description: "Lean springbok with a refined game flavour, expertly seasoned and naturally air-dried.",
    about: "Prized springbok, air-dried the old way. Elegant, lean and deeply flavourful — a true taste of the veld.",
    soldOut: true,
  },
  {
    id: "springbok-droewors",
    category: "Venison",
    meat: "Springbok",
    type: "Droëwors",
    name: "Springbok Droëwors",
    weight: "80g",
    price: 35,                          //  <-- EDIT ME
    image: "images/products/springbok-droewors.jpg",
    description: "Coarsely ground springbok, expertly seasoned and naturally air-dried. High in flavour, rich in character.",
    about: "Coarse, rich and full of character. Springbok wors with a bold game flavour that stands on its own.",
    soldOut: true,
  },
  {
    id: "springbok-sweet-chili-bites",
    category: "Venison",
    meat: "Springbok",
    type: "Sweet Chili Bites",
    name: "Springbok Sweet Chili Bites",
    weight: "60g",
    price: 35,                          //  <-- EDIT ME
    image: "images/products/springbok-sweet-chili-bites.jpg",
    description: "Premium springbok with a sweet chilli finish that complements its delicate game flavour.",
    about: "Delicate springbok meets sweet chilli. Refined game flavour with a moreish sweet-and-spicy edge.",
    soldOut: true,
  },

  /* ---------------------------- PORK ----------------------------
     New range — placeholder names, prices and photos. Edit the names to match
     exactly what you make, set real prices, replace the placeholder image with
     a real photo, then flip soldOut to false when they're ready to sell.      */
  {
    id: "pork-cabanossi",
    category: "Pork",
    meat: "Pork",
    type: "Cabanossi",
    name: "Cabanossi",
    weight: "100g",
    price: 35,                          //  <-- EDIT ME (placeholder)
    image: "images/products/placeholder.jpg",
    description: "Smoked, dried pork sausage — savoury and snackable.",
    about: "Smoky, savoury and hard to put down. A classic dried sausage that's made for sharing (or not).",
    soldOut: true,
  },
  {
    id: "pork-cherry-cabanossi",
    category: "Pork",
    meat: "Pork",
    type: "Cabanossi",
    name: "Cherry Cabanossi",
    weight: "100g",
    price: 35,                          //  <-- EDIT ME (placeholder)
    image: "images/products/placeholder.jpg",
    description: "Our cabanossi with a subtle sweet, cherry-tinged twist.",
    about: "Smoky cabanossi with a hint of sweetness. Moreish, a little different, and easy to love.",
    soldOut: true,
  },
  {
    id: "pork-salami-sticks",
    category: "Pork",
    meat: "Pork",
    type: "Salami",
    name: "Salami Sticks",
    weight: "100g",
    price: 35,                          //  <-- EDIT ME (placeholder)
    image: "images/products/placeholder.jpg",
    description: "Bold, well-spiced salami in a grab-and-go stick.",
    about: "Big flavour, easy snacking. Well-spiced salami sticks you can drop in a lunchbox or a pocket.",
    soldOut: true,
  },
];
