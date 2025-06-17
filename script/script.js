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

function saludar () {
    console.log('¡Bienvenido al SIMULADOR DE PELEAS DE LOS VENGADORES!');
    console.log('Selecciona bien a tus personaje favorito para la batalla.');
}

saludar ();

//function Usuario () {
    //let NombreUsuario = prompt ('Ingrese su usuario');
    //console.log ('Nombre del Usuario es: ' + NombreUsuario);}

 //Usuario ();

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
    while (personajeElegido === null) {
        let mensaje = "Elige un personaje con s número:\n";
        personajes.forEach((p, i) => {
            mensaje += `${i + 1}. ${p.nombre}\n`;
        });

        let eleccion = prompt(mensaje);
        let indice = parseInt(eleccion, 10) - 1;

        if (indice >= 0 && indice < personajes.length) {
            personajeElegido = personajes[indice];
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
    return personajeElegido;
}

elegirPersonaje();

const miPersonaje = personajes[eleccion];

const personajesCopia = personajes.slice ();
personajesCopia.splice (eleccion, 1);

console.log (personajes);
console.log (personajesCopia);


//Personaje Aleatoio
const Contrario =
personajesCopia [Math.floor(Math.random() * personajesCopia.legth)];

console.log ('Tu rival es: ' + Contrario);
