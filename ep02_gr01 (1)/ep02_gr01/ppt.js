document.addEventListener("DOMContentLoaded", function () {
    const gameResult = document.getElementById("gameResult");
    const playerScoreElement = document.getElementById("playerScore");
    const computerScoreElement = document.getElementById("computerScore");
    const restartButton = document.getElementById("restartButton");
    const choiceButtons = document.querySelectorAll("#choices button");

    let playerScore = 0;
    let computerScore = 0;

    // Función para jugar el juego
    function playGame(playerChoice) {
        // Deshabilitar los botones de jugada si ya hay un ganador
        if (playerScore === 3 || computerScore === 3) return;

        const choices = ["Piedra", "Papel", "Tijera"];
        const computerChoice = choices[Math.floor(Math.random() * 3)];

        let result = "";

        // Verifica el resultado de la ronda
        if (playerChoice === computerChoice) {
            result = `Empate! Ambos eligieron ${playerChoice}.`;
        } else if (
            (playerChoice === "Piedra" && computerChoice === "Tijera") ||
            (playerChoice === "Papel" && computerChoice === "Piedra") ||
            (playerChoice === "Tijera" && computerChoice === "Papel")
        ) {
            playerScore++;
            result = `¡Ganaste! ${playerChoice} vence a ${computerChoice}.`;
        } else {
            computerScore++;
            result = `Perdiste. ${computerChoice} vence a ${playerChoice}.`;
        }

        // Actualiza el marcador
        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;

        // Muestra el resultado de la ronda
        gameResult.innerHTML = `
            <p>Tu elección: ${playerChoice}</p>
            <p>Elección de la computadora: ${computerChoice}</p>
            <p>${result}</p>
        `;

        // Verifica si alguien ha ganado 3 rondas
        if (playerScore === 3) {
            gameResult.innerHTML = "<h2>¡Felicidades! Has ganado el juego.</h2>";
            disableGame(); // Deshabilitar el juego
        } else if (computerScore === 3) {
            gameResult.innerHTML = "<h2>¡La computadora ha ganado el juego!</h2>";
            disableGame(); // Deshabilitar el juego
        }
    }

    // Añadir eventos a los botones de jugada
    document.getElementById("btnPiedra").addEventListener("click", function () {
        playGame("Piedra");
    });

    document.getElementById("btnPapel").addEventListener("click", function () {
        playGame("Papel");
    });

    document.getElementById("btnTijera").addEventListener("click", function () {
        playGame("Tijera");
    });

    // Función para deshabilitar los botones de selección
    function disableGame() {
        choiceButtons.forEach(button => {
            button.disabled = true; // Deshabilita los botones de jugada
        });
        restartButton.style.display = "block"; // Muestra el botón de reinicio
    }

    // Función para reiniciar el juego
    function restartGame() {
        playerScore = 0;
        computerScore = 0;
        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;
        gameResult.innerHTML = "";
        restartButton.style.display = "none"; // Oculta el botón de reinicio

        choiceButtons.forEach(button => {
            button.disabled = false; // Habilita los botones de jugada
        });
    }

    // Asociar la función de reinicio al botón de reinicio
    restartButton.addEventListener("click", restartGame);
});
