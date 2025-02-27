// shoppingCartSidebar.js
import { EmptyCartMessage } from './components/EmptyCartMessage.js';
import { ProductCartItem } from './components/ProductCartCard.js';

export class ShoppingCartSidebar {
  constructor(carritoManager, sidebarSelector = '.shopping-card__sidebar') {
    this.carritoManager = carritoManager;
    this.sidebar = document.querySelector(sidebarSelector);
  }
  
  // Método que muestra u oculta el formulario y la información del carrito según si hay o no productos.
  mostrarFormulario() {
    const formulario = this.sidebar.querySelector('.product-in-cart__form');
    const info = this.sidebar.querySelector('.product-in-cart__info');
    if (!formulario || !info) return;
    
    if (this.carritoManager.carrito.length === 0) {
      formulario.classList.add('cart-form__hidden');
      info.classList.add('cart-info__hidden');
    } else {
      formulario.classList.remove('cart-form__hidden');
      info.classList.remove('cart-info__hidden');
    }
  }
  
  // Método que actualiza el contenedor de las cards del carrito.
  actualizarContenido() {
    const contenedor = this.sidebar.querySelector('.product-in-cart__card-container');
    if (!contenedor) return;
    contenedor.innerHTML = ''; // Limpia el contenedor
  
    if (this.carritoManager.carrito.length === 0) {
      // Si el carrito está vacío, muestra el mensaje vacío.
      contenedor.appendChild(new EmptyCartMessage().render());
    } else {
      // Por cada producto en el carrito, crea el componente del producto en el carrito.
      this.carritoManager.carrito.forEach(item => {
        const productCartItem = new ProductCartItem(item, this.carritoManager);
        contenedor.appendChild(productCartItem.render());
      });
    }
    
    // Después de actualizar las cards, se muestra u oculta el formulario y la info.
    this.mostrarFormulario();
  }
  
  // Método que actualiza los totales (total y cantidad) en el sidebar y en el header.
  actualizarTotales() {
    const totalElements = document.getElementsByClassName('cart-total');
    const cartAmountElements = document.getElementsByClassName('cart-amount');
    const totalNeto = `$${this.carritoManager.getTotalNeto()}`;
    const totalItems = `${this.carritoManager.getTotalItems()}`;
    Array.from(totalElements).forEach(element => {
      element.textContent = totalNeto;
    });
    Array.from(cartAmountElements).forEach(element => {
      element.textContent = totalItems;
    });
  }
  
  // Método que añade un listener al select de zona de entrega para actualizar el costo de envío.
  costoDeEnvio() {
    const zonaDeEntregaSelect = document.querySelector('#zonaDeEntrega');
    const costoEnvioText = document.querySelector('#productInCartShippingCost');
    
    if (!zonaDeEntregaSelect || !costoEnvioText) {
      console.error('No se encontraron los elementos para actualizar el costo de envío.');
      return;
    }
    
    console.log("costoDeEnvio: Listener agregado a #zonaDeEntrega");
    
    zonaDeEntregaSelect.addEventListener('change', () => {
      const selectedOption = zonaDeEntregaSelect.options[zonaDeEntregaSelect.selectedIndex];
      const costoEnvioValue = selectedOption.value;
      console.log("Valor seleccionado en zonaDeEntrega:", costoEnvioValue);
      
      if (costoEnvioValue === "0") {
        costoEnvioText.textContent = "Pon tu zona en comentarios";
      } else if (costoEnvioValue === "") {
        costoEnvioText.textContent = "";
      } else {
        costoEnvioText.textContent = `$${costoEnvioValue}`;
      }
    });
  }
}
