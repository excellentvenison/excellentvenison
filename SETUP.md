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
4. **Ingredients** — each product has an `ingredients` and `allergens` line;
   these show on the back of the card when you hover/tap the photo.
5. **Minimum order** — `minimumOrderItems` (top of file) is the number of items
   a customer must add before they can check out. Currently 10.
6. **Add a product** — copy one product block, paste it, change the details.

### How the category tabs work
Each product has a `category` ("Beef", "Venison", "Pork", …) and a `meat`
("Beef", "Kudu", "Springbok", …). The filter tabs on the site are built
automatically from the categories in your product list — so the day you add a
product with `category: "Pork"`, a **Pork** tab appears by itself. Products are
grouped under a heading per `meat`, so "Venison" holds both Kudu and Springbok.
There is a ready-made (commented-out) Pork example at the bottom of the file.

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
