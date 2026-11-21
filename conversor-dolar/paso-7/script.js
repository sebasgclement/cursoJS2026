const cotizacion = document.querySelector("#cotizacion");
const selectTipo = document.querySelector("#tipo");
const form = document.querySelector("#form-conversor");
const inputMonto = document.querySelector("#monto");
const resultado = document.querySelector("#resultado");

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const pesos = Number(inputMonto.value);

  if (pesos <= 0) {
    resultado.textContent = "Ingresá un monto mayor a 0";
    resultado.className = "error";
    return;
  }
  if (valorDolar === 0) {
    resultado.textContent = "Todavía no se cargó la cotización";
    resultado.className = "error";
    return;
  }

  const dolares = pesos / valorDolar;
  resultado.textContent = `$${pesos} son US$ ${dolares.toFixed(2)}`;
  resultado.className = "";
});

cargarCotizacion();
