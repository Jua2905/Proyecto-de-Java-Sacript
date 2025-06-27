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

function elegirPersonaje() {
    let personajeElegido = null;
    let indiceElegido = -1;
    while (personajeElegido === null) {
        let mensaje = "Elige un personaje con su número:\n";
        personajes.forEach((p, i) => {
            mensaje += `${i + 1}. ${p.nombre}\n`;
        });

        let eleccion = prompt(mensaje);
        let indice = parseInt(eleccion, 10) - 1;

        if (indice >= 0 && indice < personajes.length) {
            personajeElegido = personajes[indice];
            indiceElegido = indice;
            alert(`Elegiste: ${personajeElegido.nombre}`);
            console.log("Personaje elegido:", personajeElegido.nombre);
            console.log("Habilidades:");
            personajeElegido.habilidades.forEach(hab => {
                console.log(`- ${hab.nombre}: ${hab.valor}`);
            });
            // Mostrar en la página
            document.body.innerHTML += `<p>Personaje elegido: <strong>${personajeElegido.nombre}</strong></p>`;
            document.body.innerHTML += `<ul>${personajeElegido.habilidades.map(hab => `<li>${hab.nombre}: ${hab.valor}</li>`).join('')}</ul>`;
        } else {
            alert("Opción no válida. Intenta de nuevo.");
        }
    }
    return { personajeElegido, indiceElegido };
}

const { personajeElegido, indiceElegido } = elegirPersonaje();

// elimina el personaje elegido
const personajesCopia = personajes.slice();
personajesCopia.splice(indiceElegido, 1);

// Elegir un personaje contrario aleatorio
const Contrario = personajesCopia[Math.floor(Math.random() * personajesCopia.length)];

console.log('Tu rival es: ' + Contrario.nombre);
console.log('Habilidades del rival:');
Contrario.habilidades.forEach(hab => {
    console.log(`- ${hab.nombre}: ${hab.valor}`);
});

//<>

// Vida de los personajes (TODOS)

let vidaDeMiPersonaje = 1000;
let vidaDeRival = 1000;

function batalla() {
    let turno = 1;
    while (vidaDeMiPersonaje > 0 && vidaDeRival > 0) {
        console.log(`--- Turno ${turno} ---`);
        
        // Selecciona una habilidad aleatoria para cada uno
        const habilidadMiPersonaje = personajeElegido.habilidades[Math.floor(Math.random() * personajeElegido.habilidades.length)];
        const habilidadRival = Contrario.habilidades[Math.floor(Math.random() * Contrario.habilidades.length)];
        
        // Aplica el daño de las habilidades 
        vidaDeRival = Math.max(0, vidaDeRival - habilidadMiPersonaje.valor);
        vidaDeMiPersonaje = Math.max(0, vidaDeMiPersonaje - habilidadRival.valor);
        
        console.log(`${personajeElegido.nombre} ataca con ${habilidadMiPersonaje.nombre} (${habilidadMiPersonaje.valor})`);
        console.log(`${Contrario.nombre} ataca con ${habilidadRival.nombre} (${habilidadRival.valor})`);
        console.log(`Vida de ${personajeElegido.nombre}: ${vidaDeMiPersonaje}`);
        console.log(`Vida de ${Contrario.nombre}: ${vidaDeRival}`);
        console.log('----------------------');
        
        turno++;
    }
    
    if (vidaDeMiPersonaje <= 0 && vidaDeRival <= 0) {
        console.log("¡Empate! Ambos han caído.");
    } else if (vidaDeMiPersonaje <= 0) {
        console.log(`¡${Contrario.nombre} gana la batalla!`);
    } else {
        console.log(`¡${personajeElegido.nombre} gana la batalla!`);
    }
}

batalla();


//Contador de Wins

let victoriasDeMiPersonaje = parseInt(localStorage.getItem ("--Victorias de mi PERSONAJE--")) || 0;

let victoriasDeRival = parseInt(localStorage.getItem ("--Victorias de RIVAL--")) || 0;

function actualizarVictorias() {
  if (vidaDeMiPersonaje <= 0 && vidaDeRival <= 0) {
    // Empate, no suma
  } else if (vidaDeMiPersonaje <= 0) {
    victoriasDeRival++;
    localStorage.setItem("victoriasRival", victoriasDeRival);
  } else if (vidaDeRival <= 0) {
    victoriasDeMiPersonaje++;
    localStorage.setItem("victoriasMiPersonaje", victoriasDeMiPersonaje);
  }
}

actualizarVictorias ();


//Sector de puntos 


let puntosObtenidos = parseInt(localStorage.getItem("--Puntos Iniciales--")) || 0;

function puntos () {
  if (victoriasDeMiPersonaje = 1){
    puntosObtenidos = puntosObtenidos + 100;
    localStorage.setItem("PUNTOS OBTENIDOS", puntosObtenidos);
  }
}

puntos ();
