// // assets/js/components/CartManager.js
// export class CartManager {
//     constructor() {
//       this.cart = JSON.parse(localStorage.getItem('cart')) || [];
//     }
  
//     addItem(productId) {
//       const existing = this.cart.find(item => item.id === productId);
//       existing ? existing.quantity++ : this.cart.push({ id: productId, quantity: 1 });
//       this.saveCart();
//     }
  
//     removeItem(productId) {
//       this.cart = this.cart.filter(item => {
//         if (item.id === productId && item.quantity > 1) {
//           item.quantity--;
//           return true;
//         }
//         return item.id !== productId;
//       });
//       this.saveCart();
//     }
  
//     saveCart() {
//       localStorage.setItem('cart', JSON.stringify(this.cart));
//       document.dispatchEvent(new CustomEvent('cartUpdated'));
//     }
//   }