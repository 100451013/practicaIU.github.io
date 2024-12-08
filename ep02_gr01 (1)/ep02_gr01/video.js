// Referencias a los elementos del formulario y video
const formReservation = document.getElementById("formReservation");
const videoCallSection = document.getElementById("video-call");
const localVideo = document.getElementById("localVideo");
const remoteImage = document.getElementById("remoteImage");
const holidayMessage = document.getElementById("holidayMessage"); // Nuevo elemento para el mensaje
const personalizedMessage = document.getElementById("personalizedMessage"); // Párrafo para el mensaje personalizado

let localStream;
let peerConnection;
const servers = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

// Manejador de la reserva
formReservation.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const datetime = document.getElementById("datetime").value;

    // Verificar la fecha y hora de la videollamada
    const now = new Date();
    const reservationTime = new Date(datetime);

    // Verificar si la fecha de la reserva es anterior a la fecha actual
    if (reservationTime < now) {
        alert("Por favor, selecciona una fecha y hora futura.");
        return;
    }

    // Verificar si la fecha de la reserva es posterior al 31 de diciembre de 2049
    const maxDate = new Date("2050-01-01T00:00:00");
    if (reservationTime >= maxDate) {
        alert("Lo siento, no puedes hacer una reserva para después del 1 de enero de 2050.");
        return;
    }

    // Mostrar el mensaje de Feliz Navidad
    personalizedMessage.innerText = `¡Feliz Navidad, ${name}! Tu reserva está confirmada para el ${reservationTime.toLocaleString()}.`;
    holidayMessage.style.visibility = "visible"; // Hacemos visible el mensaje

    // Ocultar el formulario y mostrar la videollamada después de unos segundos
    setTimeout(() => {
        formReservation.style.display = "none";
        videoCallSection.style.display = "flex";

        // Obtener la transmisión de video local
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localStream = stream;
                localVideo.srcObject = stream;
                setupConnection(); // Configurar la conexión después de obtener la transmisión local
            })
            .catch((error) => console.error("Error al obtener el flujo local:", error));

        // Ocultar el mensaje después de mostrar la videollamada
        holidayMessage.style.visibility = "hidden";
    }, 3000); // El mensaje aparecerá por 3 segundos
});

// Configurar la conexión WebRTC
function setupConnection() {
    peerConnection = new RTCPeerConnection(servers);

    // Agregar el flujo local a la conexión
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // Cuando se reciba un video remoto, se ignora en este caso ya que tenemos una imagen estática
    peerConnection.ontrack = (event) => {
        console.log("Se ha recibido el video remoto, pero no se mostrará, ya que hay una imagen estática.");
    };

    // Crear una oferta de conexión (indicando que soy el iniciador)
    peerConnection.createOffer()
        .then((offer) => {
            return peerConnection.setLocalDescription(offer);
        })
        .then(() => {
            console.log("Oferta enviada: ", peerConnection.localDescription);
        })
        .catch((error) => console.error("Error al crear la oferta:", error));

    // Crear candidatos ICE para la conexión
    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            console.log("Nuevo candidato ICE:", event.candidate);
        }
    };
}

// Función para redirigir a la página de inicio
function goToStart() {
    window.location.href = "practica1.html#home"; // Cambia 'index.html' si la página de inicio tiene otro nombre
}
