document.addEventListener('DOMContentLoaded', (event) => {
    // Variable para almacenar el tamaño del cartón
    let tamanoCarton = '';

    // Variable para almacenar el botón "Start Game"
    const startGameButton = document.getElementById('start');

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
            // Muestra un mensaje emergente
            alert('Please complete all fields to start the game.');
            
            // Deshabilita el botón "Start Game"
            startGameButton.disabled = true;
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
});