// components/ProductCartItem.js
export class ProductCartItem {
    constructor(producto, cantidad, carritoManager) {
      this.producto = producto;
      this.cantidad = cantidad;
      this.carritoManager = carritoManager;
    }
  
    render() {
      const item = document.createElement('div');
      item.className = 'product-in-cart__card';
      item.innerHTML = `
        <button class="product-in-cart__btn-remove" data-id="${this.producto.id}">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="product-in-cart__row">
          <div class="product-in-cart__item">
            <div class="product-in-cart__txt">
              <h4>${this.producto.category}</h4>
              <p>${this.producto.name}</p>
              <p id="productInCartAmount">${this.cantidad} x <span>$${this.producto.price}</span></p>
            </div>
            <img src="./assets/images/jpg/${this.producto.image}" alt="${this.producto.alt}">
          </div>
          <div class="product-in-cart__sub-total">
            <p>Subtotal: $${this.producto.price * this.cantidad}</p>
          </div>
        </div>
      `;
  
      item.querySelector('.product-in-cart__btn-remove').addEventListener('click', () => {
        this.carritoManager.eliminarTodo(this.producto.id);
      });
  
      return item;
    }
  }