document.addEventListener('DOMContentLoaded', (event) => {
    let tamanoCarton = '';
    var turnCounter = 0;
    const startGameButton = document.getElementById('start');
    var container = document.getElementsByClassName('container');
    var BingoBall = document.getElementsByClassName('BingoBall');
    var counterElement = document.getElementById('turnCounter');
    var nextTurnButton = document.getElementById('nextTurn');
    var generatedNumbers = [];
    const playerScores = [0, 0, 0, 0];
    let winner = {
        name: '',
        victories: 0
    };
    let gameEnded = false;

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
            // Mostrar la sección de puntuaciones
            const puntuacionesContainer = document.getElementById('puntuaciones');
            puntuacionesContainer.classList.remove('hidden');

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
    
        // Asignar nombres de jugadores a las puntuaciones
        for (let i = 0; i < players.length; i++) {
            const puntuacionElement = document.getElementById(`puntuacion-${i + 1}`);
            puntuacionElement.textContent = `${players[i]}: 0`;
        }
    
        // ... (tu código existente)
    
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
    

    // Función para marcar un número en la tabla actual
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

            // Verifica la completitud de líneas y actualiza la puntuación
            checkLineCompletion(tabla);
        });
    }

    // Agregar un evento de escucha al botón para cambiar el turno
    nextTurnButton.addEventListener('click', function() {
        // Si el contador de turnos es mayor que 25, reiniciarlo a 1
        if(turnCounter === 25) {
            generatedNumbers = [];
            finalizarPartida();
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
    
        // Función para verificar si una línea ha sido completada en una tabla
    function checkLineCompletion(tabla) {
        const cuadros = tabla.querySelectorAll('td');
        const tamano = Math.sqrt(cuadros.length);

        // Verificar filas y columnas
        for (let i = 0; i < tamano; i++) {
            let filaCompleta = true;
            let columnaCompleta = true;

            for (let j = 0; j < tamano; j++) {
                if (!cuadros[i * tamano + j].classList.contains('marked')) {
                    filaCompleta = false;
                }
                if (!cuadros[j * tamano + i].classList.contains('marked')) {
                    columnaCompleta = false;
                }
            }

            // Sumar puntos si se completa una fila o columna
            if (filaCompleta) {
                playerScores[parseInt(tabla.id.split('-')[1]) - 1] += 1;
            }
            if (columnaCompleta) {
                playerScores[parseInt(tabla.id.split('-')[1]) - 1] += 1;
            }
        }

        // Verificar diagonal principal
        let diagonalPrincipalCompleta = true;
        for (let i = 0; i < tamano; i++) {
            if (!cuadros[i * tamano + i].classList.contains('marked')) {
                diagonalPrincipalCompleta = false;
                break;
            }
        }
        if (diagonalPrincipalCompleta) {
            playerScores[parseInt(tabla.id.split('-')[1]) - 1] += 3;
        }

        // Verificar diagonal secundaria
        let diagonalSecundariaCompleta = true;
        for (let i = 0; i < tamano; i++) {
            if (!cuadros[i * tamano + (tamano - 1 - i)].classList.contains('marked')) {
                diagonalSecundariaCompleta = false;
                break;
            }
        }
        if (diagonalSecundariaCompleta) {
            playerScores[parseInt(tabla.id.split('-')[1]) - 1] += 3;
        }

        // Verificar tabla completa
        let tablaCompleta = true;
        for (let i = 0; i < cuadros.length; i++) {
            if (!cuadros[i].classList.contains('marked')) {
                tablaCompleta = false;
                break;
            }
        }
        if (tablaCompleta) {
            playerScores[parseInt(tabla.id.split('-')[1]) - 1] += 5;
        }
    }

    // Función para actualizar la puntuación de los jugadores
    function actualizarPuntuacion() {
        // Actualizar la puntuación en el HTML
        for (let i = 0; i < players.length; i++) {
            const puntuacionElement = document.getElementById(`puntuacion-${i + 1}`);
            puntuacionElement.textContent = `${players[i]}: ${playerScores[i]}`;
        }
    }
    // Función para verificar si una línea ha sido completada en una tabla
    function checkLineCompletion(tabla) {
        const cuadros = tabla.querySelectorAll('td');
        const tamano = Math.sqrt(cuadros.length);

        // Verificar filas y columnas
        let filaCompleta, columnaCompleta;
        for (let i = 0; i < tamano; i++) {
            filaCompleta = true;
            columnaCompleta = true;

            for (let j = 0; j < tamano; j++) {
                if (!cuadros[i * tamano + j].classList.contains('marked')) {
                    filaCompleta = false;
                }
                if (!cuadros[j * tamano + i].classList.contains('marked')) {
                    columnaCompleta = false;
                }
            }

            // Sumar puntos solo si la fila o columna se completa por primera vez
            if (filaCompleta && !tabla.dataset.filaCompleta) {
                tabla.dataset.filaCompleta = true;
                playerScores[parseInt(tabla.id.split('-')[1]) - 1] += 1;
            }
            if (columnaCompleta && !tabla.dataset.columnaCompleta) {
                tabla.dataset.columnaCompleta = true;
                playerScores[parseInt(tabla.id.split('-')[1]) - 1] += 1;
            }
        }

        // Verificar diagonal principal
        let diagonalPrincipalCompleta = true;
        for (let i = 0; i < tamano; i++) {
            if (!cuadros[i * tamano + i].classList.contains('marked')) {
                diagonalPrincipalCompleta = false;
                break;
            }
        }
        if (diagonalPrincipalCompleta && !tabla.dataset.diagonalPrincipalCompleta) {
            tabla.dataset.diagonalPrincipalCompleta = true;
            playerScores[parseInt(tabla.id.split('-')[1]) - 1] += 3;
        }

        // Verificar diagonal secundaria
        let diagonalSecundariaCompleta = true;
        for (let i = 0; i < tamano; i++) {
            if (!cuadros[i * tamano + (tamano - 1 - i)].classList.contains('marked')) {
                diagonalSecundariaCompleta = false;
                break;
            }
        }
        if (diagonalSecundariaCompleta && !tabla.dataset.diagonalSecundariaCompleta) {
            tabla.dataset.diagonalSecundariaCompleta = true;
            playerScores[parseInt(tabla.id.split('-')[1]) - 1] += 3;
        }

        // Verificar tabla completa
        let tablaCompleta = true;
        for (let i = 0; i < cuadros.length; i++) {
            if (!cuadros[i].classList.contains('marked')) {
                tablaCompleta = false;
                break;
            }
        }
        if (tablaCompleta && !tabla.dataset.tablaCompleta) {
            tabla.dataset.tablaCompleta = true;
            playerScores[parseInt(tabla.id.split('-')[1]) - 1] += 5;
        }
    }


    function actualizarPuntuacion() {
        // Actualizar la puntuación en el HTML
        for (let i = 0; i < players.length; i++) {
            const puntuacionElement = document.getElementById(`puntuacion-${i + 1}`);
            puntuacionElement.textContent = `${players[i]}: ${playerScores[i]}`;
        }
    }
    
    // Evento para escuchar los clics en el botón de tamaño 3
    size3Button.addEventListener('click', function() {
        resetGame();
        tamanoCarton = 3;
        habilitarStartGame();
    });

    // Evento para escuchar los clics en el botón de tamaño 4
    size4Button.addEventListener('click', function() {
        resetGame();
        tamanoCarton = 4;
        habilitarStartGame();
    });

    // Evento para escuchar los clics en el botón de tamaño 5
    size5Button.addEventListener('click', function() {
        resetGame();
        tamanoCarton = 5;
        habilitarStartGame();
    });

    var botonReinicioCreado = false;

    function finalizarPartida() {
        nextTurnButton.disabled = true;
        // Verificar si la partida ya ha finalizado
        if (gameEnded) {
            return;
        }
        // Eliminar contenedor de ganadores existente, si lo hay
        const ganadoresContainerExistente = document.getElementById('ganadoresContainer');
        if (ganadoresContainerExistente) {
            ganadoresContainerExistente.remove();
        }
        // Muestra los ganadores en pantalla
        const ganadoresContainer = document.createElement('div');
        ganadoresContainer.id = 'ganadoresContainer';
        ganadoresContainer.innerHTML = `<h2>Ganadores:</h2><p>${winner.name} - ${winner.victories} victorias</p>`;
        document.body.appendChild(ganadoresContainer);

        // Muestra el botón de reinicio solo si no se ha creado antes
        let reinicioButton = document.getElementById('reinicioButton');
        
        reinicioButton = document.createElement('button');
        reinicioButton.id = 'reinicioButton';
        reinicioButton.textContent = 'Reiniciar Partida';
        reinicioButton.addEventListener('click', resetGame);
        document.body.appendChild(reinicioButton);
        

        // Actualiza la bandera de finalización del juego
        gameEnded = true;
    }

    // // Obtén el botón de reinicio o crea uno nuevo si no existe
    // let reinicioButton = document.getElementById('reinicioButton');
    // if (!reinicioButton) {
    //     reinicioButton = document.createElement('button');
    //     reinicioButton.id = 'reinicioButton';
    //     // Aquí puedes agregar cualquier otro código necesario para configurar el botón
    //     document.body.appendChild(reinicioButton);
    // }
    // Intenta obtener el botón de reinicio existente
    //let restartButton = document.getElementById('restartButton');

    // Si el botón de reinicio no existe, lo crea

    

    // Agrega el evento de click al botón de reinicio
    //restartButton.addEventListener('click', resetGame);

    // // Actualizar localStorage con las victorias al finalizar el juego
    // window.addEventListener('beforeunload', function () {
    //     localStorage.setItem('victories', JSON.stringify(winner));
    // });


    // Función para reiniciar el juego
    function resetGame() {
        //botonReinicioCreado = false;

        // Intenta obtener el botón de reinicio existente
        let restartButton = document.getElementById('reinicioButton');

        // Si el botón de reinicio existe, agrega el evento de click
        if (restartButton) {
            restartButton.addEventListener('click', resetGame);
        }
        

        // Añadir el nuevo botón al documento
        document.body.appendChild(restartButton);
        // Ocultar solo el menú de jugadores
        const menuJugadores = document.querySelector('.container');
        menuJugadores.classList.add('hidden');

        // Ocultar las estadísticas
        const estadisticas = document.getElementById('puntuaciones');
        estadisticas.classList.add('hidden');

        // Ocultar los botones del menú de jugadores
        for (let i = 1; i <= 4; i++) {
            const playerButton = document.getElementById(`playerButton${i}`);
            if (playerButton) {
                playerButton.classList.add('hidden');
            }
        }

        // Elimina la tabla de bingo vieja de cada jugador
        const tablasAntiguas = document.querySelectorAll('table');
        tablasAntiguas.forEach(tabla => tabla.remove());

        // Oculta la puntuación pasada y la reinicia
        playerScores.fill(0);
        actualizarPuntuacion();

        // Oculta el medidor de turnos y numeroBall
        counterElement.classList.add('hidden');
        nextTurnButton.classList.add('hidden');
        for (var i = 0; i < BingoBall.length; i++) {
            BingoBall[i].classList.add('hidden');
        }

        // Retorna a CD como está al iniciar la página
        numeroBall.textContent = 'CD';

        // Elimina el contenedor de ganadores y el botón de reinicio
        const ganadoresContainer = document.getElementById('ganadoresContainer');
        if (ganadoresContainer) {
            ganadoresContainer.remove();
        }

        // Obtén el botón de reinicio o crea uno nuevo si no existe
        let reinicioButton = document.getElementById('reinicioButton');
        if (!reinicioButton) {
            reinicioButton = document.createElement('button');
            reinicioButton.id = 'reinicioButton';
            // Aquí puedes agregar cualquier otro código necesario para configurar el botón
            document.body.appendChild(reinicioButton);
        }

        // Ahora puedes estar seguro de que reinicioButton no es null
        reinicioButton.classList.add('hidden');

        // Reinicia la bandera de finalización del juego
        gameEnded = false;

        // Muestra el menú principal y habilita el botón de inicio de juego
        menuJugadores.classList.remove('hidden');
        startGameButton.disabled = false;

        // Habilita el botón Next Turn al reiniciar la partida
        nextTurnButton.disabled = false;
    }
})

