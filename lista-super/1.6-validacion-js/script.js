// =====================================================================
// PASO 1.6 · Validación propia y errores en la página
// Qué cambió respecto del paso anterior:
//  - Nueva constante mensajeError (el <p id="error">).
//  - El submit valida: nombre vacío y producto repetido, con el mensaje en la página.
//  - Si sale bien, se borra el mensaje anterior.
// Las líneas nuevas o modificadas están marcadas con ★
// =====================================================================

const lista = document.querySelector("#lista");
const resumen = document.querySelector("#resumen");
const inputNuevo = document.querySelector("#nuevo");
const form = document.querySelector("#form-agregar");
const inputCantidad = document.querySelector("#cantidad"); // ★ NUEVO (paso 1.3)
const checkUrgente = document.querySelector("#urgente");   // ★ NUEVO (paso 1.3)
const mensajeError = document.querySelector("#error");     // ★ NUEVO (paso 1.6)

// ★ CAMBIÓ (paso 1.3): los productos de ejemplo ahora tienen cantidad
let compras = [
  { nombre: "Pan", cantidad: 1, urgente: false, comprado: false },
  { nombre: "Leche", cantidad: 2, urgente: true, comprado: false },
  { nombre: "Yerba", cantidad: 1, urgente: false, comprado: false },
];

function mostrarCompras() {
  lista.innerHTML = "";

  compras.forEach((producto, indice) => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} × ${producto.cantidad}`; // ★ CAMBIÓ (paso 1.3)
    li.dataset.indice = indice;

    if (producto.urgente) li.classList.add("urgente");
    if (producto.comprado) li.classList.add("comprado");

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "✕";
    li.append(btnBorrar);

    lista.append(li);
  });

  const faltan = compras.filter((p) => !p.comprado).length;
  const unidades = compras.reduce((total, p) => total + p.cantidad, 0); // ★ NUEVO (paso 1.3)
  resumen.textContent = `Faltan ${faltan} de ${compras.length} · ${unidades} unidades`;
}

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
  mostrarCompras();

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

  mostrarCompras();
});

mostrarCompras();
