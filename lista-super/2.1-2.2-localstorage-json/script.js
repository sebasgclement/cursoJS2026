// =====================================================================
// PASO 2.1 y 2.2 · localStorage y JSON (demo, no es la app)
// Qué cambió respecto del paso anterior:
//  - Esta carpeta no es la lista: ejecuta los ejemplos de la consola y los muestra en la página,
//    para no tener que tipearlos en vivo.
//  - Si preferís tipearlos vos en la consola, están todos acá abajo, en orden.
// Las líneas nuevas o modificadas están marcadas con ★
// =====================================================================

const resultados = document.querySelector("#resultados");

// Muestra en la página (y en la consola) una línea de código y lo que devolvió
function mostrar(codigo, valor, esMalo = false) {
  console.log(codigo, "→", valor);

  const li = document.createElement("li");
  const linea = document.createElement("code");
  linea.textContent = codigo;
  const resultado = document.createElement("span");
  resultado.className = esMalo ? "valor mal" : "valor";
  resultado.textContent = "→ " + JSON.stringify(valor);
  li.append(linea, resultado);
  resultados.append(li);
}

// ---------- Paso 2.1: lo básico ----------
localStorage.setItem("nombre", "Ana");
mostrar('localStorage.getItem("nombre")', localStorage.getItem("nombre"));
mostrar('localStorage.getItem("noExiste")', localStorage.getItem("noExiste"));
// (dejamos "nombre" guardado para que se vea en Application)

// ---------- Paso 2.2: solo guarda strings ----------
localStorage.setItem("edad", 25);
mostrar('localStorage.setItem("edad", 25); localStorage.getItem("edad")', localStorage.getItem("edad"));

const compras = [
  { nombre: "Pan", cantidad: 1, urgente: false, comprado: false },
  { nombre: "Leche", cantidad: 2, urgente: true, comprado: false },
];

localStorage.setItem("prueba", compras);
mostrar('localStorage.setItem("prueba", compras); localStorage.getItem("prueba")', localStorage.getItem("prueba"), true);

// ---------- Paso 2.2: JSON al rescate ----------
const texto = JSON.stringify(compras);
mostrar("JSON.stringify(compras)", texto);
mostrar("typeof texto", typeof texto);

const deVuelta = JSON.parse(texto);
mostrar("JSON.parse(texto)[1].nombre", deVuelta[1].nombre);

// Limpieza de las pruebas (las de "nombre" quedan para mostrar en Application)
localStorage.removeItem("prueba");
localStorage.removeItem("edad");
