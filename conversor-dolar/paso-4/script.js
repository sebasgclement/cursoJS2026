const cotizacion = document.querySelector("#cotizacion");

async function cargarCotizacion() {
  const respuesta = await fetch("https://dolarapi.com/v1/dolares/blue");
  const datos = await respuesta.json();

  cotizacion.textContent = `Dólar ${datos.nombre}: $${datos.venta}`;
}

cargarCotizacion();
