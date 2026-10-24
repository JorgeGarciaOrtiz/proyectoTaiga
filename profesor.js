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