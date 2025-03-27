
document.addEventListener("DOMContentLoaded", function () {
    if (typeof xLuIncludeFile === "function") {
        xLuIncludeFile();
    }
    setTimeout(() => {
        attachLoginEvent();
    }, 200);
});

function attachLoginEvent() {

    moveSaveButton();
}
function moveSaveButton() {
    const button = document.querySelector(".SaveChanges");
    const mobileContainer = document.querySelector(".space-write");
    const desktopContainer = document.querySelector(".dashboard-profile");

    if (window.innerWidth <= 800) {

        if (!mobileContainer.contains(button)) {
            mobileContainer.appendChild(button);

        }
    } else {
        if (!desktopContainer.contains(button)) {
            desktopContainer.appendChild(button);
        }
    }
}

// Ejecutar al cargar la página
moveSaveButton();

// Detectar cambios de tamaño de pantalla
window.addEventListener("resize", moveSaveButton);
