/* =============================================================================
   CART
   Handles everything about the shopping cart: adding, removing, changing
   quantities, working out the total, and remembering the cart between visits.
   You should not need to edit this file.
   ============================================================================= */

class Cart {
  constructor(storageKey = "excellentVenisonCart") {
    this.storageKey = storageKey;
    this.items = this._load();          // items: { [productId]: quantity }
  }

  getItems() {
    return Object.entries(this.items)
      .map(([id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product) return null;
        return { ...product, quantity: qty, lineTotal: product.price * qty };
      })
      .filter(Boolean);
  }

  getCount() {
    return Object.values(this.items).reduce((sum, q) => sum + q, 0);
  }

  getTotal() {
    return this.getItems().reduce((sum, item) => sum + item.lineTotal, 0);
  }

  isEmpty() {
    return this.getCount() === 0;
  }

  add(productId, quantity = 1) {
    this.items[productId] = (this.items[productId] || 0) + quantity;
    this._save();
  }

  setQuantity(productId, quantity) {
    if (quantity <= 0) {
      this.remove(productId);
    } else {
      this.items[productId] = quantity;
      this._save();
    }
  }

  remove(productId) {
    delete this.items[productId];
    this._save();
  }

  clear() {
    this.items = {};
    this._save();
  }

  _save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {
      /* localStorage unavailable (private mode) — cart still works for this
         visit, it just won't persist after a refresh. */
    }
  }

  _load() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey)) || {};
    } catch (e) {
      return {};
    }
  }
}
