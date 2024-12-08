document.addEventListener("DOMContentLoaded", function () {
    const gameContent = document.getElementById("gameContent");

    document.getElementById("btnQuiz").addEventListener("click", () => {
        loadQuizPapaNoelGame();
    });

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
});
