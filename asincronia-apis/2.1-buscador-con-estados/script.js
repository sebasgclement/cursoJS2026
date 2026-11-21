// =====================================================================
// PASO 2.1 · Buscador de Pokémon con estados de carga y error
//  - Parte del paso 1.6.
//  - La interfaz contempla tres estados: cargando, error y éxito.
//  - El resultado ahora es una tarjeta con imagen, nombre y tipos.
//  - El botón se deshabilita mientras carga, y finally lo vuelve a habilitar.
// Las líneas nuevas o importantes de este paso están marcadas con ★
// =====================================================================

const form = document.querySelector("#buscador");
const input = document.querySelector("#nombre");
const boton = form.querySelector("button");
const resultado = document.querySelector("#resultado");

async function buscarPokemon(nombre) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
  if (!respuesta.ok) {
    throw new Error(respuesta.status === 404 ? "No existe ese Pokémon 🤔" : "Error del servidor");
  }
  return respuesta.json();
}

// ★ NUEVO (paso 2.1): los tres estados de la interfaz: cargando, error y éxito
function mostrarCargando() {
  resultado.className = "cargando";
  resultado.textContent = "Cargando…";
}

function mostrarError(mensaje) {
  resultado.className = "error";
  resultado.textContent = mensaje;
}

// ★ NUEVO (paso 2.1): la tarjeta con imagen, nombre y tipos (con createElement, nunca innerHTML con datos de afuera)
function mostrarPokemon(pokemon) {
  resultado.className = "tarjeta";
  resultado.innerHTML = "";

  const imagen = document.createElement("img");
  imagen.src = pokemon.sprites.front_default;
  imagen.alt = pokemon.name;

  const datos = document.createElement("div");

  const titulo = document.createElement("h2");
  titulo.textContent = `#${pokemon.id} ${pokemon.name}`;

  const tipos = document.createElement("p");
  tipos.textContent = "Tipo: " + pokemon.types.map((t) => t.type.name).join(", ");

  datos.append(titulo, tipos);
  resultado.append(imagen, datos);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = input.value.trim().toLowerCase();
  if (nombre === "") return;

  mostrarCargando();
  boton.disabled = true; // ★ NUEVO (paso 2.1): evitamos pedidos repetidos mientras carga

  try {
    const pokemon = await buscarPokemon(nombre);
    mostrarPokemon(pokemon);
  } catch (error) {
    // ★ NUEVO (paso 2.1): si no hay internet, fetch falla con "Failed to fetch": lo traducimos
    mostrarError(error.message === "Failed to fetch" ? "No hay conexión. Revisá internet." : error.message);
  } finally {
    boton.disabled = false; // ★ NUEVO (paso 2.1): finally se ejecuta siempre
  }
});
