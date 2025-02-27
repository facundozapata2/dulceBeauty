// main.js
import { CartManager } from './cartManager.js';
import { ProductFilter } from './productFilter.js';
import { toggleCart } from './toggleCart.js';
import { ShoppingCartSidebar } from './shoppingCartSidebar.js';
import { OrderForm } from './orderFormManager.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 🔹 Inicializa el gestor del carrito
    const cartManager = new CartManager();
    
    // 🔹 Inicializa el filtrado y renderizado de productos en la sección principal
    const productFilter = new ProductFilter(cartManager);
    
    // 🔹 Inicializa el sidebar del carrito
    const shoppingCartSidebar = new ShoppingCartSidebar(cartManager);
    
    // 🔹 Inicializa el formulario del pedido
    const orderForm = new OrderForm(cartManager); // Ahora el formulario está instanciado correctamente
    
    // 🔹 Carga los productos y configura la búsqueda/filtros
    await productFilter.init();
    
    // 🔹 Configura el toggle para mostrar/ocultar el carrito
    toggleCart();

    // 🔹 Actualiza el contenido y totales del carrito en el sidebar al cargar el DOM
    shoppingCartSidebar.actualizarContenido();
    shoppingCartSidebar.actualizarTotales();
    shoppingCartSidebar.costoDeEnvio(); // Asegura que el select de envío tenga su listener activo
    
    // 🔹 Escucha el evento personalizado "actualizarCarrito"
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
      
      // Volver a adjuntar el listener del costo de envío (en caso de que el DOM se actualice)
      shoppingCartSidebar.costoDeEnvio();
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
