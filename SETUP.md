# Excellent Venison — shop setup

Single-page shop with category tabs and a WhatsApp checkout. Customers filter
by category, add items to a cart, tap **Order on WhatsApp**, and it opens
WhatsApp with the full order already typed.

## The only file you edit day-to-day: `js/products.js`

1. **Your WhatsApp number** — top of the file, `whatsappNumber`.
   Country code + number, digits only, no leading 0.
   `076 017 5956` becomes `"27760175956"`.
   (Currently set to Derik's cell, `27832279481`, as a placeholder.)
2. **Prices** — each product has a `price` line (Rand). Change the number.
3. **Mark something sold out** — change that product's `soldOut: false` to
   `soldOut: true`. It shows a "Sold Out" badge and can't be added to the cart.
   Change it back to `false` when it's in stock again.
4. **Back-of-card blurb** — each product has an `about` line: the tempting
   description shown when the photo flips (hover/tap). Keep it appealing, not
   technical — ingredient & allergen detail belongs on the packaging.
5. **Minimums** (top of file):
   - `driedMinPerProduct` (5) — least packs of each dried product.
   - `driedMinTotalPacks` (20) — least packs in a whole dried order.
   - `freshMinValue` (450) — least rand value for a whole Fresh/Frozen order.
6. **Add a product** — copy one product block, paste it, change the details.

### Ranges, categories and species
Every product has a `range` (`"dried"` or `"fresh"`), a `category`
("Beef", "Venison", "Pork"), and a `meat` (the species: "Beef", "Kudu",
"Springbok", "Warthog"…). It all builds itself:

- The two buttons **Dried Meat** / **Venison & Meat Products** come from
  `CONFIG.ranges` and show only that range's products.
- Inside a range, a tab appears per `category`.
- If a category has more than one species, each species becomes an
  **expandable accordion** (e.g. Venison → Kudu, Springbok, Warthog). A single
  species just shows its products directly.

So to add, say, Eland biltong you only add one product block with
`range:"dried", category:"Venison", meat:"Eland"` — an **Eland** accordion
appears on its own. Same for fresh. `unit` is `"pack"` for dried or `"kg"` for
fresh and shows in the order (e.g. "2kg Kudu Mince").

The whole **Venison & Meat Products** (fresh/frozen) range is currently
placeholder products, all sold out, using `placeholder.jpg`. Edit their names,
prices, units and photos, then set `soldOut: false` when ready.

## File layout

```
index.html                 the page
css/styles.css             all styling (mobile-first)
js/products.js             YOUR settings + products   <-- edit this
js/cart.js                 cart logic
js/whatsapp.js             builds the WhatsApp order message
js/app.js                  tabs, grid, cart drawer
images/products/           product photos (already optimised for web)
Excellent Venison Images/  your existing hero background (keep as-is)
```

## Deploy

1. Copy these files into your repo:
   - replace `index.html`
   - add the `css/`, `js/`, and `images/` folders
   - keep your existing `Excellent Venison Images/` folder (the hero uses it)
2. Commit and push to GitHub. Netlify auto-deploys.
3. Old `beef.html` / `venison.html` are no longer linked — delete or ignore.

## Before you go live — checklist

- [ ] Real WhatsApp number set in `js/products.js`
- [ ] Real prices set for all products
- [ ] Test on your phone: add items, tap "Order on WhatsApp", check the message
- [ ] (Done for you) Product images optimised — the 9 new ones are ~130KB each
      instead of ~2.2MB, so the shop loads fast on mobile data
