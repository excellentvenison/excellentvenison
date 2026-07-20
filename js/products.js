/* =============================================================================
   EDIT THIS FILE TO RUN YOUR SHOP
   -----------------------------------------------------------------------------
   Everything the website needs — your WhatsApp number, your ranges, and your
   products — lives here. You never need to touch any other file.
   ============================================================================= */

const CONFIG = {
  /* Business WhatsApp number: country code + number, digits only, no leading 0.
     076 017 5956  ->  "27760175956"                                            */
  whatsappNumber: "27832279481",        //  <-- EDIT ME (currently Derik's cell)

  currency: "R",
  businessName: "Excellent Venison",
  orderClosingLine: "Please confirm availability and delivery. Thank you!",

  /* Short line shown in the hero + cart. Leave "" to hide.                    */
  deliveryNote: "Free delivery in Pretoria, Centurion & Gauteng",
  /* Longer note added to the WhatsApp message.                                */
  deliveryPolicy: "Free delivery in Pretoria, Centurion & Gauteng. Areas outside may incur additional delivery charges.",

  /* The two shopping ranges. "key" matches each product's `range`.            */
  ranges: {
    dried: { label: "Dried & Cured",       short: "DRIED & CURED" },
    fresh: { label: "Fresh & Frozen Cuts", short: "FRESH & FROZEN CUTS" },
  },

  /* Ordering rules ---------------------------------------------------------- */
  driedMinPerProduct: 5,     // each dried product: at least this many packs
  driedMinTotalPacks: 20,    // whole dried order: at least this many packs
  freshMinValue:      450,   // whole fresh order: at least this rand value
};

/* -----------------------------------------------------------------------------
   YOUR PRODUCTS
   -----------------------------------------------------------------------------
   Fields:
     range       -> "dried" or "fresh"  (which shop range it belongs to)
     category    -> top-level tab inside the range: "Beef", "Venison", "Pork"
     meat        -> species / animal, used as the accordion heading under a
                    category ("Beef", "Kudu", "Springbok", "Warthog"...)
     type        -> "Biltong", "Droëwors", "Mince", "Wors", "Cheese Grillers"...
     price       -> Rand per pack (dried) or per unit (fresh)
     weight      -> pack/portion size shown on the card, e.g. "60g" or "1kg"
     unit        -> "pack" (dried) or "kg" (fresh) — used in the order message
     image       -> a file in images/products/ (use placeholder.jpg until you
                    have a real photo)
     description -> short line on the FRONT of the card
     about       -> tempting blurb on the BACK (photo flips on hover / tap)
     soldOut     -> true/false. true = "Sold Out" badge + can't be added.

   ADD A PRODUCT: copy a block, paste, edit. New animals/ranges appear by
   themselves — no redesign needed.
   ----------------------------------------------------------------------------- */
const PRODUCTS = [

  /* ===================================================================== *
   *  DRIED MEAT                                                           *
   * ===================================================================== */

  /* ---- Beef (dried) ---- */
  { range:"dried", category:"Beef", meat:"Beef", type:"Biltong", name:"Beef Biltong",
    weight:"60g", unit:"pack", price:35, image:"images/products/beef-biltong.jpg",
    description:"Classic and familiar. Seasoned with salt and coriander, traditionally cured.",
    about:"The one everyone reaches for. Deep, savoury and moreish — always disappears first.",
    soldOut:false },
  { range:"dried", category:"Beef", meat:"Beef", type:"Droëwors", name:"Beef Droëwors",
    weight:"80g", unit:"pack", price:35, image:"images/products/beef-droewors.jpg",
    description:"Premium beef, lightly seasoned and slowly dried to perfection.",
    about:"Soft, rich and full of flavour. A road-trip and braai-day favourite.",
    soldOut:false },
  { range:"dried", category:"Beef", meat:"Beef", type:"Sweet Chili Bites", name:"Beef Sweet Chili Bites",
    weight:"60g", unit:"pack", price:35, image:"images/products/beef-sweet-chili-bites.jpg",
    description:"Tender beef with a sweet chilli glaze — gentle heat, subtle sweetness.",
    about:"A little sweet, a little heat. Sticky sweet-chilli bites that keep you coming back.",
    soldOut:false },

  /* ---- Game ›Kudu (dried) ---- */
  { range:"dried", category:"Game", meat:"Kudu", type:"Biltong", name:"Kudu Biltong",
    weight:"60g", unit:"pack", price:35, image:"images/products/kudu-biltong.jpg",
    description:"Lean kudu with a delicate game flavour, traditionally cured.",
    about:"Lean, tender and full of that distinctive kudu game flavour.",
    soldOut:true },
  { range:"dried", category:"Game", meat:"Kudu", type:"Droëwors", name:"Kudu Droëwors",
    weight:"80g", unit:"pack", price:35, image:"images/products/kudu-droewors.jpg",
    description:"Lean kudu, delicately seasoned and slowly dried.",
    about:"Delicate game flavour in a soft, slow-dried wors. Unmistakably kudu.",
    soldOut:true },
  { range:"dried", category:"Game", meat:"Kudu", type:"Sweet Chili Bites", name:"Kudu Sweet Chili Bites",
    weight:"60g", unit:"pack", price:35, image:"images/products/kudu-sweet-chili-bites.jpg",
    description:"Lean kudu paired with sweet chilli for a rich game flavour and gentle heat.",
    about:"Lean kudu with a gentle sweet-chilli kick. Game flavour and a touch of heat.",
    soldOut:true },

  /* ---- Game ›Springbok (dried) ---- */
  { range:"dried", category:"Game", meat:"Springbok", type:"Biltong", name:"Springbok Biltong",
    weight:"60g", unit:"pack", price:35, image:"images/products/springbok-biltong.jpg",
    description:"Lean springbok with a refined game flavour, expertly seasoned and air-dried.",
    about:"Prized springbok, air-dried the old way. A true taste of the veld.",
    soldOut:true },
  { range:"dried", category:"Game", meat:"Springbok", type:"Droëwors", name:"Springbok Droëwors",
    weight:"80g", unit:"pack", price:35, image:"images/products/springbok-droewors.jpg",
    description:"Coarsely ground springbok, expertly seasoned and naturally air-dried.",
    about:"Coarse, rich and full of character. A bold game flavour that stands on its own.",
    soldOut:true },
  { range:"dried", category:"Game", meat:"Springbok", type:"Sweet Chili Bites", name:"Springbok Sweet Chili Bites",
    weight:"60g", unit:"pack", price:35, image:"images/products/springbok-sweet-chili-bites.jpg",
    description:"Premium springbok with a sweet chilli finish.",
    about:"Delicate springbok meets sweet chilli. A moreish sweet-and-spicy edge.",
    soldOut:true },

  /* ---- Cured Sausages (pork) ---- */
  { range:"dried", category:"Cured Sausages", meat:"Cured Sausages", type:"Cabanossi", name:"Cabanossi",
    weight:"100g", unit:"pack", price:35, image:"images/products/placeholder.jpg",
    description:"Smoked, dried pork sausage — savoury and snackable.",
    about:"Smoky, savoury and hard to put down. A classic dried sausage made for sharing.",
    soldOut:true },
  { range:"dried", category:"Cured Sausages", meat:"Cured Sausages", type:"Cabanossi", name:"Cherry Cabanossi",
    weight:"100g", unit:"pack", price:35, image:"images/products/placeholder.jpg",
    description:"Our cabanossi with a subtle sweet, cherry-tinged twist.",
    about:"Smoky cabanossi with a hint of sweetness. Moreish and a little different.",
    soldOut:true },
  { range:"dried", category:"Cured Sausages", meat:"Cured Sausages", type:"Salami", name:"Salami Sticks",
    weight:"100g", unit:"pack", price:35, image:"images/products/placeholder.jpg",
    description:"Bold, well-spiced pork salami in a grab-and-go stick.",
    about:"Big flavour, easy snacking. Well-spiced salami sticks for lunchbox or pocket.",
    soldOut:true },

  /* ===================================================================== *
   *  FRESH & FROZEN CUTS                                                  *
   *  Placeholder range — edit names/prices/units, add real photos, then   *
   *  flip soldOut to false when ready. Prices below are PLACEHOLDERS.      *
   * ===================================================================== */

  /* ---- Game ›Kudu (fresh) ---- */
  { range:"fresh", category:"Game", meat:"Kudu", type:"Mince", name:"Kudu Mince",
    weight:"1kg", unit:"kg", price:120, image:"images/products/placeholder.jpg",
    description:"Lean kudu mince — great for bolognese, cottage pie and burgers.",
    about:"Lean, flavourful game mince that turns any weeknight meal into something special.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Kudu", type:"Steaks", name:"Kudu Steaks",
    weight:"per kg", unit:"kg", price:180, image:"images/products/placeholder.jpg",
    description:"Tender kudu steaks — lean and rich in game flavour.",
    about:"Prime cuts of lean kudu. Quick to cook, deeply satisfying on the plate.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Kudu", type:"Wors", name:"Kudu Wors",
    weight:"1kg", unit:"kg", price:110, image:"images/products/placeholder.jpg",
    description:"Fresh kudu boerewors, coarsely ground and well seasoned.",
    about:"Proper game boerewors for the braai — rich, coarse and full of character.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Kudu", type:"Patties", name:"Kudu Patties",
    weight:"4 patties", unit:"pack", price:100, image:"images/products/placeholder.jpg",
    description:"Ready-to-grill kudu burger patties.",
    about:"Juicy game burgers, ready for the pan or braai. Weeknight hero.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Kudu", type:"Cheese Grillers", name:"Kudu Cheese Grillers",
    weight:"1kg", unit:"kg", price:130, image:"images/products/placeholder.jpg",
    description:"Kudu grillers with a molten cheese centre.",
    about:"Snappy grillers oozing cheese — a braai crowd-pleaser for young and old.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Kudu", type:"Chili Cheese Grillers", name:"Kudu Chili Cheese Grillers",
    weight:"1kg", unit:"kg", price:135, image:"images/products/placeholder.jpg",
    description:"Cheese grillers with a chilli kick.",
    about:"Cheesy, spicy and moreish — grillers with a bit of fire.",
    soldOut:true },

  /* ---- Game ›Springbok (fresh) ---- */
  { range:"fresh", category:"Game", meat:"Springbok", type:"Mince", name:"Springbok Mince",
    weight:"1kg", unit:"kg", price:120, image:"images/products/placeholder.jpg",
    description:"Lean springbok mince for everyday game cooking.",
    about:"Delicate, lean game mince — a lighter twist on family favourites.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Springbok", type:"Steaks", name:"Springbok Steaks",
    weight:"per kg", unit:"kg", price:180, image:"images/products/placeholder.jpg",
    description:"Refined springbok steaks, lean and tender.",
    about:"Elegant lean cuts with a refined game flavour. A dinner-party winner.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Springbok", type:"Wors", name:"Springbok Wors",
    weight:"1kg", unit:"kg", price:110, image:"images/products/placeholder.jpg",
    description:"Fresh springbok boerewors for the braai.",
    about:"Bold springbok wors — coarse, rich and made for the coals.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Springbok", type:"Patties", name:"Springbok Patties",
    weight:"4 patties", unit:"pack", price:100, image:"images/products/placeholder.jpg",
    description:"Ready-to-grill springbok burger patties.",
    about:"Lean game burgers with a refined flavour. Ready when you are.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Springbok", type:"Cheese Grillers", name:"Springbok Cheese Grillers",
    weight:"1kg", unit:"kg", price:130, image:"images/products/placeholder.jpg",
    description:"Springbok grillers with a cheese centre.",
    about:"Snappy game grillers with melty cheese inside. Braai gold.",
    soldOut:true },

  /* ---- Game ›Warthog (fresh) ---- */
  { range:"fresh", category:"Game", meat:"Warthog", type:"Mince", name:"Warthog Mince",
    weight:"1kg", unit:"kg", price:110, image:"images/products/placeholder.jpg",
    description:"Rich warthog mince for hearty game dishes.",
    about:"Deep, distinctive game flavour — a rustic favourite for stews and pies.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Warthog", type:"Wors", name:"Warthog Wors",
    weight:"1kg", unit:"kg", price:110, image:"images/products/placeholder.jpg",
    description:"Fresh warthog boerewors, coarse and full-flavoured.",
    about:"Bold, rustic wors with real character. One for the game lovers.",
    soldOut:true },
  { range:"fresh", category:"Game", meat:"Warthog", type:"Patties", name:"Warthog Patties",
    weight:"4 patties", unit:"pack", price:100, image:"images/products/placeholder.jpg",
    description:"Ready-to-grill warthog burger patties.",
    about:"Hearty game burgers with a big, rich flavour.",
    soldOut:true },

  /* ---- Beef (fresh) ---- */
  { range:"fresh", category:"Beef", meat:"Beef", type:"Mince", name:"Beef Mince",
    weight:"1kg", unit:"kg", price:90, image:"images/products/placeholder.jpg",
    description:"Everyday lean beef mince.",
    about:"The reliable staple — lean beef mince for the meals everyone loves.",
    soldOut:true },
  { range:"fresh", category:"Beef", meat:"Beef", type:"Patties", name:"Beef Patties",
    weight:"4 patties", unit:"pack", price:95, image:"images/products/placeholder.jpg",
    description:"Ready-to-grill beef burger patties.",
    about:"Proper beef burgers, ready for the pan. A guaranteed crowd-pleaser.",
    soldOut:true },

];

/* Give every product a stable, unique id (range + name), used by the cart and
   buttons. You don't need to touch this. */
PRODUCTS.forEach((p) => {
  if (!p.id) {
    p.id = (p.range + "-" + p.name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
});
