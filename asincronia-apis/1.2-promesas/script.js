// =====================================================================
// PASO 1.2 · Promesas: pendiente, cumplida o rechazada
//  - La función pedirPizza() SIMULA algo que tarda y puede fallar.
//    No hace falta aprender a escribirla: en la vida real, las promesas nos las da fetch().
//  - Lo que sí importa es cómo se USA una promesa: .then(), .catch() y .finally().
// Las líneas nuevas o importantes de este paso están marcadas con ★
// =====================================================================

const boton = document.querySelector("#pedir");
const estado = document.querySelector("#estado");

// ---------- Esto NO hace falta aprenderlo: simula un pedido que tarda 2 segundos ----------
// El 70 % de las veces sale bien y el 30 % falla.
function pedirPizza() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.7) {
        resolve("Pizza de muzzarella 🍕");
      } else {
        reject(new Error("Se quemó en el horno 🔥"));
      }
    }, 2000);
  });
}

// ---------- ★ Esto SÍ: cómo se usa una promesa ----------
boton.addEventListener("click", () => {
  estado.className = "cargando";
  estado.textContent = "⏳ Pendiente… (pending)";
  boton.disabled = true;

  pedirPizza()
    .then((pizza) => {
      // ★ .then: se ejecuta si la promesa se CUMPLIÓ, y recibe el valor
      estado.className = "";
      estado.textContent = `✅ Cumplida (fulfilled): ${pizza}`;
    })
    .catch((error) => {
      // ★ .catch: se ejecuta si la promesa se RECHAZÓ, y recibe el error
      estado.className = "error";
      estado.textContent = `❌ Rechazada (rejected): ${error.message}`;
    })
    .finally(() => {
      // ★ .finally: se ejecuta SIEMPRE, haya salido bien o mal
      boton.disabled = false;
    });
});
