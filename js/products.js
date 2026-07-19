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
};

/* -----------------------------------------------------------------------------
   YOUR PRODUCTS
   -----------------------------------------------------------------------------
   Each product has:
     category    -> the top-level tab it appears under: "Beef", "Venison"...
                    (the filter tabs on the site build themselves from these)
     meat        -> the specific animal, used as the sub-heading: "Beef", "Kudu"
     type        -> "Biltong", "Droëwors", "Sweet Chili Bites"...
     price       -> Rand per packet  (EDIT these to your real prices)
     weight      -> e.g. "60g" or "80g"
     image       -> a file inside images/products/
     description -> the short line shown on the FRONT of the card
     ingredients -> shown on the BACK of the card (flips over on hover / tap)
     allergens   -> small print under the ingredients
     soldOut     -> true or false. Set to true to show "(Sold Out)" and stop
                    people adding it to the cart. Set back to false when it's
                    in stock again. THIS IS HOW YOU MANAGE STOCK.

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
    ingredients: "Beef, brown vinegar, salt, coriander, black pepper, sugar, Crown National Safari Biltong seasoning. Preservative: sodium nitrite (E250).",
    allergens: "May contain traces of soy and mustard. Contains sulphites.",
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
    ingredients: "Beef, brown vinegar, salt, coriander, black pepper, sugar, Crown National Safari Biltong seasoning. Preservative: sodium nitrite (E250).",
    allergens: "May contain traces of soy and mustard. Contains sulphites.",
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
    ingredients: "Beef, brown vinegar, salt, coriander, black pepper, sugar, sweet chilli, Crown National Safari Biltong seasoning. Preservative: sodium nitrite (E250).",
    allergens: "May contain traces of soy and mustard. Contains sulphites.",
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
    ingredients: "Lean kudu, brown vinegar, salt, coriander, black pepper, sugar, Crown National Safari Biltong seasoning. Preservative: sodium nitrite (E250).",
    allergens: "May contain traces of soy and mustard. Contains sulphites.",
    soldOut: false,
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
    ingredients: "Lean kudu, brown vinegar, salt, coriander, black pepper, sugar, Crown National Safari Biltong seasoning. Preservative: sodium nitrite (E250).",
    allergens: "May contain traces of soy and mustard. Contains sulphites.",
    soldOut: false,
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
    ingredients: "Lean kudu, brown vinegar, salt, coriander, black pepper, sugar, sweet chilli, Crown National Safari Biltong seasoning. Preservative: sodium nitrite (E250).",
    allergens: "May contain traces of soy and mustard. Contains sulphites.",
    soldOut: false,
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
    ingredients: "Lean springbok, brown vinegar, salt, coriander, black pepper, sugar, Crown National Safari Biltong seasoning. Preservative: sodium nitrite (E250).",
    allergens: "May contain traces of soy and mustard. Contains sulphites.",
    soldOut: false,
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
    ingredients: "Lean springbok, brown vinegar, salt, coriander, black pepper, sugar, Crown National Safari Biltong seasoning. Preservative: sodium nitrite (E250).",
    allergens: "May contain traces of soy and mustard. Contains sulphites.",
    soldOut: false,
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
    ingredients: "Lean springbok, brown vinegar, salt, coriander, black pepper, sugar, sweet chilli, Crown National Safari Biltong seasoning. Preservative: sodium nitrite (E250).",
    allergens: "May contain traces of soy and mustard. Contains sulphites.",
    soldOut: false,
  },

  /* --------- Example for later — remove the surrounding comment to enable ------
  {
    id: "pork-biltong",
    category: "Pork",
    meat: "Pork",
    type: "Biltong",
    name: "Pork Biltong",
    weight: "60g",
    price: 35,
    image: "images/products/pork-biltong.jpg",
    description: "Your description here.",
    ingredients: "Pork, brown vinegar, salt, coriander, black pepper, sugar, Crown National Safari Biltong seasoning. Preservative: sodium nitrite (E250).",
    allergens: "May contain traces of soy and mustard. Contains sulphites.",
    soldOut: false,
  },
  ---------------------------------------------------------------------------- */
];
