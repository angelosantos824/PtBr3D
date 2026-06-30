const revealElements = document.querySelectorAll(
  ".section-title, .card, .step, .product-card, .order-panel, .process-example, .about, .contact"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 90) {
      element.classList.add("active");
    }
  });
}

const productSelect = document.querySelector("#produto");
const quantityInput = document.querySelector("#quantidade");
const modelInput = document.querySelector("#modelo");
const totalElement = document.querySelector("#valor-total");
const orderLink = document.querySelector("#enviar-pedido");

function formatCurrency(value) {
  return value.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
  });
}

function updateOrder() {
  const selectedOption = productSelect.options[productSelect.selectedIndex];
  const product = selectedOption.value;
  const unitPrice = Number(selectedOption.dataset.price);
  const quantity = Math.max(1, Number(quantityInput.value) || 1);
  const model = modelInput.value.trim() || "A combinar";
  const total = unitPrice * quantity;
  const totalText = unitPrice > 0 ? formatCurrency(total) : "Sob orçamento";

  totalElement.textContent = totalText;

  const message = [
    "Olá, PTBR3D! Quero fazer um pedido.",
    `Produto: ${product}`,
    `Modelo/detalhes: ${model}`,
    `Quantidade: ${quantity}`,
    `Valor estimado: ${totalText}`,
  ].join("\n");

  orderLink.dataset.message = message;
  orderLink.href = `https://wa.me/351934388938?text=${encodeURIComponent(message)}`;
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", () => {
  revealOnScroll();
  updateOrder();
});

[productSelect, quantityInput, modelInput].forEach((field) => {
  field.addEventListener("input", updateOrder);
  field.addEventListener("change", updateOrder);
});

orderLink.addEventListener("click", () => {
  if (navigator.clipboard && orderLink.dataset.message) {
    navigator.clipboard.writeText(orderLink.dataset.message).catch(() => {});
  }
});
