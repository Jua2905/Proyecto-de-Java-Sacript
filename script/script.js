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


// --- CONTROL DE ESCENAS ---
function mostrarEscena(id) {
  document.getElementById('escena-elegir').style.display = (id === 'elegir') ? 'block' : 'none';
  document.getElementById('escena-batalla').style.display = (id === 'batalla') ? 'block' : 'none';
  document.getElementById('escena-resultado').style.display = (id === 'resultado') ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  // Botones de navegación de escenas
  const btnIrBatalla = document.getElementById('btn-ir-batalla');
  const btnVerResultado = document.getElementById('btn-ver-resultado');
  const btnVolverInicio1 = document.getElementById('btn-volver-inicio1');
  const btnVolverInicio2 = document.getElementById('btn-volver-inicio2');

  if (btnIrBatalla) {
    btnIrBatalla.addEventListener('click', function() {
      mostrarEscena('batalla');
    });
  }
  if (btnVerResultado) {
    btnVerResultado.addEventListener('click', function() {
      // Simular batalla y mostrar resultado en la sección correspondiente
      mostrarResultadoBatalla();
      mostrarEscena('resultado');
    });
  }
  if (btnVolverInicio1) {
    btnVolverInicio1.addEventListener('click', function() {
      mostrarEscena('elegir');
      // Opcional: resetear selección de personaje aquí si lo deseas
      location.reload();
    });
  }
  if (btnVolverInicio2) {
    btnVolverInicio2.addEventListener('click', function() {
      mostrarEscena('elegir');
      location.reload();
    });
  }
  // Mostrar escena inicial
  mostrarEscena('elegir');
});


// Selección de personaje 
const botonesElegir = document.querySelectorAll('#Personajes button');
let personajeElegido = null;
let indiceElegido = -1;
let Contrario = null;

botonesElegir.forEach((boton, i) => {
  boton.addEventListener('click', () => {
    personajeElegido = personajes[i];
    indiceElegido = i; 
    document.getElementById('Articulo').innerHTML = `Elegiste: <strong>${personajeElegido.nombre}</strong><br>
      <ul>${personajeElegido.habilidades.map(hab => `<li>${hab.nombre}: ${hab.valor}</li>`).join('')}</ul>`;
    botonesElegir.forEach(b => b.disabled = true);

    // Elegir rival aleatorio distinto al elegido
    const personajesCopia = personajes.slice();
    personajesCopia.splice(indiceElegido, 1);
    Contrario = personajesCopia[Math.floor(Math.random() * personajesCopia.length)];

    // Mostrar info de batalla en su sección
    const batallaInfo = document.getElementById('batalla-info');
    batallaInfo.innerHTML = `
      <div>
        <h4>Tu personaje:</h4>
        <strong>${personajeElegido.nombre}</strong>
        <ul>${personajeElegido.habilidades.map(hab => `<li>${hab.nombre}: ${hab.valor}</li>`).join('')}</ul>
      </div>
      <div>
        <h4>Rival:</h4>
        <strong>${Contrario.nombre}</strong>
        <ul>${Contrario.habilidades.map(hab => `<li>${hab.nombre}: ${hab.valor}</li>`).join('')}</ul>
      </div>
    `;

    mostrarEscena('batalla');
  });
});


// Lógica de batalla y mostrar resultado en la sección correcta
function mostrarResultadoBatalla() {
  if (!personajeElegido || !Contrario) return;
  // Puedes personalizar la lógica de batalla aquí
  let resultado = '';
  let clase = '';
  // Suma de habilidades para determinar ganador simple
  const sumaHabilidades = arr => arr.reduce((acc, h) => acc + h.valor, 0);
  const puntosJugador = sumaHabilidades(personajeElegido.habilidades);
  const puntosRival = sumaHabilidades(Contrario.habilidades);

  if (puntosJugador === puntosRival) {
    resultado = "¡Empate! Los dos son MUY FUERTES.";
    clase = "empate";
  } else if (puntosJugador < puntosRival) {
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


