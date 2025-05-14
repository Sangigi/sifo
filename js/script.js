const halo = document.createElement('div');
halo.id = 'halo';
document.body.appendChild(halo);

window.addEventListener('beforeunload', function() { window.scrollTo(0, 0); });
window.scrollTo(0, 0);

let lastMouseX = window.innerWidth / 2;
let lastMouseY = window.innerHeight / 2;
let isScrolling = false; // Nueva variable para detectar desplazamiento

function updateHaloPosition() {
  const haloX = lastMouseX - halo.offsetWidth / 2;
  const haloY = lastMouseY - halo.offsetHeight / 2;

  const boundedX = Math.max(0, Math.min(haloX, window.innerWidth - halo.offsetWidth));
  const boundedY = Math.max(0, Math.min(haloY, window.innerHeight - halo.offsetHeight));

  halo.style.left = `${boundedX}px`;
  halo.style.top = `${boundedY}px`;
}

document.addEventListener('mousemove', (event) => {
  lastMouseX = event.clientX;
  lastMouseY = event.clientY;
  updateHaloPosition();
});

window.addEventListener('scroll', () => {
  updateHaloPosition();
  isScrolling = true; // El usuario está desplazándose
});

function cleanUpHalo() {
  const extraHalos = document.querySelectorAll('#halo:not(:last-child)');
  extraHalos.forEach((extraHalo) => extraHalo.remove());
}

document.addEventListener('DOMContentLoaded', cleanUpHalo);
window.addEventListener('mousemove', cleanUpHalo);

const elementos = document.querySelectorAll('.elemento');

elementos.forEach((elemento) => {
  elemento.addEventListener('mouseenter', () => {
    halo.style.opacity = '0';
    halo.style.transform = 'scale(3)';
  });

  elemento.addEventListener('mouseleave', () => {
    halo.style.opacity = '1';
    halo.style.transform = 'scale(1)';
  });
});

document.addEventListener('mouseleave', () => {
  halo.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
  halo.style.opacity = '1';
  updateHaloPosition();
  cleanUpHalo();
});

function showModal(title, description) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDescription').innerText = description;
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    modal.style.display = 'flex';
    setTimeout(() => {
        modalContent.classList.add('active');
    }, 0.1); // Pequeño retraso para permitir que el modal se muestre antes de añadir la clase 'active'
}

function closeModal() {
    const modalContent = document.getElementById('modalContent');
    modalContent.classList.remove('active');
    modalContent.classList.add('closing');
    setTimeout(() => {
        modalContent.classList.remove('closing');
        document.getElementById('modal').style.display = 'none';
    }, 150); // Retardo para permitir que la animación de cierre se complete
}

// Asegurar que la imagen nav_img sea clicable en dispositivos móviles
const navImg = document.querySelector('.nav_img');
const cuadroTexto = document.querySelector('.cuadro_texto');

navImg.addEventListener('mouseover', function() {
    const imgRect = navImg.getBoundingClientRect();
    const top = imgRect.top + window.scrollY - cuadroTexto.offsetHeight - 50; // Ajustar 10px más arriba
    const left = imgRect.left + window.scrollX + imgRect.width - cuadroTexto.offsetWidth - 110; // Ajustar 10px más a la izquierda

    cuadroTexto.style.top = `${top}px`;
    cuadroTexto.style.left = `${left}px`;
    cuadroTexto.style.display = 'block';
    cuadroTexto.style.animation = 'ideaPop 0.5s forwards';
});

navImg.addEventListener('mouseout', function() {
    cuadroTexto.style.animation = 'none';
    cuadroTexto.style.display = 'none';
});

// Manejamos el clic para evitar que se active durante el desplazamiento
let isTouching = false;

function handleClick(event) {
    if (!isScrolling && !isTouching) {
        window.location.href = 'nosotros.html';
    }
    isTouching = false; // Reset after touch
}

navImg.addEventListener('dblclick', function(event) {
    handleClick(event);
});

navImg.addEventListener('dblclick', function(event) {
    isTouching = true; // Detecta el toque en pantallas táctiles
    handleClick(event);
});

cuadroTexto.addEventListener('mouseover', function() {
    cuadroTexto.style.display = 'block';
});

cuadroTexto.addEventListener('mouseout', function() {
    setTimeout(function() {
        cuadroTexto.style.animation = 'none';
        cuadroTexto.style.display = 'none';
    }, 0);
});

// Función para mostrar la fecha actual
function mostrarFechaActual() {
    const fechaActual = new Date();
    document.getElementById('fecha_actual').textContent = fechaActual.toLocaleDateString();
}

// Llama a la función para mostrar la fecha actual al cargar la página
window.onload = function() {
    mostrarFechaActual();
    mostrarTextoInicial(); // Mostrar el texto de inicio al cargar la página
};

// Función para mostrar el texto de inicio
function mostrarTextoInicial() {
    document.getElementById('servicio_desc').textContent = 'Bienvenido a nuestros servicios. Por favor, seleccione una opción del menú.';
    document.getElementById('servicio_desc_2').textContent = 'Puede hacer clic en cualquier opción del menú a la izquierda para ver más detalles.';
}

// Palabras para los botones
const palabrasBotones = ['Okay!', 'Obvio!', 'Simón!', 'Rayos!', 'Wow!', 'Sis!', 'Dale!', 'Siempre!', 'Minecraft!', 'Queso!', 'Aguacate!', 'Cilantro!', 'Pimpollo!', 'Fantástico!', '3nggz!', 'Super!', 'Perejil!'];

// Función para obtener una palabra aleatoria diferente
function obtenerPalabrasUnicas() {
    const palabra1 = palabrasBotones[Math.floor(Math.random() * palabrasBotones.length)];
    let palabra2;
    do {
        palabra2 = palabrasBotones[Math.floor(Math.random() * palabrasBotones.length)];
    } while (palabra2 === palabra1);
    return [palabra1, palabra2];
}

// Función para mostrar contenido según la opción seleccionada
function mostrarContenido(opcion) {
    const servicioDesc = document.getElementById('servicio_desc');
    const servicioDesc2 = document.getElementById('servicio_desc_2');
    const botones = document.querySelectorAll('.boton_desc--style');

    // Añadir clase de animación de salida
    servicioDesc.classList.add('fade-out');
    servicioDesc2.classList.add('fade-out');
    botones.forEach(boton => boton.classList.add('fade-out'));

    setTimeout(() => {
        let contenido1, contenido2;
        switch(opcion) {
            case 'desarrollo_web':
                contenido1 = 'Estamos enfocados en crear sitios web visualmente atractivos e intuitivos, asegurándonos de que cada página sea una experiencia única para tus usuarios.';
                contenido2 = 'Creemos en diseñar sitios web que no solo impresionen visualmente, sino que también sean fáciles de usar y navegar.';
                break;
            case 'diseno_web':
                contenido1 = 'Ofrecemos soluciones personalizadas, utilizando tecnologías modernas para crear sitios seguros, eficaces y funcionales que cumplan con tus requerimientos.';
                contenido2 = 'Desarrollamos sitios web a medida, empleando tecnologías avanzadas para asegurar que sean seguros y efectivos.';
                break;
            case 'soporte_tecnico':
                contenido1 = 'Te ayudamos a resolver cualquier problema técnico con tu sitio web, garantizando su correcto funcionamiento.';
                contenido2 = 'Nuestro equipo está listo para solucionar cualquier dificultad técnica que pueda afectar tu sitio web, optimizando su rendimiento y asegurando que siempre esté disponible para tus usuarios.';
                break;
            case 'seo':
                contenido1 = 'Nuestro objetivo principal es ampliar tu visibilidad en buscadores y atraer más tráfico a tu sitio web.';
                contenido2 = 'Además de mejorar tu presencia en los buscadores, nos aseguramos de que tu sitio web esté optimizado para convertir ese tráfico en resultados tangibles, maximizando tu alcance y eficacia online.';
                break;
            case 'diseno_responsivo':
                contenido1 = 'Nos aseguramos de que tu sitio web sea atractivo en cualquier dispositivo: desde computadoras, hasta dispositivos móviles.';
                contenido2 = 'Optimizamos tu sitio web para que se vea y funcione perfectamente en todos los dispositivos, garantizando una experiencia de usuario fluida tanto en computadoras como en móviles.';
                break;
            case 'formularios_contacto':
                contenido1 = 'Diseñamos formularios sencillos para que tus clientes puedan contactarte de manera fácil y directa.';
                contenido2 = 'Nos aseguramos de que tus clientes puedan conectarse contigo de forma rápida y sencilla, facilitando una comunicación efectiva que fortalezca la relación con tu negocio.';
                break;
            default:
                contenido1 = '';
                contenido2 = '';
        }
        // Actualizar el contenido
        servicioDesc.textContent = contenido1;
        servicioDesc2.textContent = contenido2;

        // Eliminar clases de animación de salida y añadir clase de animación de entrada
        servicioDesc.classList.remove('fade-out');
        servicioDesc2.classList.remove('fade-out');
        servicioDesc.classList.add('fade-in');
        servicioDesc2.classList.add('fade-in');

        // Cambiar las palabras de los botones y restablecer su estado
        const palabrasUnicas = obtenerPalabrasUnicas();
        botones.forEach((boton, index) => {
            boton.value = palabrasUnicas[index];
            boton.classList.remove('checked');
            boton.classList.remove('fade-out');
            boton.classList.add('fade-in');
        });
    }, 300); // Ajusta el tiempo de espera según la duración de la animación
}

// Función para manejar el click en el botón
function manejarClick(boton) {
    boton.value = '✔';
    boton.classList.add('checked');
}

// Aseguramos que el navbar se oculte y muestre de forma fluida
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        navbar.style.transition = "transform 0.3s ease"; // Añadimos transición para mayor fluidez
        navbar.style.transform = 'translateY(-100%)'; // Desaparece el navbar con un desplazamiento
    } else if (scrollTop < lastScrollTop) {
        navbar.style.transition = "transform 0.3s ease"; // Añadimos transición para mayor fluidez
        navbar.style.transform = 'translateY(0)'; // Muestra el navbar
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para evitar valores negativos en dispositivos móviles
});