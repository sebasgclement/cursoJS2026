// =====================================================================
// PASO 1.4 · Pedir datos con fetch (versión .then)
//  - fetch() pide la URL y devuelve una promesa.
//  - Son dos pasos: primero llega la respuesta, después se convierte de JSON con .json()
//    (que también es una promesa).
//  - En la consola se ve el objeto completo para explorar qué propiedades trae.
// Las líneas nuevas o importantes de este paso están marcadas con ★
// =====================================================================

const boton = document.querySelector("#traer");
const resultado = document.querySelector("#resultado");

boton.addEventListener("click", () => {
  resultado.className = "cargando";
  resultado.textContent = "Cargando…";

  fetch("https://pokeapi.co/api/v2/pokemon/pikachu") // ★ 1. pedimos los datos
    .then((respuesta) => respuesta.json())           // ★ 2. convertimos la respuesta de JSON a objeto
    .then((pokemon) => {                              // ★ 3. usamos los datos
      console.log(pokemon); // el objeto entero, para explorarlo en la consola

      // La API da el peso en hectogramos y la altura en decímetros: dividimos por 10
      resultado.className = "";
      resultado.textContent = `${pokemon.name} pesa ${pokemon.weight / 10} kg y mide ${pokemon.height / 10} m`;
    })
    .catch((error) => {
      // Se ejecuta si no hay conexión, por ejemplo
      resultado.className = "error";
      resultado.textContent = "Algo falló: " + error.message;
    });
});
