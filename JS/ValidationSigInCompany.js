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
    let form = document.getElementById("loginFormCompany");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita el envío automático
            validateCompany();
        });
    } else {
        console.error("El formulario con ID 'loginForm' no fue encontrado. Probablemente no ha cargado aún.");
    }
}

function validateCompany() {
    let emailFieldC = document.getElementById("email");
    let passwordFieldC = document.getElementById("password");

    let validemailC = emailFieldC.validity.valid;
    let validpasswordC = passwordFieldC.validity.valid;

    console.log("Email ingresado:", emailFieldC.value);
    console.log("¿Es válido el email?", validemailC);
    console.log("Contraseña ingresada:", passwordFieldC.value);
    console.log("¿Es válida la contraseña?", validpasswordC);

    if (validemailC && validpasswordC) {
        redirectToJobListingCompany(event);
    } else {
        alert("Por favor, ingresa un correo válido y una contraseña.");
    }
}