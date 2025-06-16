/** Funções de carrinho de compras */

let cart = [];
const deliveryFee = 5.0;

const cartButton = document.getElementById('cartButton');
const cartModal = document.getElementById('cartModal');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartSubtotalEl = document.getElementById('cartSubtotal');
const cartDeliveryFeeEl = document.getElementById('cartDeliveryFee');
const cartTotalEl = document.getElementById('cartTotal');
const valorTrocoInput = document.getElementById('valor-troco');
const trocoCalculadoEl = document.getElementById('trocoCalculado');
const messageBox = document.getElementById('messageBox');

cartButton?.addEventListener('click', openCartModal);
function openCartModal() {
  cartModal.style.display = 'block';
  renderCart();
  setTimeout(() => valorTrocoInput?.focus(), 200);
}
function closeCartModal() {
  cartModal.style.display = 'none';
}

window.addEventListener('click', (e) => {
  if (e.target === cartModal) closeCartModal();
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCartModal();
});

/**
 * Adiciona item ao carrinho.
 * @param {string} name
 * @param {number} price
 * @param {string} id
 * @param {string} img
 */
function addToCart(name, price, id, img) {
  const qtyInput = document.getElementById(`qty-${id}`);
  let quantity = parseInt(qtyInput?.value || 1, 10);
  if (Number.isNaN(quantity) || quantity < 1) quantity = 1;
  const found = cart.find((item) => item.id === id);
  if (found) {
    found.quantity += quantity;
  } else {
    cart.push({ id, name, price, img, quantity });
  }
  renderCart();
  updateCartCount();
  showMessage('Item adicionado ao carrinho!');
}

/** Remove item do carrinho. */
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  renderCart();
  updateCartCount();
}

function renderCart() {
  if (!cartItemsContainer) return;
  if (cart.length === 0) {
    cartItemsContainer.innerHTML =
      '<p class="text-gray-500">O seu carrinho está vazio.</p>';
    cartSubtotalEl.textContent = 'R$ 0,00';
    cartDeliveryFeeEl.textContent = `R$ ${deliveryFee.toFixed(2)}`;
    cartTotalEl.textContent = `R$ ${deliveryFee.toFixed(2)}`;
    calculateChange();
    return;
  }
  let subtotal = 0;
  cartItemsContainer.innerHTML = cart
    .map((item) => {
      subtotal += item.price * item.quantity;
      return `
      <div class="flex items-center justify-between py-2 border-b">
        <img src="${item.img}" alt="${item.name}" class="cart-item-image mr-2" onerror="this.src='https://placehold.co/50x50/cccccc/000000?text=Sem+Imagem'">
        <span class="flex-1 text-sm">${item.name} <b>x${item.quantity}</b></span>
        <span class="font-bold mr-2">R$ ${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart('${item.id}')" class="text-red-500 font-bold ml-1" title="Remover"><i class="fas fa-trash"></i></button>
      </div>
    `;
    })
    .join('');
  cartSubtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
  cartDeliveryFeeEl.textContent = `R$ ${deliveryFee.toFixed(2)}`;
  cartTotalEl.textContent = `R$ ${(subtotal + deliveryFee).toFixed(2)}`;
  calculateChange();
}

function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

/** Calcula troco com base no valor pago. */
function calculateChange() {
  if (!valorTrocoInput || !trocoCalculadoEl) return;
  const total = parseFloat(
    cartTotalEl.textContent.replace('R$', '').replace(',', '.')
  );
  let paid = valorTrocoInput.value.replace(',', '.');
  paid = paid === '' ? NaN : parseFloat(paid);
  if (Number.isNaN(paid) || paid <= total) {
    trocoCalculadoEl.textContent = 'R$ 0,00';
    return;
  }
  trocoCalculadoEl.textContent = `R$ ${(paid - total).toFixed(2)}`;
}

/** Finaliza o pedido limpando o carrinho. */
function finalizeOrder() {
  if (cart.length === 0) {
    showMessage('Seu carrinho está vazio!', true);
    return;
  }
  cart = [];
  renderCart();
  updateCartCount();
  closeCartModal();
  showMessage('Pedido realizado com sucesso! Obrigado.');
}

/** Exibe mensagem na tela. */
function showMessage(msg, isError = false) {
  if (!messageBox) return;
  messageBox.textContent = msg;
  messageBox.classList.toggle('error', isError);
  messageBox.style.display = 'block';
  setTimeout(() => {
    messageBox.style.display = 'none';
    messageBox.classList.remove('error');
  }, 2200);
}

/** Retorna itens do carrinho. */
function getCart() {
  return cart;
}

export {
  addToCart,
  removeFromCart,
  calculateChange,
  getCart,
  finalizeOrder,
  showMessage,
};
