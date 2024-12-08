document.addEventListener("DOMContentLoaded", function () {
    const gameContent = document.getElementById("gameContent");

    document.getElementById("btnahorcado").addEventListener("click", loadAhorcadoGame);

    // Función para cargar el juego Ahorcado
    function loadAhorcadoGame() {
        const words = [
            "NAVIDAD", "REYES", "SANTA", "ÁRBOL", "NEVADO", "REGALOS", "MELCHOR", "CAMPANAS", 
            "PINO", "LUCES", "FESTA", "PAPA", "NIEVE", "VILLANCICOS", "ESTRELLA", "BELÉN", 
            "RENOS", "NOCHEBUENA", "CENA", "FELICIDAD", "FAMILIA", "AÑO", "FELIZ", "SORPRESA", 
            "ALEGRÍA", "CACHORRO", "MANTO", "HOJAS", "SUEÑO", "CAMPANAS", "CÓMODA", "INVIERNO"
        ];

        const word = words[Math.floor(Math.random() * words.length)];
        let hiddenWord = word.split('').map(() => '_').join(' ');
        let attemptsLeft = 6;
        let guessedLetters = [];

        gameContent.innerHTML = `
            <h2>Ahorcado</h2>
            <p>Palabra: <span id="word">${hiddenWord}</span></p>
            <p>Intentos restantes: <span id="attempts">${attemptsLeft}</span></p>
            <p>Letras adivinadas: <span id="guessedLetters">-</span></p>
            <input type="text" id="letterInput" maxlength="1" placeholder="Ingresa una letra" />
            <button id="guessButton">Adivinar</button>
            <p id="message"></p>
        `;

        document.getElementById("guessButton").addEventListener("click", () => {
            const letter = document.getElementById("letterInput").value.toUpperCase();
            if (!letter || guessedLetters.includes(letter)) {
                document.getElementById("message").textContent = "Letra ya adivinada o no válida.";
                return;
            }

            guessedLetters.push(letter);
            if (word.includes(letter)) {
                hiddenWord = word.split('').map((char, index) => {
                    return guessedLetters.includes(char) ? char : '_';
                }).join(' ');
                document.getElementById("word").textContent = hiddenWord;
            } else {
                attemptsLeft--;
                document.getElementById("attempts").textContent = attemptsLeft;
            }

            document.getElementById("guessedLetters").textContent = guessedLetters.join(', ');

            if (attemptsLeft <= 0) {
                document.getElementById("message").textContent = `¡Perdiste! La palabra era: ${word}`;
                document.getElementById("guessButton").disabled = true;
            } else if (!hiddenWord.includes('_')) {
                document.getElementById("message").textContent = "¡Ganaste! Has adivinado la palabra.";
                document.getElementById("guessButton").disabled = true;
            }

            document.getElementById("letterInput").value = '';
        });
    }

    // Redirigir a inicio
    function goToHome() {
        window.location.href = "practica1.html#home"; // Redirige a la sección con id="page5" en practica1.html
    }
});