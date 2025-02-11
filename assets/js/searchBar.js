// Selecciona el contenedor de productos
const productGrid = document.getElementById('product-grid');

// Carga los productos desde el archivo JSON
function loadProducts() {
    fetch('data/productos.json')
        .then(response => response.json())
        .then(data => {
            displayProducts(data); // Muestra todos los productos al cargar la página
            setupFilters(data); // Configura los filtros
            setupSearch(data); // Configura el buscador
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Muestra los productos en el contenedor
function displayProducts(products) {
    productGrid.innerHTML = ''; // Limpia el contenedor
    products.forEach(product => {
        const productCard = `
            <div class="product" data-categoria="${product.categoria}">
                <img src="${product.imagen}" alt="${product.nombre}">
                <h3>${product.nombre}</h3>
                <p>${product.descripcion}</p>
            </div>
        `;
        productGrid.innerHTML += productCard;
    });
}

// Configura los filtros por categoría
function setupFilters(products) {
    document.querySelectorAll('.filtros button').forEach(button => {
        button.addEventListener('click', function () {
            const categoria = this.getAttribute('data-categoria');
            if (categoria === 'todos') {
                displayProducts(products); // Muestra todos los productos
            } else {
                const filteredProducts = products.filter(product => product.categoria === categoria);
                displayProducts(filteredProducts); // Muestra productos filtrados
            }
        });
    });
}

// Configura el buscador
function setupSearch(products) {
    const buscadorInput = document.getElementById('buscador-input');
    buscadorInput.addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.nombre.toLowerCase().includes(searchText)
        );
        displayProducts(filteredProducts); // Muestra productos que coinciden con la búsqueda
    });
}

// Carga los productos al iniciar la página
window.addEventListener('load', loadProducts);