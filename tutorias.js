// Comprobar que hay sesión iniciada
var usuario = localStorage.getItem("usuario");
if (usuario == null) {
    // Si no ha iniciado sesión, vuelve al login
    window.location.href = "index.html";
} else {
    document.getElementById("nombreUsuario").textContent = usuario;
}

// Cerrar sesión
function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}

// #30 Mostrar profesores con JavaScript

// Lista de profesores de prueba
var profesores = [
    { id: 1, nombre: "Ana López", asignatura: "Programación" },
    { id: 2, nombre: "Carlos Ruiz", asignatura: "Bases de datos" },
    { id: 3, nombre: "Marta Gil", asignatura: "Lenguajes de marcas" },
    { id: 4, nombre: "Luis Fernández", asignatura: "Sistemas informáticos" },
    { id: 5, nombre: "Laura Sánchez", asignatura: "Entornos de desarrollo" },
    { id: 6, nombre: "Javier Moreno", asignatura: "Redes" },
    { id: 7, nombre: "Elena Torres", asignatura: "Inglés técnico" },
    { id: 8, nombre: "Pablo Navarro", asignatura: "Formación y orientación laboral" }
];

// Dibuja las tarjetas de los profesores que le pasemos
function mostrarProfesores(lista) {
    var contenedor = document.getElementById("listaProfesores");
    contenedor.innerHTML = "";

    for (var i = 0; i < lista.length; i++) {
        contenedor.innerHTML +=
            '<div class="profesor">' +
            '<h3>' + lista[i].nombre + '</h3>' +
            '<p>Asignatura: ' + lista[i].asignatura + '</p>' +
            '<button onclick="verHorarios(' + lista[i].id + ')">Ver horarios</button>' +
            '</div>';
    }
}

// Buscador: filtra por nombre mientras se escribe
function buscarProfesor() {
    var texto = document.getElementById("buscador").value.toLowerCase();
    var resultado = [];

    for (var i = 0; i < profesores.length; i++) {
        if (profesores[i].nombre.toLowerCase().indexOf(texto) != -1) {
            resultado.push(profesores[i]);
        }
    }

    mostrarProfesores(resultado);
}

// #32 Mostrar los horarios del profesor elegido

// Horarios de prueba generados al azar (todos libres)
var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
var horas = ["09:00", "10:00", "11:00", "12:00", "13:00"];
var horarios = [];

// Todos los profesores tienen horario los 7 días
for (var p = 0; p < profesores.length; p++) {
    for (var d = 0; d < dias.length; d++) {
        var h = Math.floor(Math.random() * horas.length);
        horarios.push({
            profesorId: profesores[p].id,
            dia: dias[d],
            hora: horas[h],
            libre: true
        });
    }
}

function verHorarios(idProfesor) {
    var cuerpo = document.getElementById("cuerpoHorarios");
    cuerpo.innerHTML = "";

    // Poner el nombre del profesor en el título
    for (var i = 0; i < profesores.length; i++) {
        if (profesores[i].id == idProfesor) {
            document.getElementById("profesorElegido").textContent = "Horarios de " + profesores[i].nombre;
        }
    }

    // Añadir a la tabla los horarios de ese profesor
    for (var j = 0; j < horarios.length; j++) {
        if (horarios[j].profesorId == idProfesor) {
            var estado = "Ocupado";
            if (horarios[j].libre) {
                estado = "Libre";
            }
            cuerpo.innerHTML +=
                '<tr><td>' + horarios[j].dia + '</td><td>' + horarios[j].hora + '</td><td>' + estado + '</td></tr>';
        }
    }
}

// Al cargar la página se muestran todos
mostrarProfesores(profesores);