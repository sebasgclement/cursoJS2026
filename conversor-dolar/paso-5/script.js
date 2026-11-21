const cotizacion = document.querySelector("#cotizacion");

async function cargarCotizacion() {
  cotizacion.textContent = "Cargando…";
  cotizacion.className = "cargando";

  try {
    const respuesta = await fetch("https://dolarapi.com/v1/dolares/blue");
    if (!respuesta.ok) {
      throw new Error("la API respondió con error " + respuesta.status);
    }
    const datos = await respuesta.json();

    cotizacion.textContent = `Dólar ${datos.nombre}: $${datos.venta}`;
    cotizacion.className = "";
  } catch (error) {
    cotizacion.textContent = "No se pudo cargar la cotización: " + error.message;
    cotizacion.className = "error";
  }
}

cargarCotizacion();
