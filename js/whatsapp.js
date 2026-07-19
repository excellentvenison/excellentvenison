/* =============================================================================
   WHATSAPP ORDER
   Turns the cart into a neatly formatted WhatsApp message and builds the
   link that opens WhatsApp with that message already typed in.
   Change your number in products.js, not here.
   ============================================================================= */

const WhatsApp = {
  buildMessage(cart) {
    const cur = CONFIG.currency;
    const lines = [];

    lines.push(`*${CONFIG.businessName} order*`);
    lines.push("");

    cart.getItems().forEach((item) => {
      lines.push(
        `• ${item.name} (${item.weight}) x${item.quantity} — ${cur}${item.lineTotal}`
      );
    });

    lines.push("");
    lines.push(`*Total: ${cur}${cart.getTotal()}*`);
    lines.push("");
    lines.push(CONFIG.orderClosingLine);

    return lines.join("\n");
  },

  buildLink(cart) {
    const text = encodeURIComponent(this.buildMessage(cart));
    return `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
  },
};
