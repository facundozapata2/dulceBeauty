// OrderFormManager.js
export class OrderFormManager {
    constructor(carritoManager) {
      this.form = document.querySelector('.product-in-cart__form');
      this.carritoManager = carritoManager;
      this.setupEventListeners();
    }
  
    setupEventListeners() {
      // Mostrar/ocultar campos de envío
      document.querySelector('#retiroMethod').addEventListener('change', (e) => {
        const envioFields = document.querySelectorAll('#direccion, #zonaDeEntrega');
        envioFields.forEach(field => field.style.display = e.target.value === 'enviar' ? 'block' : 'none');
      });
  
      // Validar textarea
      document.querySelector('#notaTextarea').addEventListener('input', (e) => {
        if (e.target.value.length > 120) {
          e.target.setCustomValidity('Máximo 120 caracteres');
        } else {
          e.target.setCustomValidity('');
        }
      });
  
      // Enviar pedido
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  
    handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(this.form);
      const pedidoTexto = this.generarTextoPedido(formData);
      console.log(pedidoTexto); // Aquí enviarías el pedido
    }
  
    generarTextoPedido(formData) {
      let texto = `Pedido de ${formData.get('userName')} (${formData.get('userPhone')})\n`;
      texto += `Método de pago: ${formData.get('paymentMethod')}\n`;
      texto += `Retiro: ${formData.get('retiroMethod')}\n`;
      
      if (formData.get('retiroMethod') === 'enviar') {
        texto += `Dirección: ${formData.get('direccion')}\n`;
        texto += `Zona: ${formData.get('zonaDeEntrega')}\n`;
      }
      
      texto += `Productos:\n${this.carritoManager.carrito.map(item => 
        `- ${item.name} x${item.cantidad} ($${item.price * item.cantidad})`
      ).join('\n')}`;
      
      texto += `\nTotal: $${this.carritoManager.getTotalNeto()}`;
      
      if (formData.get('nota')) {
        texto += `\nNota: ${formData.get('nota')}`;
      }
      
      return texto;
    }
  }