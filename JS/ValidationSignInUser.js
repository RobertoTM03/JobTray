// Esperamos a que el contenido sea cargado dinámicamente
document.addEventListener("DOMContentLoaded", function () {
    // Verificar si la función `xLuIncludeFile` ha cargado el contenido
    if (typeof xLuIncludeFile === "function") {
        xLuIncludeFile(); // Asegura que el contenido se carga antes de trabajar con él
    }

    // Esperamos un poco para asegurar que el formulario esté en el DOM
    setTimeout(() => {
        attachLoginEvent();
    }, 500); // Esperar 500ms para que el contenido se cargue completamente
});

function attachLoginEvent() {
    let form = document.getElementById("loginFormUser");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita el envío automático
            validateUser();
        });
    } else {
        console.error("El formulario con ID 'loginForm' no fue encontrado. Probablemente no ha cargado aún.");
    }
}

function validateUser() {
    let emailField = document.getElementById("email");
    let passwordField = document.getElementById("password");

    let validemail = emailField.validity.valid;
    let validpassword = passwordField.validity.valid;

    console.log("Email ingresado:", emailField.value);
    console.log("¿Es válido el email?", validemail);
    console.log("Contraseña ingresada:", passwordField.value);
    console.log("¿Es válida la contraseña?", validpassword);

    if (validemail && validpassword) {
        redirectToFindJobsJobSeeker(event); // Llamamos la función de redirección
    } else {
        alert("Por favor, ingresa un correo válido y una contraseña.");
    }
}
