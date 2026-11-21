let numero = Number(prompt("Ingresá un número"))

if (Number.isNaN(numero)) {
    alert("No es un número");
} else if (numero % 2 === 0) {
    alert(`El número ${numero} es par`);
} else {
    alert(`El número ${numero} es impar`);
}