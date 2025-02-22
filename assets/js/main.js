// 📁 js/main.js
import { CartManager } from './CartManager.js';
import { ProductFilter } from './ProductFilter.js';
import { toggleCart } from './toggleCart.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const cartManager = new CartManager();
    const productFilter = new ProductFilter(cartManager);
    
    await productFilter.init();
    toggleCart();

    // Actualizar contador del header
    document.addEventListener('actualizarCarrito', () => {
      document.querySelector('.cart-amount').textContent = cartManager.getTotalItems();
    });

  } catch (error) {
    console.error('Error inicial:', error);
    document.getElementById('productItemContainer').innerHTML = `
      <div class="critical-error">
        <h3>🚨 Error crítico</h3>
        <p>${error.message}</p>
      </div>
    `;
  }
});