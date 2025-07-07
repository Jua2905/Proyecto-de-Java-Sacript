//alert('Bienvenido al SIMULADOR DE PELEAS DE LOS VENGADORES');

//alert('Contraseña 1234');

//let contrasena = '';
//while (contrasena !== '1234') {
    //contrasena = prompt('Ingrese la contraseña secreta para acceder al simulador:');
    //if (contrasena !== '1234') {
      //alert('Contraseña incorrecta, intente nuevamente.');
    //}
  //}

//alert('Contraseña correcta, accediendo a' + ' SIMULADOR DE PELEAS DE LOS VENGADORES');

//function saludar () {
  //console.log('¡Bienvenido al SIMULADOR DE PELEAS DE LOS VENGADORES!');
  //console.log('Selecciona bien a tus personaje favorito para la batalla.');
//}

//saludar ();


//Usuarios
const saludo = document.getElementById("saludo");
const botonGuardar = document.getElementById("guardarNombre");
const botonEliminar = document.getElementById("eliminarNombre");


// Guardar nombre
botonGuardar.addEventListener("click", () => {
  const nombre = prompt("Ingrese su nombre ESTIMADO:");
  if (nombre) {
    localStorage.setItem("nombreUsuario", nombre);
    saludo.textContent = `Hola: ${nombre}`;
  }
});


// Eliminar nombre
botonEliminar.addEventListener("click", () => {
  localStorage.removeItem("nombreUsuario");
  saludo.textContent = "Hola:";
});


// Mostrar el nombre guardado al cargar la página
const nombreGuardado = localStorage.getItem("nombreUsuario");
if (nombreGuardado) {
  saludo.textContent = `Hola: ${nombreGuardado}`;
}


//Personajes y sus ARRAY

const personajes = [
  {
    nombre: "IRON-MAN",
    habilidades: [
      { nombre: "Laser", valor: 90 },
      { nombre: "Vuelo", valor: 55 },
      { nombre: "Fuerza", valor: 350 },
      { nombre: "Velocidad", valor: 55 }
    ]
  },
  {
    nombre: "CAPITÁN AMÉRICA",
    habilidades: [
      { nombre: "Escudo", valor: 75 },
      { nombre: "Fuerza", valor: 40 },
      { nombre: "Velocidad", valor: 31 },
      { nombre: "Resistencia", valor: 60 }
    ]
  },
  {
    nombre: "THOR",
    habilidades: [
      { nombre: "Martillo", valor: 250 },
      { nombre: "Fuerza", valor: 100 },
      { nombre: "Vuelo", valor: 150 },
      { nombre: "Resistencia", valor: 210 }
    ]
  },
  {
    nombre: "HULK",
    habilidades: [
      { nombre: "Fuerza", valor: 200 },
      { nombre: "Resistencia", valor: 150 },
      { nombre: "Regeneración", valor: 40 },
      { nombre: "velocidad", valor: 22 }
    ]
  },
  {
    nombre: "BLACK WIDOW",
    habilidades: [
      { nombre: "Agilidad", valor: 70 },
      { nombre: "Combate", valor: 51 },
      { nombre: "Disparo", valor: 43 },
      { nombre: "Sigilo", valor: 80 }
    ]
  },
  {
    nombre: "DOCTOR STRANGE",
    habilidades: [
      { nombre: "Magia", valor: 200 },
      { nombre: "Teletransportación", valor: 150 },
      { nombre: "Escudo Místico", valor: 100 },
      { nombre: "Manipulación del tiempo", valor: 80 }
    ]
  },
  {
    nombre: "BLACK PANTHER",
    habilidades: [
      { nombre: "Agilidad", valor: 120 },
      { nombre: "Fuerza", valor: 100 },
      { nombre: "Velocidad", valor: 90},
      { nombre: "Garras", valor: 200}
    ]
  },
  {
    nombre: "SPIDER-MAN",
    habilidades: [
      { nombre: "Agilidad", valor: 180 },
      { nombre: "Telarañas", valor: 100 },
      { nombre: "Sentido arácnido", valor: 250},
      { nombre: "Fuerza", valor: 110}
    ]
  }
];


// Selección de personaje 
const botonesElegir = document.querySelectorAll('#Personajes button');
let personajeElegido = null;
let indiceElegido = -1;

botonesElegir.forEach((boton, i) => {
  boton.addEventListener('click', () => {
    personajeElegido = personajes[i];
    indiceElegido = i; 
    document.getElementById('Articulo').innerHTML = `Elegiste: <strong>${personajeElegido.nombre}</strong><br>
      <ul>${personajeElegido.habilidades.map(hab => `<li>${hab.nombre}: ${hab.valor}</li>`).join('')}</ul>`;
    botonesElegir.forEach(b => b.disabled = true);
    iniciarBatalla();
  });
});
  


// Elimina el personaje elegido del array copia
const personajesCopia = personajes.slice();
personajesCopia.splice(indiceElegido, 1);
  


// Elegir rival aleatorio
const Contrario = personajesCopia[Math.floor(Math.random() * personajesCopia.length)];
let vidaDeMiPersonaje = 1000;
let vidaDeRival = 1000;
let turno = 1;




function iniciarBatalla() {
  let resultado = '';
  let clase = '';
  if (vidaDeMiPersonaje <= 0 && vidaDeRival <= 0) {
    resultado = "¡Empate! Los dos son MUY FUERTES.";
    clase = "empate";
  } else if (vidaDeMiPersonaje <= 0) {
    resultado = `¡${Contrario.nombre} gana la batalla!`;
    clase = "perdedor";
    let victoriasDeRival = parseInt(localStorage.getItem("victoriasRival")) || 0;
    victoriasDeRival++;
    localStorage.setItem("victoriasRival", victoriasDeRival);
  } else {
    resultado = `¡${personajeElegido.nombre} gana la batalla!`;
    clase = "ganador";
    let victoriasDeMiPersonaje = parseInt(localStorage.getItem("victoriasMiPersonaje")) || 0;
    victoriasDeMiPersonaje++;
    localStorage.setItem("victoriasMiPersonaje", victoriasDeMiPersonaje);
    let puntosObtenidos = parseInt(localStorage.getItem("PUNTOS OBTENIDOS")) || 0;
    puntosObtenidos += 100;
    localStorage.setItem("PUNTOS OBTENIDOS", puntosObtenidos);
    resultado += `<br><strong>Puntos obtenidos: ${puntosObtenidos}</strong>`;
  }
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `<span class="${clase}">${resultado}</span>`;
}


