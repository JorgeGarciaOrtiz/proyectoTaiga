// #39 Comprobar que hay un profesor con sesión iniciada
var usuario = localStorage.getItem("usuario");
if (usuario != "profe@correo.com") {
    // Si no es el profesor, vuelve al login
    window.location.href = "index.html";
} else {
    document.getElementById("nombreUsuario").textContent = usuario;
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

//#40 Publicar un horario 
//Id del profesor de prueba (Elena Torres en la lista de tutorías.js)
var profesorId = 7;

// #41 Validar el día y la hora y mostrar mensaje de confirmación o error
function publicarHorario() {
    var dia = document.getElementById("dia").value;
    var hora = document.getElementById("hora").value;

    // Limpiar mensajes anteriores
    document.getElementById("errorDia").textContent = "";
    document.getElementById("errorHora").textContent = "";
    document.getElementById("mensajeHorario").textContent = "";

    var hayError = false;

    // El día es obligatorio
    if (dia == "") {
        document.getElementById("errorDia").textContent = "Elige un día";
        hayError = true;
    }

    // La hora es obligatoria
    if (hora == "") {
        document.getElementById("errorHora").textContent = "Elige una hora";
        hayError = true;
    }

    if (hayError) {
        return;
    }

    // Comprobar que ese horario no está ya publicado
    var publicados = JSON.parse(localStorage.getItem("horariosPublicados")) || [];
    for (var i = 0; i < publicados.length; i++) {
        if (publicados[i].profesorId == profesorId && publicados[i].dia == dia && publicados[i].hora == hora) {
            document.getElementById("errorHora").textContent = "Ya has publicado ese horario";
            return;
        }
    }

    // Guardar el horario en localStorage
    publicados.push({
        profesorId: profesorId,
        dia: dia,
        hora: hora
    });
    localStorage.setItem("horariosPublicados", JSON.stringify(publicados));

    // Dejar el formulario vacío para publicar otro
    document.getElementById("dia").value = "";
    document.getElementById("hora").value = "";

    // Mensaje de confirmación
    document.getElementById("mensajeHorario").textContent =
        "Horario publicado: " + dia + " a las " + hora;

    // Actualizar la lista de horarios publicados
    mostrarPublicados();
}

// #41 Mostrar los horarios publicados y si están libres u ocupados
function mostrarPublicados() {
    var cuerpo = document.getElementById("cuerpoPublicados");
    cuerpo.innerHTML = "";

    var publicados = JSON.parse(localStorage.getItem("horariosPublicados")) || [];
    var reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    var hayPublicados = false;

    for (var i = 0; i < publicados.length; i++) {
        // Solo los horarios de este profesor
        if (publicados[i].profesorId == profesorId) {
            hayPublicados = true;

            // Por defecto ocupado, y si tiene una reserva lo cambiamos
            var estado = "Ocupado";
            var clase = "ocupado";

            for (var r = 0; r < reservas.length; r++) {
                if (reservas[r].profesorId == publicados[i].profesorId &&
                    reservas[r].dia == publicados[i].dia &&
                    reservas[r].hora == publicados[i].hora) {
                    estado = "Libre";
                    clase = "libre";
                }
            }

            cuerpo.innerHTML +=
                '<tr class="' + clase + '"><td>' + publicados[i].dia + '</td><td>' + publicados[i].hora + '</td><td>' + estado + '</td></tr>';
        }
    }

    // Si no hay ninguno, mostramos un mensaje
    if (hayPublicados) {
        document.getElementById("sinPublicados").textContent = "";
    } else {
        document.getElementById("sinPublicados").textContent = "Todavía no has publicado ningún horario";
    }
}

// Al cargar la página se muestran los horarios publicados
mostrarPublicados();