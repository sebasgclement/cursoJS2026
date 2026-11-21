// =====================================================================
// PASO 2.3 (ejercicio) · Cotización del dólar con DolarAPI
//  - Se cargan las cotizaciones al abrir y con el botón Actualizar.
//  - Los precios se formatean como moneda argentina (Unidad 5).
//  - Algunas cotizaciones no tienen precio de compra: en ese caso mostramos un guion.
// Las líneas nuevas o importantes de este paso están marcadas con ★
// =====================================================================

const cuerpo = document.querySelector("#cotizaciones");
const estado = document.querySelector("#estado");
const boton = document.querySelector("#actualizar");

function aPesos(numero) {
  return numero.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
}

function crearCelda(texto, esNumero) {
  const td = document.createElement("td");
  td.textContent = texto;
  if (esNumero) td.className = "num";
  return td;
}

function mostrarCotizaciones(dolares) {
  cuerpo.innerHTML = "";

  dolares.forEach((dolar) => {
    const fila = document.createElement("tr");
    fila.append(
      crearCelda(dolar.nombre, false),
      crearCelda(dolar.compra ? aPesos(dolar.compra) : "—", true), // ★ puede venir vacío
      crearCelda(dolar.venta ? aPesos(dolar.venta) : "—", true)
    );
    cuerpo.append(fila);
  });
}

async function cargarCotizaciones() {
  estado.className = "cargando";
  estado.textContent = "Cargando…";
  boton.disabled = true;

  try {
    const respuesta = await fetch("https://dolarapi.com/v1/dolares");
    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}`);
    }
    const dolares = await respuesta.json();

    mostrarCotizaciones(dolares);

    const hora = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false });
    estado.className = "";
    estado.textContent = `Actualizado a las ${hora}`;
  } catch (error) {
    estado.className = "error";
    estado.textContent = "No se pudieron traer las cotizaciones: " + error.message;
  } finally {
    boton.disabled = false;
  }
}

boton.addEventListener("click", cargarCotizaciones);
cargarCotizaciones(); // ★ también al abrir la página
