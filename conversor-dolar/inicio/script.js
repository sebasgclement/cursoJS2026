// const dolar = { nombre: "Blue", compra: 1565, venta: 1585 };

// const texto = JSON.stringify(dolar);
// console.log(texto);
// console.log(typeof texto);
// console.log(texto.compra)

// const deVuelta = JSON.parse(texto);
// console.log(deVuelta.venta);
// console.log(typeof deVuelta)

// fetch("https://dolarapi.com/v1/dolares/blue")
//     .then((respuesta) => respuesta.json())
//     .then((datos) => {
//         console.log(datos);
//     });

// console.log("¿Esto sale antes o después?");



// async function cargarCotizacion() {
//     const respuesta = await fetch("https://dolarapi.com/v1/dolares/blue");
//     const datos = await respuesta.json();

//     cotizacion.textContent = `Dolar ${datos.nombre}: $${datos.venta}`;
//     console.log(datos)
    

// }
const cotizacion = document.querySelector("#cotizacion");
const selectTipo = document.querySelector("#tipo");
const form = document.querySelector("#form-conversor");
const inputMonto = document.querySelector("#monto");
const resultado = document.querySelector("#resultado");
const listarHistorial = document.querySelector("#historial");
let valorDolar = 0;

async function cargarCotizacion() {
    cotizacion.textContent = "Cargando...";
    cotizacion.className = "cargando";
    

    try {
        const tipo = selectTipo.value;
    const respuesta = await fetch(`https://dolarapi.com/v1/dolares/${tipo}`);
    if (!respuesta.ok) {
        throw new Error("la API respondió con error " + respuesta.status);
    }
        const datos = await respuesta.json();
        
        valorDolar = datos.venta;
    
    cotizacion.textContent = `Dolar ${datos.nombre}: $${datos.venta}`
    cotizacion.className = "";
} catch (error) {
    cotizacion.textContent = "No se pudo cargar la cotización: " + error.message;
    cotizacion.className = "error";
}
}

function cargarHistorial() {
    try {
        return JSON.parse(localStorage.getItem("historial")) || [];
    } catch {
        return [];
    }
}

function guardarHistorial() {
    localStorage.setItem("historial", JSON.stringify(historial));
}

function mostrarHistorial() {
    listarHistorial.innerHTML = "";
    historial.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `$${item.pesos} -> US$ ${item.dolares} (dólar ${item.tipo})`;
        listarHistorial.append(li);
    })
}

let historial = cargarHistorial();

selectTipo.addEventListener("change", cargarCotizacion);

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const pesos = Number(inputMonto.value);

    if (pesos <= 0) {
        resultado.textContent = "Ingresa un monto mayor a 0";
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

    historial.unshift({ pesos: pesos, dolares: dolares.toFixed(2), tipo: selectTipo.value });
    if (historial.length > 5) {
        historial.pop();
    }

    guardarHistorial();
    mostrarHistorial();
});

cargarCotizacion();
mostrarHistorial();
