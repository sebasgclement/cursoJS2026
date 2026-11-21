// =====================================================================
// PASO 1.1 · Del div al form
// Qué cambió respecto del paso anterior:
//  - En el HTML, el <div class="agregar"> ahora es un <form> (ver index.html).
//  - Se BORRARON btnAgregar, la función agregar() y los listeners de click y keydown:
//    el botón #btn-agregar ya no existe.
//  - Todavía NO escuchamos el submit: al tocar Agregar la página se recarga.
//    Eso es justamente lo que hay que mostrar en este paso.
// Las líneas nuevas o modificadas están marcadas con ★
// =====================================================================

const lista = document.querySelector("#lista");
const resumen = document.querySelector("#resumen");
const inputNuevo = document.querySelector("#nuevo");

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
