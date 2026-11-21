// =====================================================================
// PASO 2.5 (ejercicio) · Galería con paginación
//  - La API devuelve 20 personajes por página, y en datos.info vienen las URLs
//    de la página anterior y la siguiente (o null si no hay).
//  - Los botones piden esas URLs y se deshabilitan cuando no hay más páginas.
// Las líneas nuevas o importantes de este paso están marcadas con ★
// =====================================================================

const grilla = document.querySelector("#personajes");
const estado = document.querySelector("#estado");
const textoPagina = document.querySelector("#pagina");
const btnAnterior = document.querySelector("#anterior");
const btnSiguiente = document.querySelector("#siguiente");

const ESTADOS = { Alive: "Vivo", Dead: "Muerto", unknown: "Desconocido" };

let info = null;       // ★ acá guardamos datos.info: { count, pages, next, prev }
let numeroPagina = 1;

function mostrarPersonajes(personajes) {
  grilla.innerHTML = "";

  personajes.forEach((personaje) => {
    const li = document.createElement("li");

    const imagen = document.createElement("img");
    imagen.src = personaje.image;
    imagen.alt = personaje.name;

    const nombre = document.createElement("strong");
    nombre.textContent = personaje.name;

    const situacion = document.createElement("small");
    situacion.textContent = ESTADOS[personaje.status];

    li.append(imagen, nombre, situacion);
    grilla.append(li);
  });
}

async function cargarPagina(url) {
  estado.className = "cargando";
  estado.textContent = "Cargando…";
  btnAnterior.disabled = true;
  btnSiguiente.disabled = true;

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}`);
    }
    const datos = await respuesta.json();

    info = datos.info;
    mostrarPersonajes(datos.results);
    textoPagina.textContent = `Página ${numeroPagina} de ${info.pages}`;
    estado.textContent = "";
  } catch (error) {
    estado.className = "error";
    estado.textContent = "No se pudieron cargar los personajes: " + error.message;
  } finally {
    // ★ Sin página anterior (o siguiente), el botón queda deshabilitado
    btnAnterior.disabled = info === null || info.prev === null;
    btnSiguiente.disabled = info === null || info.next === null;
  }
}

btnAnterior.addEventListener("click", () => {
  numeroPagina--;
  cargarPagina(info.prev);
});

btnSiguiente.addEventListener("click", () => {
  numeroPagina++;
  cargarPagina(info.next);
});

cargarPagina("https://rickandmortyapi.com/api/character");
