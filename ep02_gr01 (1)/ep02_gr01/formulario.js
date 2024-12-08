
// Lógica para enviar el formulario de la carta
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    // Verificar si hay un usuario logueado en localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("Debes iniciar sesión para enviar tu carta.");
        return; // Detener ejecución si no hay usuario logueado
    }

    // Obtener los datos del usuario logueado desde localStorage
    const storedUser = JSON.parse(localStorage.getItem(loggedInUser));

    // Validación de que el usuario tenga estructura de datos correcta
    if (!storedUser || !storedUser.letters) {
        alert("Error de sesión. Por favor, inicia sesión nuevamente.");
        return; // Detener si el usuario no tiene estructura correcta
    }

    // Capturar los valores de la carta
    const nombre = document.getElementById("nombre").value;
    const ciudad = document.getElementById("ciudad").value;
    const pais = document.getElementById("pais").value;
    const texto = document.getElementById("texto").value;

    // Añadir la carta a la lista de cartas del usuario actual
    const newLetter = `${nombre} de ${ciudad}, ${pais}: ${texto}`;
    storedUser.letters.push(newLetter);

    // Actualizar la información del usuario en localStorage
    localStorage.setItem(loggedInUser, JSON.stringify(storedUser));

    alert("Carta enviada exitosamente.");

    // Limpiar el formulario
    this.reset();
});


