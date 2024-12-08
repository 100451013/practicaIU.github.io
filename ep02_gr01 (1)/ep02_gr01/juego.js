document.addEventListener("DOMContentLoaded", function () {
    const gameContent = document.getElementById("gameContent");

    document.getElementById("btnClickTheCircle").addEventListener("click", () => {
        loadClickTheCircleGame();
    });

    document.getElementById("btnElfos").addEventListener("click", () => {
        loadQuizPapaNoelGame();
    });

    document.getElementById("btnBuscaminas").addEventListener("click", () => {
        loadBuscaminasGame();
    });

    document.getElementById("btnahorcado").addEventListener("click", () => {
        loadAhorcadoGame();
    });






    //Click the Circle"
    function loadClickTheCircleGame() {
        gameContent.innerHTML = `<div id="clickTheCircleGame">
            <h2>¡Click The Circle!</h2>
            <p>Haz clic en el círculo antes de que se mueva. Tienes 1 minuto y 30 segundos.</p>
            <div id="circleContainer" style="position: relative; width: 300px; height: 300px; border: 1px solid #ccc;">
                <div id="circle" style="position: absolute; width: 50px; height: 50px; border-radius: 50%; background: red;"></div>
            </div>
            <p>Puntos: <span id="score">0</span></p>
            <p>Tiempo restante: <span id="timeLeft">90</span> segundos</p>
        </div>`;
        startClickTheCircleGame();
    }

    function startClickTheCircleGame() {
        let score = 0;
        let timeLeft = 90;
        const circle = document.getElementById("circle");
        const scoreDisplay = document.getElementById("score");
        const timeDisplay = document.getElementById("timeLeft");

        const moveCircle = () => {
            const container = document.getElementById("circleContainer");
            const maxX = container.clientWidth - 50;
            const maxY = container.clientHeight - 50;
            const x = Math.random() * maxX;
            const y = Math.random() * maxY;
            circle.style.transform = `translate(${x}px, ${y}px)`;
        };

        circle.addEventListener("click", () => {
            score++;
            scoreDisplay.textContent = score;
            moveCircle();
        });

        const countdown = setInterval(() => {
            timeLeft--;
            timeDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(countdown);
                alert(`¡Tiempo agotado! Tu puntuación final es ${score}.`);
                gameContent.innerHTML = `<p>Juego terminado. Tu puntuación final es ${score}.</p>
                                        <button id="restartButton">Reiniciar Juego</button>`;
                document.getElementById("restartButton").addEventListener("click", loadClickTheCircleGame);
            }
        }, 1000);

        moveCircle();
    }


    function loadQuizPapaNoelGame() {
        const questions = [
            { question: "¿Dónde vive Papa Noel?", options: ["Laponia", "Polo Sur", "Groenlandia", "Nueva York"], answer: "Laponia" },
            { question: "¿Qué color es el traje clásico de Papa Noel?", options: ["Rojo", "Verde", "Blanco", "Negro"], answer: "Rojo" },
            { question: "¿Cómo se llaman los ayudantes de Papa Noel?", options: ["Elfos", "Gnomos", "Duendes", "Hadas"], answer: "Elfos" },
            { question: "¿Cuántos renos tiene Papa Noel?", options: ["8", "9", "10", "12"], answer: "9" },
            { question: "¿Cuál es el nombre del reno líder de Papa Noel?", options: ["Rodolfo", "Blitzen", "Dasher", "Comet"], answer: "Rodolfo" },
            { question: "¿Qué día se celebra la Navidad?", options: ["24 de diciembre", "25 de diciembre", "31 de diciembre", "1 de enero"], answer: "25 de diciembre" },
            { question: "¿Qué bebida suele dejarse junto a la chimenea para Papa Noel?", options: ["Leche", "Cerveza", "Vino", "Agua"], answer: "Leche" },
            { question: "¿Cómo se llaman los elfos que fabrican los juguetes?", options: ["Duendecillos", "Trolls", "Gnomos", "Trabajadores"], answer: "Duendecillos" },
            { question: "¿Cuál es el nombre de la esposa de Papa Noel?", options: ["Mamá Noel", "Santa Maria", "Mrs. Claus", "Madame Noel"], answer: "Mrs. Claus" },
            { question: "¿De qué material está hecha la barba de Papa Noel en la tradición popular?", options: ["Algodón", "Nieve", "Lana", "Cotonete"], answer: "Algodón" }
        ];
    
        let currentQuestionIndex = 0;
        let score = 0;
    
        const loadQuestion = () => {
            if (currentQuestionIndex >= questions.length) {
                gameContent.innerHTML = `<h2>¡Quiz terminado!</h2>
                                         <p>Acertaste ${score}/${questions.length} preguntas.</p>
                                         <button id="restartQuiz">Reiniciar Quiz</button>`;
                document.getElementById("restartQuiz").addEventListener("click", loadQuizPapaNoelGame);
                return;
            }
    
            const questionData = questions[currentQuestionIndex];
            gameContent.innerHTML = `<h2 class="quiz-question">${questionData.question}</h2>
                                     ${questionData.options.map((option, index) => `<button class="quiz-option">${option}</button>`).join("")}`;
            
            document.querySelectorAll(".quiz-option").forEach((btn) => {
                btn.addEventListener("click", () => {
                    if (btn.textContent === questionData.answer) score++;
                    currentQuestionIndex++;
                    loadQuestion();
                });
            });
        };
    
        loadQuestion();
    }
    



// Buscaminas
    function loadBuscaminasGame() {
        const levels = {
            easy: { size: 5, bombs: 5 },
            medium: { size: 7, bombs: 10 },
            hard: { size: 8, bombs: 15 },
        };
    
        const level = prompt("Selecciona nivel: fácil, medio, difícil").toLowerCase();
        const { size, bombs } = levels[level] || levels.easy;
    
        const grid = Array.from({ length: size }, () => Array(size).fill(0));
        const bombPositions = [];
    
        while (bombPositions.length < bombs) {
            const x = Math.floor(Math.random() * size);
            const y = Math.floor(Math.random() * size);
            if (!bombPositions.some(([bx, by]) => bx === x && by === y)) {
                bombPositions.push([x, y]);
                grid[x][y] = "B";
            }
        }
    
        bombPositions.forEach(([x, y]) => {
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    const nx = x + dx, ny = y + dy;
                    if (grid[nx]?.[ny] !== undefined && grid[nx][ny] !== "B") grid[nx][ny]++;
                }
            }
        });
    
        gameContent.innerHTML = `<h2>Buscaminas (${level.toUpperCase()})</h2>`;
        const table = document.createElement("table");
        table.style.borderCollapse = "collapse";
    
        let firstClick = true;  // Variable para detectar el primer click
        let revealedCount = 0;  // Contador de casillas reveladas
    
        const revealAdjacent = (x, y) => {
            const adjacent = [];
            const directions = [
                [-1, 0], [1, 0], [0, -1], [0, 1],  // adyacentes en las 4 direcciones principales
                [-1, -1], [-1, 1], [1, -1], [1, 1]  // adyacentes diagonales
            ];
            
            // Filtrar las posiciones válidas dentro de los límites del tablero
            directions.forEach(([dx, dy]) => {
                const nx = x + dx, ny = y + dy;
                if (grid[nx]?.[ny] !== undefined && grid[nx][ny] !== "B" && !adjacent.some(([ax, ay]) => ax === nx && ay === ny)) {
                    adjacent.push([nx, ny]);
                }
            });
    
            return adjacent;
        };
    
        const checkWin = () => {
            // Comprobar si todas las casillas que no son bomba están reveladas
            const totalNonBombs = size * size - bombs;
            if (revealedCount === totalNonBombs) {
                setTimeout(() => {
                    alert("¡Felicidades, has ganado!");
                    loadBuscaminasGame();  // Reiniciar el juego
                }, 100);
            }
        };
    
        grid.forEach((row, x) => {
            const tr = document.createElement("tr");
            row.forEach((cell, y) => {
                const td = document.createElement("td");
                td.style.border = "1px solid #ccc";
                td.style.width = td.style.height = "40px";
                td.style.textAlign = "center";
                td.style.cursor = "pointer";
                td.dataset.x = x;
                td.dataset.y = y;
    
                td.addEventListener("click", function reveal(e) {
                    if (e.button === 0) { // Click izquierdo
                        td.style.background = "white";
                        if (grid[x][y] === "B") {
                            td.textContent = "B"; // Mostrar bomba
                            td.style.background = "red"; // Color rojo si es bomba
                            alert("¡Pisaste una bomba! Fin del juego.");
                            loadBuscaminasGame();  // Reiniciar el juego
                        } else {
                            td.textContent = grid[x][y] || "";
                            td.style.background = "#ddd"; // Cambiar color si no es bomba
                            revealedCount++;
    
                            // Si es el primer click, abrir entre 5 a 8 casillas adyacentes
                            if (firstClick) {
                                firstClick = false;
                                const adjacentCells = revealAdjacent(x, y);
                                const randomAdjacents = adjacentCells.slice(0, 5 + Math.floor(Math.random() * 4)); // entre 5 y 8 adyacentes
    
                                randomAdjacents.forEach(([adjX, adjY]) => {
                                    const adjacentTd = document.querySelector(`td[data-x="${adjX}"][data-y="${adjY}"]`);
                                    if (adjacentTd) {
                                        adjacentTd.textContent = grid[adjX][adjY] || "";
                                        adjacentTd.style.background = "#ddd";
                                        adjacentTd.removeEventListener("click", reveal);  // Evitar que se vuelva a hacer clic
                                        revealedCount++;
                                    }
                                });
                            }
    
                            // Comprobar si ha ganado
                            checkWin();
                        }
                    }
                });
    
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
    
        gameContent.appendChild(table);
    }
    
    
});



// Función para redirigir al inicio
function goToHome() {
    window.location.href = "../practica1.html#page5"; 
}














