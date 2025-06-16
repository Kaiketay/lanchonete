// ================== CARRINHO ==================
let cart = [];
const deliveryFee = 5.00;

// DOM Elements
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

// Modal open/close
if (cartButton) cartButton.addEventListener('click', openCartModal);
function openCartModal() {
  cartModal.style.display = 'block';
  renderCart();
  // foca no campo troco, se existir, para agilizar pagamento
  setTimeout(() => valorTrocoInput?.focus(), 200);
}
function closeCartModal() {
  cartModal.style.display = 'none';
}

// Fechar modal ao clicar fora do conteúdo
window.onclick = function(event) {
  if (event.target === cartModal) closeCartModal();
};

// ================ FECHAR MODAL COM ESC ===============
window.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeCartModal();
});

// Adicionar item ao carrinho
function addToCart(name, price, id, img) {
  // id agora é sempre string!
  let qtyInput = document.getElementById(`qty-${id}`);
  let quantity = parseInt(qtyInput?.value || 1);
  if (isNaN(quantity) || quantity < 1) quantity = 1;
  let found = cart.find(item => item.id === id);
  if (found) {
    found.quantity += quantity;
  } else {
    cart.push({ id, name, price, img, quantity });
  }
  renderCart();
  updateCartCount();
  showMessage("Item adicionado ao carrinho!", false);
}

// Remover item do carrinho
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
  updateCartCount();
}

// Renderizar carrinho no modal
function renderCart() {
  if (!cartItemsContainer) return;
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="text-gray-500">O seu carrinho está vazio.</p>`;
    cartSubtotalEl.textContent = "R$ 0,00";
    cartDeliveryFeeEl.textContent = `R$ ${deliveryFee.toFixed(2)}`;
    cartTotalEl.textContent = `R$ ${deliveryFee.toFixed(2)}`;
    calculateChange();
    return;
  }
  let subtotal = 0;
  cartItemsContainer.innerHTML = cart.map(item => {
    subtotal += item.price * item.quantity;
    return `
      <div class="flex items-center justify-between py-2 border-b">
        <img src="${item.img}" alt="${item.name}" class="cart-item-image mr-2" onerror="this.src='https://placehold.co/50x50/cccccc/000000?text=Sem+Imagem'">
        <span class="flex-1 text-sm">${item.name} <b>x${item.quantity}</b></span>
        <span class="font-bold mr-2">R$ ${(item.price * item.quantity).toFixed(2)}</span>
        <button onclick="removeFromCart('${item.id}')" class="text-red-500 font-bold ml-1" title="Remover"><i class="fas fa-trash"></i></button>
      </div>
    `;
  }).join('');
  cartSubtotalEl.textContent = `R$ ${subtotal.toFixed(2)}`;
  cartDeliveryFeeEl.textContent = `R$ ${deliveryFee.toFixed(2)}`;
  cartTotalEl.textContent = `R$ ${(subtotal + deliveryFee).toFixed(2)}`;
  calculateChange();
}

// Atualiza o número de itens no carrinho
function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

// Troco dinâmico
function calculateChange() {
  if (!valorTrocoInput || !trocoCalculadoEl) return;
  const total = parseFloat(cartTotalEl.textContent.replace('R$', '').replace(',', '.'));
  let paid = valorTrocoInput.value.replace(',', '.');
  paid = paid === "" ? NaN : parseFloat(paid);
  if (isNaN(paid) || paid <= total) {
    trocoCalculadoEl.textContent = "R$ 0,00";
    return;
  }
  trocoCalculadoEl.textContent = `R$ ${(paid - total).toFixed(2)}`;
}

// Finalizar pedido (simulação)
function finalizeOrder() {
  if (cart.length === 0) {
    showMessage("Seu carrinho está vazio!", true);
    return;
  }
  cart = [];
  renderCart();
  updateCartCount();
  closeCartModal();
  showMessage("Pedido realizado com sucesso! Obrigado.", false);
}

// Mensagem de feedback
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

// ================== FAQ ACCORDION ==================
function toggleFaq(num) {
  const ans = document.getElementById('faq-' + num);
  if (!ans) return;
  ans.classList.toggle('visible');
}

// ================== STAR RATING ==================
const starRatings = document.querySelectorAll('.star-rating .fa-star');
if (starRatings.length > 0) {
  let ratingValue = 0;
  starRatings.forEach((star, idx) => {
    star.addEventListener('mouseover', () => highlightStars(idx + 1));
    star.addEventListener('mouseout', () => highlightStars(ratingValue));
    star.addEventListener('click', () => setRating(idx + 1));
  });
  function highlightStars(rating) {
    starRatings.forEach((star, idx) => {
      star.classList.toggle('selected', idx < rating);
    });
  }
  function setRating(rating) {
    ratingValue = rating;
    document.getElementById('rating-value').value = rating;
    highlightStars(ratingValue);
    showMessage(`Você avaliou com ${ratingValue} estrela(s)!`, false);
  }
}

// ================== FORMULÁRIOS ==================
document.getElementById('form-contato')?.addEventListener('submit', function(e) {
  e.preventDefault();
  showMessage("Mensagem enviada! Entraremos em contato.", false);
  this.reset();
});
document.getElementById('form-trabalhe')?.addEventListener('submit', function(e) {
  e.preventDefault();
  showMessage("Currículo enviado com sucesso!", false);
  this.reset();
});
document.getElementById('newsletter')?.addEventListener('submit', function(e) {
  e.preventDefault();
  showMessage("Assinatura realizada. Obrigado!", false);
  this.reset();
});

// ================== SCROLL SUAVE ==================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ================== ANO AUTOMÁTICO FOOTER ==================
if (document.getElementById('currentYear')) {
  document.getElementById('currentYear').innerText = new Date().getFullYear();
}
