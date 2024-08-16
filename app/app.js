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

        const imagen = document.createElement('img');
        imagen.src = item.imagen;
        imagen.alt = item.nombre;
        imagen.style.width = '40px'; 
        imagen.style.height = '40px';
        imagen.style.objectFit = 'cover';
        imagen.style.marginRight = '10px'; 

        const nombre = document.createElement('span');
        nombre.textContent = item.nombre;

        const precio = document.createElement('span');
        precio.textContent = `\$${(item.precio * item.cantidad).toLocaleString()}`;

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

        li.appendChild(imagen); 
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
            { nombre: 'Carlos.I', precio: 93160165.38, imagen: 'ruta/a/courvoisier.jpg' },
            { nombre: 'Remy martin', precio: 8274332.47, imagen: 'ruta/a/remy_martin.jpg' },
            { nombre: 'martell', precio: 8610861.05, imagen: 'ruta/a/martell.jpg' },
            { nombre: 'Louis Xlll', precio: 27127620.30, imagen: 'ruta/a/louis_xiii.jpg' },
            { nombre: 'Carlos lll', precio: 120000, imagen: 'ruta/a/carlos_iii.jpg' },
            { nombre: 'REMY MARTI', precio: 14313568.50, imagen: 'ruta/a/remy_marti.jpg' },
            { nombre: 'ARMAGNAC SEMPE', precio: 13132131.10, imagen: 'ruta/a/armagnac_sempe.jpg' },
            { nombre: 'Hennessy', precio: 21783888.06, imagen: 'ruta/a/hennessy.jpg' },
            { nombre: 'REMY MARTIN', precio: 12990000, imagen: 'ruta/a/remy_martin.jpg' },
            { nombre: 'Hennessy X.O', precio: 5043828.90, imagen: 'ruta/a/hennessy_xo.jpg' },
            { nombre: 'LARSEN V.S.O.P', precio: 41436644.81, imagen: 'ruta/a/larsen_vsop.jpg' },
            { nombre: 'Hennessy', precio: 112841236.14, imagen: 'ruta/a/xante_liqueur.jpg' },
            { nombre: 'CARLOS I DESDE 1889', precio: 21463501.50, imagen: 'ruta/a/carlos_i.jpg' },
            { nombre: 'RICHARD HENNESS', precio: 21776936.76, imagen: 'ruta/a/richard_henness.jpg' },
            { nombre: 'COMTE JOSEPH', precio: 19246741.98, imagen: 'ruta/a/comte_joseph.jpg' },
            { nombre: 'Cannabis absinthe', precio: 13685145.18, imagen: 'ruta/a/comte_joseph.jpg' },
            { nombre: 'ZACAPA', precio: 15224477, imagen: 'ruta/a/zacapa.jpg' },
            { nombre: 'Hennessy', precio: 4680958.60, imagen: 'ruta/a/hennessy.jpg' },
            { nombre: 'Mistial', precio: 15291939.65, imagen: 'ruta/a/mistial.jpg' },
            { nombre: 'Henness', precio: 147277500.34, imagen: 'ruta/a/henness.jpg' },
            { nombre: 'CANNABIS ABSINTHE', precio: 13685145.18, imagen: 'ruta/a/cannabis_absinthe.jpg' }
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
