function esPalindromo(texto) {
    const limpio = texto.toLowerCase().split(" ").join("");
    const invertido = limpio.split("").reverse().join("");
    return limpio === invertido;
}


console.log(esPalindromo("Anita lava la tina"));
console.log(esPalindromo("HOLA MUNDO"));