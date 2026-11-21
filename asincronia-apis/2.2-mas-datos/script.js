// =====================================================================
// PASO 2.2 · Mostrar más datos: medidas y habilidades
//  - Solo cambia mostrarPokemon(): agrega altura, peso y la lista de habilidades.
//  - Para encontrar las propiedades: pestaña Network → el pedido → Preview.
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

// Los tres estados de la interfaz: cargando, error y éxito
function mostrarCargando() {
  resultado.className = "cargando";
  resultado.textContent = "Cargando…";
}

function mostrarError(mensaje) {
  resultado.className = "error";
  resultado.textContent = mensaje;
}

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

  // ★ NUEVO (paso 2.2): altura y peso (la API los da en decímetros y hectogramos)
  const medidas = document.createElement("p");
  medidas.textContent = `Altura: ${pokemon.height / 10} m · Peso: ${pokemon.weight / 10} kg`;

  // ★ NUEVO (paso 2.2): habilidades, una por <li>
  const tituloHabilidades = document.createElement("p");
  tituloHabilidades.textContent = "Habilidades:";

  const habilidades = document.createElement("ul");
  pokemon.abilities.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = a.ability.name;
    habilidades.append(li);
  });

  datos.append(titulo, tipos, medidas, tituloHabilidades, habilidades);
  resultado.append(imagen, datos);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = input.value.trim().toLowerCase();
  if (nombre === "") return;

  mostrarCargando();
  boton.disabled = true;

  try {
    const pokemon = await buscarPokemon(nombre);
    mostrarPokemon(pokemon);
  } catch (error) {
    mostrarError(error.message === "Failed to fetch" ? "No hay conexión. Revisá internet." : error.message);
  } finally {
    boton.disabled = false;
  }
});
