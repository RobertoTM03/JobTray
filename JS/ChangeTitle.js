document.addEventListener("DOMContentLoaded", function () {
    if (typeof xLuIncludeFile === "function") {
        xLuIncludeFile();
    }

    setTimeout(() => {
        moveTitle();
    }, 200);
});

function moveTitle() {
    const title = document.querySelector("#about-me");
    const mobileContainer = document.querySelector(".space-write");
    const desktopContainer = document.querySelector("#titles");

    if (!title || !mobileContainer || !desktopContainer) {
        console.warn("Uno de los elementos no se encontró en el DOM.");
        return;
    }

    // Determinar el contenedor correcto según el tamaño de pantalla
    const newParent = window.innerWidth <= 800 ? mobileContainer : desktopContainer;

    // Mover solo si el padre actual es diferente
    if (title.parentElement !== newParent) {
        newParent.prepend(title);
    }
}

// Detectar cambios de tamaño de pantalla
window.addEventListener("resize", moveTitle);
