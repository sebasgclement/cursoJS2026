// =====================================================================
// PASO 1.6 · Chequear respuesta.ok
//  - Ahora el nombre lo escribe el usuario.
//  - fetch SOLO va al catch si no hay conexión. Si el servidor responde 404 (no existe),
//    para fetch eso es una respuesta válida: hay que revisarlo con respuesta.ok.
//  - Para mostrar el problema: comentá las 3 líneas del if (!respuesta.ok) y buscá "pikachuu".
//    No hay ningún error: la página muestra "undefined pesa NaN kg y mide NaN m",
//    porque la API respondió {"status":404,"message":"Not Found"} y eso no tiene name ni weight.
// Las líneas nuevas o importantes de este paso están marcadas con ★
// =====================================================================

const form = document.querySelector("#buscador");
const input = document.querySelector("#nombre");
const resultado = document.querySelector("#resultado");

async function buscarPokemon(nombre) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);

  // ★ NUEVO: si el servidor respondió con error (404 = no existe), lanzamos nuestro propio error
  if (!respuesta.ok) {
    throw new Error(`No se encontró "${nombre}" (error ${respuesta.status})`);
  }

  return respuesta.json();
}

// ★ El callback del submit también puede ser async
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = input.value.trim().toLowerCase();

  resultado.className = "cargando";
  resultado.textContent = "Cargando…";

  try {
    const pokemon = await buscarPokemon(nombre); // ★ una función async se usa con await
    resultado.className = "";
    resultado.textContent = `${pokemon.name} pesa ${pokemon.weight / 10} kg y mide ${pokemon.height / 10} m`;
  } catch (error) {
    resultado.className = "error";
    resultado.textContent = error.message;
  }
});
