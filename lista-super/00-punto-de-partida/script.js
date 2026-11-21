// =====================================================================
// PASO 00 · Punto de partida (así terminó la Unidad 6)
// Qué cambió respecto del paso anterior:
//  - Nada: es el código con el que arranca la Unidad 7.
// Las líneas nuevas o modificadas están marcadas con ★
// =====================================================================

const lista = document.querySelector("#lista");
const resumen = document.querySelector("#resumen");
const inputNuevo = document.querySelector("#nuevo");
const btnAgregar = document.querySelector("#btn-agregar");

let compras = [
  { nombre: "Pan", urgente: false, comprado: false },
  { nombre: "Leche", urgente: true, comprado: false },
  { nombre: "Yerba", urgente: false, comprado: false },
];

function mostrarCompras() {
  lista.innerHTML = "";

  compras.forEach((producto, indice) => {
    const li = document.createElement("li");
    li.textContent = producto.nombre;
    li.dataset.indice = indice;

    if (producto.urgente) li.classList.add("urgente");
    if (producto.comprado) li.classList.add("comprado");

    const btnBorrar = document.createElement("button");
    btnBorrar.textContent = "✕";
    li.append(btnBorrar);

    lista.append(li);
  });

  const faltan = compras.filter((p) => !p.comprado).length;
  resumen.textContent = `Faltan ${faltan} de ${compras.length}`;
}

function agregar() {
  const texto = inputNuevo.value.trim();
  if (texto === "") return;

  compras.push({ nombre: texto, urgente: false, comprado: false });
  mostrarCompras();

  inputNuevo.value = "";
  inputNuevo.focus();
}

btnAgregar.addEventListener("click", agregar);

inputNuevo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    agregar();
  }
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
