export class ShoppingCartSidebar {
    // ... Métodos existentes ...
    
    actualizarContenido() {
      const contenedor = this.sidebar.querySelector('.product-in-cart__card-container');
      contenedor.innerHTML = '';
      
      if (this.carritoManager.carrito.length === 0) {
        contenedor.appendChild(new EmptyCartMessage().render());
      } else {
        this.carritoManager.carrito.forEach(item => {
          const productCartItem = new ProductCartItem(
            item,
            item.cantidad,
            this.carritoManager
          );
          contenedor.appendChild(productCartItem.render());
        });
      }
    }
  
    actualizarTotales() {
      document.querySelector('#productInCartTotalItems').textContent = 
        this.carritoManager.getTotalItems();
      
      document.querySelector('#productInCartNetworth').textContent = 
        `$${this.carritoManager.getTotalNeto()}`;
      
      // Actualizar header
      document.querySelector('.cart-amount').textContent = 
        `$${this.carritoManager.getTotalPrecio()}`;
    }
  }