// =====================================================================
// PASO 2.4 · Pokédex con favoritos (integrador)
//  - Parte del paso 2.2. Junta lo de las Unidades 6, 7 y 8.
//  - Botón ☆ en la tarjeta: guarda el Pokémon (solo id, nombre e imagen) en localStorage.
//  - Sección "Mis favoritos" que se dibuja al abrir la página; al tocar uno, se busca de nuevo.
//  - El código del submit pasó a una función buscar(nombre), para poder usarla desde los favoritos.
// Las líneas nuevas o importantes de este paso están marcadas con ★
// =====================================================================

const form = document.querySelector("#buscador");
const input = document.querySelector("#nombre");
const boton = form.querySelector("button");
const resultado = document.querySelector("#resultado");
const listaFavoritos = document.querySelector("#favoritos"); // ★ NUEVO (paso 2.4)

// ---------- ★ NUEVO (paso 2.4): favoritos guardados (igual que la lista del súper) ----------
const CLAVE = "pokedex-favoritos";

function cargarFavoritos() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || [];
  } catch {
    return [];
  }
}

function guardarFavoritos() {
  localStorage.setItem(CLAVE, JSON.stringify(favoritos));
}

function esFavorito(id) {
  return favoritos.some((f) => f.id === id);
}

let favoritos = cargarFavoritos();

function mostrarFavoritos() {
  listaFavoritos.innerHTML = "";

  if (favoritos.length === 0) {
    const vacio = document.createElement("li");
    vacio.textContent = "Todavía no tenés favoritos.";
    listaFavoritos.append(vacio);
    return;
  }

  favoritos.forEach((fav) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.dataset.nombre = fav.nombre;

    const imagen = document.createElement("img");
    imagen.src = fav.imagen;
    imagen.alt = "";
    imagen.width = 32;

    btn.append(imagen, fav.nombre);
    li.append(btn);
    listaFavoritos.append(li);
  });
}

// ---------- API ----------
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

  const medidas = document.createElement("p");
  medidas.textContent = `Altura: ${pokemon.height / 10} m · Peso: ${pokemon.weight / 10} kg`;

  const tituloHabilidades = document.createElement("p");
  tituloHabilidades.textContent = "Habilidades:";

  const habilidades = document.createElement("ul");
  pokemon.abilities.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = a.ability.name;
    habilidades.append(li);
  });

  // ★ NUEVO (paso 2.4): botón de favorito. Como hay uno solo por tarjeta, le ponemos el listener directo.
  const btnFavorito = document.createElement("button");
  btnFavorito.type = "button";
  btnFavorito.textContent = esFavorito(pokemon.id) ? "★ Quitar de favoritos" : "☆ Agregar a favoritos";
  btnFavorito.addEventListener("click", () => {
    if (esFavorito(pokemon.id)) {
      favoritos = favoritos.filter((f) => f.id !== pokemon.id);
    } else {
      favoritos.push({ id: pokemon.id, nombre: pokemon.name, imagen: pokemon.sprites.front_default });
    }
    guardarFavoritos();
    mostrarFavoritos();
    mostrarPokemon(pokemon); // redibujamos la tarjeta para que cambie el texto del botón
  });

  datos.append(titulo, tipos, medidas, tituloHabilidades, habilidades, btnFavorito);
  resultado.append(imagen, datos);
}

// ★ CAMBIÓ (paso 2.4): lo que hacía el submit ahora es una función, para llamarla desde dos lugares
async function buscar(nombre) {
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
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = input.value.trim().toLowerCase();
  if (nombre === "") return;
  buscar(nombre);
});

// ★ NUEVO (paso 2.4): delegación (Unidad 6) para los botones de favoritos
listaFavoritos.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;
  input.value = btn.dataset.nombre;
  buscar(btn.dataset.nombre);
});

mostrarFavoritos();
