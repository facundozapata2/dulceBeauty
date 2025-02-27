export class OrderForm {
  constructor(cartManager) {
    this.cartManager = cartManager;
    this.form = document.getElementById('orderForm');
    this.submitButton = document.querySelector(".product-in-cart__btn-procesar");
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Lógica para mostrar/ocultar campos según el método de retiro
    const retiroSelect = this.form.querySelector('#retiroMethod');
    const direccion = this.form.querySelector('#direccion');
    const zona = this.form.querySelector('#zonaDeEntrega');
    const costoEnvioText = document.querySelector('#productInCartShippingCost');

    retiroSelect.addEventListener('change', (e) => {
      if (e.target.value === 'enviar') {
        direccion.style.display = 'block';
        zona.style.display = 'block';
      } else {
        direccion.style.display = 'none';
        zona.style.display = 'none';
        const warning = this.form.querySelector('.zona-warning');
        if (warning) warning.remove();
      }
    });

    // Cambia el costo de envío dinámicamente
    zona.addEventListener('change', (e) => {
      const selectedOption = zona.options[zona.selectedIndex];
      const costoEnvioValue = selectedOption.value;

      if (costoEnvioValue === "0") {
        costoEnvioText.textContent = "Pon tu zona en comentarios";
      } else if (costoEnvioValue === "") {
        costoEnvioText.textContent = "";
      } else {
        costoEnvioText.textContent = `$${costoEnvioValue}`;
      }

      // Muestra una advertencia si el usuario selecciona "No sale mi zona"
      let warning = this.form.querySelector('.zona-warning');
      if (costoEnvioValue === "0") {
        if (!warning) {
          warning = document.createElement('p');
          warning.className = 'zona-warning';
          warning.style.color = 'red';
          warning.style.fontSize = '0.9rem';
          warning.style.marginTop = '0.5rem';
          warning.textContent = '¿No sale tu zona? Ponla en Comentarios';
          zona.parentElement.appendChild(warning);
        }
      } else if (warning) {
        warning.remove();
      }
    });

    // Manejo del evento "Enviar Pedido"
    this.submitButton.addEventListener("click", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault(); // Evita el envío del formulario por defecto
    const formData = new FormData(this.form);
    const mensaje = this.generarMensajePedido(formData);
    this.enviarPorWhatsApp(mensaje);
  }

  generarMensajePedido(formData) {
    let mensaje = '🚀 *NUEVO PEDIDO - DULCE BEAUTY* 🚀\n\n';

    // Datos del cliente
    mensaje += `👤 *Nombre:* ${formData.get('userName')}\n`;
    mensaje += `📞 *Teléfono:* ${formData.get('userPhone')}\n`;

    // Método de pago y de retiro/envío
    mensaje += `💳 *Método de pago:* ${formData.get('paymentMethod')}\n`;
    mensaje += `📦 *Método de entrega:* ${formData.get('retiroMethod')}\n`;

    // Si se selecciona envío, incluir dirección y zona
    if (formData.get('retiroMethod') === 'enviar') {
      mensaje += `🏡 *Dirección:* ${formData.get('direccion') || "No especificada"}\n`;
      mensaje += `📍 *Zona de entrega:* ${formData.get('zonaDeEntrega') || "No especificada"}\n`;
    }

    // Productos en el carrito
    mensaje += '\n🛒 *PRODUCTOS:* \n';
    this.cartManager.getCarrito().forEach(item => {
      mensaje += `- ${item.name} x${item.cantidad} ($${item.precioUnitario} c/u)\n`;
    });

    // Totales
    mensaje += `\n💰 *Total productos:* $${this.cartManager.getTotal()}\n`;

    // Comentarios adicionales
    if (formData.get('nota')) {
      mensaje += `📝 *Comentarios:* ${formData.get('nota')}\n`;
    }

    return encodeURIComponent(mensaje);
  }

  enviarPorWhatsApp(mensaje) {
    const numeroWhatsApp = '5491151222667';
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
  }

  // 🚀 Enviar por email (opcional, para futuras implementaciones)
  enviarPorEmail(mensaje) {
    const emailDestino = 'cliente@example.com';
    const subject = encodeURIComponent('Nuevo Pedido - Dulce Beauty');
    window.open(`mailto:${emailDestino}?subject=${subject}&body=${mensaje}`, '_blank');
  }
}
