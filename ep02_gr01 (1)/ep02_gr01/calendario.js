const messages = [
    "¡Comienza tu día con una sonrisa!",
    "Cada paso te acerca a tu meta.",
    "Confía en el proceso, el éxito está cerca.",
    "No te rindas, lo mejor está por venir.",
    "Hoy es un buen día para empezar algo nuevo.",
    "El esfuerzo siempre trae recompensas.",
    "Cree en ti mismo, siempre lo lograrás.",
    "Los pequeños logros son los que nos llevan lejos.",
    "La perseverancia es la clave del éxito.",
    "Hoy es el día perfecto para seguir tus sueños.",
    "Haz de hoy un gran día.",
    "Cada día es una nueva oportunidad.",
    "Tu actitud determina tu altitud.",
    "Recuerda, tú puedes con todo.",
    "La motivación viene del interior.",
    "Haz lo que amas, y nunca trabajarás un día en tu vida.",
    "Sigue avanzando, aunque sea un paso pequeño.",
    "El éxito es la suma de pequeños esfuerzos.",
    "Hoy es un buen día para aprender algo nuevo.",
    "Cada error es una oportunidad de aprender.",
    "Sigue tu pasión, y no te arrepentirás.",
    "La vida es un reto, ¡acéptalo!",
    "Haz que cada día cuente.",
    "Nunca subestimes el poder de un buen día.",
    "El éxito es un viaje, no un destino.",
    "Cada día es una nueva oportunidad para crecer."
];

function showMessage(day) {
    document.getElementById('motivationalMessage').innerHTML = `<p>${messages[day - 1]}</p>`;
}
