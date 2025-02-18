// product-item__card.js
export class ProductCard {
    constructor(product) {
      this.product = product;
    }
  
    render() {
      const card = document.createElement('article');
      card.className = 'product-item__card';
      card.dataset.id = this.product.id;
      card.dataset.category = this.product.category;
  
      card.innerHTML = `
        <img src="./assets/images/jpg/${this.product.image}" 
             alt="${this.product.alt}"
             class="product-item__image"
             loading="lazy">
        
        <div class="product-item__info">
          <h4 class="product-item__title">${this.product.name}</h4>
          <p class="product-item__description">${this.product.description}</p>
          
          <div class="product-item__price-btn">
            <p class="product-item__price">$${this.product.price}</p>
            
            <div class="product-item__controls">
              <button class="product-item__btn-remove" 
                      aria-label="Quitar una unidad"
                      data-id="${this.product.id}">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="product-item__quantity">0</span>
              <button class="product-item__btn-add" 
                      aria-label="Agregar una unidad"
                      data-id="${this.product.id}">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      `;
  
      return card;
    }
  }