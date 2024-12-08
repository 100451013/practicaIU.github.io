document.getElementById("registerButton").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("registerPopup").style.display = "block";
});

document.getElementById("loginButton").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("loginPopup").style.display = "block";
});

document.getElementById("loginCancel").addEventListener("click", function() {
    document.getElementById("loginPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
});

document.getElementById("registerCancel").addEventListener("click", function() {
    document.getElementById("registerPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
});

// Función para iniciar sesión
document.getElementById("loginSubmit").addEventListener("click", function() {
const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const storedUser = JSON.parse(localStorage.getItem(username));

if (storedUser && storedUser.password === password) {
alert("Inicio de sesión exitoso");

// Guardar el usuario logueado en el localStorage
localStorage.setItem('loggedInUser', username);

// Ocultar el popup de login
document.getElementById("loginPopup").style.display = "none";
document.getElementById("overlay").style.display = "none";

// Cambiar el botón de inicio de sesión por el ícono de perfil
cambiarBotonPerfil(username);
} else {
document.getElementById("loginError").textContent = "Nombre de usuario o contraseña incorrectos.";
}
});

// Función para cambiar el botón de inicio de sesión al botón de perfil
function cambiarBotonPerfil(username) {
document.querySelector(".buttons").innerHTML = `
<div class="profile-menu">
    <button id="profileButton">👤</button>
    <div class="profile-dropdown" id="profileDropdown" style="display: none;">
        <button id="myProfileButton">Mi perfil</button>
        <button id="myLettersButton">Mis cartas</button>
        <button id="logoutButton">Cerrar sesión</button>
    </div>
</div>`;

// Agregar eventos para el botón de perfil
document.getElementById("profileButton").addEventListener("click", function() {
const dropdown = document.getElementById("profileDropdown");
dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
});

// Manejar el clic para ver el perfil del usuario
document.getElementById("myProfileButton").addEventListener("click", function() {
mostrarPerfil(username);
});

// Manejar el clic para ver las cartas del usuario
document.getElementById("myLettersButton").addEventListener("click", function() {
mostrarCartas(username);
});

// Manejar el clic para cerrar sesión
document.getElementById("logoutButton").addEventListener("click", function() {
cerrarSesion();
});
}

// Función para cerrar sesión
function cerrarSesion() {
if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
// Eliminar el usuario logueado de localStorage
localStorage.removeItem('loggedInUser');

// Regresar a la vista inicial (botón de inicio de sesión y registro)
document.querySelector(".buttons").innerHTML = `
    <button id="loginButton">Iniciar Sesión</button>
    <button id="registerButton">Registrarse</button>`;

alert("Has cerrado sesión.");

// Volver a agregar los event listeners para los botones
document.getElementById("loginButton").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("loginPopup").style.display = "block";
});

document.getElementById("registerButton").addEventListener("click", function() {
    document.getElementById("overlay").style.display = "flex";
    document.getElementById("registerPopup").style.display = "block";
});
}
}


// Función para mostrar el perfil del usuario
function mostrarPerfil(username) {
const storedUser = JSON.parse(localStorage.getItem(username));

if (storedUser) {
const profileInfo = `
    <p>Nombre de usuario: ${storedUser.username}</p>
    <p>Correo electrónico: ${storedUser.email}</p>
    <p>Ciudad: ${storedUser.city}</p>
    <p>País: ${storedUser.country}</p>
    <p>Hijos: ${storedUser.children.length > 0 ? storedUser.children.map(child => child.name).join(', ') : 'No tiene hijos.'}</p>
`;
document.getElementById("profileInfo").innerHTML = profileInfo;
document.getElementById("profilePopup").style.display = "block";
document.getElementById("overlay").style.display = "flex";
document.getElementById("profileDropdown").style.display = "none";
}
}

// Función para mostrar las cartas del usuario
function mostrarCartas(username) {
const storedUser = JSON.parse(localStorage.getItem(username));

if (storedUser) {
const letters = storedUser.letters || [];
const lettersContainer = document.getElementById("lettersContainer");
lettersContainer.innerHTML = ""; // Limpiar el contenedor de cartas
if (letters.length === 0) {
    lettersContainer.innerHTML = "<p>No se ha enviado ninguna carta.</p>";
} else {
    letters.forEach((letter, index) => {
        lettersContainer.insertAdjacentHTML("beforeend", `
            <div class="letter">
                <p>${letter}</p>
                <button class="deleteLetterButton" data-index="${index}">Eliminar</button>
            </div>
        `);
    });

    // Agregar eventos de eliminación de cartas
    document.querySelectorAll(".deleteLetterButton").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            if (confirm("¿Estás seguro de que deseas eliminar esta carta?")) {
                letters.splice(index, 1);
                storedUser.letters = letters;
                localStorage.setItem(username, JSON.stringify(storedUser));
                alert("Carta eliminada.");
                this.parentElement.remove();
            }
        });
    });
}
document.getElementById("lettersPopup").style.display = "block";
document.getElementById("overlay").style.display = "flex";
document.getElementById("profileDropdown").style.display = "none";
}
}


// Función para el registro
document.getElementById("registerSubmit").addEventListener("click", function() {
const regUsername = document.getElementById("regUsername").value;
const regPassword = document.getElementById("regPassword").value;
const regConfirmPassword = document.getElementById("regConfirmPassword").value;
const regEmail = document.getElementById("regEmail").value;
const regCity = document.getElementById("regCity").value;
const regCountry = document.getElementById("regCountry").value;
const regChildren = parseInt(document.getElementById("regChildren").value);
const errorMessage = document.getElementById("registerError");
errorMessage.textContent = ""; // Limpiar mensajes de error anteriores

// Validaciones
if (regUsername.length < 3) {
errorMessage.textContent += "El nombre de usuario debe tener al menos 3 caracteres.\n";
}
if (regPassword.length !== 12 || !/[0-9].*[0-9]/.test(regPassword) || !/[A-Z]/.test(regPassword) || !/[a-z]/.test(regPassword) || !/[^A-Za-z0-9]/.test(regPassword)) {
errorMessage.textContent += "La contraseña debe tener 12 caracteres, al menos 2 números, 1 carácter especial, 1 letra mayúscula y 1 letra minúscula.\n";
}
if (regPassword !== regConfirmPassword) {
errorMessage.textContent += "Las contraseñas no coinciden.\n";
}
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!emailPattern.test(regEmail)) {
errorMessage.textContent += "El correo electrónico debe seguir el formato nombre@dominio.ext.\n";
}
if (regCity.length < 3) {
errorMessage.textContent += "La ciudad debe tener al menos 3 caracteres.\n";
}
if (regCountry.length < 3) {
errorMessage.textContent += "El país debe tener al menos 3 caracteres.\n";
}
if (regChildren < 0) {
errorMessage.textContent += "El número de hijos/hijas no puede ser negativo.\n";
}

// Validación de hijos
const childrenArray = [];
for (let i = 0; i < regChildren; i++) {
const childName = document.getElementById(`childName${i}`).value;
const childAge = document.getElementById(`childAge${i}`).value;
const childToys = document.getElementById(`childToys${i}`).value;

if (childName.length < 3) {
    errorMessage.textContent += `El nombre del hijo/a ${i + 1} debe tener al menos 3 caracteres.\n`;
}
if (isNaN(childAge) || childAge < 0) {
    errorMessage.textContent += `La edad del hijo/a ${i + 1} debe ser un número válido.\n`;
}

if (childName && childAge) {
    childrenArray.push({ name: childName, age: childAge, toys: childToys });
}
}

// Si hay errores, evita el envío
if (errorMessage.textContent) {
errorMessage.style.display = "block";
return; // Detener el envío del formulario
}

// Comprobar si el usuario ya está registrado
if (localStorage.getItem(regUsername)) {
errorMessage.textContent = "El nombre de usuario ya está en uso.";
return;
}

const userData = {
username: regUsername,
password: regPassword,
email: regEmail,
city: regCity,
country: regCountry,
children: childrenArray,
letters: [] // Inicialmente no tiene cartas
};

localStorage.setItem(regUsername, JSON.stringify(userData));
alert("Registro exitoso.");
document.getElementById("registerPopup").style.display = "none";
document.getElementById("overlay").style.display = "none";
});

// Agregar campos de hijos
let currentChildren = 0;
document.getElementById("regChildren").addEventListener("input", function() {
const numberOfChildren = parseInt(this.value);
const childrenContainer = document.getElementById("childrenContainer");
childrenContainer.innerHTML = ""; // Limpiar contenedor de hijos
for (let i = 0; i < numberOfChildren; i++) {
childrenContainer.insertAdjacentHTML("beforeend", `
    <div>
        <label for="childName${i}">Nombre del hijo/hija:</label>
        <input type="text" id="childName${i}" required>
        <label for="childAge${i}">Edad:</label>
        <input type="number" id="childAge${i}" required>
        <label for="childToys${i}">Juguetes favoritos:</label>
        <input type="text" id="childToys${i}">
    </div>
`);
}
document.getElementById("addChildButton").style.display = numberOfChildren > 0 ? "block" : "none";
});


// Agregar evento para cerrar el overlay al hacer clic fuera del popup
document.getElementById("overlay").addEventListener("click", function(event) {
if (event.target === this) { // Verifica si se hizo clic en el overlay
document.getElementById("loginPopup").style.display = "none";
document.getElementById("registerPopup").style.display = "none";
document.getElementById("profilePopup").style.display = "none";
document.getElementById("lettersPopup").style.display = "none";
this.style.display = "none"; // Cierra el overlay
}
});

/// Manejar cerrar el popup de Mi Perfil
document.getElementById("profileClose").addEventListener("click", function() {
document.getElementById("profilePopup").style.display = "none";
document.getElementById("overlay").style.display = "none"; // Cierra el overlay
});

document.getElementById("profileEdit").addEventListener("click", function() {
const storedUser = JSON.parse(localStorage.getItem(localStorage.getItem("loggedInUser"))); // Obtener el usuario actual
const profileInfoDiv = document.getElementById("profileInfo");

// Cambiar el contenido del popup para mostrar campos de entrada
profileInfoDiv.innerHTML = `
<label for="editUsername">Nombre de usuario:</label>
<input type="text" id="editUsername" value="${storedUser.username}" required>
<label for="editEmail">Correo electrónico:</label>
<input type="email" id="editEmail" value="${storedUser.email}" required>
<label for="editCity">Ciudad:</label>
<input type="text" id="editCity" value="${storedUser.city}" required>
<label for="editCountry">País:</label>
<input type="text" id="editCountry" value="${storedUser.country}" required>
<label for="editChildren">¿Cuántos hijos/hijas tienes?</label>
<input type="number" id="editChildren" value="${storedUser.children.length}" min="0">
<div id="editChildrenContainer"></div>
<button id="saveProfileButton">Guardar cambios</button>
`;

// Función para generar los campos de cada hijo
function generateChildFields(count) {
const editChildrenContainer = document.getElementById("editChildrenContainer");
editChildrenContainer.innerHTML = ""; // Limpiar los campos anteriores

for (let i = 0; i < count; i++) {
    const child = storedUser.children[i] || { name: '', age: '', toys: '' }; // Datos existentes o vacíos si es un nuevo hijo
    editChildrenContainer.insertAdjacentHTML("beforeend", `
        <div>
            <label for="editChildName${i}">Nombre del hijo/hija:</label>
            <input type="text" id="editChildName${i}" value="${child.name}" required>
            <label for="editChildAge${i}">Edad:</label>
            <input type="number" id="editChildAge${i}" value="${child.age}" required>
            <label for="editChildToys${i}">Juguetes favoritos:</label>
            <input type="text" id="editChildToys${i}" value="${child.toys}">
        </div>
    `);
}
}

// Mostrar los campos de los hijos existentes
generateChildFields(storedUser.children.length);

// Escuchar cambios en el número de hijos y actualizar los campos
document.getElementById("editChildren").addEventListener("input", function() {
const newCount = parseInt(this.value) || 0;
generateChildFields(newCount);
});

// Guardar cambios en el perfil
document.getElementById("saveProfileButton").addEventListener("click", function() {
// Obtener los nuevos valores de los campos editados
const newUsername = document.getElementById("editUsername").value;
const newEmail = document.getElementById("editEmail").value;
const newCity = document.getElementById("editCity").value;
const newCountry = document.getElementById("editCountry").value;
const newChildrenArray = [];

// Obtener la información de los hijos editados
const newChildCount = parseInt(document.getElementById("editChildren").value) || 0;
for (let i = 0; i < newChildCount; i++) {
    const childName = document.getElementById(`editChildName${i}`).value;
    const childAge = document.getElementById(`editChildAge${i}`).value;
    const childToys = document.getElementById(`editChildToys${i}`).value;

    newChildrenArray.push({ name: childName, age: childAge, toys: childToys });
}

// Crear el nuevo objeto de usuario con los datos editados
const updatedUserData = {
    ...storedUser, // Conservar todos los datos originales
    username: newUsername,
    email: newEmail,
    city: newCity,
    country: newCountry,
    children: newChildrenArray
};

// Guardar el usuario actualizado en localStorage y actualizar el usuario en sesión
if (newUsername !== storedUser.username) {
    localStorage.removeItem(storedUser.username); // Eliminar el usuario antiguo si cambió el nombre
    localStorage.setItem("loggedInUser", newUsername); // Actualizar el usuario en sesión
}
localStorage.setItem(newUsername, JSON.stringify(updatedUserData)); // Guardar usuario actualizado

alert("Cambios guardados exitosamente.");
document.getElementById("profilePopup").style.display = "none";
document.getElementById("overlay").style.display = "none";

// Restablecer los EventListeners para los botones de perfil
document.getElementById("myProfileButton").addEventListener("click", function() {
    mostrarPerfil(newUsername);
});
document.getElementById("myLettersButton").addEventListener("click", function() {
    mostrarCartas(newUsername);
});
}); // Fin del listener de saveProfileButton
}); // Fin del listener de profileEdit





// Manejar cerrar el popup de Mis Cartas
document.getElementById("lettersClose").addEventListener("click", function() {
document.getElementById("lettersPopup").style.display = "none";
document.getElementById("overlay").style.display = "none"; // Cierra el overlay
});


