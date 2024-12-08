let currentComic = 1;
let quizAnswered = false;

function nextComic(comicNumber) {
    const currentElement = document.getElementById('comic' + comicNumber);
    currentElement.style.display = 'none';
    
    if (comicNumber < 5) {
        const nextElement = document.getElementById('comic' + (comicNumber + 1));
        nextElement.style.display = 'block';
    } else {
        // Mostrar el quiz después de las 5 viñetas
        document.getElementById('comic-section').style.display = 'none';
        document.getElementById('quiz-section').style.display = 'block';
    }
}

function submitQuiz() {
    if (quizAnswered) return; // Evitar enviar respuestas múltiples

    const question1 = document.getElementById('question1').value.trim().toLowerCase();
    const question2 = document.getElementById('question2').value.trim().toLowerCase();
    const question3 = document.getElementById('question3').value.trim().toLowerCase();
    const question4 = document.getElementById('question4').value.trim().toLowerCase();
    const question5 = document.getElementById('question5').value.trim().toLowerCase();

    let score = 0;
    const results = [];

    if (question1 === "san nicolás" || question1 === "san nicolas") {
        score++;
        results.push("Pregunta 1: Correcta");
    } else {
        results.push("Pregunta 1: Incorrecta");
    }

    if (question2 === "24 de diciembre" || question2 === "nochebuena") {
        score++;
        results.push("Pregunta 2: Correcta");
    } else {
        results.push("Pregunta 2: Incorrecta");
    }

    if (question3 === "turquía") {
        score++;
        results.push("Pregunta 3: Correcta");
    } else {
        results.push("Pregunta 3: Incorrecta");
    }

    if (question4 === "rojo") {
        score++;
        results.push("Pregunta 4: Correcta");
    } else {
        results.push("Pregunta 4: Incorrecta");
    }

    if (question5 === "trineo") {
        score++;
        results.push("Pregunta 5: Correcta");
    } else {
        results.push("Pregunta 5: Incorrecta");
    }

    const result = document.getElementById('result');
    if (score === 5) {
        result.innerHTML = "¡Felicidades! Has respondido correctamente todas las preguntas.";
    } else if (score >= 3) {
        result.innerHTML = "¡Bien hecho! Has respondido varias preguntas correctamente.";
    } else {
        result.innerHTML = "Lo siento, intenta nuevamente.";
    }

    // Mostrar las respuestas
    result.innerHTML += "<br><br><strong>Detalles de las respuestas:</strong><br>";
    results.forEach(res => {
        result.innerHTML += res + "<br>";
    });

    quizAnswered = true; // Marcar que ya se envió el quiz
}

function showSolutions() {
    const solutions = `
        <p><strong>Soluciones:</strong></p>
        <p><strong>Pregunta 1:</strong> La figura histórica en la que se basó Papá Noel es San Nicolás.</p>
        <p><strong>Pregunta 2:</strong> Papá Noel reparte regalos el 24 de diciembre (Nochebuena).</p>
        <p><strong>Pregunta 3:</strong> Papá Noel es originario de Turquía.</p>
        <p><strong>Pregunta 4:</strong> Papá Noel usa un traje rojo.</p>
        <p><strong>Pregunta 5:</strong> Papá Noel usa un trineo para entregar los regalos.</p>
    `;
    const result = document.getElementById('result');
    result.innerHTML += solutions;

    // Ocultar el botón de "Ver soluciones" después de hacer clic
    const solutionsButton = document.querySelector('button[onclick="showSolutions()"]');
    solutionsButton.style.display = 'none';
}
