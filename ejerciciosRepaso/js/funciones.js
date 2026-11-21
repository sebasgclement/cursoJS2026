let saldo = 10000;
let operaciones = 0;
let opcion;

function esMontoValido(monto) {
    return !isNaN(monto) && monto > 0
}

function consultarSaldo(saldo) {
    alert(`Tu saldo es $${saldo}`)
}

function depositar(saldo, monto) {
    return saldo + monto;
}

function extraer(saldo, monto) {
    return saldo - monto
}

do {
    opcion = Number(prompt("1) Consultar saldo\n 2) Depositar\n 3) Extraer\n 4) Salir"))
    switch (opcion) {
        case 1:
            consultarSaldo(saldo);
            operaciones++;
            break;

        case 2: {
            const monto = Number(prompt("Cuánto querés depositar?"));
            if (esMontoValido(monto)) {
                saldo = depositar(saldo, monto);
                operaciones++;
                alert("Deposito realizado. Saldo actual: $ " + saldo);
            } else {
                alert("Monto inválido");
            }
            break
        }
    

        case 3: {
            const monto = Number(prompt("Cuánto querés extraer?"));
            if (!esMontoValido(monto)) {
                alert("Monto inválido")
            } else if (monto > saldo) {
                alert("Saldo insuficiente. Tenés $ " + saldo);
            } else {
                saldo = extraer(saldo, monto);
                operaciones++;
                alert("Extracción realizada. Saldo actual: $ " + saldo)
            }
        }
    

    case 4:
    case null:
        break;
    default:
        alert("Opción inválida");
    }
} while (opcion !== 4 && opcion !== null)
    alert("Gracias por usar el cajero automático. Cantidad de operaciones realizadas: " + operaciones)