// toggleCart.js
export function toggleCart() { // Eliminamos los parámetros redundantes
    // Obtener elementos del DOM dentro de la función
    const shoppingCardContainer = document.querySelector('.shopping-card__sidebar');
    const cartBtn = document.getElementById('shoppingCartBtn');
  
    document.addEventListener('DOMContentLoaded', function() {
        shoppingCardContainer?.classList.add('cart-hidden');
    });
  
    // Verificar que los elementos existen antes de agregar eventos
    cartBtn?.addEventListener('click', function() {
        if (shoppingCardContainer?.classList.contains('cart-open')) {
            shoppingCardContainer.classList.remove('cart-open');
            shoppingCardContainer.classList.add('cart-hidden');
        } else {
            shoppingCardContainer?.classList.remove('cart-hidden');
            shoppingCardContainer?.classList.add('cart-open');
        }
    });
  
    document.addEventListener('click', function(event) {
        if (!shoppingCardContainer?.contains(event.target) && !cartBtn?.contains(event.target)) {
            shoppingCardContainer?.classList.remove('cart-open');
            shoppingCardContainer?.classList.add('cart-hidden');
        }
    });
  }
  
  toggleCart(); // Llamada sin parámetros