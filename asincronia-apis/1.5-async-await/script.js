// =====================================================================
// PASO 1.5 · async / await
//  - Mismo resultado que el 1.4, sin encadenar .then().
//  - await "espera" a que la promesa se cumpla y devuelve su valor.
//  - await solo se puede usar dentro de una función marcada con async.
//  - Los errores se atrapan con el try/catch de la Unidad 7.
// Las líneas nuevas o importantes de este paso están marcadas con ★
// =====================================================================

const boton = document.querySelector("#traer");
const resultado = document.querySelector("#resultado");

// ★ async: marca la función como asíncrona (permite usar await adentro)
async function traerPikachu() {
  resultado.className = "cargando";
  resultado.textContent = "Cargando…";

  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu"); // ★
    const pokemon = await respuesta.json();                                      // ★

    resultado.className = "";
    resultado.textContent = `${pokemon.name} pesa ${pokemon.weight / 10} kg y mide ${pokemon.height / 10} m`;
  } catch (error) {
    resultado.className = "error";
    resultado.textContent = "Algo falló: " + error.message;
  }
}

boton.addEventListener("click", traerPikachu);
