document.addEventListener('DOMContentLoaded', (event) => {
    let tamanoCarton = '';
    var turnCounter = 0;
    const startGameButton = document.getElementById('start');
    var container = document.getElementsByClassName('container');
    var BingoBall = document.getElementsByClassName('BingoBall');
    var counterElement = document.getElementById('turnCounter');
    var nextTurnButton = document.getElementById('nextTurn');
    var generatedNumbers = [];
    
    // Función para habilitar o deshabilitar el botón "Start Game"
    function habilitarStartGame() {
        // Obtén los campos de entrada de los jugadores
        const player1Input = document.getElementById('player1');
        const player2Input = document.getElementById('player2');
        const player3Input = document.getElementById('player3');
        const player4Input = document.getElementById('player4');
        
        // Verifica si todos los campos de entrada tienen un valor
        if (player1Input.value !== '' && player2Input.value !== '' && player3Input.value !== '' && player4Input.value !== '' && tamanoCarton !== '') {
            startGameButton.disabled = false;
        } else {
            startGameButton.disabled = true;
        }
    }

    // Función para verificar los campos de entrada cuando se hace clic en "Start Game"
    startGameButton.addEventListener('click', function() {
        // Obtén los campos de entrada de los jugadores
        const player1Input = document.getElementById('player1');
        const player2Input = document.getElementById('player2');
        const player3Input = document.getElementById('player3');
        const player4Input = document.getElementById('player4');
        
        // Verifica si todos los campos de entrada tienen un valor
        if (player1Input.value === '' || player2Input.value === '' || player3Input.value === '' || player4Input.value === '' || tamanoCarton === '') {
            alert('Please complete all fields to start the game.');
            startGameButton.disabled = true;
        } else {
            for(var i = 0; i < container.length; i++){
                container[i].classList.add('hidden');
            }
            var numeroAleatorio = Math.floor(Math.random() * 50) + 1;
            numeroBall.textContent = numeroAleatorio;
            players = [player1Input.value, player2Input.value, player3Input.value, player4Input.value];
            startGame();
            marcarNumeroEnTabla(numeroAleatorio);

        }

    });

    // Obtén los botones de tamaño de tablero
    const size3Button = document.getElementById('size3');
    const size4Button = document.getElementById('size4');
    const size5Button = document.getElementById('size5');

    // Evento para escuchar los clics en el botón de tamaño 3
    size3Button.addEventListener('click', function() {
        tamanoCarton = 3;
        habilitarStartGame();
    });

    // Evento para escuchar los clics en el botón de tamaño 4
    size4Button.addEventListener('click', function() {
        tamanoCarton = 4;
        habilitarStartGame();
    });

    // Evento para escuchar los clics en el botón de tamaño 5
    size5Button.addEventListener('click', function() {
        tamanoCarton = 5;
        habilitarStartGame();
    });


    // Función para mezclar un array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Función para generar una tabla de un tamaño dado
    function generarTabla(tamano, jugador) {
        // Crea un nuevo elemento de tabla
        const tabla = document.createElement('table');
        tabla.id = `${tamano}x${tamano}-${jugador}`;

        // Genera un array con todos los números posibles
        const numeros = Array.from({length: 50}, (_, i) => i + 1);

        // Mezcla el array
        shuffleArray(numeros);

        // Toma los primeros 'tamano * tamano' números
        const numerosSeleccionados = numeros.slice(0, tamano * tamano);

        let contador = 0;
        for (let i = 0; i < tamano; i++) {
            // Crea una nueva fila
            const fila = document.createElement('tr');

            for (let j = 0; j < tamano; j++) {
                // Crea una nueva celda
                const celda = document.createElement('td');
                celda.id = `${tamano}x${tamano}-${contador}`;
                celda.textContent = numerosSeleccionados[contador];
                contador++;

                // Añade la celda a la fila
                fila.appendChild(celda);
            }

            // Añade la fila a la tabla
            tabla.appendChild(fila);
        }

        // Añade la tabla al contenedor de tablas
        const contenedorTablas = document.getElementById('tablas');
        contenedorTablas.appendChild(tabla);

        return tabla;
    }

    // Llama a la función cuando se carga la página
    //generarTabla(3); // Genera una tabla 3x3
    //generarTabla(4); // Genera una tabla 4x4
    //generarTabla(5); // Genera una tabla 5x5
    
    // Llama a la función cuando se carga la página
    //llenarTabla3x3();


    // Definir la función para iniciar el juego
    var generatedNumbers = [];
    function startGame() {
        // Iniciar el contador en 1
        turnCounter = 1;
        counterElement.textContent = 'Turn N°: ' + turnCounter;
    
        // Mostrar el contador y el botón
        counterElement.classList.remove('hidden');
        nextTurnButton.classList.remove('hidden');
        for (var i = 0; i < BingoBall.length; i++) {
            BingoBall[i].classList.remove('hidden');
        }
    
        // Generar tablas para cada jugador y ocultarlas
        const tablasPorJugador = [];
        for (let i = 0; i < players.length; i++) {
            const tablaJugador = generarTabla(tamanoCarton, i + 1);
            tablasPorJugador.push(tablaJugador);
            tablaJugador.classList.add('hidden');
        }
    
        // Añadir evento de clic a los botones de los jugadores para mostrar sus tablas
        const playerButtonsContainer = document.getElementById('playerButtons');
        playerButtonsContainer.innerHTML = '';
    
        players.forEach(function (playerName, index) {
            const button = document.createElement('button');
            button.textContent = playerName;
            button.id = 'playerButton' + (index + 1);
            button.addEventListener('click', function () {
                tablasPorJugador.forEach(function (tabla, tabIndex) {
                    if (index === tabIndex) {
                        tabla.classList.remove('hidden');
                    } else {
                        tabla.classList.add('hidden');
                    }
                });
            });
            playerButtonsContainer.appendChild(button);
        });
        
        playerButtonsContainer.classList.remove('hidden');
        playerButtonsContainer.firstChild.click();
    }

    function marcarNumeroEnTabla(numero) {
        // Obtén todas las tablas
        const tablas = document.querySelectorAll('table');
    
        tablas.forEach((tabla, jugadorIndex) => {
            // Busca todos los cuadros de la tabla
            const cuadros = tabla.querySelectorAll('td');
    
            // Itera sobre los cuadros y busca el que contiene el número
            cuadros.forEach((cuadro) => {
                if (parseInt(cuadro.textContent, 10) === numero) {
                    cuadro.classList.add('marked');
                }
            });
        });
        
    }

    // Agregar un evento de escucha al botón para cambiar el turno
    nextTurnButton.addEventListener('click', function() {
        // Si el contador de turnos es mayor que 25, reiniciarlo a 1
        if(turnCounter >= 25) {
            turnCounter = 1;
            generatedNumbers = []; // Reinicia el array de números generados
        } else {
            // Incrementar el contador de turnos
            turnCounter++;
        }
        
        // Generar un número aleatorio que no se haya generado antes
        var randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 50) + 1;
        } while (generatedNumbers.includes(randomNumber) && generatedNumbers.length < 50);

        // Añadir el número generado al registro
        generatedNumbers.push(randomNumber);

        // Marcar el número en la tabla actual
        marcarNumeroEnTabla(randomNumber);
        actualizarPuntuacion();

        // Actualizar el número en el HTML
        numeroBall.textContent = randomNumber;

        // Actualizar el contador en el HTML
        counterElement.textContent = 'Turn N°: ' + turnCounter;
    });

    // Generar tablas para cada jugador y ocultarlas
    const tablasPorJugador = [];
    for (let i = 0; i < players.length; i++) {
        const tablaJugador = generarTabla(tamanoCarton, i + 1);
        tablasPorJugador.push(tablaJugador);
        tablaJugador.classList.add('hidden');
        if (i === 0) {
            tablaJugador.classList.add('tablaVisible'); // Añade la clase 'tablaVisible' a la primera tabla
        }
    }

    button.addEventListener('click', function () {
        tablasPorJugador.forEach(function (tabla, tabIndex) {
            tabla.classList.remove('tablaVisible'); // Elimina la clase 'tablaVisible' de todas las tablas
            if (index === tabIndex) {
                tabla.classList.remove('hidden');
                tabla.classList.add('tablaVisible'); // Añade la clase 'tablaVisible' a la tabla del jugador seleccionado
            } else {
                tabla.classList.add('hidden');
            }
        });
    });
});