// Esperamos a que el contenido sea cargado dinámicamente
document.addEventListener("DOMContentLoaded", function () {
    // Verificar si la función `xLuIncludeFile` ha cargado el contenido
    if (typeof xLuIncludeFile === "function") {
        xLuIncludeFile(); // Asegura que el contenido se carga antes de trabajar con él
    }

    // Esperamos un poco para asegurar que el formulario esté en el DOM
    setTimeout(() => {
        attachSignupEvent();
    }, 500); // Esperar 500ms para que el contenido se cargue completamente
});

function attachSignupEvent() {
    let form = document.getElementById("signup-company");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita el envío automático
            validateCompany(event); // Pasamos el evento correctamente
        });
    } else {
        console.error("El formulario con ID 'signup-company' no fue encontrado. Probablemente no ha cargado aún.");
    }
}

function validateCompany(event) {
    let companyName = document.getElementById("name");
    let emailField = document.getElementById("email");
    let cifNifField = document.getElementById("cif-nif");
    let passwordField = document.getElementById("password");
    let passwordConfirm = document.getElementById("password-confirm");

    // Verificar si los campos existen en el DOM antes de usarlos
    if (!companyName || !emailField || !cifNifField || !passwordField || !passwordConfirm) {
        console.error("Uno o más elementos no fueron encontrados en el DOM.");
        return;
    }

    // Validar si los campos cumplen con los requisitos de HTML5
    let validCompanyName = companyName.validity.valid;
    let validEmail = emailField.validity.valid;
    let validCifNif = cifNifField.validity.valid;
    let validPassword = passwordField.validity.valid;

        // Verificar si las contraseñas coinciden
        let passwordsMatch = passwordField.value === passwordConfirm.value;

        console.log("Nombre de la empresa ingresado:", companyName.value);
        console.log("¿Es válido el nombre?", validCompanyName);
        console.log("Email ingresado:", emailField.value);
        console.log("¿Es válido el email?", validEmail);
        console.log("CIF/NIF ingresado:", cifNifField.value);
        console.log("¿Es válido el CIF/NIF?", validCifNif);
        console.log("Contraseña ingresada:", passwordField.value);
        console.log("¿Es válida la contraseña?", validPassword);
        console.log("¿Las contraseñas coinciden?", passwordsMatch);

    if (validCompanyName && validEmail && validCifNif && validPassword && passwordsMatch) {
        redirectToJobListingCompany(event);
    } else {
        let errorMessage = "Por favor, ingresa correctamente los datos:";
        if (!validCompanyName) errorMessage += "\n- Nombre de empresa no válido.";
        if (!validEmail) errorMessage += "\n- El correo electrónico no es válido.";
        if (!validCifNif) errorMessage += "\n- El CIF/NIF no es válido.";
        if (!validPassword) errorMessage += "\n- La contraseña no es válida.";
        if (!passwordsMatch) errorMessage += "\n- Las contraseñas no coinciden.";

        alert(errorMessage);
    }

}
