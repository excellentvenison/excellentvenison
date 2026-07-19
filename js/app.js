/* =============================================================================
   APP
   Ties everything together: builds the category filter tabs (automatically,
   from your product list), draws the products grouped by animal, runs the
   cart drawer, and handles checkout.
   You should not need to edit this file.
   ============================================================================= */

(function () {
  const cart = new Cart();
  const cur = CONFIG.currency;
  const MIN = CONFIG.minimumOrderItems || 1;
  let activeCategory = "All";

  const el = {
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

  /* ---- Helpers: derive categories & groups from the data --------------- */

  function categories() {
    const seen = [];
    PRODUCTS.forEach((p) => { if (!seen.includes(p.category)) seen.push(p.category); });
    return ["All", ...seen];
  }

  function groupedProducts() {
    const list = PRODUCTS.filter(
      (p) => activeCategory === "All" || p.category === activeCategory
    );
    const groups = [];
    list.forEach((p) => {
      let g = groups.find((x) => x.meat === p.meat);
      if (!g) { g = { meat: p.meat, items: [] }; groups.push(g); }
      g.items.push(p);
    });
    return groups;
  }

  /* ---- Rendering: filter tabs ----------------------------------------- */

  function renderFilters() {
    el.filters.innerHTML = categories()
      .map(
        (c) => `<button class="filter ${c === activeCategory ? "is-active" : ""}"
                  data-filter="${c}">${c}</button>`
      )
      .join("");
  }

  /* ---- Rendering: product groups + cards ------------------------------ */

  // The photo flips over (hover on desktop, tap on mobile) to show ingredients.
  function productCard(p) {
    const sold = !!p.soldOut;
    const addBtn = sold
      ? `<button class="btn btn--add" disabled>Sold Out</button>`
      : `<button class="btn btn--add" data-add="${p.id}">Add to cart</button>`;

    return `
      <article class="product ${sold ? "is-soldout" : ""}">
        <div class="product__media flip" data-flip="${p.id}" role="button" tabindex="0"
             aria-label="Show ingredients for ${p.name}">
          <div class="flip__inner">
            <div class="flip__front">
              <img src="${p.image}" alt="${p.name}" loading="lazy">
              ${sold ? `<span class="product__badge">Sold Out</span>` : ""}
              <span class="flip__hint">Ingredients ⟳</span>
            </div>
            <div class="flip__back">
              <h5 class="flip__title">What's in it</h5>
              <p class="flip__ingredients">${p.ingredients || ""}</p>
              ${p.allergens ? `<p class="flip__allergens">${p.allergens}</p>` : ""}
            </div>
          </div>
        </div>
        <div class="product__body">
          <p class="product__type">${p.type} · ${p.weight}</p>
          <h4 class="product__name">${p.name}</h4>
          <p class="product__desc">${p.description}</p>
          <div class="product__foot">
            <span class="product__price">${cur}${p.price}</span>
            ${addBtn}
          </div>
        </div>
      </article>`;
  }

  function renderProducts() {
    el.grid.innerHTML = groupedProducts()
      .map(
        (g) => `
        <section class="group">
          <h3 class="group__title">${g.meat}</h3>
          <div class="product-grid">
            ${g.items.map(productCard).join("")}
          </div>
        </section>`
      )
      .join("");
  }

  /* ---- Rendering: cart drawer ----------------------------------------- */

  function checkoutBlock() {
    const count = cart.getCount();

    if (count < MIN) {
      const need = MIN - count;
      return `
        <button class="btn btn--whatsapp is-disabled" disabled>Order on WhatsApp</button>
        <p class="cart__minnote">
          Minimum order is ${MIN} items — add ${need} more ${need === 1 ? "item" : "items"} to check out.
        </p>`;
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
      el.cartBody.innerHTML =
        `<p class="cart__empty">Your cart is empty.<br>Add some biltong to get started.</p>`;
      el.cartFooter.innerHTML = "";
      return;
    }

    el.cartBody.innerHTML = cart
      .getItems()
      .map(
        (item) => `
        <div class="cart-item">
          <img class="cart-item__img" src="${item.image}" alt="${item.name}">
          <div class="cart-item__info">
            <p class="cart-item__name">${item.name}</p>
            <p class="cart-item__meta">${item.weight} · ${cur}${item.price} each</p>
            <div class="qty">
              <button class="qty__btn" data-dec="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="qty__value">${item.quantity}</span>
              <button class="qty__btn" data-inc="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div class="cart-item__right">
            <span class="cart-item__total">${cur}${item.lineTotal}</span>
            <button class="cart-item__remove" data-remove="${item.id}" aria-label="Remove ${item.name}">Remove</button>
          </div>
        </div>`
      )
      .join("");

    el.cartFooter.innerHTML = `
      <div class="cart__totalrow">
        <span>Total (${cart.getCount()} items)</span>
        <span class="cart__total">${cur}${cart.getTotal()}</span>
      </div>
      ${checkoutBlock()}
      <button class="cart__clear" id="clear-cart">Clear cart</button>`;
  }

  // Shown after the customer taps "Order on WhatsApp". We can't detect whether
  // they actually sent the message, so we ask before clearing the cart.
  function renderOrderConfirm() {
    el.cartFooter.innerHTML = `
      <div class="cart__confirm">
        <p class="cart__confirm-q">Did your order open in WhatsApp?</p>
        <button class="btn btn--whatsapp" id="confirm-sent">Yes — clear my cart</button>
        <button class="cart__clear" id="confirm-keep">Not yet — keep my cart</button>
      </div>`;
  }

  /* ---- Cart open / close ---------------------------------------------- */

  function openCart() {
    el.drawer.classList.add("is-open");
    el.overlay.classList.add("is-open");
    el.drawer.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    el.drawer.classList.remove("is-open");
    el.overlay.classList.remove("is-open");
    el.drawer.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  /* ---- Toast ---------------------------------------------------------- */

  let toastTimer;
  function showToast(message) {
    el.toast.textContent = message;
    el.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.toast.classList.remove("is-visible"), 2000);
  }

  /* ---- Events --------------------------------------------------------- */

  // Filter tabs.
  el.filters.addEventListener("click", (e) => {
    const c = e.target.getAttribute("data-filter");
    if (!c) return;
    activeCategory = c;
    renderFilters();
    renderProducts();
  });

  // Grid: flip a photo (tap) or add to cart.
  el.grid.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    if (addBtn) {
      const id = addBtn.getAttribute("data-add");
      const product = PRODUCTS.find((p) => p.id === id);
      if (!product || product.soldOut) return;
      cart.add(id, 1);
      renderCart();
      showToast(`${product.name} added to cart`);
      return;
    }
    const media = e.target.closest("[data-flip]");
    if (media) media.classList.toggle("is-flipped");
  });

  // Keyboard: flip the focused photo with Enter / Space.
  el.grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const media = e.target.closest("[data-flip]");
    if (media) { e.preventDefault(); media.classList.toggle("is-flipped"); }
  });

  // Quantity / remove inside cart.
  el.cartBody.addEventListener("click", (e) => {
    const inc = e.target.getAttribute("data-inc");
    const dec = e.target.getAttribute("data-dec");
    const rem = e.target.getAttribute("data-remove");
    if (inc) cart.setQuantity(inc, cart.items[inc] + 1);
    if (dec) cart.setQuantity(dec, cart.items[dec] - 1);
    if (rem) cart.remove(rem);
    if (inc || dec || rem) renderCart();
  });

  // Cart footer: clear, checkout (then ask), and the confirm buttons.
  el.cartFooter.addEventListener("click", (e) => {
    if (e.target.closest("#clear-cart")) { cart.clear(); renderCart(); return; }

    if (e.target.closest("#checkout")) {
      // Let the link open WhatsApp in a new tab, then ask about the cart.
      setTimeout(renderOrderConfirm, 400);
      return;
    }

    if (e.target.closest("#confirm-sent")) {
      cart.clear();
      renderCart();
      showToast("Order sent — cart cleared");
      return;
    }
    if (e.target.closest("#confirm-keep")) { renderCart(); return; }
  });

  el.cartButton.addEventListener("click", openCart);
  el.closeButton.addEventListener("click", closeCart);
  el.overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

  /* ---- Go ------------------------------------------------------------- */

  renderFilters();
  renderProducts();
  renderCart();
})();
