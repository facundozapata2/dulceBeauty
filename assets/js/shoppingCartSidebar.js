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

    // Si el carrito está vacío, muestra el mensaje de carrito vacío
    if (this.carritoManager.carrito.length === 0) {
      contenedor.appendChild(new EmptyCartMessage().render());
    } else {
      // Por cada producto en el carrito, crea un componente que muestre la misma información que en main-productos
      this.carritoManager.carrito.forEach(item => {
        const productCartItem = new ProductCartItem(item, this.carritoManager);
        // Se asume que ProductCartItem.render() retorna un nodo HTML con la plantilla deseada
        contenedor.appendChild(productCartItem.render());
      });
    }
    // Mostrar u ocultar el formulario y la info según la cantidad de productos en el carrito
    this.mostrarFormulario();
  }

  // Función que muestra/oculta el nodo del formulario y el div .product-in-cart__info
  mostrarFormulario() {
    // Usamos el sidebar para buscar los elementos correspondientes
    const formulario = this.sidebar.querySelector('.product-in-cart__form');
    const info = this.sidebar.querySelector('.product-in-cart__info');

    // Si no se encuentran los nodos, no se hace nada
    if (!formulario || !info) return;

    if (this.carritoManager.carrito.length === 0) {
      formulario.classList.add('cart-form__hidden');
      info.classList.add('cart-info__hidden');
    } else {
      formulario.classList.remove('cart-form__hidden');
      info.classList.remove('cart-info__hidden');
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
      cartAmountElement.textContent = `${this.carritoManager.getTotalItems()}`;
    }
  }
}
