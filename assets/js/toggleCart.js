// 📁 js/toggleCart.js
export function toggleCart() {
    const cart = document.querySelector('.shopping-card__sidebar');
    const cartBtn = document.getElementById('shoppingCartBtn');
  
    if (!cart || !cartBtn) return;
  
    cartBtn.addEventListener('click', () => {
      cart.classList.toggle('cart-open');
      cart.classList.toggle('cart-hidden');
    });
  
    document.addEventListener('click', (e) => {
      if (!cart.contains(e.target) && !cartBtn.contains(e.target)) {
        cart.classList.remove('cart-open');
        cart.classList.add('cart-hidden');
      }
    });
  }