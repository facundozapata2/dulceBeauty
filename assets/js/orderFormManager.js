// orderFormManager.js
export class OrderForm {
  constructor(cartManager) {
    this.cartManager = cartManager;
    this.form = document.getElementById('orderForm');
    this.submitButton = document.querySelector(".product-in-cart__btn-procesar");
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Interceptar el submit del formulario
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Seleccionar campos condicionales y el costo de envío
    const retiroSelect = this.form.querySelector('#retiroMethod');
    const direccion = this.form.querySelector('#direccion');
    const zona = this.form.querySelector('#zonaDeEntrega');
    const costoEnvioText = document.querySelector('#productInCartShippingCost');

    // Asumimos que los elementos están ocultos por defecto mediante CSS
    // (No se usan style.display, sino la clase "visible-delivery")

    retiroSelect.addEventListener('change', (e) => {
      if (e.target.value === 'enviar') {
        direccion.classList.add('visible-delivery');
        zona.classList.add('visible-delivery');
        if (costoEnvioText) costoEnvioText.classList.add('visible-delivery');
      } else {
        direccion.classList.remove('visible-delivery');
        zona.classList.remove('visible-delivery');
        if (costoEnvioText) costoEnvioText.classList.remove('visible-delivery');
        // Eliminar advertencia si existe
        const warning = this.form.querySelector('.zona-warning');
        if (warning) warning.remove();
      }
    });

    // Mostrar advertencia en el select de zona si se selecciona "No sale mi zona"
    zona.addEventListener('change', (e) => {
      const selectedOption = zona.options[zona.selectedIndex];
      const costoEnvioValue = selectedOption.value;
      
      if (costoEnvioValue === "0") {
        let warning = this.form.querySelector('.zona-warning');
        if (!warning) {
          warning = document.createElement('p');
          warning.className = 'zona-warning';
          warning.style.color = 'red';
          warning.style.fontSize = '0.9rem';
          warning.style.marginTop = '0.5rem';
          warning.textContent = '¿No sale tu zona? Ponla en Comentarios';
          zona.parentElement.appendChild(warning);
        }
      } else {
        const warning = this.form.querySelector('.zona-warning');
        if (warning) warning.remove();
      }
      
      // Actualiza el texto del costo de envío
      if (costoEnvioText) {
        if (costoEnvioValue === "0") {
          costoEnvioText.textContent = "Pon tu zona en comentarios";
        } else if (costoEnvioValue === "") {
          costoEnvioText.textContent = "";
        } else {
          costoEnvioText.textContent = `$${costoEnvioValue}`;
        }
      }
    });

    // Actualizar el placeholder del textarea (comentario)
    const notaTextarea = this.form.querySelector('#notaTextarea');
    if (notaTextarea) {
      notaTextarea.placeholder = "¿Algun comentario?";
    }

    // Manejar el evento "Enviar Pedido" del botón (fuera del formulario)
    this.submitButton.addEventListener("click", (e) => this.handleSubmit(e));
  }

  handleSubmit(e) {
    e.preventDefault(); // Evitar que se envíe el formulario de forma tradicional
    const formData = new FormData(this.form);
    const mensaje = this.generarMensajePedido(formData);
    this.enviarPorWhatsApp(mensaje);
  }

  generarMensajePedido(formData) {
    let mensaje = '🚀 *NUEVO PEDIDO - DULCE BEAUTY* 🚀\n\n';
    
    // Datos del cliente
    mensaje += `*Nombre:* ${formData.get('userName')}\n`;
    mensaje += `*Teléfono:* ${formData.get('userPhone')}\n`;
    mensaje += `*Método de pago:* ${formData.get('paymentMethod')}\n`;
    mensaje += `*Retiro/Envío:* ${formData.get('retiroMethod')}\n\n`;
    
    // Si se selecciona "enviar", incluir dirección y zona
    if (formData.get('retiroMethod') === 'enviar') {
      mensaje += `*Dirección:* ${formData.get('direccion') || "No especificada"}\n`;
      mensaje += `*Zona de entrega:* ${formData.get('zonaDeEntrega') || "No especificada"}\n\n`;
    }
    
    // Información de los productos en el carrito
    mensaje += '*PRODUCTOS:*\n';
    this.cartManager.getCarrito().forEach(item => {
      mensaje += `- ${item.name} x${item.cantidad} ($${item.precioUnitario} c/u)\n`;
    });
    
    mensaje += `\n*Total productos:* $${this.cartManager.getTotal()}\n`;
    
    // Comentarios adicionales
    if (formData.get('nota')) {
      mensaje += `\n*Comentarios:*\n${formData.get('nota')}`;
    }
    
    return encodeURIComponent(mensaje);
  }

  enviarPorWhatsApp(mensaje) {
    const numeroWhatsApp = '5491151222667';
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
  }

  // Método opcional: enviar por email (para futuras implementaciones)
  enviarPorEmail(mensaje) {
    const emailDestino = 'cliente@example.com';
    const subject = encodeURIComponent('Nuevo Pedido - Dulce Beauty');
    window.open(`mailto:${emailDestino}?subject=${subject}&body=${mensaje}`, '_blank');
  }
}
