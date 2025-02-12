let shoppingCardContainer = document.querySelector('.shopping-card__sidebar');
let cartBtn = document.getElementById('shoppingCartBtn');

function toggleCart(shoppingCardContainer, cartBtn) {
    cartBtn.addEventListener('click', function() {
        if (shoppingCardContainer.classList.contains('cart-open')) {
            shoppingCardContainer.classList.remove('cart-open');
            shoppingCardContainer.classList.add('cart-hidden');
        } else {
            shoppingCardContainer.classList.remove('cart-hidden');
            shoppingCardContainer.classList.add('cart-open');
        }
    });

    document.addEventListener('click', function(event) {
        if (!shoppingCardContainer.contains(event.target) && !cartBtn.contains(event.target)) {
            shoppingCardContainer.classList.remove('cart-open');
            shoppingCardContainer.classList.add('cart-hidden');
        }
    });
}

toggleCart(shoppingCardContainer, cartBtn);
