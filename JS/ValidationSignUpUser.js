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
    let form = document.getElementById("signup-user");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita el envío automático
            validateUser(event); // Pasamos el evento correctamente
        });
    } else {
        console.error("El formulario con ID 'signup-user' no fue encontrado. Probablemente no ha cargado aún.");
    }
}

function validateUser(event) {
    let fullName = document.getElementById("name");
    let emailField = document.getElementById("email");
    let phoneField = document.getElementById("phone-number");
    let passwordField = document.getElementById("password");
    let passwordConfirm = document.getElementById("password-confirm"); // <--- Corrección en el ID

    // Verificar si los campos existen en el DOM antes de usarlos
    if (!fullName || !emailField || !phoneField || !passwordField || !passwordConfirm) {
        console.error("Uno o más elementos no fueron encontrados en el DOM.");
        return;
    }

    // Validar si los campos cumplen con los requisitos de HTML5
    let validFullName = fullName.validity.valid;
    let validEmail = emailField.validity.valid;
    let validPhone = phoneField.validity.valid;
    let validPassword = passwordField.validity.valid;
    let validPasswordConfirm = passwordConfirm.validity.valid;


        // Verificar si las contraseñas coinciden
        let passwordsMatch = passwordField.value === passwordConfirm.value;

        console.log("Email ingresado:", emailField.value);
        console.log("¿Es válido el email?", validEmail);
        console.log("Contraseña ingresada:", passwordField.value);
        console.log("¿Es válida la contraseña?", validPassword);
        console.log("¿Las contraseñas coinciden?", passwordsMatch);


        if (validFullName && validPhone && validPassword && validEmail && passwordsMatch) {
            redirectToFindJobsJobSeeker(event); // Eliminamos `event` si no es necesario en esta función
        } else {
            let errorMessage = "Por favor, ingresa correctamente los datos:";
            if (!validFullName) errorMessage += "\n- Nombre completo no válido.";
            if (!validEmail) errorMessage += "\n- El correo electrónico no es válido.";
            if (!validPhone) errorMessage += "\n- El número de teléfono no es válido.";
            if (!validPassword) errorMessage += "\n- La contraseña no es válida.";
            if (!passwordsMatch) errorMessage += "\n- Las contraseñas no coinciden.";

            alert(errorMessage);
        }

}
