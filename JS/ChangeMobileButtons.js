document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-btn');
    const mobileBtnContainer = document.getElementById('mobile-btn-container');
    const mobileBtnContainerJobSeerker = document.getElementById('mobile-btn-container-job-seerker');

    if (!mobileBtn || !mobileBtnContainer || !mobileBtnContainerJobSeerker) {
        console.error('Algunos elementos no se encontraron en el DOM');
        return;
    }

    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Evita que el evento se propague

        // Mostrar el contenedor principal
        if (mobileBtnContainer.style.display === 'none' || mobileBtnContainer.style.display === '') {
            mobileBtnContainer.style.display = 'block';
        } else {
            mobileBtnContainer.style.display = 'none';
        }

        // Alternar el sub-contenedor
        mobileBtnContainerJobSeerker.style.display =
            getComputedStyle(mobileBtnContainerJobSeerker).display === 'block' ? 'none' : 'block';
    });

    // Escuchar clics en el documento para cerrar el contenedor si se hace clic fuera
    document.addEventListener('click', (e) => {
        if (!mobileBtn.contains(e.target) && !mobileBtnContainer.contains(e.target)) {
            mobileBtnContainer.style.display = 'none';
        }
    });
});
