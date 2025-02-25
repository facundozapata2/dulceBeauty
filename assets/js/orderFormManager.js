// 📁 js/components/OrderForm.js
export class OrderForm {
  constructor(cartManager) {
    this.cartManager = cartManager;
    this.form = document.querySelector('.product-in-cart__form');
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Mostrar/ocultar campos de envío
    document.getElementById('retiroMethod').addEventListener('change', (e) => {
      const envioFields = document.querySelectorAll('#direccion, #zonaDeEntrega');
      envioFields.forEach(field => field.style.display = e.target.value === 'enviar' ? 'block' : 'none');
    });

    // Enviar pedido
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.form);
    const pedido = this.generarMensajePedido(formData);
    this.enviarPorWhatsApp(pedido);
  }

  generarMensajePedido(formData) {
    let mensaje = '🚀 *NUEVO PEDIDO - DULCE BEAUTY* 🚀\n\n';
    
    // Datos del cliente
    mensaje += `*Nombre:* ${formData.get('userName')}\n`;
    mensaje += `*Teléfono:* ${formData.get('userPhone')}\n\n`;

    // Método de pago y retiro
    mensaje += `*Método de pago:* ${formData.get('paymentMethod')}\n`;
    mensaje += `*Retiro/Envío:* ${formData.get('retiroMethod')}\n`;

    // Datos de envío si aplica
    if (formData.get('retiroMethod') === 'enviar') {
      mensaje += `*Dirección:* ${formData.get('direccion')}\n`;
      mensaje += `*Zona:* ${formData.get('zonaDeEntrega')}\n`;
    }

    // Productos
    mensaje += '\n*PRODUCTOS:*\n';
    this.cartManager.getCarrito().forEach(item => {
      mensaje += `- ${item.name} x${item.cantidad} ($${item.precioUnitario.toLocaleString('es-AR')} c/u)\n`;
    });

    // Totales
    mensaje += `\n*Total productos:* $${this.cartManager.getTotal().toLocaleString('es-AR')}\n`;
    mensaje += `*Costo de envío:* $${document.getElementById('productInCartShippingCost').textContent}\n`;
    mensaje += `*Total final:* $${document.getElementById('productInCartNetworth').textContent}\n\n`;

    // Observaciones
    if (formData.get('nota')) {
      mensaje += `*Observaciones:*\n${formData.get('nota')}`;
    }

    return encodeURIComponent(mensaje);
  }

  enviarPorWhatsApp(mensaje) {
    const telefono = '5491131234567'; // Reemplazar con tu número
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
  }
}