// ======================
// PRODUCTOS
// ======================
function obtenerProductos() {
  return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductos(productos) {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function guardarProducto(e) {
  e.preventDefault();
  let productos = obtenerProductos();

  const producto = {
    codigo: document.getElementById("prod-codigo").value,
    nombre: document.getElementById("prod-nombre").value,
    precio: parseFloat(document.getElementById("prod-precio").value),
    stock: parseInt(document.getElementById("prod-stock").value)
  };

  productos.push(producto);
  guardarProductos(productos);
  mostrarProductos();
  e.target.reset();
}

function mostrarProductos() {
  const productos = obtenerProductos();
  const tabla = document.getElementById("tabla-productos");
  if (!tabla) return;
  tabla.innerHTML = "";
  productos.forEach((p, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${p.codigo}</td><td>${p.nombre}</td><td>$${p.precio}</td><td>${p.stock}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">Eliminar</button></td>
      </tr>`;
  });
}

function eliminarProducto(i) {
  let productos = obtenerProductos();
  productos.splice(i, 1);
  guardarProductos(productos);
  mostrarProductos();
}

// ======================
// USUARIOS
// ======================
function obtenerUsuarios() {
  return JSON.parse(localStorage.getItem("usuarios")) || [];
}

function guardarUsuarios(usuarios) {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function guardarUsuario(e) {
  e.preventDefault();
  let usuarios = obtenerUsuarios();

  const regexCorreo = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  const run = document.getElementById("user-run").value;

  if (!/^[0-9]{7,8}[0-9Kk]$/.test(run)) {
    alert("El RUN debe tener entre 7 y 9 caracteres sin puntos ni guión");
    return;
  }

  const usuario = {
    run: run,
    nombre: document.getElementById("user-nombre").value,
    correo: document.getElementById("user-correo").value,
    tipo: document.getElementById("user-tipo").value
  };

  if (!regexCorreo.test(usuario.correo)) {
    alert("Correo no válido");
    return;
  }

  usuarios.push(usuario);
  guardarUsuarios(usuarios);
  mostrarUsuarios();
  e.target.reset();
}

function mostrarUsuarios() {
  const usuarios = obtenerUsuarios();
  const tabla = document.getElementById("tabla-usuarios");
  if (!tabla) return;
  tabla.innerHTML = "";
  usuarios.forEach((u, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${u.run}</td><td>${u.nombre}</td><td>${u.correo}</td><td>${u.tipo}</td>
        <td><button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${index})">Eliminar</button></td>
      </tr>`;
  });
}

function eliminarUsuario(i) {
  let usuarios = obtenerUsuarios();
  usuarios.splice(i, 1);
  guardarUsuarios(usuarios);
  mostrarUsuarios();
}
const producto = {
  codigo: document.getElementById("prod-codigo").value,
  nombre: document.getElementById("prod-nombre").value,
  precio: parseFloat(document.getElementById("prod-precio").value),
  stock: parseInt(document.getElementById("prod-stock").value),
  img: document.getElementById("prod-img").value || "../assets/img/default.jpg"
};


// ======================
// INICIALIZACIÓN
// ======================
document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  mostrarUsuarios();
});
