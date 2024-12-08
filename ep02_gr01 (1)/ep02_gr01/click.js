document.addEventListener("DOMContentLoaded", function () {
    const gameContent = document.getElementById("gameContent");

    document.getElementById("btnClickTheCircle").addEventListener("click", () => {
        loadClickTheCircleGame();
    });

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
});
