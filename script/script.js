// Importar SweetAlert2 (asegúrate de tenerlo en tu HTML o cargarlo dinámicamente)
if (!window.Swal) {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
  document.head.appendChild(script);
}

// --- UTILIDADES ---
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- MODULARIZACIÓN DE FUNCIONES ---
const saludo = document.getElementById("saludo");
const botonGuardar = document.getElementById("guardarNombre");
const botonEliminar = document.getElementById("eliminarNombre");

function setSaludo(nombre) {
  saludo.textContent = nombre ? `Hola: ${nombre}` : "Hola:";
}

function guardarNombre() {
  Swal.fire({
    title: 'Ingrese su nombre',
    input: 'text',
    inputLabel: 'Nombre',
    inputPlaceholder: 'Escribe tu nombre',
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      localStorage.setItem("nombreUsuario", result.value);
      setSaludo(result.value);
      Swal.fire('¡Guardado!', `Bienvenido/a ${result.value}`, 'success');
    }
  });
}

function eliminarNombre() {
  localStorage.removeItem("nombreUsuario");
  setSaludo();
  Swal.fire('Nombre eliminado', '', 'info');
}

botonGuardar.addEventListener("click", guardarNombre);
botonEliminar.addEventListener("click", eliminarNombre);

const nombreGuardado = localStorage.getItem("nombreUsuario");
if (nombreGuardado) setSaludo(nombreGuardado);

// --- CARGA ASÍNCRONA DE PERSONAJES DESDE API DE MARVEL ---
const MARVEL_PUBLIC_KEY = 'TU_CLAVE_PUBLICA'; // Reemplaza con tu clave pública de Marvel
const MARVEL_API_URL = `https://gateway.marvel.com/v1/public/characters?limit=8&apikey=${MARVEL_PUBLIC_KEY}`;
let personajes = [];

async function cargarPersonajesMarvel() {
  try {
    const response = await fetch(MARVEL_API_URL);
    const data = await response.json();
    personajes = data.data.results.map(p => ({
      nombre: p.name,
      habilidades: [
        { nombre: "Comics disponibles", valor: p.comics.available },
        { nombre: "Series disponibles", valor: p.series.available },
        { nombre: "Historias disponibles", valor: p.stories.available },
        { nombre: "Eventos disponibles", valor: p.events.available }
      ],
      imagen: p.thumbnail.path + '.' + p.thumbnail.extension
    }));
    mostrarPersonajesEnUI();
  } catch (error) {
    // Si falla la API, fallback a los personajes locales
    personajes = [
      {
        nombre: "IRON-MAN",
        habilidades: [
          { nombre: "Laser", valor: 90 },
          { nombre: "Vuelo", valor: 55 },
          { nombre: "Fuerza", valor: 350 },
          { nombre: "Velocidad", valor: 55 }
        ],
        imagen: './Contenido/Iron-Man.webp'
      },
      {
        nombre: "CAPITÁN AMÉRICA",
        habilidades: [
          { nombre: "Escudo", valor: 75 },
          { nombre: "Fuerza", valor: 40 },
          { nombre: "Velocidad", valor: 31 },
          { nombre: "Resistencia", valor: 60 }
        ],
        imagen: './Contenido/Captain-America.webp'
      },
      {
        nombre: "THOR",
        habilidades: [
          { nombre: "Martillo", valor: 250 },
          { nombre: "Fuerza", valor: 100 },
          { nombre: "Vuelo", valor: 150 },
          { nombre: "Resistencia", valor: 210 }
        ],
        imagen: './Contenido/Thor.webp'
      },
      {
        nombre: "HULK",
        habilidades: [
          { nombre: "Fuerza", valor: 200 },
          { nombre: "Resistencia", valor: 150 },
          { nombre: "Regeneración", valor: 40 },
          { nombre: "velocidad", valor: 22 }
        ],
        imagen: './Contenido/Hulk.webp'
      },
      {
        nombre: "BLACK WIDOW",
        habilidades: [
          { nombre: "Agilidad", valor: 70 },
          { nombre: "Combate", valor: 51 },
          { nombre: "Disparo", valor: 43 },
          { nombre: "Sigilo", valor: 80 }
        ],
        imagen: './Contenido/Black-Widow.webp'
      },
      {
        nombre: "DOCTOR STRANGE",
        habilidades: [
          { nombre: "Magia", valor: 200 },
          { nombre: "Teletransportación", valor: 150 },
          { nombre: "Escudo Místico", valor: 100 },
          { nombre: "Manipulación del tiempo", valor: 80 }
        ],
        imagen: './Contenido/Doctor-Strange.webp'
      },
      {
        nombre: "BLACK PANTHER",
        habilidades: [
          { nombre: "Agilidad", valor: 120 },
          { nombre: "Fuerza", valor: 100 },
          { nombre: "Velocidad", valor: 90},
          { nombre: "Garras", valor: 200}
        ],
        imagen: './Contenido/Black-Panther.webp'
      },
      {
        nombre: "SPIDER-MAN",
        habilidades: [
          { nombre: "Agilidad", valor: 180 },
          { nombre: "Telarañas", valor: 100 },
          { nombre: "Sentido arácnido", valor: 250},
          { nombre: "Fuerza", valor: 110}
        ],
        imagen: './Contenido/Spider-Man.webp'
      }
    ];
    mostrarPersonajesEnUI();
  }
}

// --- MOSTRAR PERSONAJES EN EL DOM ---
function mostrarPersonajesEnUI() {
  const contenedor = document.getElementById('Personajes');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  personajes.forEach((personaje, i) => {
    const div = document.createElement('div');
    div.className = `personaje${i+1}`;
    div.innerHTML = `
      <h3>${personaje.nombre}</h3>
      <img src="${personaje.imagen || './Contenido/Iron-Man.webp'}" alt="${personaje.nombre}" style="width:205px; height:205px;">
      <article>Habilidades:</article>
      <p class="TextoHabilidades">
        ${personaje.habilidades.map(hab => `${hab.nombre}: ${hab.valor}`).join('<br>')}
      </p>
      <button type="button">ELEGIR</button>
    `;
    div.querySelector('button').addEventListener('click', () => seleccionarPersonaje(i));
    contenedor.appendChild(div);
  });
}

// --- CONTROL DE ESCENAS ---
function mostrarEscena(id) {
  document.getElementById('escena-elegir').style.display = (id === 'elegir') ? 'block' : 'none';
  document.getElementById('escena-batalla').style.display = (id === 'batalla') ? 'block' : 'none';
  document.getElementById('escena-resultado').style.display = (id === 'resultado') ? 'block' : 'none';
}

// --- SELECCIÓN DE PERSONAJE Y RIVAL ---
let personajeElegido = null;
let indiceElegido = -1;
let Contrario = null;

function seleccionarPersonaje(i) {
  personajeElegido = personajes[i];
  indiceElegido = i;
  document.getElementById('Articulo').innerHTML = `Elegiste: <strong>${personajeElegido.nombre}</strong><br>
    <ul>${personajeElegido.habilidades.map(hab => `<li>${hab.nombre}: ${hab.valor}</li>`).join('')}</ul>`;
  // Deshabilitar todos los botones
  document.querySelectorAll('#Personajes button').forEach(b => b.disabled = true);

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
}

// --- LÓGICA DE BATALLA Y RESULTADO ---
function mostrarResultadoBatalla() {
  if (!personajeElegido || !Contrario) return;
  let resultado = '';
  let clase = '';
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

// --- FILTRO Y BÚSQUEDA (FUNCIONALIDAD COMPLEMENTARIA) ---
function filtrarPersonajes(texto) {
  texto = texto.toLowerCase();
  const personajesFiltrados = personajes.filter(p => p.nombre.toLowerCase().includes(texto));
  mostrarPersonajesEnUI(personajesFiltrados);
}

// --- DARK MODE (FUNCIONALIDAD COMPLEMENTARIA) ---
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
}

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', async function() {
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
      mostrarResultadoBatalla();
      mostrarEscena('resultado');
    });
  }
  if (btnVolverInicio1) {
    btnVolverInicio1.addEventListener('click', function() {
      mostrarEscena('elegir');
      location.reload();
    });
  }
  if (btnVolverInicio2) {
    btnVolverInicio2.addEventListener('click', function() {
      mostrarEscena('elegir');
      location.reload();
    });
  }
  mostrarEscena('elegir');
  await cargarPersonajesMarvel();
  // Puedes agregar aquí listeners para filtros, búsqueda, dark mode, etc.
});

// ...fin del archivo...


