fetch("https://dolarapi.com/v1/dolares/blue")
  .then((respuesta) => respuesta.json())
  .then((datos) => {
    console.log(datos);
  });

console.log("¿Esto sale antes o después?");
