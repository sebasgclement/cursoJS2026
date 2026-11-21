const catalogo = [
  { id: 1, nombre: "Remera", precio: 15000 },
  { id: 2, nombre: "Pantalón", precio: 32000 },
  { id: 3, nombre: "Zapatillas", precio: 85000 },
  { id: 4, nombre: "Gorra", precio: 9000 },
];

const carrito = [];

let textoCatalogo = "Catálogo:\n";
for (const producto of catalogo) {
    textoCatalogo += producto.id + ") " + producto.nombre + " - $" + producto.precio + ""
}
textoCatalogo += "\nIngresá el id del producto (0 para terminar):";

let id;

do {
    id = Number(prompt(textoCatalogo));
    if (id === 0) break;

    const producto = catalogo.find((p) => p.id === id);

    if (!producto) {
        alert("Producto inexistente");
        continue;
    }

    const cantidad = Number(prompt("Cuántas unidades de " + producto.nombre + "?"));

    if (!Number.isInteger(cantidad) || cantidad <= 0) {
        alert("Cantidad inválida.")
        continue;
    }

    carrito.push({
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidad,
    });

    alert(`${cantidad} x ${producto.nombre} agregado al carrito`)
} while (true);

if (carrito.length === 0) {
    alert("No agregaste productos.")
} else {
    let detalle = "Detalle de la compra\n";
    for (const item of carrito) {
        const subtotal = item.precio * item.cantidad;
        detalle += item.cantidad + "X" + item.nombre + " ($" + item.precio + ") = $" + subtotal + "\n"
    }
}

let total = carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
detalle += "\nSubtotal: $" + total;

if (total > 10000) {
    const descuento = total * 0.1;
    total -= descuento;
    detalle += "\nDescuento 10%: -$" + descuento;
}

detalle += "\nTotal a pagar: $" + total;
alert(detalle);