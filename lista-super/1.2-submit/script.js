// =====================================================================
// PASO 1.2 · El evento submit y preventDefault()
// Qué cambió respecto del paso anterior:
//  - Nueva constante form.
//  - Nuevo listener de submit con e.preventDefault(): ya no se recarga.
//  - Enter en el campo también agrega, sin escuchar keydown.
// Las líneas nuevas o modificadas están marcadas con ★
// =====================================================================

const lista = document.querySelector("#lista");
const resumen = document.querySelector("#resumen");
const inputNuevo = document.querySelector("#nuevo");
const form = document.querySelector("#form-agregar"); // ★ NUEVO (paso 1.2)

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

// ★ NUEVO (paso 1.2): escuchamos el submit DEL FORMULARIO (Enter también envía)
form.addEventListener("submit", (e) => {
  e.preventDefault(); // ¡que no recargue la página!

  const texto = inputNuevo.value.trim();
  if (texto === "") return;

  compras.push({ nombre: texto, urgente: false, comprado: false });
  mostrarCompras();

  form.reset(); // devuelve los campos a como estaban en el HTML
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
