// =====================================================================
// PASO 1.1 · Código que no espera
//  - JavaScript no se queda esperando lo que tarda: lo deja en marcha y sigue.
//  - Los mensajes salen 1, 2 y 3, aunque en el código el 3 está antes que el 2.
// Las líneas nuevas o importantes de este paso están marcadas con ★
// =====================================================================

const boton = document.querySelector("#pedir");
const registro = document.querySelector("#registro");

// Agrega un mensaje a la página (y a la consola)
function anotar(texto) {
  const li = document.createElement("li");
  li.textContent = texto;
  registro.append(li);
  console.log(texto);
}

boton.addEventListener("click", () => {
  registro.innerHTML = "";

  anotar("1. Pido una pizza");

  // ★ setTimeout no frena el programa: anota la tarea para dentro de 2 segundos y sigue
  setTimeout(() => {
    anotar("3. Llegó la pizza 🍕");
  }, 2000);

  anotar("2. Mientras tanto, pongo la mesa");
});
