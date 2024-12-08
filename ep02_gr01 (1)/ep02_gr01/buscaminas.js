document.addEventListener("DOMContentLoaded", function () {
    const gameContent = document.getElementById("gameContent");

    // Mostrar botones de dificultad
    document.getElementById("btnEasy").addEventListener("click", () => loadBuscaminasGame("easy"));
    document.getElementById("btnMedium").addEventListener("click", () => loadBuscaminasGame("medium"));
    document.getElementById("btnHard").addEventListener("click", () => loadBuscaminasGame("hard"));

    function loadBuscaminasGame(level) {
        const levels = {
            easy: { size: 5, bombs: 5 },
            medium: { size: 7, bombs: 10 },
            hard: { size: 8, bombs: 15 },
        };

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
                    loadBuscaminasGame(level);  // Reiniciar el juego con el mismo nivel
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
                        td.style.backgroundColor = "orange"; // Color naranja al hacer clic izquierdo

                        if (grid[x][y] === "B") {
                            td.textContent = "B"; // Mostrar bomba
                            td.style.backgroundColor = "red"; // Color rojo si es bomba
                            alert("¡Pisaste una bomba! Fin del juego.");
                            loadBuscaminasGame(level);  // Reiniciar el juego
                        } else {
                            td.textContent = grid[x][y] || "";
                            td.style.backgroundColor = "#ddd"; // Cambiar color si no es bomba
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
                                        adjacentTd.style.backgroundColor = "#ddd";
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
