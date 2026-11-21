const cotizacion = document.querySelector("#cotizacion");
const selectTipo = document.querySelector("#tipo");

let valorDolar = 0; // acá guardamos la cotización para usarla al convertir

async function cargarCotizacion() {
  cotizacion.textContent = "Cargando…";
  cotizacion.className = "cargando";

  try {
    const tipo = selectTipo.value; // "oficial", "blue" o "tarjeta"
    const respuesta = await fetch(`https://dolarapi.com/v1/dolares/${tipo}`);
    if (!respuesta.ok) {
      throw new Error("la API respondió con error " + respuesta.status);
    }
    const datos = await respuesta.json();

    valorDolar = datos.venta;
    cotizacion.textContent = `Dólar ${datos.nombre}: $${datos.venta}`;
    cotizacion.className = "";
  } catch (error) {
    cotizacion.textContent = "No se pudo cargar la cotización: " + error.message;
    cotizacion.className = "error";
  }
}

selectTipo.addEventListener("change", cargarCotizacion);

cargarCotizacion();
