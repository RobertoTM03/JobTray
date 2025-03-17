function redirectToJobSeekerSignIn(event, element) {
    event.preventDefault(); // Evita la navegación predeterminada
    window.location.href = "sign-in-job-seeker.html";
}

function redirectToJobSeekerSignUp(event, element) {
    event.preventDefault();
    window.location.href = "sign-up-job-seeker.html";
}

function redirectToMainPage(event, element) {
    event.preventDefault();
    window.location.href = "index.html";
}

function redirectToCompanySignIn(event, element) {
    event.preventDefault();
    window.location.href = "sign-in-company.html";
}

function redirectToCompanySignUp(event, element) {
    event.preventDefault();
    window.location.href = "sign-up-company.html";
}

//Job seeker views

function redirectToFindJobsJobSeeker(event, element) {
    event.preventDefault();
    window.location.href = "find-jobs-job-seeker.html";
}

function redirectToVacancyViewJobSeeker(event, element, vacancyId) {
    event.preventDefault();
    window.location.href = "vacancy-view-job-seeker.html?vacancyId=" + vacancyId;
}

function redirectToJobSeekerProfileJobSeeker(event, element, jobseekerId) {
    event.preventDefault();
    window.location.href = "job-seeker-profile-job-seeker.html?jobSeekerId=" + jobseekerId;
}

// Company views

function redirectToJobListingCompany(event, element) {
    event.preventDefault();
    window.location.href = "job-listing-company.html";
}

function redirectToVacancyPostCompany(event, element) {
    event.preventDefault();
    window.location.href = "vacancy-post-company.html";
}

function redirectToVacancyViewCompany(event, element, vacancyId) {
    event.preventDefault();
    window.location.href = "vacancy-view-company.html?vacancyId=" + vacancyId;
}

function redirectToVacancyApplicantsViewCompany(event, element, vacancyId) {
    event.preventDefault();
    window.location.href = "vacancy-applicants-list-company.html?vacancyId=" + vacancyId;
}

function redirectToJobSeekerProfileViewCompany(event, element, jobSeekerId) {
    event.preventDefault();
    window.location.href = "job-seeker-profile-company.html?jobSeekerId=" + jobSeekerId;
}

function goBack(event) {
    event.preventDefault();
    window.history.back();
}

