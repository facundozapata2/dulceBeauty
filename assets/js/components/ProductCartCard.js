// components/ProductCardMain.js
export class ProductCartItem {
  constructor(product, cartManager) {
    this.product = product;
    this.cartManager = cartManager;
    this.quantityElement = null;
  }

  render() {
    const card = document.createElement('article');
    card.className = 'product-item__card';
    card.dataset.id = this.product.id;
    card.dataset.category = this.product.category;

    card.innerHTML = `
      <img src="./assets/images/webp/${this.product.image}" 
           alt="${this.product.alt}"
           class="product-item__image"
           loading="lazy"
           onerror="this.onerror=null;this.src='./assets/images/placeholder.webp'">
      
      <div class="product-item__info">
        <h4 class="product-item__title">${this.product.name}</h4>
        <p class="product-item__description">${this.product.description}</p>
        
        <div class="product-item__price-btn">
          <p class="product-item__price">$${this.product.price}</p>
          
          <div class="product-item__controls">
            <button class="product-item__btn-remove controls-btn" 
                    aria-label="Quitar una unidad"
                    data-id="${this.product.id}">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="product-item__quantity">0</span>
            <button class="product-item__btn-add controls-btn" 
                    aria-label="Agregar una unidad"
                    data-id="${this.product.id}">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners(card);
    this.quantityElement = card.querySelector('.product-item__quantity');
    this.updateQuantity();
    
    return card;
  }

  setupEventListeners(card) {
    // Botón Agregar
    card.querySelector('.product-item__btn-add').addEventListener('click', () => {
      try {
        this.cartManager.añadirProducto(this.product);
        this.showFeedback('✔️ Añadido al carrito', 'success');
      } catch (error) {
        this.showFeedback(`⚠️ ${error.message}`, 'error');
      }
    });

    // Botón Quitar
    card.querySelector('.product-item__btn-remove').addEventListener('click', () => {
      try {
        this.cartManager.eliminarProducto(this.product.id);
        this.showFeedback('➖ Eliminado del carrito', 'warning');
      } catch (error) {
        this.showFeedback(`⚠️ ${error.message}`, 'error');
      }
    });

    document.addEventListener('actualizarCarrito', () => this.updateQuantity());
  }

  updateQuantity() {
    if (!this.cartManager?.carrito) return;
    
    const item = this.cartManager.carrito.find(item => item.id === this.product.id);
    this.quantityElement.textContent = item ? item.cantidad : '0';
    
    const removeBtn = this.quantityElement.parentElement.querySelector('.product-item__btn-remove');
    if (removeBtn) {
      removeBtn.disabled = !item || item.cantidad <= 0;
    }
  }

  showFeedback(mensaje, tipo) {
    const feedback = document.createElement('div');
    feedback.className = `feedback feedback--${tipo}`;
    feedback.textContent = mensaje;
    
    document.body.appendChild(feedback);
    setTimeout(() => feedback.remove(), 2000);
  }
}