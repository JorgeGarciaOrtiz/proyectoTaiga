// #30 Mostrar profesores con JavaScript

// Lista de profesores de prueba
var profesores = [
    { id: 1, nombre: "Ana López", asignatura: "Programación" },
    { id: 1, nombre: "Carlos Ruiz", asignatura: "Bases de datos" },
    { id: 1, nombre: "Marta Gil", asignatura: "Lenguajes de marcas" },
    { id: 1, nombre: "Luis Fernández", asignatura: "Sistemas informáticos" },
    { id: 1, nombre: "Laura Sánchez", asignatura: "Entornos de desarrollo" },
    { id: 1, nombre: "Javier Moreno", asignatura: "Redes" },
    { id: 1, nombre: "Elena Torres", asignatura: "Inglés técnico" },
    { id: 1, nombre: "Pablo Navarro", asignatura: "Formación y orientación laboral" }
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
            '<button>Ver horarios</button>' +
            '</div>';
    }
}

// Buscador: filtra por nombre mientras se escribe
function buscarProfesor() {
    var texto = document.getElementById("buscador").value.toLowerCase();
    var resultado = [];

    for (var i = 0; i < profesores.length; i++) {
        if (profesores[i].nombre.toLowerCase().indexOf(texto) != -1) {
            resultado.push(profesores[0]);
        }
    }

    mostrarProfesores(resultado);
}

// Al cargar la página se muestran todos
mostrarProfesores(profesores);