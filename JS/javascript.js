


document.addEventListener("DOMContentLoaded", () => {

   let victorias = 0;
   let derrotas = 0;
   let empates = 0;

/**
2. * @brief Inicializa el juego configurando los elementos, estados y eventos necesarios.
3. *
4. * Esta función prepara todo lo necesario para que el juego pueda comenzar,
5. * incluyendo la configuración de la interfaz, los valores iniciales de los
6. * jugadores y la vinculación de eventos a los controles.
7. *
8. * @return {void} No devuelve ningún valor.
9. */


inicializarJuego();

    function inicializarJuego() {
        setTimeout(() => {
            const contenedor = document.querySelector('main'); // Cambiado a main para que coincida con tu CSS
            if (contenedor) contenedor.style.opacity = '1';
        }, 100);

        const botones = document.querySelectorAll('.boton-eleccion-jugada');

        botones.forEach(boton => {
            boton.addEventListener('click', () => {
                jugar(boton.id);
            });
        });

        
    }


 /**
2. * @brief Ejecuta una ronda del juego con la elección del usuario.
3. *
4. * Esta función realiza los siguientes pasos:
5. * 1. Reinicia los displays del juego.
6. * 2. Genera la elección de la CPU de forma aleatoria.
7. * 3. Muestra la elección del usuario y de la CPU con animaciones.
8. * 4. Calcula el resultado de la ronda.
9. * 5. Muestra el resultado y actualiza los contadores correspondientes.
10. *
11. * @param {string} eleccionUsuario - La elección realizada por el usuario (por ejemplo: "piedra", "papel", 
"tijera"...).
12. * @return {void} No devuelve ningún valor.
13. */



 function jugar(eleccionUsuario) {
        reiniciarDisplays();

     
        const eleccionCPU = obtenerEleccionCPU();

   
        const displayUser = document.getElementById('display-usuario');
        const displayCPU = document.getElementById('display-cpu');

        
        mostrarEleccion(displayUser, eleccionUsuario, "JUGADOR");
        mostrarEleccion(displayCPU, eleccionCPU, "CPU");

       
        const resultado = calcularResultadoJugada(eleccionUsuario, eleccionCPU);

       
        mostrarResultadoJugada(resultado, eleccionUsuario, eleccionCPU);
        actualizarContadores();
    }
 /**
    2. * @brief Genera aleatoriamente la elección de la CPU.
    3. *
    4. * Esta función selecciona una opción al azar entre las disponibles y la devuelve.
    5. *
    6. * @return {string} La elección de la CPU (por ejemplo: "piedra", "papel" o "tijera"...).
    7. */
function obtenerEleccionCPU() {
        const opciones = ["piedra", "papel", "tijera", "lagarto", "spock"];
        const indiceAleatorio = Math.floor(Math.random() * opciones.length);
        return opciones[indiceAleatorio];
    }

    /**
2. * @brief Muestra la elección de un jugador (jugador humano o CPU) en un display con icono y texto.
3. *
4. * Esta función limpia el contenido del display, aplica la clase
5. * para animación/estilo y agrega los elementos que representan
6. * la jugada seleccionada (emoji y texto) del jugador indicado.
7. *
8. * @param {HTMLElement} display - El contenedor donde se mostrará la elección.
9. * @param {string} eleccion - La clave de la elección (por ejemplo: "piedra", "papel", "tijera"...).
10. * @param {string} jugador - Nombre del jugador que realizó la elección (por ejemplo: "JUGADOR" o "CPU").
11. * @return {void} No devuelve ningún valor.
12. */
function mostrarEleccion(display, eleccion, jugador) {
    if (display) {
        const botonOriginal = document.getElementById(eleccion);
        const imgOriginal = botonOriginal ? botonOriginal.querySelector('img') : null;

        if (imgOriginal) {
            display.innerHTML = "";
            display.classList.add('active');

            
            const iconoClonado = imgOriginal.cloneNode(true);
            iconoClonado.className = "icono-jugada-grande"; 

            const texto = document.createElement('div');
            texto.className = "texto-jugada";
            texto.textContent = eleccion.toUpperCase();

            
            display.appendChild(iconoClonado);
            display.appendChild(texto);
        }
    }
}

      /**
     2. * @brief Reinicia los displays del juego a su estado inicial.
     3. *
     4. * Esta función restablece el contenido de los displays del usuario y de la CPU,
     5. * elimina cualquier clase de animación activa y restablece el mensaje de resultado
     6. * al texto predeterminado "¡Batalla!".
     7. *
     8. * @return {void} No devuelve ningún valor.
     9. */
     function reiniciarDisplays() {
    const displayUsuario = document.getElementById('display-usuario');
    const displayCPU = document.getElementById('display-cpu');
    const mensaje = document.getElementById('mensaje-resultado');

    if (displayUsuario) {
        displayUsuario.classList.remove('active');
        displayUsuario.innerHTML = '<div class="placeholder">?</div>';
    }
    if (displayCPU) {
        displayCPU.classList.remove('active');
        displayCPU.innerHTML = '<div class="placeholder">?</div>';
    }
    if (mensaje) {
        mensaje.textContent = "¡Batalla!";
        mensaje.className = "mensaje-resultado"; 
    }
}

      /**
2. * @brief Calcula el resultado de una ronda entre el usuario y la CPU.
3. *
4. * Esta función compara la elección del usuario con la elección de la CPU
5. * y determina si la ronda termina en victoria, derrota o empate según
6. * las reglas del juego.
7. *
8. * @param {string} usuario - La elección del usuario (por ejemplo: "piedra", "papel", "tijera"...).
9. * @param {string} cpu - La elección de la CPU (por ejemplo: "piedra", "papel", "tijera"...).
10. * @return {string} El resultado de la ronda: "victoria", "derrota" o "empate".
11. */
function calcularResultadoJugada(usuario, cpu) {
        if (usuario === cpu) return "empate";

        const reglas = {
            piedra: ["tijera", "lagarto"],
            papel: ["piedra", "spock"],
            tijera: ["papel", "lagarto"],
            lagarto: ["spock", "papel"],
            spock: ["tijera", "piedra"]
        };

        if (reglas[usuario].includes(cpu)) {
            return "victoria";
        } else {
            return "derrota";
        }
    }

      /**
2. * @brief Muestra el resultado de una ronda en la interfaz del juego.
3. *
4. * Esta función actualiza el mensaje de resultado según si el usuario ganó,
5. * perdió o empató, aplica la clase correspondiente para estilos y
6. * actualiza los contadores de victorias, derrotas o empates.
7. *
8. * @param {string} resultado - Resultado de la ronda: "victoria", "derrota" o "empate".
9. * @param {string} usuario - Elección del usuario (por ejemplo: "piedra", "papel", "tijera"...).
10. * @param {string} cpu - Elección de la CPU (por ejemplo: "piedra", "papel", "tijera"...).
11. * @return {void} No devuelve ningún valor.
12. */
function mostrarResultadoJugada(resultado, usuario, cpu) {
    const mensaje = document.getElementById('mensaje-resultado');
    if (!mensaje) return;

    mensaje.classList.remove('ganador', 'perdedor', 'empate');

    if (resultado === "victoria") {
        victorias++;
        mensaje.textContent = `Victoria ${usuario.toUpperCase()} vence a ${cpu.toUpperCase()}`;
        mensaje.classList.add('ganador'); 
    } else if (resultado === "derrota") {
        derrotas++;
        mensaje.textContent = `Derrota ${cpu.toUpperCase()} vence a ${usuario.toUpperCase()}`;
        mensaje.classList.add('perdedor'); 
    } else {
        empates++;
        mensaje.textContent = "Empate";
        mensaje.classList.add('empate'); 
    }
}

 /**
2. * @brief Actualiza los contadores de victorias, derrotas y empates en la interfaz.
3. *
4. * Esta función refleja los valores actuales de las variables globales
5. * `victorias`, `derrotas` y `empates` en los elementos del DOM correspondientes.
6. *
7. * @return {void} No devuelve ningún valor.
8. */
function actualizarContadores() {
        const elVictorias = document.getElementById('victorias');
        const elDerrotas = document.getElementById('derrotas');
        const elEmpates = document.getElementById('empates');

        if (elVictorias) elVictorias.textContent = victorias;
        if (elDerrotas) elDerrotas.textContent = derrotas;
        if (elEmpates) elEmpates.textContent = empates;
    }

 /**
2. * @brief Inicializa los tooltips de los botones de elección.
3. *
4. * Esta función recorre todos los botones de elección, obtiene la jugada
5. * asociada a cada uno y configura el atributo `title` para mostrar
6. * un tooltip indicando qué opciones vence esa jugada.
7. *
8. * @return {void} No devuelve ningún valor.
9. */
 function inicializarTooltips() {
 
}

});
