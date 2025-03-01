async function xLuIncludeFile() {
    let z = document.getElementsByTagName("*");

    for (let i = 0; i < z.length; i++) {
        if (z[i].getAttribute("xlu-include-file")) {
            let a = z[i].cloneNode(false);
            let file = z[i].getAttribute("xlu-include-file");

            try {
                let response = await fetch(file);
                if (response.ok) {
                    let content = await response.text();

                    // Si el archivo es una plantilla, reemplazamos los placeholders
                    if (file === "article-template.html") {

                        content = replaceArticleTemplatePlaceholders(content, z[i]);
                    }

                    a.removeAttribute("xlu-include-file");
                    //a.innerHTML = await response.text();
                    a.innerHTML = content;
                    z[i].parentNode.replaceChild(a, z[i]);
                    xLuIncludeFile();
                }
            } catch (error) {
                console.error("Error fetching file:", error);
            }

            return;
        }
    }
}


function replaceArticleTemplatePlaceholders(content, element) {
    let articleData = {
        title: element.getAttribute("data-title"),
        subtitle: element.getAttribute("data-subtitle"),
        date: element.getAttribute("data-date"),
        displayDate: element.getAttribute("data-display-date"),
        content: element.getAttribute("data-content"),
        image: element.getAttribute("data-image"),
        imageCaption: element.getAttribute("data-image-caption")
    };

    return content
        .replace(/{{title}}/g, articleData.title ?? "{{title}}")
        .replace(/{{subtitle}}/g, articleData.subtitle ?? "{{subtitle}}")
        .replace(/{{date}}/g, articleData.date ?? "{{date}}")
        .replace(/{{displayDate}}/g, articleData.displayDate ?? "{{displayDate}}")
        .replace(/{{content}}/g, articleData.content ?? "{{content}}")
        .replace(/{{image}}/g, articleData.image ?? "{{image}}")
        .replace(/{{imageCaption}}/g, articleData.imageCaption ?? "{{imageCaption}}");

}

/*
function redirectToArticle(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Obtener datos del artículo desde los atributos
    let params = new URLSearchParams();
    params.append("title", element.getAttribute("data-title"));
    params.append("subtitle", element.getAttribute("data-subtitle"));
    params.append("date", element.getAttribute("data-date"));
    params.append("displayDate", element.getAttribute("data-display-date"));
    params.append("content", element.getAttribute("data-content"));
    params.append("image", element.getAttribute("data-image") || "");
    params.append("imageCaption", element.getAttribute("data-image-caption") || "");

    // Redirigir a article.html con los parámetros
    window.location.href = "article.html?" + params.toString();
}
*/

function redirectToJobSeekerSignIn(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "sign-in-job-seeker.html";
}

function redirectToJobSeekerSignUp(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "sign-up-job-seeker.html";
}

function redirectToMainPage(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "index.html";
}

function redirectToCompanySignIn(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "sign-in-company.html";
}

function redirectToCompanySignUp(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "sign-up-company.html";
}

//Job seeker views

function redirectToFindJobsJobSeeker(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "find-jobs-job-seeker.html";
}

function redirectToVacancyViewJobSeeker(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "vacancy-view-job-seeker.html";
}

function redirectToJobSeekerProfileJobSeeker(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "job-seeker-profile-job-seeker.html";
}

// Company views

function redirectToJobListingCompany(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "job-listing-company.html";
}

function redirectToVacancyPostCompany(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "vacancy-post-company.html";
}

function redirectToVacancyViewCompany(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "vacancy-view-company.html";
}

function redirectToVacancyApplicantsViewCompany(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "vacancy-applicants-list-company.html";
}

function redirectToJobSeekerProfileViewCompany(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada

    // Redirección a la página
    window.location.href = "job-seeker-profile-company.html";
}

function goBack(event) {
    event.preventDefault(); // Evita cualquier acción predeterminada
    window.history.back();  // Regresa a la página anterior
}

