/* =============================================================================
   EDIT THIS FILE TO RUN YOUR SHOP
   -----------------------------------------------------------------------------
   Everything the website needs — your WhatsApp number and your products —
   lives here. You never need to touch any other file to update prices,
   add a product, or change your number.
   ============================================================================= */

const CONFIG = {
  /* Your business WhatsApp number, with country code, digits only.
     South Africa is 27, then the number WITHOUT the leading 0.
     Example:  076 017 5956   ->   "27760175956"                                */
  whatsappNumber: "27XXXXXXXXX",        //  <-- EDIT ME

  currency: "R",
  businessName: "Excellent Venison",
  orderClosingLine: "Please confirm availability and delivery. Thank you!",
};

/* -----------------------------------------------------------------------------
   YOUR PRODUCTS
   -----------------------------------------------------------------------------
   Each product has:
     category  -> the top-level tab it appears under: "Beef", "Venison", "Pork"...
                  (the filter tabs on the site build themselves from these,
                   so adding a "Pork" product makes a "Pork" tab appear by itself)
     meat      -> the specific animal, used as the sub-heading: "Beef", "Kudu"...
     type      -> "Biltong", "Droëwors", "Sweet Chili Bites"...
     price     -> Rand per packet  (EDIT these to your real prices)
     image     -> a file inside images/products/

   TO ADD A PRODUCT: copy one block, paste it, change the details.
   TO CHANGE A PRICE: edit the "price" number.
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
    price: 45,                          //  <-- EDIT ME
    image: "images/products/beef-biltong.jpg",
    description: "Classic and familiar. Seasoned with salt and coriander, traditionally cured. A crowd-pleaser.",
  },
  {
    id: "beef-droewors",
    category: "Beef",
    meat: "Beef",
    type: "Droëwors",
    name: "Beef Droëwors",
    weight: "60g",
    price: 45,                          //  <-- EDIT ME
    image: "images/products/beef-droewors.jpg",
    description: "Premium beef, lightly seasoned with coriander and slowly dried to perfection. Made for every journey.",
  },
  {
    id: "beef-sweet-chili-bites",
    category: "Beef",
    meat: "Beef",
    type: "Sweet Chili Bites",
    name: "Beef Sweet Chili Bites",
    weight: "60g",
    price: 45,                          //  <-- EDIT ME
    image: "images/products/beef-sweet-chili-bites.jpg",
    description: "Tender beef with a sweet chilli glaze, balancing gentle heat with subtle sweetness.",
  },

  /* --------------------------- VENISON (Kudu) --------------------------- */
  {
    id: "kudu-biltong",
    category: "Venison",
    meat: "Kudu",
    type: "Biltong",
    name: "Kudu Biltong",
    weight: "60g",
    price: 55,                          //  <-- EDIT ME
    image: "images/products/kudu-biltong.jpg",
    description: "Lean kudu meat with a delicate game flavour, traditionally cured for exceptional taste.",
  },
  {
    id: "kudu-droewors",
    category: "Venison",
    meat: "Kudu",
    type: "Droëwors",
    name: "Kudu Droëwors",
    weight: "60g",
    price: 55,                          //  <-- EDIT ME
    image: "images/products/kudu-droewors.jpg",
    description: "Lean kudu meat, delicately seasoned and slowly dried for an authentic game experience.",
  },
  {
    id: "kudu-sweet-chili-bites",
    category: "Venison",
    meat: "Kudu",
    type: "Sweet Chili Bites",
    name: "Kudu Sweet Chili Bites",
    weight: "60g",
    price: 55,                          //  <-- EDIT ME
    image: "images/products/kudu-sweet-chili-bites.jpg",
    description: "Lean kudu meat paired with sweet chilli for a rich game flavour and gentle heat.",
  },

  /* --------------------------- VENISON (Springbok) --------------------------- */
  {
    id: "springbok-biltong",
    category: "Venison",
    meat: "Springbok",
    type: "Biltong",
    name: "Springbok Biltong",
    weight: "60g",
    price: 55,                          //  <-- EDIT ME
    image: "images/products/springbok-biltong.jpg",
    description: "Lean springbok with a refined game flavour, expertly seasoned and naturally air-dried.",
  },
  {
    id: "springbok-droewors",
    category: "Venison",
    meat: "Springbok",
    type: "Droëwors",
    name: "Springbok Droëwors",
    weight: "60g",
    price: 55,                          //  <-- EDIT ME
    image: "images/products/springbok-droewors.jpg",
    description: "Coarsely ground springbok, expertly seasoned and naturally air-dried. High in flavour, rich in character.",
  },
  {
    id: "springbok-sweet-chili-bites",
    category: "Venison",
    meat: "Springbok",
    type: "Sweet Chili Bites",
    name: "Springbok Sweet Chili Bites",
    weight: "60g",
    price: 55,                          //  <-- EDIT ME
    image: "images/products/springbok-sweet-chili-bites.jpg",
    description: "Premium springbok with a sweet chilli finish that complements its delicate game flavour.",
  },

  /* --------- Example for later — remove the surrounding comment to enable ------
  {
    id: "pork-biltong",
    category: "Pork",
    meat: "Pork",
    type: "Biltong",
    name: "Pork Biltong",
    weight: "60g",
    price: 45,
    image: "images/products/pork-biltong.jpg",
    description: "Your description here.",
  },
  ---------------------------------------------------------------------------- */
];
