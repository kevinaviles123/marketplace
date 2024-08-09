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
            { nombre: 'courvoisier', precio: 93160165.38 },
            { nombre: 'Remy martin', precio: 8274332.47 },
            { nombre: 'martell', precio: 8610861.05 },
            { nombre: 'Louis Xlll', precio: 27127620.30 },
            { nombre: 'Carlos lll', precio: 120000 },
            { nombre: 'REMY MARTI', precio: 14313568.50 },
            { nombre: 'ARMAGNAC SEMPE', precio: 13132131.10 },
            { nombre: 'Hennessy', precio: 21783888.06 },
            { nombre: 'REMY MARTIN', precio: 12990000 },
            { nombre: 'Hennessy X.O', precio: 5043828.90 },
            { nombre: 'LARSEN V.S.O.P', precio: 41436644.81 },
            { nombre: 'XANTE LIQUEOR', precio: 112841236.14 },
            { nombre: 'CARLOS I DESDE 1889', precio: 21463501.50 },
            { nombre: 'RICHARD HENNESS', precio: 21776936.76 },
            { nombre: 'COMTE JOSEPH', precio: 19246741.98 },
            { nombre: 'COMTE JOSEPH', precio: 1300000 },
            { nombre: 'ZACAPA', precio: 15224477 },
            { nombre: 'Hennessy', precio: 4680958.60 },
            { nombre: 'Mistial', precio: 15291939.65 },
            { nombre: 'Henness', precio: 147277500.34 },
            { nombre: 'CANNABIS ABSINTHE', precio: 13685145.18 }
            
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