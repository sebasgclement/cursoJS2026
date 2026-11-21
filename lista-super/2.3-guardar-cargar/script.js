// =====================================================================
// PASO 2.3 · Guardar y cargar la lista
// Qué cambió respecto del paso anterior:
//  - Parte del paso 1.6.
//  - Nuevas funciones cargarCompras(), guardarCompras() y actualizar().
//  - Ya no hay productos de ejemplo: compras se carga de localStorage (arranca vacía).
//  - En el submit y en el clic de la lista, mostrarCompras() pasó a ser actualizar().
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
const CLAVE = "lista-super"; // ★ NUEVO (paso 2.3): nombre propio, para no chocar con otros proyectos

// ★ NUEVO (paso 2.3)
function cargarCompras() {
  // Si no había nada guardado, getItem da null → JSON.parse(null) da null → usamos []
  return JSON.parse(localStorage.getItem(CLAVE)) || [];
}

// ★ NUEVO (paso 2.3)
function guardarCompras() {
  localStorage.setItem(CLAVE, JSON.stringify(compras));
}

// ★ CAMBIÓ (paso 2.3): ya no hay datos de ejemplo, se carga lo guardado
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

// ★ NUEVO (paso 2.3): cambiar los datos → guardar → dibujar
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

  // ★ NUEVO (paso 1.6): validaciones propias, con el error en la página
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
  actualizar(); // ★ CAMBIÓ (paso 2.3): antes era mostrarCompras()

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

  actualizar(); // ★ CAMBIÓ (paso 2.3): antes era mostrarCompras()
});

// ---------- Inicio ----------
mostrarCompras(); // al abrir no hace falta guardar
