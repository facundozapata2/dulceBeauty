// ProductFilter.js
import { ProductCard } from './components/ProductCardMain.js';

export class ProductFilter {
  constructor() {
    this.container = document.getElementById('productItemContainer');
    this.categories = document.querySelectorAll('[data-category]');
    this.searchInput = document.getElementById('search');
    this.searchBtn = document.getElementById('searchBtn');
    this.products = [];
    this.currentCategory = 'all';
    this.currentSearchTerm = '';
  }

  async init() {
    await this.loadProducts();
    this.setupCategoryFilters();
    this.initSearch();
    this.applyFilters();
  }

  async loadProducts() {
    const response = await fetch('./products.json');
    this.products = await response.json();
  }

  initSearch() {
    this.searchInput.addEventListener('input', (e) => {
      this.currentSearchTerm = e.target.value.trim().toLowerCase();
      this.applyFilters();
    });

    this.searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.currentSearchTerm = this.searchInput.value.trim().toLowerCase();
      this.applyFilters();
    });
  }

  applyFilters() {
    let filtered = this.products;

    if (this.currentCategory !== 'all') {
      filtered = filtered.filter(p => p.category === this.currentCategory);
    }

    if (this.currentSearchTerm) {
      filtered = filtered.filter(product => {
        return product.name.toLowerCase().includes(this.currentSearchTerm) ||
               product.description.toLowerCase().includes(this.currentSearchTerm);
      });
    }

    this.renderFilteredProducts(filtered);
  }

  renderFilteredProducts(filteredProducts) {
    this.container.innerHTML = '';
    filteredProducts.forEach(product => {
      const card = new ProductCard(product).render();
      this.container.appendChild(card);
    });
  }

  setupCategoryFilters() {
    this.categories.forEach(category => {
      category.addEventListener('click', (e) => {
        e.preventDefault();
        this.currentCategory = category.dataset.category;
        this.applyFilters();
        
        this.categories.forEach(c => c.classList.remove('active'));
        category.classList.add('active');
      });
    });
  }
}