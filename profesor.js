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

function publicarHorario() {
    var dia = document.getElementById("dia").value;
    var hora = document.getElementById("hora").value;
 
    // Guardar el horario en localStorage
    var publicados = JSON.parse(localStorage.getItem("horariosPublicados")) || [];
    publicados.push({
        profesorId: profesorId,
        dia: dia,
        hora: hora
    });
    localStorage.setItem("horariosPublicados", JSON.stringify(publicados));
 
    // Dejar el formulario vacío para publicar otro
    document.getElementById("dia").value = "";
    document.getElementById("hora").value = "";
}