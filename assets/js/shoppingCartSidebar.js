// shoppingCartSidebar.js
import { EmptyCartMessage } from './components/EmptyCartMessage.js';
import { ProductCartItem } from './components/ProductCartCard.js';

export class ShoppingCartSidebar {
  constructor(carritoManager, sidebarSelector = '.shopping-card__sidebar') {
    this.carritoManager = carritoManager;
    this.sidebar = document.querySelector(sidebarSelector);
  }
  
  // Muestra u oculta el formulario y la información del carrito según si hay productos
  mostrarFormulario() {
    const formulario = this.sidebar.querySelector('.product-in-cart__form');
    const info = this.sidebar.querySelector('.product-in-cart__info');
    if (!formulario || !info) return;
    
    if (this.carritoManager.carrito.length === 0) {
      formulario.classList.remove('visible');
      info.classList.remove('visible');
    } else {
      formulario.classList.add('visible');
      info.classList.add('visible');
    }
  }
  
  // Actualiza el contenedor de las cards del carrito
  actualizarContenido() {
    const contenedor = this.sidebar.querySelector('.product-in-cart__card-container');
    if (!contenedor) return;
    contenedor.innerHTML = ''; // Limpia el contenedor
  
    if (this.carritoManager.carrito.length === 0) {
      // Si el carrito está vacío, muestra el mensaje de carrito vacío
      contenedor.appendChild(new EmptyCartMessage().render());
    } else {
      // Por cada producto en el carrito, crea el componente y lo inserta
      this.carritoManager.carrito.forEach(item => {
        const productCartItem = new ProductCartItem(item, this.carritoManager);
        contenedor.appendChild(productCartItem.render());
      });
    }
    // Después de actualizar las cards, se muestra u oculta el formulario y la info
    this.mostrarFormulario();
  }
  
  // Actualiza los totales mostrados en el sidebar y en el header
  actualizarTotales() {
    // Elementos para mostrar el total de productos y cantidad
    const totalElements = document.getElementsByClassName('cart-total');
    const cartAmountElements = document.getElementsByClassName('cart-amount');
    const netWorthElement = document.querySelector('#productInCartNetworth');
    const shippingCostElement = document.querySelector('#productInCartShippingCost');
  
    const totalProductos = this.carritoManager.getTotal();
    let shippingCost = 0;
    const retiroSelect = document.getElementById('retiroMethod');
    if (retiroSelect && retiroSelect.value === 'enviar') {
      // Se parsea el contenido del costo de envío, removiendo el símbolo '$'
      shippingCost = parseInt(shippingCostElement.textContent.replace('$', '')) || 0;
    }
    const totalFinal = totalProductos + shippingCost;
  
    // Actualiza los elementos que muestran el total de productos
    Array.from(totalElements).forEach(element => {
      element.textContent = `$${totalProductos}`;
    });
    // Actualiza los elementos que muestran la cantidad total de productos
    Array.from(cartAmountElements).forEach(element => {
      element.textContent = `${this.carritoManager.getTotalItems()}`;
    });
    // Actualiza el total final (net worth)
    if (netWorthElement) {
      netWorthElement.textContent = `$${totalFinal}`;
    }
  }
  
  // Añade un listener al select de zona de entrega para actualizar el costo de envío dinámicamente
  costoDeEnvio() {
    const zonaDeEntregaSelect = document.querySelector('#zonaDeEntrega');
    const costoEnvioText = document.querySelector('#productInCartShippingCost');
    costoEnvioText.textContent = "";
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
