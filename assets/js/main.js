// main.js
import { CartManager } from './cartManager.js';
import { ProductFilter } from './productFilter.js';
import { toggleCart } from './toggleCart.js';
import { ShoppingCartSidebar } from './shoppingCartSidebar.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Inicializa el gestor del carrito
    const cartManager = new CartManager();
    // Inicializa el filtrado y renderizado de productos en la sección principal
    const productFilter = new ProductFilter(cartManager);
    // Inicializa el sidebar del carrito
    const shoppingCartSidebar = new ShoppingCartSidebar(cartManager);
    
    // Carga los productos y configura la búsqueda/filtros
    await productFilter.init();
    
    // Configura el toggle para mostrar/ocultar el carrito
    toggleCart();

    // Actualiza el contenido del carrito en el sidebar al cargar el DOM
    shoppingCartSidebar.actualizarContenido();
    shoppingCartSidebar.actualizarTotales();
    
    // Escucha el evento personalizado "actualizarCarrito"
    document.addEventListener('actualizarCarrito', () => {
      // Actualizar el contador de ítems en el header
      const cartAmountElement = document.querySelector('.cart-amount');
      if (cartAmountElement) {
         cartAmountElement.textContent = cartManager.getTotalItems();
      }
      // Actualizar el contenido del carrito en el sidebar
      shoppingCartSidebar.actualizarContenido();
      // Actualizar los totales (subtotales, costos, etc.) en el sidebar
      shoppingCartSidebar.actualizarTotales();
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
