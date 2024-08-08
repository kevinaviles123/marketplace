let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
function renderizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    const cartIconCount = document.querySelector('.cart span');
    cartItems.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        
        
        const nombre = document.createElement('span');
        nombre.textContent = item.nombre;

        
        const precio = document.createElement('span');
        precio.textContent = `$${(item.precio * item.cantidad).toLocaleString()}`;

        
        const cantidadContainer = document.createElement('div');
        cantidadContainer.className = 'cantidad-container';

        
        const reducirCantidad = document.createElement('button');
        reducirCantidad.textContent = '-';
        reducirCantidad.addEventListener('click', () => {
            if (item.cantidad > 1) {
                item.cantidad--;
            } else {
                carrito.splice(index, 1); 
            }
            guardarCarrito();
            renderizarCarrito();
        });

        
        const cantidad = document.createElement('span');
        cantidad.textContent = item.cantidad;

        
        const aumentarCantidad = document.createElement('button');
        aumentarCantidad.textContent = '+';
        aumentarCantidad.addEventListener('click', () => {
            item.cantidad++;
            guardarCarrito();
            renderizarCarrito();
        });

        cantidadContainer.appendChild(reducirCantidad);
        cantidadContainer.appendChild(cantidad);
        cantidadContainer.appendChild(aumentarCantidad);

        li.appendChild(nombre);
        li.appendChild(precio);
        li.appendChild(cantidadContainer);

        cartItems.appendChild(li);

        total += item.precio * item.cantidad;
        totalItems += item.cantidad;
    });

    totalPrice.textContent = total.toLocaleString();
    cartIconCount.textContent = totalItems;
}
function agregarAlCarrito(producto) {
    const existe = carrito.find(item => item.nombre === producto.nombre);
    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    renderizarCarrito();
}
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
document.querySelectorAll('.product-card button').forEach((button, index) => {
    button.addEventListener('click', () => {
        const productos = [
            { nombre: 'LD01 LOUNGE CHAIR', precio: 93160165.38 },
            { nombre: 'LD02 LOUNGE CHAIR', precio: 8274332.47 },
            { nombre: 'LD03 LOUNGE CHAIR', precio: 8610861.05 },
            { nombre: 'LD04 LOUNGE CHAIR', precio: 27127620.30 },
            { nombre: 'LD05 LOUNGE CHAIR', precio: 120000 },
            { nombre: 'LD06 LOUNGE CHAIR', precio: 14313568.50 },
            { nombre: 'LD07 LOUNGE CHAIR', precio: 13132131.10 },
            { nombre: 'LD08 LOUNGE CHAIR', precio: 21783888.06 },
            { nombre: 'LD09 LOUNGE CHAIR', precio: 12990000 },
            { nombre: 'LD10 LOUNGE CHAIR', precio: 5043828.90 },
            { nombre: 'LD11 LOUNGE CHAIR', precio: 41436644.81 },
            { nombre: 'LD12 LOUNGE CHAIR', precio: 112841236.14 },
            { nombre: 'LD13 LOUNGE CHAIR', precio: 21463501.50 },
            { nombre: 'LD14 LOUNGE CHAIR', precio: 21776936.76 },
            { nombre: 'LD15 LOUNGE CHAIR', precio: 19246741.98 },
            { nombre: 'LD16 LOUNGE CHAIR', precio: 1300000 },
            { nombre: 'LD17 LOUNGE CHAIR', precio: 15224477 },
            { nombre: 'LD18 LOUNGE CHAIR', precio: 4680958.60 },
            { nombre: 'LD19 LOUNGE CHAIR', precio: 15291939.65 },
            { nombre: 'LD20 LOUNGE CHAIR', precio: 147277500.34 },
            { nombre: 'LD21 LOUNGE CHAIR', precio: 13685145.18 }
            
        ];
        agregarAlCarrito(productos[index]);
    });
});

const cartModal = document.getElementById('cart-modal');
const closeButton = document.querySelector('.close-button');
const cartIcon = document.querySelector('.cart');

cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    renderizarCarrito();
});

closeButton.addEventListener('click', () => {
    cartModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});
renderizarCarrito();