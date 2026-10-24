// #25 Validar campos con JavaScript
// #26 Mostrar mensajes de error
function validarRegistro() {
  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var correcto = true;

  // Limpiar mensajes anteriores
  document.getElementById("errorNombre").textContent = "";
  document.getElementById("errorEmail").textContent = "";
  document.getElementById("errorPassword").textContent = "";
  document.getElementById("mensajeRegistro").textContent = "";

  // Nombre obligatorio
  if (nombre == "") {
    document.getElementById("errorNombre").textContent = "El nombre es obligatorio";
    correcto = false;
  }

  // Email obligatorio y con formato válido
  if (email == "") {
    document.getElementById("errorEmail").textContent = "El email es obligatorio";
    correcto = false;
  } else if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    document.getElementById("errorEmail").textContent = "El email no es válido";
    correcto = false;
  }

  // Contraseña de mínimo 6 caracteres
  if (password.length < 6) {
    document.getElementById("errorPassword").textContent = "Mínimo 6 caracteres";
    correcto = false;
  }

  // Si todo está bien
  if (correcto) {
    document.getElementById("mensajeRegistro").textContent = "Registro correcto";
  }

  return false; // evita que se recargue la página
}

// #27 Validar email (inicio de sesión)
// #28 Mostrar error si las credenciales son incorrectas
function validarLogin() {
  var email = document.getElementById("loginEmail").value;
  var password = document.getElementById("loginPassword").value;

  // Limpiar mensajes anteriores
  document.getElementById("errorLoginEmail").textContent = "";
  document.getElementById("errorLogin").textContent = "";
  document.getElementById("mensajeLogin").textContent = "";

  // Email obligatorio
  if (email == "") {
    document.getElementById("errorLoginEmail").textContent = "El email es obligatorio";
    return false;
  }

  // Email con formato válido
  if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    document.getElementById("errorLoginEmail").textContent = "El email no es válido";
    return false;
  }

  // Comprobar credenciales (usuario de prueba)
  if (email == "demo@correo.com" && password == "1234") {
    // Guardamos el usuario y pasamos a la página de tutorías
    localStorage.setItem("usuario", email);
    window.location.href = "tutorias.html";
  } else if (email == "profe@correo.com" && password == "1234") {
    // #39 El profesor pasa a su página para publicar horarios
    localStorage.setItem("usuario", email);
    window.location.href = "profesor.html";
  } else {
    document.getElementById("errorLogin").textContent = "Email o contraseña incorrectos";
  }

  return false; // evita que se recargue la página
}