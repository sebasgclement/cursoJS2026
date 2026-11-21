// Un objeto de JavaScript
const dolar = { nombre: "Blue", compra: 1565, venta: 1585 };

// Objeto → texto JSON
const texto = JSON.stringify(dolar);
console.log(texto);
console.log(typeof texto);

// Texto JSON → objeto
const deVuelta = JSON.parse(texto);
console.log(deVuelta.venta);
