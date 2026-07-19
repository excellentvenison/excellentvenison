/* =============================================================================
   WHATSAPP ORDER
   Turns the cart into a neatly formatted WhatsApp message, grouped by range
   (Dried vs Fresh/Frozen), and builds the wa.me link that opens WhatsApp with
   the message already typed in. Change your number in products.js.
   ============================================================================= */

const WhatsApp = {
  buildMessage(cart) {
    const cur = CONFIG.currency;
    const items = cart.getItems();
    const lines = [];

    lines.push(`*${CONFIG.businessName} order*`);

    Object.keys(CONFIG.ranges).forEach((key) => {
      const group = items.filter((i) => i.range === key);
      if (!group.length) return;
      const subtotal = group.reduce((s, i) => s + i.lineTotal, 0);
      lines.push("");
      lines.push(`*${CONFIG.ranges[key].short}*`);
      group.forEach((item) => {
        const q = item.unit === "kg" ? `${item.quantity}kg` : `x${item.quantity}`;
        lines.push(`• ${item.name} (${item.meat} · ${item.type}) ${q} — ${cur}${item.lineTotal}`);
      });
      lines.push(`Subtotal: ${cur}${subtotal}`);
    });

    lines.push("");
    lines.push(`*Total: ${cur}${cart.getTotal()}*`);

    if (CONFIG.deliveryPolicy) {
      lines.push("");
      lines.push(CONFIG.deliveryPolicy);
    }
    lines.push("");
    lines.push(CONFIG.orderClosingLine);

    return lines.join("\n");
  },

  buildLink(cart) {
    const text = encodeURIComponent(this.buildMessage(cart));
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  },
};
