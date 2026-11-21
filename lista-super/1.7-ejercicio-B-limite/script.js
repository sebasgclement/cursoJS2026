// =====================================================================
// PASO 1.7 (ejercicio B) · Máximo 10 productos
// Qué cambió respecto del paso anterior:
//  - Parte del paso 1.6. Nueva validación: si ya hay 10, no se agrega.
//  - Bonus: el error se borra apenas el usuario vuelve a escribir.
//  - OJO: la clase 2 sigue desde el 1.6 (sin el límite), igual que la guía.
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

  // ★ NUEVO (ejercicio B): como máximo 10 productos
  if (compras.length >= 10) {
    mensajeError.textContent = "La lista está llena: borrá algo antes de agregar";
    return;
  }

  mensajeError.textContent = ""; // salió todo bien: borramos el error anterior
  compras.push({ nombre: nombre, cantidad: cantidad, urgente: urgente, comprado: false });
  mostrarCompras();

  form.reset();
  inputNuevo.focus();
});

// ★ NUEVO (ejercicio B, bonus): el error se borra apenas se vuelve a escribir
inputNuevo.addEventListener("input", () => {
  mensajeError.textContent = "";
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
