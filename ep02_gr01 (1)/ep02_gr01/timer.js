function calcularTiempoParaNavidad() {
    const hoy = new Date();
    const navidad = new Date(hoy.getFullYear(), 11, 25); // 25 de diciembre

    // Si hoy es después de Navidad, calcular para el próximo año
    if (hoy > navidad) {
        navidad.setFullYear(navidad.getFullYear() + 1);
    }

    const diferenciaTiempo = navidad - hoy; // Diferencia en milisegundos

    const dias = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));
    const horas = Math.floor((diferenciaTiempo % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutos = Math.floor((diferenciaTiempo % (1000 * 3600)) / (1000 * 60));
    const segundos = Math.floor((diferenciaTiempo % (1000 * 60)) / 1000);

    return { dias, horas, minutos, segundos };
}

function actualizarContador() {
    const tiempo = calcularTiempoParaNavidad();
    document.getElementById('dias').innerText = tiempo.dias;
    document.getElementById('horas').innerText = tiempo.horas;
    document.getElementById('minutos').innerText = tiempo.minutos;
    document.getElementById('segundos').innerText = tiempo.segundos;
}

// Actualizar el contador cada segundo
setInterval(actualizarContador, 1000);
actualizarContador(); // Llamar una vez para mostrar los valores iniciales
