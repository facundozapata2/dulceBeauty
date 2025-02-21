export class CartManager {
    // ... Métodos existentes ...
    
    getCostoEnvio() {
      const envioSelect = document.querySelector('#zonaDeEntrega');
      return envioSelect ? parseInt(envioSelect.value) || 0 : 0;
    }
  
    getTotalNeto() {
      return this.getTotalPrecio() + this.getCostoEnvio();
    }
  }