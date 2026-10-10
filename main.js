// #25 Validar campos con JavaScript
function validarRegistro() {
  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Nombre obligatorio
  if (nombre == "") {
    alert("El nombre es obligatorio");
    return false;
  }

  // Email obligatorio y con formato válido
  if (email == "") {
    alert("El email es obligatorio");
    return false;
  }
  if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    alert("El email no es válido");
    return false;
  }

  // Contraseña de mínimo 6 caracteres
  if (password.length < 6) {
    alert("La contraseña debe tener mínimo 6 caracteres");
    return false;
  }

  alert("Registro correcto");
  return false; // evita que se recargue la página
}