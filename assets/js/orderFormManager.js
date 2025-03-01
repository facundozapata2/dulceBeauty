export class OrderForm {
  constructor(cartManager) {
    this.cartManager = cartManager;
    this.form = document.getElementById('orderForm');
    this.submitButton = document.querySelector(".product-in-cart__btn-procesar");
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    const retiroSelect = this.form.querySelector('#retiroMethod');
    const direccion = this.form.querySelector('#direccion');
    const zona = this.form.querySelector('#zonaDeEntrega');
    const costoEnvioText = document.querySelector('#productInCartShippingCost');

    // Manejar visibilidad campos envío
    retiroSelect.addEventListener('change', (e) => {
      const showFields = e.target.value === 'enviar';
      direccion.classList.toggle('visible-delivery', showFields);
      zona.classList.toggle('visible-delivery', showFields);
      costoEnvioText?.classList.toggle('visible-delivery', showFields);
      
      // Resetear valores si se ocultan
      if (!showFields) {
        direccion.value = '';
        zona.value = '';
      }
      document.dispatchEvent(new CustomEvent('actualizarCarrito'));
    });

    // Actualizar costo de envío dinámicamente
    zona?.addEventListener('change', (e) => {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const costoEnvioValue = parseInt(selectedOption.value) || 0;
      
      // Manejar mensaje especial
      if (costoEnvioValue === 0) {
        this.mostrarAdvertenciaZona();
        costoEnvioText.textContent = "Pon tu zona en comentarios";
      } else {
        this.removerAdvertenciaZona();
        costoEnvioText.textContent = `$${costoEnvioValue}`;
      }
      
      document.dispatchEvent(new CustomEvent('actualizarCarrito'));
    });

    this.submitButton.addEventListener("click", (e) => this.handleSubmit(e));
  }

  mostrarAdvertenciaZona() {
    if (!this.form.querySelector('.zona-warning')) {
      const warning = document.createElement('p');
      warning.className = 'zona-warning';
      warning.style.cssText = `
        color: var(--red-hot);
        font-size: 0.9rem;
        margin-top: 0.5rem;
      `;
      warning.textContent = '¿No sale tu zona? Ponla en Comentarios';
      this.form.querySelector('#zonaDeEntrega').parentElement.appendChild(warning);
    }
  }

  removerAdvertenciaZona() {
    const warning = this.form.querySelector('.zona-warning');
    if (warning) warning.remove();
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(this.form);
    const mensaje = this.generarMensajePedido(formData);
    this.enviarPorWhatsApp(mensaje);
  }

  generarMensajePedido(formData) {
    let mensaje = '🚀 *NUEVO PEDIDO - DULCE BEAUTY* 🚀\n\n';
    
    // Datos del cliente (corregido el nombre del campo)
    mensaje += `*Nombre:* ${formData.get('userName')}\n`;
    mensaje += `*Teléfono:* ${formData.get('userPhone')}\n`; // <- Corregido aquí
    mensaje += `*Método de pago:* ${formData.get('paymentMethod')}\n`;
    mensaje += `*Retiro/Envío:* ${formData.get('retiroMethod')}\n\n`;
    
    if (formData.get('retiroMethod') === 'enviar') {
      mensaje += `*Dirección:* ${formData.get('direccion') || "No especificada"}\n`;
      mensaje += `*Zona de entrega:* ${formData.get('zonaDeEntrega') || "No especificada"}\n\n`;
    }
    
    mensaje += '*PRODUCTOS:*\n';
    this.cartManager.getCarrito().forEach(item => {
      mensaje += `- ${item.name} x${item.cantidad} ($${item.precioUnitario} c/u)\n`;
    });
    
    const costoEnvio = parseInt(document.querySelector('#zonaDeEntrega')?.value) || 0;
    mensaje += `\n*Total productos:* $${this.cartManager.getTotal()}`;
    mensaje += `\n*Costo envío:* $${costoEnvio}`;
    mensaje += `\n*Total final:* $${this.cartManager.getTotal() + costoEnvio}\n`;
    
    if (formData.get('nota')) {
      mensaje += `\n*Comentarios:*\n${formData.get('nota')}`;
    }
    
    return encodeURIComponent(mensaje);
  }

  enviarPorWhatsApp(mensaje) {
    const numeroWhatsApp = '5491151222667';
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensaje}`, '_blank');
  }
}