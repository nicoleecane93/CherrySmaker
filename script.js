// script.js

// Cargar el carrito desde localStorage al iniciar
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Función para actualizar el contador de artículos en el ícono del carrito
function actualizarContadorCarrito() {
    const cartCount = document.getElementById("cart-count");
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCount.textContent = totalItems;
}

// Llamamos a la función para actualizar el contador al cargar la página
actualizarContadorCarrito();

// Función para mostrar productos según categoría
function mostrarProductos(categoria) {
  const container = document.getElementById("productos-container");
  console.log("Contenedor encontrado:", container); // Verifica que el contenedor se encuentre

  if (!container) {
      console.error("Contenedor 'productos-container' no encontrado");
      return;
  }

  container.innerHTML = ""; // Limpiar el contenedor

  const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
  console.log("Productos filtrados:", productosFiltrados); // Verifica los productos filtrados

  productosFiltrados.forEach(producto => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>Precio: $${producto.precio}</p>
          <div class="counter-container">
              <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>
              <span id="cantidad-${producto.id}">1</span>
              <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
          </div>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
      `;

      container.appendChild(card);
  });

  console.log("Productos mostrados en la categoría:", categoria);
}


// Función para cambiar la cantidad de productos seleccionados en el contador
function cambiarCantidad(id, cambio) {
    const cantidadElemento = document.getElementById(`cantidad-${id}`);
    let cantidad = parseInt(cantidadElemento.textContent);

    // Cantidad mínima 1
    cantidad = Math.max(1, cantidad + cambio); 
    cantidadElemento.textContent = cantidad;
}

// Función para agregar productos al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(producto => producto.id === id);
    const cantidad = parseInt(document.getElementById(`cantidad-${id}`).textContent);

    // Si el producto ya está en el carrito, incrementa la cantidad
    const itemCarrito = carrito.find(item => item.id === id);
    if (itemCarrito) {
        itemCarrito.cantidad += cantidad;
    } else {
        carrito.push({ ...producto, cantidad });
    }

    // Guarda el carrito actualizado en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualiza la vista del carrito y el contador
    actualizarCarrito();
    actualizarContadorCarrito();
    alert(`${producto.nombre} (x${cantidad}) ha sido añadido al carrito.`);
}

// Función para mostrar el contenido del carrito
function actualizarCarrito() {
    const carritoDiv = document.getElementById("carrito");
    const totalDiv = document.getElementById("total");

    // Leer el carrito desde localStorage, si existe
    const carritoAlmacenado = localStorage.getItem("carrito");
    carrito = carritoAlmacenado ? JSON.parse(carritoAlmacenado) : [];

    carritoDiv.innerHTML = ""; // Limpiar el contenedor del carrito
    let total = 0;

    carrito.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("carrito-item");
        itemDiv.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px;">
            <span>${item.nombre} - Cantidad: ${item.cantidad} - Precio: $${item.precio * item.cantidad}</span>
            <button onclick="removerDelCarrito(${item.id})">Eliminar</button>
        `;
        carritoDiv.appendChild(itemDiv);

        // Sumar al total el precio de cada producto multiplicado por su cantidad
        total += item.precio * item.cantidad;
    });

    // Mostrar el total en el carrito
    totalDiv.textContent = `Total: $${total}`;
}

// Función para eliminar un producto del carrito
function removerDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id); // Elimina el producto del carrito
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza localStorage
    actualizarCarrito(); // Actualiza la vista del carrito
    actualizarContadorCarrito(); // Actualiza el contador en el ícono del carrito
}

// Vaciar el carrito de compras
// Obtener el botón "Vaciar Carrito" y agregar el evento de clic
const botonVaciarCarrito = document.getElementById("vaciar-carrito");

if (botonVaciarCarrito) {
    botonVaciarCarrito.addEventListener("click", () => {
        console.log("Botón 'Vaciar Carrito' presionado"); // Mensaje para verificar el clic

        // Vaciar el array del carrito
        carrito = [];
        console.log("Array del carrito vaciado:", carrito); // Verificar que el array esté vacío

        // Eliminar el carrito del localStorage
        localStorage.removeItem("carrito");
        console.log("Carrito eliminado de localStorage"); // Confirmar eliminación en localStorage

        // Actualizar la visualización del carrito y el contador
        actualizarCarrito();
        actualizarContadorCarrito();

        // Mensaje de confirmación
        alert("El carrito ha sido vaciado.");
    });
} else {
    console.log("Botón 'Vaciar Carrito' no encontrado"); // Mensaje si el botón no está presente
}

