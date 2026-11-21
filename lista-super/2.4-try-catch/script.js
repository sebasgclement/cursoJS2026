// =====================================================================
// PASO 2.4 · Cuando lo guardado está roto: try/catch
// Qué cambió respecto del paso anterior:
//  - Solo cambia cargarCompras(): ahora está protegida con try/catch.
//  - Para mostrar: en Application, editá el valor de "lista-super" a  [{"nombre":  y recargá.
//    En el paso 2.3 eso rompe toda la página; acá arranca vacía y avisa en la consola.
// Las líneas nuevas o modificadas están marcadas con ★
// =====================================================================

const lista = document.querySelector("#lista");
const resumen = document.querySelector("#resumen");
const form = document.querySelector("#form-agregar");
const inputNuevo = document.querySelector("#nuevo");
const inputCantidad = document.querySelector("#cantidad");
const checkUrgente = document.querySelector("#urgente");
const mensajeError = document.querySelector("#error");

// ---------- Datos ----------
const CLAVE = "lista-super";

// ★ CAMBIÓ (paso 2.4): si lo guardado está roto, JSON.parse lanza un error.
// Con try/catch lo atrapamos y arrancamos con la lista vacía en lugar de romper toda la página.
function cargarCompras() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch (error) {
    console.error("Los datos guardados estaban rotos:", error.message);
    return [];
  }
}

function guardarCompras() {
  localStorage.setItem(CLAVE, JSON.stringify(compras));
}

let compras = cargarCompras();

// ---------- Pantalla ----------
function mostrarCompras() {
  lista.innerHTML = "";

  compras.forEach((producto, indice) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} × ${producto.cantidad}`;
    li.dataset.indice = indice;

    if (producto.urgente) li.classList.add("urgente");
    if (producto.comprado) li.classList.add("comprado");

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "✕";
    li.append(btnBorrar);

    lista.append(li);
  });

  const faltan = compras.filter((p) => !p.comprado).length;
  const unidades = compras.reduce((total, p) => total + p.cantidad, 0);
  resumen.textContent = `Faltan ${faltan} de ${compras.length} · ${unidades} unidades`;
}

function actualizar() {
  guardarCompras();
  mostrarCompras();
}

// ---------- Eventos ----------
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = inputNuevo.value.trim();
  const cantidad = Number(inputCantidad.value);
  const urgente = checkUrgente.checked;

  if (nombre === "") {
    mensajeError.textContent = "Escribí el nombre del producto";
    return; // cortamos acá: no se agrega nada
  }

  const repetido = compras.some(
    (p) => p.nombre.toLowerCase() === nombre.toLowerCase()
  );
  if (repetido) {
    mensajeError.textContent = `"${nombre}" ya está en la lista`;
    return;
  }

  mensajeError.textContent = ""; // salió todo bien: borramos el error anterior
  compras.push({ nombre: nombre, cantidad: cantidad, urgente: urgente, comprado: false });
  actualizar();

  form.reset();
  inputNuevo.focus();
});

lista.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  const indice = Number(li.dataset.indice);

  if (e.target.closest("button")) {
    compras = compras.filter((_, i) => i !== indice);
  } else {
    compras[indice].comprado = !compras[indice].comprado;
  }

  actualizar();
});

// ---------- Inicio ----------
mostrarCompras();
