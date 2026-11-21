//const titulo = document.querySelector("#titulo");
//console.log(titulo);

// const subtitulo = document.querySelector(".subtitulo");
// const primerItem = document.querySelector("li")
//console.log(primerItem)

// const items = document.querySelectorAll("li");
//console.log(items)
//console.log(items.length)

//console.log(titulo.textContent);
//titulo.textContent = "Lista del súper"

// items.forEach((item) => {
//     console.log(item.textContent)
// })

// subtitulo.textContent = "Semana del 5 de noviembre"

// primerItem.classList.add("comprado");
// primerItem.classList.remove("comprado")
// titulo.classList.toggle("destacado")

// items[items.length -1].classList.add("oculto")

// const lista = document.querySelector("#lista");

// const nuevo = document.createElement("li");

// nuevo.textContent = "Manteca";
// nuevo.classList.add("urgente");

//lista.append(nuevo);

const titulo = document.querySelector('#titulo');
const lista = document.querySelector('#lista');
const resumen = document.querySelector('#resumen');
const btnAgregar = document.querySelector('#btn-agregar');
const inputNuevo = document.querySelector("#nuevo");
const inputVaciar = document.querySelector('#btn-vaciar');
const form = document.querySelector("#form-agregar");
const inputCantidad = document.querySelector("#cantidad");
const checkUrgente = document.querySelector("#urgente");

const compras = [];

function mostrarCompras() {
    lista.innerHTML = "";

    compras.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} x ${producto.cantidad}`;
        lista.append(li);
    })

    const unidades = compras.reduce((total, p) => total + p.cantidad, 0);
    //resumen.textContent = `Faltan ${faltan} de ${compras.length} . ${unidades} unidades`
}


mostrarCompras();

// btnAgregar.addEventListener("click", () => {
//     const texto = inputNuevo.value.trim();
//     if (texto === "") return;

//     compras.push(texto)
//     mostrarCompras();

//     inputNuevo.value = "";
//     inputNuevo.focus();
// })

// function agregar() {
    
// }

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const texto = inputNuevo.value.trim();
    if (texto === "") return;

        compras.push({
            nombre: texto,
            cantidad: inputCantidad.value,
            urgente: checkUrgente.checked,
            comprado: false,
    });
    mostrarCompras();

    form.reset();
    inputNuevo.focus();
})

//btnAgregar.addEventListener("click", agregar);

// inputNuevo.addEventListener("keydown", (e) => {
//     console.log(e.key);
//     if (e.key === "Enter") {
//         agregar();
//     }
// })

// inputNuevo.addEventListener("input", (e) => {
//     console.log(e.target.value);
// })

// inputVaciar.addEventListener("click", () => {
//     compras.length = 0;
//     mostrarCompras();
// })

