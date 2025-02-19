// ProductFilter.js
import { ProductCard } from './components/product-item__card.js';

export class ProductFilter {
  constructor() {
    this.container = document.getElementById('productItemContainer');
    this.categories = document.querySelectorAll('[data-category]');
    this.products = [];
  }

  async init() {
    await this.loadProducts();
    this.setupCategoryFilters();
    this.renderProducts();
  }

  async loadProducts() {
    const response = await fetch('./products.json');
    this.products = await response.json();
  }

  renderProducts(category = 'all') {
    this.container.innerHTML = '';
    const filtered = category === 'all' 
      ? this.products 
      : this.products.filter(p => p.category === category);

    filtered.forEach(product => {
      const card = new ProductCard(product).render();
      this.container.appendChild(card);
    });
  }

  setupCategoryFilters() {
    this.categories.forEach(category => {
      category.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCategory = category.dataset.category;
        this.renderProducts(selectedCategory);
        
        // Actualizar clase activa
        this.categories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
      });
    });
  }
}
