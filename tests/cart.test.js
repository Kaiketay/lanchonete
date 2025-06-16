/* eslint-disable import/no-unresolved */

describe('cart', () => {
  let cartModule;
  beforeEach(async () => {
    document.body.innerHTML =
      '<div id="cartModal"></div><div id="cartItemsContainer"></div><span id="cartSubtotal"></span><span id="cartDeliveryFee"></span><span id="cartTotal"></span><span id="cart-count"></span><input id="valor-troco"><span id="trocoCalculado"></span><div id="messageBox"></div>';
    cartModule = await import('../src/js/cart.js');
  });

  test('addToCart adiciona item', () => {
    cartModule.addToCart('Teste', 10, 't1', 'img.png');
    expect(cartModule.getCart()).toHaveLength(1);
  });

  test('removeFromCart remove item', () => {
    cartModule.addToCart('Teste', 10, 't1', 'img.png');
    cartModule.removeFromCart('t1');
    expect(cartModule.getCart()).toHaveLength(0);
  });

  test('calculateChange calcula troco', () => {
    document.getElementById('cartTotal').textContent = 'R$ 5,00';
    document.getElementById('valor-troco').value = '10';
    cartModule.calculateChange();
    expect(document.getElementById('trocoCalculado').textContent).toBe(
      'R$ 5.00'
    );
  });

  test('finalizeOrder limpa carrinho', () => {
    cartModule.addToCart('Teste', 10, 't1', 'img.png');
    cartModule.finalizeOrder();
    expect(cartModule.getCart()).toHaveLength(0);
  });
});
