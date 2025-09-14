// ======================
// PRODUCTOS (ejemplo)
// ======================
let basePath = window.location.pathname.includes("/pages/") ? "../assets/img/" : "assets/img/";


const productos = [
  { id: 1, nombre: "Balón de Fútbol", precio: 19990, img: basePath + "producto1.jpg" },
  { id: 2, nombre: "Zapatillas Running", precio: 59990, img: basePath + "producto2.jpg" },
  { id: 3, nombre: "Lentes de natación", precio: 29990, img: basePath + "producto3.jpg" }
];


// Mostrar productos en index.html
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("productos-destacados");
  if (contenedor) {
    productos.forEach(p => {
      contenedor.innerHTML += `
        <div class="col-md-4">
          <div class="card h-100">
            <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
            <div class="card-body">
              <h5 class="card-title">${p.nombre}</h5>
              <p class="card-text">$${p.precio}</p>
              <button class="btn btn-primary" onclick="agregarAlCarrito(${p.id})">Añadir al carrito</button>
            </div>
          </div>
        </div>`;
    });
  }

  actualizarMenuUsuario();
  actualizarContadorCarrito();
});

// ======================
// CARRITO
// ======================
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(id) {
  let carrito = obtenerCarrito();

  let productosAdmin = JSON.parse(localStorage.getItem("productos")) || [];
  let listaFinal = productosAdmin.length > 0 ? productosAdmin : productos;

  const producto = listaFinal.find(p => p.id === id || p.codigo === id);
  carrito.push(producto);

  guardarCarrito(carrito);
  actualizarContadorCarrito();
}

function eliminarDelCarrito(index) {
  let carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  mostrarCarrito(); // se usa en carrito.html
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const carrito = obtenerCarrito();
  let contador = document.getElementById("cart-count");
  if (contador) contador.innerText = carrito.length;
}

// ======================
// LOGIN + ROLES
// ======================
function validarLogin(e) {
  e.preventDefault();
  let correo = document.getElementById("login-correo").value;
  let pass = document.getElementById("login-pass").value;

  const regexCorreo = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  if (!regexCorreo.test(correo)) {
    alert("El correo debe ser válido y pertenecer a duoc.cl, profesor.duoc.cl o gmail.com");
    return;
  }
  if (pass.length < 4 || pass.length > 10) {
    alert("La contraseña debe tener entre 4 y 10 caracteres");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  let user = usuarios.find(u => u.correo === correo && u.pass === pass);

  if (!user) {
    alert("Usuario o contraseña incorrectos.");
    return;
  }

  localStorage.setItem("usuarioLogeado", JSON.stringify(user));

  alert("Inicio de sesión exitoso ✅");

  if (user.tipo === "Administrador") {
    window.location.href = "../admin/admin-home.html";
  } else if (user.tipo === "Vendedor") {
    window.location.href = "vendedor.html";
  } else {
    window.location.href = "../index.html";
  }
}

function logout() {
  localStorage.removeItem("usuarioLogeado");
  window.location.href = "../index.html";
}

// ======================
// CONTACTO
// ======================
function validarContacto(e) {
  e.preventDefault();
  let nombre = document.getElementById("con-nombre").value;
  let correo = document.getElementById("con-correo").value;
  let mensaje = document.getElementById("con-mensaje").value;

  const regexCorreo = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  if (nombre.length === 0) {
    alert("El nombre es requerido");
    return;
  }
  if (!regexCorreo.test(correo)) {
    alert("Correo no válido");
    return;
  }
  if (mensaje.length == 0) {
    alert("Ingrese un mensaje");
    return;
  }

  alert("Mensaje enviado ✅");
}

// ======================
// REGISTRO
// ======================
function validarRegistro(e) {
  e.preventDefault();
  let nombre = document.getElementById("reg-nombre").value;
  let correo = document.getElementById("reg-correo").value;
  let pass = document.getElementById("reg-pass").value;
  let tipo = document.getElementById("reg-tipo").value;

  if (nombre.length === 0) {
    alert("El nombre es requerido");
    return;
  }

  const regexCorreo = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  if (!regexCorreo.test(correo)) {
    alert("Correo no válido");
    return;
  }

  if (pass.length < 4 || pass.length > 10) {
    alert("La contraseña debe tener entre 4 y 10 caracteres");
    return;
  }

  if (!tipo) {
    alert("Debe seleccionar un tipo de usuario");
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  usuarios.push({ nombre, correo, pass, tipo });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  alert("Registro exitoso ✅ Ahora puede iniciar sesión");
  window.location.href = "iniciosesion.html";
}

// ======================
// MENÚ DINÁMICO
// ======================
function actualizarMenuUsuario() {
  const menu = document.getElementById("menu-usuario");
  if (!menu) return;

  let user = JSON.parse(localStorage.getItem("usuarioLogeado"));

  // Detectar si estamos en /pages/
  let inPages = window.location.pathname.includes("/pages/");
  let basePath = inPages ? "../" : "";

  if (user) {
    menu.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="${basePath}pages/perfil.html">👤 Perfil (${user.nombre})</a></li>
      <li class="nav-item"><a class="nav-link" href="#" onclick="logout()">Cerrar Sesión</a></li>
      <li class="nav-item"><a class="nav-link" href="${basePath}pages/carrito.html">🛒 Carrito (<span id="cart-count">0</span>)</a></li>
    `;
  } else {
    menu.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="${basePath}pages/iniciosesion.html">Iniciar Sesión</a></li>
      <li class="nav-item"><a class="nav-link" href="${basePath}pages/registro.html">Registrarse</a></li>
      <li class="nav-item"><a class="nav-link" href="${basePath}pages/carrito.html">🛒 Carrito (<span id="cart-count">0</span>)</a></li>
    `;
  }
}
