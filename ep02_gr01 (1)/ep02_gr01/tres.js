document.addEventListener("DOMContentLoaded", function () {
    const gameContent = document.getElementById("gameContent");
    const btnPlay = document.getElementById("btnPlayTicTacToe");
    const btnPlayerVsPlayer = document.getElementById("btnPlayerVsPlayer");
    const btnPlayerVsComputer = document.getElementById("btnPlayerVsComputer");
    const gameModeDiv = document.getElementById("gameMode");

    let currentPlayer = "X"; // El primer jugador será "X"
    let gameBoard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    let isComputerGame = false; // Determina si es un juego contra la máquina

    // Función para crear la cuadrícula de juego
    function createBoard() {
        gameContent.innerHTML = ""; // Limpiar el contenido previo
        for (let row = 0; row < 3; row++) {
            const rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            for (let col = 0; col < 3; col++) {
                const cell = document.createElement("button");
                cell.classList.add("cell");
                cell.setAttribute("data-row", row);
                cell.setAttribute("data-col", col);
                cell.addEventListener("click", handleCellClick);
                rowDiv.appendChild(cell);
            }
            gameContent.appendChild(rowDiv);
        }
    }

    // Función que maneja el clic en una celda
    function handleCellClick(event) {
        const row = event.target.getAttribute("data-row");
        const col = event.target.getAttribute("data-col");

        // Si la celda ya está ocupada, no hacer nada
        if (gameBoard[row][col] !== "") return;

        // Colocar la marca del jugador actual
        gameBoard[row][col] = currentPlayer;
        event.target.textContent = currentPlayer;

        // Verificar si hay un ganador
        if (checkWinner()) {
            setTimeout(() => {
                alert(`${currentPlayer} ha ganado!`);
                resetGame();
            }, 100);
        } else if (gameBoard.flat().every(cell => cell !== "")) {
            setTimeout(() => {
                alert("¡Empate!");
                resetGame();
            }, 100);
        } else {
            // Cambiar al siguiente jugador
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (isComputerGame && currentPlayer === "O") {
                setTimeout(computerMove, 500); // Movimiento de la máquina
            }
        }
    }

    // Función para verificar si hay un ganador
    function checkWinner() {
        // Verificar filas, columnas y diagonales
        for (let i = 0; i < 3; i++) {
            // Filas
            if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2] && gameBoard[i][0] !== "") {
                return true;
            }
            // Columnas
            if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i] && gameBoard[0][i] !== "") {
                return true;
            }
        }
        // Diagonales
        if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] && gameBoard[0][0] !== "") {
            return true;
        }
        if (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0] && gameBoard[0][2] !== "") {
            return true;
        }
        return false;
    }

    // Función para reiniciar el juego
    function resetGame() {
        gameBoard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ];
        currentPlayer = "X";
        createBoard();
    }

    // Función para hacer un movimiento de la máquina (movimiento aleatorio)
    function computerMove() {
        let emptyCells = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] === "") {
                    emptyCells.push([i, j]);
                }
            }
        }
        if (emptyCells.length > 0) {
            let [row, col] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            gameBoard[row][col] = "O";
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            cell.textContent = "O";
            if (checkWinner()) {
                setTimeout(() => {
                    alert(`La máquina (O) ha ganado!`);
                    resetGame();
                }, 100);
            } else {
                currentPlayer = "X"; // Cambio al jugador
            }
        }
    }

    // Función para elegir el modo de juego (jugador contra jugador o contra la máquina)
    btnPlayerVsPlayer.addEventListener("click", function () {
        isComputerGame = false;
        gameModeDiv.style.display = "none";
        btnPlay.style.display = "block";
    });

    btnPlayerVsComputer.addEventListener("click", function () {
        isComputerGame = true;
        gameModeDiv.style.display = "none";
        btnPlay.style.display = "block";
    });

    // Función para iniciar el juego
    btnPlay.addEventListener("click", function () {
        resetGame();
        btnPlay.style.display = "none"; // Ocultar el botón de jugar después de iniciar
    });

});
