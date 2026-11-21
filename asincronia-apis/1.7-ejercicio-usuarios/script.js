// =====================================================================
// PASO 1.7 (ejercicio) · Directorio de usuarios con JSONPlaceholder
//  - Al abrir la página se traen 10 usuarios de prueba y se dibujan como tarjetas.
//  - Mismo patrón de las Unidades 6 y 7: datos en un array → una función que dibuja.
//  - La diferencia es que el array ahora llega de internet.
// Las líneas nuevas o importantes de este paso están marcadas con ★
// =====================================================================

const estado = document.querySelector("#estado");
const lista = document.querySelector("#usuarios");

function mostrarUsuarios(usuarios) {
  lista.innerHTML = "";

  usuarios.forEach((usuario) => {
    const li = document.createElement("li");

    const nombre = document.createElement("strong");
    nombre.textContent = usuario.name;

    const email = document.createElement("small");
    email.textContent = usuario.email;

    const ciudad = document.createElement("small");
    ciudad.textContent = "📍 " + usuario.address.city; // ★ objeto dentro de otro objeto

    li.append(nombre, email, ciudad);
    lista.append(li);
  });
}

async function cargarUsuarios() {
  estado.className = "cargando";
  estado.textContent = "Cargando…";

  try {
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}`);
    }
    const usuarios = await respuesta.json(); // ★ llega un ARRAY de objetos

    mostrarUsuarios(usuarios);
    estado.className = "";
    estado.textContent = `${usuarios.length} usuarios`;
  } catch (error) {
    estado.className = "error";
    estado.textContent = "No se pudieron cargar los usuarios: " + error.message;
  }
}

cargarUsuarios();
