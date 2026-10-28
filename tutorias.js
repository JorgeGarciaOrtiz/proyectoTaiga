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

// Horarios de prueba generados al azar
var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
var horas = ["09:00", "10:00", "11:00", "12:00", "13:00"];
var horarios = [];

// Todos los profesores menos los dos últimos tienen horario los 7 días
// (Elena y Pablo se quedan sin horarios para probar el mensaje)
for (var p = 0; p < profesores.length - 2; p++) {
    for (var d = 0; d < dias.length; d++) {
        var h = Math.floor(Math.random() * horas.length);
        horarios.push({
            profesorId: profesores[p].id,
            dia: dias[d],
            hora: horas[h],
            libre: Math.random() < 0.5 // libre u ocupado al azar
        });
    }
}

// #40 Añadir los horarios que ha publicado el profesor
// (se cargan después de aplicarReservas, así que aquí se marcan los ocupados)
function cargarHorariosPublicados() {
    var publicados = JSON.parse(localStorage.getItem("horariosPublicados")) || [];
    var reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    for (var i = 0; i < publicados.length; i++) {
        // El horario está libre salvo que ya tenga una reserva
        var libre = true;
        for (var r = 0; r < reservas.length; r++) {
            if (reservas[r].profesorId == publicados[i].profesorId &&
                reservas[r].dia == publicados[i].dia &&
                reservas[r].hora == publicados[i].hora) {
                libre = false;
            }
        }
        horarios.push({
            profesorId: publicados[i].profesorId,
            dia: publicados[i].dia,
            hora: publicados[i].hora,
            libre: libre
        });
    }
}


// #35 Volver a marcar como ocupados los huecos ya reservados
// (los horarios se generan al azar, así que se ajusta la hora de la reserva)
function aplicarReservas() {
    var reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    for (var r = 0; r < reservas.length; r++) {
        for (var k = 0; k < horarios.length; k++) {
            if (horarios[k].profesorId == reservas[r].profesorId && horarios[k].dia == reservas[r].dia) {
                horarios[k].hora = reservas[r].hora;
                horarios[k].libre = false;
            }
        }
    }
}
aplicarReservas();

// #40 Cargar los horarios publicados por el profesor
cargarHorariosPublicados();

// #34 Abrir y cerrar el formulario de reserva

// Nombre y id del profesor cuyos horarios se están viendo
var profesorActual = "";
var idProfesorActual = 0;

// Posición del hueco que se está reservando
var posicionReserva = -1;

// Muestra el formulario con los datos del hueco elegido
function abrirReserva(posicion) {
    posicionReserva = posicion;
    document.getElementById("reservaProfesor").textContent = profesorActual;
    document.getElementById("reservaDia").textContent = horarios[posicion].dia;
    document.getElementById("reservaHora").textContent = horarios[posicion].hora;
    document.getElementById("duda").value = "";
    document.getElementById("errorDuda").textContent = "";
    document.getElementById("formularioReserva").classList.remove("oculto");
}

// Oculta el formulario
function cerrarReserva() {
    document.getElementById("formularioReserva").classList.add("oculto");
}

// #35 Reservar un hueco libre
// #36 Validar la duda y mostrar mensajes
function confirmarReserva() {
    var hueco = horarios[posicionReserva];
    var duda = document.getElementById("duda").value.trim();

    // Limpiar mensajes anteriores
    document.getElementById("errorDuda").textContent = "";
    document.getElementById("mensajeReserva").textContent = "";
    document.getElementById("mensajeCancelacion").textContent = "";

    // Comprobar que el hueco sigue libre
    if (!hueco.libre) {
        verHorarios(hueco.profesorId);
        document.getElementById("mensajeHorarios").textContent = "Ese hueco ya está ocupado";
        return;
    }

    // La duda es obligatoria
    if (duda == "") {
        document.getElementById("errorDuda").textContent = "La duda es obligatoria";
        return;
    }

    // La duda tiene que tener al menos 5 caracteres
    if (duda.length < 5) {
        document.getElementById("errorDuda").textContent = "Escribe al menos 5 caracteres";
        return;
    }

    // Guardar la reserva en localStorage
    var reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    reservas.push({
        usuario: usuario,
        profesorId: hueco.profesorId,
        profesor: profesorActual,
        dia: hueco.dia,
        hora: hueco.hora,
        duda: duda
    });
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // El hueco pasa a ocupado
    hueco.libre = false;

    // Volver a dibujar la tabla (también cierra el formulario)
    verHorarios(hueco.profesorId);

    // Mensaje de confirmación
    document.getElementById("mensajeReserva").textContent =
        "Tutoría reservada con " + profesorActual + ": " + hueco.dia + " a las " + hueco.hora;

    
    // Actualizar la lista de "Mis reservas"
    mostrarReservas();
}

// #37 Mostrar las reservas del usuario
function mostrarReservas() {
    var lista = document.getElementById("listaReservas");
    lista.innerHTML = "";

    var reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    var hayReservas = false;

    for (var i = 0; i < reservas.length; i++) {
        // Solo las reservas del usuario con sesión iniciada
        if (reservas[i].usuario == usuario) {
            hayReservas = true;

            // #43 Si la reserva tiene comentario, se muestra
            var comentario = "";
            if (reservas[i].comentario) {
                comentario = '<div class="comentario"><strong>Comentario:</strong> ' + reservas[i].comentario + '</div>';
            }

            lista.innerHTML +=
                '<div class="mi-reserva">' +
                '<h3>' + reservas[i].profesor + '</h3>' +
                '<p>' + reservas[i].dia + ' a las ' + reservas[i].hora + '</p>' +
                '<p>Duda: ' + reservas[i].duda + '</p>' +
                comentario +
                '<button class="comentar" onclick="abrirComentario(' + i + ')">Comentar</button>' +
                '<button class="cancelar" onclick="cancelarReserva(' + i + ')">Cancelar reserva</button>' +
                '</div>';
        }
    }

    // Si no hay ninguna, mostramos un mensaje
    if (hayReservas) {
        document.getElementById("sinReservas").textContent = "";
    } else {
        document.getElementById("sinReservas").textContent = "Todavía no has hecho ninguna reserva";
    }
}

// #38 Cancelar una reserva
function cancelarReserva(posicion) {
    // Pedir confirmación antes de cancelar
    if (!confirm("¿Seguro que quieres cancelar esta reserva?")) {
        return;
    }

    var reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    var reserva = reservas[posicion];

    // Quitar la reserva de localStorage
    reservas.splice(posicion, 1);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    // El hueco vuelve a estar libre
    for (var k = 0; k < horarios.length; k++) {
        if (horarios[k].profesorId == reserva.profesorId && horarios[k].dia == reserva.dia) {
            horarios[k].libre = true;
        }
    }

    // Si se están viendo los horarios de ese profesor, se vuelve a dibujar la tabla
    if (idProfesorActual == reserva.profesorId) {
        verHorarios(reserva.profesorId);
    }

    // Actualizar la lista de "Mis reservas" y avisar
    mostrarReservas();
    document.getElementById("mensajeCancelacion").textContent =
        "Reserva cancelada: " + reserva.profesor + ", " + reserva.dia + " a las " + reserva.hora;
}

// #33 Marcar libres/ocupados y avisar si no hay horarios
function verHorarios(idProfesor) {
    var cuerpo = document.getElementById("cuerpoHorarios");
    cuerpo.innerHTML = "";
    document.getElementById("mensajeHorarios").textContent = "";
    document.getElementById("mensajeReserva").textContent = "";

    cerrarReserva(); // al cambiar de profesor se cierra el formulario

    // Poner el nombre del profesor en el título
    for (var i = 0; i < profesores.length; i++) {
        if (profesores[i].id == idProfesor) {
            document.getElementById("profesorElegido").textContent = "Horarios de " + profesores[i].nombre;
            profesorActual = profesores[i].nombre;
            idProfesorActual = profesores[i].id;
        }
    }

    // Variable para saber si hemos encontrado algún horario
    var hayHorarios = false;

    // Añadir a la tabla los horarios de ese profesor
    for (var j = 0; j < horarios.length; j++) {
        if (horarios[j].profesorId == idProfesor) {
            hayHorarios = true;

            // Por defecto ocupado, y si está libre lo cambiamos
            var estado = "Ocupado";
            var clase = "ocupado";
            var boton = ""; // solo los huecos libres tienen botón
            
            if (horarios[j].libre) {
                estado = "Libre";
                clase = "libre";
                boton = '<button onclick="abrirReserva(' + j + ')">Reservar</button>';
            }

            cuerpo.innerHTML +=
                '<tr class="' + clase + '"><td>' + horarios[j].dia + '</td><td>' + horarios[j].hora + '</td><td>' + estado + '</td><td>' + boton + '</td></tr>';
        }
    }

    // Si no hay ninguno, mostramos un mensaje
    if (!hayHorarios) {
        document.getElementById("mensajeHorarios").textContent = "Este profesor no tiene horarios publicados";
    }
}

// #43 Añadir un comentario a una reserva
// Datos de la reserva que se está comentando
var reservaComentada = null;
// Muestra el formulario con los datos de la reserva elegida
function abrirComentario(posicion) {
    var reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    var reserva = reservas[posicion];

    reservaComentada = {
        profesorId: reserva.profesorId,
        dia: reserva.dia,
        hora: reserva.hora
    };
    //document.getElementById("comentarioProfesor").textContent = reserva.profesor;
    document.getElementById("comentarioFecha").textContent = reserva.dia + " a las " + reserva.hora;
    document.getElementById("comentario").value = reserva.comentario || "";
    document.getElementById("errorComentario").textContent = "";
    document.getElementById("mensajeComentario").textContent = "";
    document.getElementById("formularioComentario").classList.remove("oculto");
}

// Oculta el formulario
function cerrarComentario() {
    document.getElementById("formularioComentario").classList.add("oculto");
}
// Validar el comentario, guardarlo y mostrar mensajes
function guardarComentario() {
    var comentario = document.getElementById("comentario").value.trim();

    // Limpiar mensajes anteriores
    document.getElementById("errorComentario").textContent = "";
    document.getElementById("mensajeComentario").textContent = "";
    document.getElementById("mensajeCancelacion").textContent = "";
    // Buscar la reserva que se está comentando
    var reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    var posicion = -1;

    for (var i = 0; i < reservas.length; i++) {
        if (reservas[i].usuario == usuario &&
            reservas[i].profesorId == reservaComentada.profesorId &&
            reservas[i].dia == reservaComentada.dia &&
            reservas[i].hora == reservaComentada.hora) {
            posicion = i;
        }
    }
    if (comentario == "") {
        // El comentario es obligatorio
        document.getElementById("errorComentario").textContent = "El comentario es obligatorio";
    } else if (comentario.length < 5) {
        // Tiene que tener al menos 5 caracteres
        document.getElementById("errorComentario").textContent = "Escribe al menos 5 caracteres";
    } else if (comentario.length > 200) {
        // No puede pasar de 200 caracteres
        document.getElementById("errorComentario").textContent = "El comentario no puede tener más de 200 caracteres";
    } else if (posicion == -1) {
        // La reserva ya no existe (se ha cancelado)
        document.getElementById("errorComentario").textContent = "Esa reserva ya no existe";
    } else {
        // Guardar el comentario en localStorage
        reservas[posicion].comentario = comentario;
        localStorage.setItem("reservas", JSON.stringify(reservas));
        // Cerrar el formulario, actualizar "Mis reservas" y avisar
        cerrarComentario();
        mostrarReservas();
        document.getElementById("mensajeComentario").textContent = "Comentario añadido: " + reservaComentada.dia + " a las " + reservaComentada.hora;
    }
}

// Al cargar la página se muestran todos
mostrarProfesores(profesores);
mostrarReservas();