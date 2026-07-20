/* =============================================================================
   APP
   Builds the range switcher (Dried vs Fresh/Frozen), the category tabs, the
   species accordions, the product cards, the cart drawer, and checkout.
   Driven entirely by CONFIG + PRODUCTS in products.js — you shouldn't edit here.
   ============================================================================= */

function initApp() {
  const cart = new Cart();
  const cur = CONFIG.currency;
  const rangeKeys = Object.keys(CONFIG.ranges);
  let activeRange = rangeKeys[0];      // "dried" by default
  let activeCategory = "All";

  const el = {
    rangeSwitch: document.getElementById("range-switch"),
    filters: document.getElementById("filters"),
    grid: document.getElementById("product-grid"),
    cartButton: document.getElementById("cart-button"),
    cartBadge: document.getElementById("cart-badge"),
    drawer: document.getElementById("cart-drawer"),
    overlay: document.getElementById("cart-overlay"),
    closeButton: document.getElementById("cart-close"),
    cartBody: document.getElementById("cart-body"),
    cartFooter: document.getElementById("cart-footer"),
    toast: document.getElementById("toast"),
  };

  /* ---- Data helpers ---------------------------------------------------- */

  const inRange = (p) => p.range === activeRange;

  function categories() {
    const seen = [];
    PRODUCTS.filter(inRange).forEach((p) => { if (!seen.includes(p.category)) seen.push(p.category); });
    return ["All", ...seen];
  }

  // [{ category, species:[{ meat, items:[] }] }] for the active range + category.
  function tree() {
    const list = PRODUCTS.filter(
      (p) => inRange(p) && (activeCategory === "All" || p.category === activeCategory)
    );
    const cats = [];
    list.forEach((p) => {
      let c = cats.find((x) => x.category === p.category);
      if (!c) { c = { category: p.category, species: [] }; cats.push(c); }
      let s = c.species.find((x) => x.meat === p.meat);
      if (!s) { s = { meat: p.meat, items: [] }; c.species.push(s); }
      s.items.push(p);
    });
    return cats;
  }

  function priceLabel(p) {
    return p.unit === "kg" ? `${cur}${p.price} / kg` : `${cur}${p.price}`;
  }
  const minQty = (p) => (p.range === "dried" ? CONFIG.driedMinPerProduct : 1);

  /* ---- Cart maths ------------------------------------------------------ */

  function totals() {
    const items = cart.getItems();
    const dried = items.filter((i) => i.range === "dried");
    const fresh = items.filter((i) => i.range === "fresh");
    return {
      items, dried, fresh,
      driedPacks: dried.reduce((s, i) => s + i.quantity, 0),
      freshValue: fresh.reduce((s, i) => s + i.lineTotal, 0),
    };
  }

  // { ok, msg } — is the order allowed to check out, and if not, why.
  function checkoutState() {
    const { dried, fresh, driedPacks, freshValue } = totals();
    if (dried.length) {
      const low = dried.find((i) => i.quantity < CONFIG.driedMinPerProduct);
      if (low) return { ok: false, msg: `${low.name}: minimum ${CONFIG.driedMinPerProduct} packs per product.` };
      if (driedPacks < CONFIG.driedMinTotalPacks)
        return { ok: false, msg: `Dried meat minimum is ${CONFIG.driedMinTotalPacks} packs per order — add ${CONFIG.driedMinTotalPacks - driedPacks} more.` };
    }
    if (fresh.length && freshValue < CONFIG.freshMinValue)
      return { ok: false, msg: `Minimum order for ${CONFIG.ranges.fresh.label} is ${cur}${CONFIG.freshMinValue}. Add ${cur}${CONFIG.freshMinValue - freshValue} more to continue.` };
    return { ok: true };
  }

  /* ---- Rendering: range switcher + tabs -------------------------------- */

  function renderRangeSwitch() {
    el.rangeSwitch.innerHTML = rangeKeys
      .map((k) => `<button class="rangeswitch__btn ${k === activeRange ? "is-active" : ""}"
                     data-range="${k}">${CONFIG.ranges[k].label}</button>`)
      .join("");
  }

  function renderFilters() {
    el.filters.innerHTML = categories()
      .map((c) => `<button class="filter ${c === activeCategory ? "is-active" : ""}"
                     data-filter="${c}">${c}</button>`)
      .join("");
  }

  /* ---- Rendering: cards, accordions ------------------------------------ */

  function productCard(p) {
    const sold = !!p.soldOut;
    const addBtn = sold
      ? `<button class="btn btn--add" disabled>Sold Out</button>`
      : `<button class="btn btn--add" data-add="${p.id}">Add</button>`;
    const minNote = (p.range === "dried" && !sold)
      ? `<p class="product__min">Min ${CONFIG.driedMinPerProduct} packs</p>` : "";

    return `
      <article class="product ${sold ? "is-soldout" : ""}">
        <div class="product__media flip" data-flip="${p.id}" role="button" tabindex="0"
             aria-label="Show more about ${p.name}">
          <div class="flip__inner">
            <div class="flip__front">
              <img src="${p.image}" alt="${p.name}" loading="lazy">
              ${sold ? `<span class="product__badge">Sold Out</span>` : ""}
              <span class="flip__hint">More ⟳</span>
            </div>
            <div class="flip__back">
              <h5 class="flip__title">Why you'll love it</h5>
              <p class="flip__text">${p.about || p.description || ""}</p>
            </div>
          </div>
        </div>
        <div class="product__body">
          <p class="product__type">${p.type} · ${p.weight}</p>
          <h4 class="product__name">${p.name}</h4>
          <p class="product__desc">${p.description}</p>
          <div class="product__foot">
            <span class="product__price">${priceLabel(p)}</span>
            ${addBtn}
          </div>
          ${minNote}
        </div>
      </article>`;
  }

  function speciesGrid(items) {
    return `<div class="product-grid">${items.map(productCard).join("")}</div>`;
  }

  function speciesBlock(s, accId) {
    // Expandable accordion for a species (used when a category has >1 species).
    return `
      <div class="accordion">
        <button class="accordion__head" data-acc="${accId}" aria-expanded="false">
          <span>${s.meat}</span>
          <span class="accordion__count">${s.items.length}</span>
          <span class="accordion__chev" aria-hidden="true">▾</span>
        </button>
        <div class="accordion__panel" id="${accId}">
          <div class="accordion__inner">${speciesGrid(s.items)}</div>
        </div>
      </div>`;
  }

  function renderProducts() {
    const cats = tree();
    if (!cats.length) {
      el.grid.innerHTML = `<p class="shop__empty">No products in this range yet — check back soon.</p>`;
      return;
    }
    el.grid.innerHTML = cats.map((c) => {
      const showCatHead = activeCategory === "All";
      const head = showCatHead ? `<h3 class="group__title">${c.category}</h3>` : "";
      let body;
      if (c.species.length > 1) {
        body = c.species.map((s, i) => speciesBlock(s, `acc-${activeRange}-${c.category}-${i}`)).join("");
      } else {
        body = speciesGrid(c.species[0].items);   // single species → straight grid
      }
      return `<section class="group">${head}${body}</section>`;
    }).join("");
  }

  /* ---- Rendering: cart drawer ------------------------------------------ */

  function checkoutBlock() {
    const state = checkoutState();
    if (!state.ok) {
      return `
        <button class="btn btn--whatsapp is-disabled" disabled>Order on WhatsApp</button>
        <p class="cart__minnote">${state.msg}</p>`;
    }
    return `
      <a class="btn btn--whatsapp" id="checkout" href="${WhatsApp.buildLink(cart)}"
         target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.004c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.16c-.24.68-1.4 1.3-1.94 1.35-.5.05-.97.24-3.27-.68-2.75-1.08-4.5-3.87-4.64-4.05-.14-.18-1.11-1.48-1.11-2.82s.7-2 .95-2.28c.24-.27.53-.34.71-.34.18 0 .36 0 .51.01.16.01.38-.06.6.46.24.55.8 1.9.87 2.04.07.14.12.31.02.49-.09.18-.14.29-.28.45-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.27.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.27.14.43.12.59-.07.16-.18.68-.79.86-1.06.18-.27.36-.23.6-.14.24.09 1.55.73 1.81.87.27.14.45.2.51.31.07.11.07.64-.17 1.32Z"/>
        </svg>
        Order on WhatsApp
      </a>`;
  }

  function renderCart() {
    el.cartBadge.textContent = cart.getCount();
    el.cartBadge.hidden = cart.isEmpty();

    if (cart.isEmpty()) {
      el.cartBody.innerHTML = `<p class="cart__empty">Your cart is empty.<br>Add some products to get started.</p>`;
      el.cartFooter.innerHTML = "";
      return;
    }

    const { items, dried, fresh, driedPacks, freshValue } = totals();

    // group cart lines by range for clarity
    const section = (label, list) => !list.length ? "" : `
      <p class="cart__section">${label}</p>` + list.map((item) => `
        <div class="cart-item">
          <img class="cart-item__img" src="${item.image}" alt="${item.name}">
          <div class="cart-item__info">
            <p class="cart-item__name">${item.name}</p>
            <p class="cart-item__meta">${item.meat} · ${item.type} · ${cur}${item.price}${item.unit === "kg" ? "/kg" : " each"}</p>
            <div class="qty">
              <button class="qty__btn" data-dec="${item.id}" aria-label="Decrease">−</button>
              <span class="qty__value">${item.quantity}${item.unit === "kg" ? "kg" : ""}</span>
              <button class="qty__btn" data-inc="${item.id}" aria-label="Increase">+</button>
            </div>
          </div>
          <div class="cart-item__right">
            <span class="cart-item__total">${cur}${item.lineTotal}</span>
            <button class="cart-item__remove" data-remove="${item.id}" aria-label="Remove ${item.name}">Remove</button>
          </div>
        </div>`).join("");

    el.cartBody.innerHTML =
      section(CONFIG.ranges.dried.label, dried) +
      section(CONFIG.ranges.fresh.label, fresh);

    const subLines =
      (dried.length ? `<div class="cart__subrow"><span>Dried (${driedPacks} packs)</span><span>${cur}${dried.reduce((s, i) => s + i.lineTotal, 0)}</span></div>` : "") +
      (fresh.length ? `<div class="cart__subrow"><span>Fresh & Frozen</span><span>${cur}${freshValue}</span></div>` : "");

    el.cartFooter.innerHTML = `
      ${subLines}
      <div class="cart__totalrow">
        <span>Total</span>
        <span class="cart__total">${cur}${cart.getTotal()}</span>
      </div>
      ${CONFIG.deliveryNote ? `<p class="cart__delivery">🚚 ${CONFIG.deliveryNote}</p>` : ""}
      ${checkoutBlock()}
      <button class="cart__clear" id="clear-cart">Clear cart</button>`;
  }

  function renderOrderConfirm() {
    el.cartFooter.innerHTML = `
      <div class="cart__confirm">
        <p class="cart__confirm-q">Did your order open in WhatsApp?</p>
        <button class="btn btn--whatsapp" id="confirm-sent">Yes — clear my cart</button>
        <button class="cart__clear" id="confirm-keep">Not yet — keep my cart</button>
      </div>`;
  }

  /* ---- Cart open / close, toast ---------------------------------------- */

  function openCart() {
    el.drawer.classList.add("is-open"); el.overlay.classList.add("is-open");
    el.drawer.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden";
  }
  function closeCart() {
    el.drawer.classList.remove("is-open"); el.overlay.classList.remove("is-open");
    el.drawer.setAttribute("aria-hidden", "true"); document.body.style.overflow = "";
  }
  let toastTimer;
  function showToast(msg) {
    el.toast.textContent = msg; el.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove("is-visible"), 2000);
  }

  /* ---- Events ---------------------------------------------------------- */

  el.rangeSwitch.addEventListener("click", (e) => {
    const r = e.target.closest("[data-range]");
    if (!r) return;
    activeRange = r.getAttribute("data-range");
    activeCategory = "All";
    renderRangeSwitch(); renderFilters(); renderProducts();
  });

  el.filters.addEventListener("click", (e) => {
    const c = e.target.getAttribute("data-filter");
    if (!c) return;
    activeCategory = c;
    renderFilters(); renderProducts();
  });

  // Grid: toggle accordion, flip a photo, or add to cart.
  el.grid.addEventListener("click", (e) => {
    const acc = e.target.closest("[data-acc]");
    if (acc) {
      const panel = document.getElementById(acc.getAttribute("data-acc"));
      const open = panel.classList.toggle("is-open");
      acc.classList.toggle("is-open", open);
      acc.setAttribute("aria-expanded", open ? "true" : "false");
      return;
    }
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      const id = addBtn.getAttribute("data-add");
      const p = PRODUCTS.find((x) => x.id === id);
      if (!p || p.soldOut) return;
      const cur0 = cart.items[id] || 0;
      cart.setQuantity(id, cur0 === 0 ? minQty(p) : cur0 + 1);
      renderCart();
      showToast(`${p.name} added to cart`);
      return;
    }
    const media = e.target.closest("[data-flip]");
    if (media) media.classList.toggle("is-flipped");
  });

  el.grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const media = e.target.closest("[data-flip]");
    const acc = e.target.closest("[data-acc]");
    if (media || acc) { e.preventDefault(); e.target.click(); }
  });

  // Quantity / remove inside cart (respects the dried 5-pack floor).
  el.cartBody.addEventListener("click", (e) => {
    const inc = e.target.getAttribute("data-inc");
    const dec = e.target.getAttribute("data-dec");
    const rem = e.target.getAttribute("data-remove");
    if (inc) cart.setQuantity(inc, (cart.items[inc] || 0) + 1);
    if (dec) {
      const p = PRODUCTS.find((x) => x.id === dec);
      const q = cart.items[dec] || 0;
      const floor = minQty(p);
      if (p.range === "dried" && q <= floor) { /* keep at minimum */ }
      else cart.setQuantity(dec, q - 1);
    }
    if (rem) cart.remove(rem);
    if (inc || dec || rem) renderCart();
  });

  el.cartFooter.addEventListener("click", (e) => {
    if (e.target.closest("#clear-cart")) { cart.clear(); renderCart(); return; }
    if (e.target.closest("#checkout")) { setTimeout(renderOrderConfirm, 400); return; }
    if (e.target.closest("#confirm-sent")) { cart.clear(); renderCart(); showToast("Order sent — cart cleared"); return; }
    if (e.target.closest("#confirm-keep")) { renderCart(); return; }
  });

  el.cartButton.addEventListener("click", openCart);
  el.closeButton.addEventListener("click", closeCart);
  el.overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

  // Hero "Shop …" buttons jump to the shop and select a range.
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-shop-range]");
    if (!b) return;
    activeRange = b.getAttribute("data-shop-range");
    activeCategory = "All";
    renderRangeSwitch(); renderFilters(); renderProducts();
  });

  /* ---- Go -------------------------------------------------------------- */

  const heroDelivery = document.getElementById("hero-delivery");
  if (heroDelivery && CONFIG.deliveryNote) {
    heroDelivery.textContent = CONFIG.deliveryNote;
    heroDelivery.hidden = false;
  }

  renderRangeSwitch();
  renderFilters();
  renderProducts();
  renderCart();
}

// Wait for the data files to load, then start the app.
DATA_READY.then(initApp);
