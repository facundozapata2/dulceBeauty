// main.js
import { CartManager } from './cartManager.js';
import { ProductFilter } from './productFilter.js';
import { ProductCard } from './components/ProductCardMain.js';
import { ProductCartItem } from './components/ProductCartCard.js';
import { toggleCart } from './toggleCart.js';

// Inicializar todo aquí

document.addEventListener('DOMContentLoaded', () => {
  const productFilter = new ProductFilter();
  productFilter.init();
});