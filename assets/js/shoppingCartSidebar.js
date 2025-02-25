// shoppingCartSidebar.js
import { EmptyCartMessage } from './components/EmptyCartMessage.js';
import { ProductCartItem } from './components/ProductCartCard.js';

export class ShoppingCartSidebar {
  constructor(carritoManager, sidebarSelector = '.shopping-card__sidebar') {
    this.carritoManager = carritoManager;
    this.sidebar = document.querySelector(sidebarSelector);
  }
  // Este método actualiza el contenedor del carrito con los ítems actuales
  actualizarContenido() {
    const contenedor = this.sidebar.querySelector('.product-in-cart__card-container');
    contenedor.innerHTML = ''; // Limpiar contenido previo

    // Si el carrito está vacío, muestra un mensaje de carrito vacío
    if (this.carritoManager.carrito.length === 0) {
      contenedor.appendChild(new EmptyCartMessage().render());
 
    } else {
      // Por cada producto en el carrito, crea un componente que muestre la misma información que en main-productos
      this.carritoManager.carrito.forEach(item => {
        const productCartItem = new ProductCartItem(
          item,            // Información del producto (de products.json)
          this.carritoManager
        );
        // Se asume que ProductCartItem.render() retorna un nodo HTML con la plantilla deseada
        contenedor.appendChild(productCartItem.render());
      });
    }
  }

  // Este método actualiza los totales mostrados en el sidebar y en el header
  actualizarTotales() {
    const totalItemsElement = document.querySelector('#productInCartTotalItems');
    if (totalItemsElement) {
      totalItemsElement.textContent = this.carritoManager.getTotalItems();
    }
    
    const netWorthElement = document.querySelector('#productInCartNetworth');
    if (netWorthElement) {
      netWorthElement.textContent = `$${this.carritoManager.getTotalNeto()}`;
    }
    
    // Actualizar el total en el header (se usa la clase .cart-amount)
    const cartAmountElement = document.querySelector('.cart-amount');
    if (cartAmountElement) {
      // Asegúrate que CartManager tenga el método getTotalPrecio() o ajusta para usar getTotal()
      cartAmountElement.textContent = `${this.carritoManager.getTotalItems()}`;
    }
  }
}
