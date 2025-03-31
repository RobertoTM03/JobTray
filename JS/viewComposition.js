// General views

function loadViewMainPage() {
    loadTemplate('/HTML/templates/main-page-header.html', 'main_header', () => {
        loadHeaderLogo()
    });
    loadTemplate('/HTML/templates/main-page.html', 'main-content');
    loadTemplate('/HTML/templates/footer.html', 'footer');
}

function loadViewSignInJobSeeker() {
    loadTemplate('/HTML/templates/sign-header.html', 'sign_header', () => {
        loadHeaderLogo()
    });
    loadTemplate('/HTML/templates/job-seeker-sign-in.html', 'sign-content');
    loadTemplate('/HTML/templates/footer.html', 'footer');
}

function loadViewSignUpJobSeeker() {
    loadTemplate('/HTML/templates/sign-header.html', 'sign_header', () => {
        loadHeaderLogo()
    });
    loadTemplate('/HTML/templates/job-seeker-sign-up.html', 'sign-content');
    loadTemplate('/HTML/templates/footer.html', 'footer');
}

function loadViewSignInCompany() {
    loadTemplate('/HTML/templates/sign-header.html', 'sign_header', () => {
        loadHeaderLogo()
    });
    loadTemplate('/HTML/templates/company-sign-in.html', 'sign-content');
    loadTemplate('/HTML/templates/footer.html', 'footer');
}

function loadViewSignUpCompany() {
    loadTemplate('/HTML/templates/sign-header.html', 'sign_header', () => {
        loadHeaderLogo()
    });
    loadTemplate('/HTML/templates/company-sign-up.html', 'sign-content');
    loadTemplate('/HTML/templates/footer.html', 'footer');
}

// Job seeker views

function loadViewFindJobsJobSeeker() {
    loadTemplate('/HTML/templates/job-seeker-header.html', 'job_seeker_header', () => {
        loadHeaderLogo();
        loadJobSeekerProfileHeader(getCurrentJobSeekerId());
        HeaderPopupMenu();
    });

    loadTemplate('/HTML/templates/main-tittle.html', 'main-tittle', () => {
        setMainTittle("Find Jobs");
    });

    loadTemplate('/HTML/templates/job-seeker-search-bar.html', 'search-bar');

    loadTemplate('/HTML/templates/job-seeker-find-jobs-list.html', 'find-jobs-content', () => {
        loadContentFindJobsJobSeekers();
    });

    loadTemplate('/HTML/templates/footer.html', 'footer');
}

function loadViewJobSeekerProfileJobSeeker() {
    loadTemplate('/HTML/templates/job-seeker-header.html', 'job_seeker_header', () => {
        loadHeaderLogo();
        loadJobSeekerProfileHeader(getCurrentJobSeekerId());
        HeaderPopupMenu();
    });

    loadTemplate('/HTML/templates/main-tittle.html', 'main-tittle', () => {
        setMainTittle("My Profile");
    });

    loadTemplate('/HTML/templates/job-seeker-profile-edit.html', 'job-seeker-profile-content', () => {
        loadJobSeekerProfileEdit(getCurrentJobSeekerId());
    });

    loadTemplate('/HTML/templates/footer.html', 'footer');
}

function loadViewVacancyViewJobSeeker() {
    loadTemplate('/HTML/templates/job-seeker-header.html', 'job_seeker_header', () => {
        loadHeaderLogo();
        loadJobSeekerProfileHeader(getCurrentJobSeekerId());
        HeaderPopupMenu();
    });

    loadTemplate('/HTML/templates/main-tittle.html', 'main-tittle', () => {
        setMainTittle("Vacancy");
    });

    loadTemplate('/HTML/templates/main-subtitle.html', 'main-subtitle', () => {
        setMainSubtitle("Find Jobs");
    });

    loadTemplate('/HTML/templates/vacancy-profile-view.html', 'job-listing-content', () => {
        loadVacancyDetailsView(getVacancyIdFromUrl());
    });

    loadTemplate('/HTML/templates/footer.html', 'footer');
}

// Company views

function loadViewJobSeekerProfileCompany() {
    loadTemplate('/HTML/templates/company-header.html', 'company_header', () => {
        loadHeaderLogo();
        loadCompanyProfileHeader(getCurrentCompanyId());
        HeaderPopupMenu();
    });

    loadTemplate('/HTML/templates/main-tittle.html', 'main-tittle', () => {
        setMainTittle("Job Seeker Profile");
    });

    loadTemplate('/HTML/templates/job-seeker-profile-view.html', 'job-seeker-profile-content', () => {
        loadJobSeekerProfileView(getJobSeekerIdFromUrl());
    });

    loadTemplate('/HTML/templates/footer.html', 'footer');
}

function loadViewVacancyEditCompany() {
    loadTemplate('/HTML/templates/company-header.html', 'company_header', () => {
        loadHeaderLogo();
        loadCompanyProfileHeader(getCurrentCompanyId());
        HeaderPopupMenu();
    });

    loadTemplate('/HTML/templates/main-subtitle.html', 'main-subtitle', () => {
        setMainSubtitle("Job Listing");
    });

    loadTemplate('/HTML/templates/company-vacancy-toggle-nav.html', 'vacancy-toggle-nav', () => {
        loadVacancyToggleNav(getVacancyIdFromUrl());
    });

    loadTemplate('/HTML/templates/vacancy-profile-edit.html', 'profile-vacant-content', () => {
        loadVacancyDetailsEdit(getVacancyIdFromUrl());
    });

    loadTemplate('/HTML/templates/footer.html', 'footer');
}

function loadViewVacancyPostCompany() {
    loadTemplate('/HTML/templates/company-header.html', 'company_header', () => {
        loadHeaderLogo();
        loadCompanyProfileHeader(getCurrentCompanyId());
        HeaderPopupMenu();
    });
    loadTemplate('/HTML/templates/main-tittle.html', 'main-tittle', () => {
        setMainTittle("Post a Job");
    });
    loadTemplate('/HTML/templates/company-vacancy-post.html', 'vacancy-post-content', () => {
        document.querySelector(".vacancy-submit-btn").addEventListener("click", submitVacancyForm);
    });
    loadTemplate('/HTML/templates/footer.html', 'footer');
}

function loadViewVacancyApplicantsListCompany() {
    loadTemplate('/HTML/templates/company-header.html', 'company_header', () => {
        loadHeaderLogo();
        loadCompanyProfileHeader(getCurrentCompanyId());
        HeaderPopupMenu();
    });
    loadTemplate('/HTML/templates/main-subtitle.html', 'main-subtitle', () => {
        setMainSubtitle("Job Listing")
    });

    loadTemplate('/HTML/templates/company-vacancy-toggle-nav.html', 'vacancy-toggle-nav', () => {
        loadVacancyToggleNav(getVacancyIdFromUrl());
    });

    loadTemplate('/HTML/templates/company-vacancy-list.html', 'vacancy-list-content', () => {
        loadVacancyApplicants(getVacancyIdFromUrl());
    });

    loadTemplate('/HTML/templates/footer.html', 'footer');
}

function loadViewJobListingCompany() {
    loadTemplate('/HTML/templates/company-header.html', 'company_header', () => {
        loadHeaderLogo();
        loadCompanyProfileHeader(getCurrentCompanyId());
        HeaderPopupMenu();
    });

    loadTemplate('/HTML/templates/main-tittle.html', 'main-tittle', () => {
        setMainTittle("Job Listing");
    });

    loadTemplate('/HTML/templates/company-job-listing-list.html', 'job-listing-content', () => {
        loadCompanyVacancies(getCurrentCompanyId());
    });

    loadTemplate('/HTML/templates/footer.html', 'footer');
}