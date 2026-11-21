// =====================================================================
// PASO 1.5 · Validación con HTML
// Qué cambió respecto del paso anterior:
//  - El JavaScript NO cambia respecto del 1.3: todo el cambio está en index.html
//    (required, minlength="2", min="1", max="20").
//  - Para mostrar: agregar vacío, cantidad 50, y tres espacios (pasan la validación HTML
//    pero los frena el trim() del JS).
// Las líneas nuevas o modificadas están marcadas con ★
// =====================================================================

const lista = document.querySelector("#lista");
const resumen = document.querySelector("#resumen");
const inputNuevo = document.querySelector("#nuevo");
const form = document.querySelector("#form-agregar");
const inputCantidad = document.querySelector("#cantidad"); // ★ NUEVO (paso 1.3)
const checkUrgente = document.querySelector("#urgente");   // ★ NUEVO (paso 1.3)

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
    btnBorrar.textContent = "❌";
    li.append(btnBorrar);

    lista.append(li);
  });

  const faltan = compras.filter((p) => !p.comprado).length;
  const unidades = compras.reduce((total, p) => total + p.cantidad, 0); // ★ NUEVO (paso 1.3)
  resumen.textContent = `Faltan ${faltan} de ${compras.length} · ${unidades} unidades`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const texto = inputNuevo.value.trim();
  if (texto === "") return;

  // ★ CAMBIÓ (paso 1.3): guardamos cantidad y urgente.
  // .value siempre es string: sin Number(), "2" se pegaría al total ("32 unidades").
  // En el checkbox se usa .checked (true/false), no .value.
  compras.push({
    nombre: texto,
    cantidad: Number(inputCantidad.value),
    urgente: checkUrgente.checked,
    comprado: false,
  });
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
