// 📁 js/CartManager.js
export class CartManager {
  constructor() {
    this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    this.MAX_ITEMS = 100;
  }

  añadirProducto(producto) {
    const itemExistente = this.carrito.find(item => item.id === producto.id);
    
    if (itemExistente) {
      if (itemExistente.cantidad >= this.MAX_ITEMS) throw new Error('Límite de unidades alcanzado');
      itemExistente.cantidad++;
    } else {
      this.carrito.push({...producto, cantidad: 1});
    }
    this.guardarEstado();
  }

  eliminarProducto(productoId) {
    const itemIndex = this.carrito.findIndex(item => item.id === productoId);
    if (itemIndex === -1) throw new Error('Producto no encontrado en el carrito');

    if (this.carrito[itemIndex].cantidad > 1) {
      this.carrito[itemIndex].cantidad--;
    } else {
      this.carrito.splice(itemIndex, 1);
    }
    this.guardarEstado();
  }

  guardarEstado() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
    document.dispatchEvent(new CustomEvent('actualizarCarrito'));
  }

  getTotalItems() {
    return this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
  }
}