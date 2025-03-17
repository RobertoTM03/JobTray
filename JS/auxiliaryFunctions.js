// URLs de la API
const apiBaseUrl = "http://localhost:3000";
const jobSeekersUrl = `${apiBaseUrl}/jobSeekers`;
const companiesUrl = `${apiBaseUrl}/companies`;
const vacanciesUrl = `${apiBaseUrl}/vacancies`;


// ---------- Auxiliary functions ----------

async function setMainTittle(mainTittleText) {
    try {
        let mainTittle = document.querySelector(".main-tittle h1");

        if (mainTittle) {
            mainTittle.textContent = mainTittleText;
        }
    } catch (error) {
        console.error("Error loading main tittle", error);
    }
}

async function setMainSubtitle(mainSubtitleText) {
    try {
        let mainSubtitle = document.querySelector(".main-subtitle span");

        if (mainSubtitle) {
            mainSubtitle.textContent = mainSubtitleText;
        }
    } catch (error) {
        console.error("Error loading main subtitle:", error);
    }
}

// (YYYY-MM-DD → DD/MM/YYYY)
function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Formato DD/MM/YYYY
}

function countApplicants(vacancy) {
    const count = vacancy.applicants ? vacancy.applicants.length : 0;
    return count.toString().padStart(2, '0');
}

function loadTemplate(fileName, id, callback) {
    fetch(fileName).then((res) => {
        return res.text();
    }).then((text) => {
        document.getElementById(id).innerHTML = text;
        if(callback){
            callback();
        }
    })
}

function getJobSeekerIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("jobSeekerId");
}

function getVacancyIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("vacancyId");
}

function getCurrentJobSeekerId() {
    // TODO Sistema para iniciar sesión como job seekers
    return 1;
}

function getCurrentCompanyId() {
    // TODO Sistema para iniciar sesión como company
    return 1;
}

// ---------- Vacancy profile content load ----------

async function loadVacancyDetailsView(vacancyId) {
    try {
        const responseVacancy = await fetch(`${vacanciesUrl}/${vacancyId}`);
        const vacancy = await responseVacancy.json();

        document.getElementById("vacancy-image").src = vacancy.image;
        document.getElementById("vacancy-name").textContent = vacancy.name;
        document.getElementById("vacancy-description").value = vacancy.description;
        document.getElementById("vacancy-apply-before").value = vacancy.dueDate;
        document.getElementById("vacancy-posted-date").value = vacancy.postedDate;
        document.getElementById("vacancy-job-type").value = vacancy.jobType;
        document.getElementById("vacancy-min-salary").value = vacancy.minimumSalary;
        document.getElementById("vacancy-max-salary").value = vacancy.maximumSalary;

        document.querySelector(".ApplyNowVacant").addEventListener("click", () => {
            addApplicantToVacancy(getVacancyIdFromUrl(), getCurrentJobSeekerId())
        });
    } catch (error) {
        console.error("Error loading vacancy details:", error);
    }
}

async function loadVacancyDetailsEdit(vacancyId) {
    try {
        const responseVacancy = await fetch(`${vacanciesUrl}/${vacancyId}`);
        const vacancy = await responseVacancy.json();

        document.getElementById("vacancy-image").src = vacancy.image;
        document.getElementById("vacancy-name").textContent = vacancy.name;
        document.getElementById("vacancy-description").value = vacancy.description;
        document.getElementById("vacancy-apply-before").value = vacancy.dueDate;
        document.getElementById("vacancy-posted-date").value = vacancy.postedDate;
        document.getElementById("vacancy-job-type").value = vacancy.jobType;
        document.getElementById("vacancy-min-salary").value = vacancy.minimumSalary;
        document.getElementById("vacancy-max-salary").value = vacancy.maximumSalary;

        document.querySelector(".SaveChanges").addEventListener("click", () => {
            saveVacancyChanges(getVacancyIdFromUrl())
        });
    } catch (error) {
        console.error("Error loading vacancy details:", error);
    }
}

// ---------- Job Seeker Profile content load ----------

async function loadJobSeekerProfileEdit(jobSeekerId) {
    try {
        const responseJobSeeker = await fetch(`${jobSeekersUrl}/${jobSeekerId}`);
        const jobSeeker = await responseJobSeeker.json();

        document.getElementById("job-seeker-image").src = jobSeeker.image;
        document.getElementById("job-seeker-name").textContent = jobSeeker.fullName;
        document.getElementById("job-seeker-description").value = jobSeeker.userProfileDescription;
        document.getElementById("job-seeker-portfolio").value = jobSeeker.portfolioLink;
        document.getElementById("job-seeker-email").value = jobSeeker.email;
        document.getElementById("job-seeker-phone-number").value = jobSeeker.phoneNumber;
        document.getElementById("job-seeker-other-contact-method").value = jobSeeker.otherContactMethod;

        document.querySelector(".SaveChanges").addEventListener("click", () => {
            saveJobSeekerProfile(getCurrentJobSeekerId());
        });
    } catch (error) {
        console.error("Error loading job seeker profile:", error);
    }
}

async function loadJobSeekerProfileView(jobSeekerId) {
    try {
        const responseJobSeeker = await fetch(`${jobSeekersUrl}/${jobSeekerId}`);
        const jobSeeker = await responseJobSeeker.json();

        document.getElementById("job-seeker-image").src = jobSeeker.image;
        document.getElementById("job-seeker-name").textContent = jobSeeker.fullName;
        document.getElementById("job-seeker-description").value = jobSeeker.userProfileDescription;
        document.getElementById("job-seeker-portfolio").value = jobSeeker.portfolioLink;
        document.getElementById("job-seeker-email").value = jobSeeker.email;
        document.getElementById("job-seeker-phone-number").value = jobSeeker.phoneNumber;
        document.getElementById("job-seeker-other-contact-method").value = jobSeeker.otherContactMethod;
    } catch (error) {
        console.error("Error loading job seeker profile:", error);
    }
}

// ---------- Job Seeker List content load ----------

async function loadContentFindJobsJobSeekers() {
    try {
        const templateUrl = "/HTML/templates/find-jobs-list-card.html";
        const templateResponse = await fetch(templateUrl);
        if (!templateResponse.ok) throw new Error(`Error ${templateResponse.status}: Could not load template.`);
        const jobCardTemplateText = await templateResponse.text();

        const parser = new DOMParser();
        const templateDoc = parser.parseFromString(jobCardTemplateText, "text/html");
        const jobCardTemplate = templateDoc.body.firstElementChild;
        if (!jobCardTemplate) throw new Error("The template did not load correctly.");

        const vacanciesResponse = await fetch(vacanciesUrl);
        if (!vacanciesResponse.ok) throw new Error(`Error ${vacanciesResponse.status}: Vacancies could not be obtained.`);
        const vacancies = await vacanciesResponse.json();

        const jobListContainer = document.querySelector(".job-list");
        if (!jobListContainer) throw new Error("Container ‘.job-list’ not found in DOM.");

        let seeMoreButton = document.querySelector(".see-more-button");

        vacancies.forEach((vacancy) => {
            const jobCard = jobCardTemplate.cloneNode(true);

            jobCard.querySelector(".logo img").src = vacancy.image;
            jobCard.querySelector(".job-title").innerText = vacancy.name;
            jobCard.querySelector(".job-description").innerText = vacancy.description.substring(0, 100) + "...";
            jobCard.querySelector(".job-salary").innerText = `$${vacancy.minimumSalary} - $${vacancy.maximumSalary}`;
            jobCard.querySelector(".job-type").innerText = vacancy.jobType;

            jobCard.addEventListener("click", () => {
                redirectToVacancyViewJobSeeker(event, this, vacancy.id);
            })

            jobListContainer.insertBefore(jobCard, seeMoreButton);
        });
    } catch (error) {
        console.error(`Error loading vacancies:`, error.message);
    }
}

// ---------- Company List content load ----------

async function loadCompanyVacancies(companyId) {
    try {
        const templateUrl = "/HTML/templates/job-listing-row.html";
        const templateResponse = await fetch(templateUrl);
        if (!templateResponse.ok) throw new Error(`Error ${templateResponse.status}: Could not load template.`);
        const jobListingRowTemplateText = await templateResponse.text();

        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = jobListingRowTemplateText.trim();

        const templateElement = tempContainer.querySelector("template");
        if (!templateElement) throw new Error("The file does not contain a <template>.");

        const jobListingTemplate = templateElement.content.querySelector("tr");
        if (!jobListingTemplate) throw new Error("A <tr> was not found inside the <template>.");

        const vacanciesResponse = await fetch(vacanciesUrl);
        if (!vacanciesResponse.ok) throw new Error(`Error ${vacanciesResponse.status}: Vacancies could not be obtained.`);
        const vacancies = await vacanciesResponse.json();

        const companyVacancies = vacancies.filter(vacancy => vacancy.owner == companyId);

        const jobListingContainer = document.querySelector(".list-container tbody");
        if (!jobListingContainer) throw new Error("No ‘.list-container tbody’ container found in DOM.");

        jobListingContainer.innerHTML = "";

        if (companyVacancies.length === 0) {
            jobListingContainer.innerHTML = "<tr><td colspan='7'>No vacancies found</td></tr>";
            return;
        }

        companyVacancies.forEach((vacancy) => {
            const row = jobListingTemplate.cloneNode(true);

            row.querySelector("#vacancy-image").src = vacancy.image;
            row.querySelector("#vacancy-name").innerText = vacancy.name;
            row.querySelector("#vacancy-stage").innerText = vacancy.stage;
            row.querySelector("#vacancy-posted-date").innerText = formatDate(vacancy.postedDate);
            row.querySelector("#vacancy-due-date").innerText = formatDate(vacancy.dueDate);
            row.querySelector("#vacancy-job-type").innerText = vacancy.jobType;
            row.querySelector("#vacancy-applicants-number").innerText = countApplicants(vacancy);

            if (vacancy.imageUrl) {
                row.querySelector("#vacancy-image").src = vacancy.imageUrl;
            }

            row.querySelector("#vacancy-see-profile-button").onclick = () => {
                redirectToVacancyViewCompany(event, this, vacancy.id);
            }

            jobListingContainer.appendChild(row);
        });
    } catch (error) {
        console.error("Error uploading company vacancies:", error);
    }
}

async function loadVacancyApplicants(vacancyId) {
    try {
        const templateUrl = "/HTML/templates/applicants-list-row.html";
        const templateResponse = await fetch(templateUrl);
        if (!templateResponse.ok) throw new Error(`Error ${templateResponse.status}: Could not load template.`);
        const vacancyListRowTemplateText = await templateResponse.text();

        const tempContainer = document.createElement("div");
        tempContainer.innerHTML = vacancyListRowTemplateText.trim();
        const templateElement = tempContainer.querySelector("template");
        if (!templateElement) throw new Error("The file does not contain a <template>.");

        const applicantsListTemplate = templateElement.content.querySelector("tr");
        if (!applicantsListTemplate) throw new Error("A <tr> was not found inside the <template>..");

        const responseVacancy = await fetch(`${vacanciesUrl}/${vacancyId}`);
        if (!responseVacancy.ok) throw new Error(`Error ${responseVacancy.status}: The vacancy information could not be obtained.`);
        const vacancy = await responseVacancy.json();

        const responseJobSeekers = await fetch(`${jobSeekersUrl}`);
        if (!responseJobSeekers.ok) throw new Error(`Error ${responseJobSeekers.status}: JobSeekers could not be obtained.`);

        const jobSeekersArray = await responseJobSeekers.json();

        if (!Array.isArray(jobSeekersArray)) {
            throw new Error("The jobSeekers API did not return a valid array.");
        }

        const jobSeekerMap = new Map();
        jobSeekersArray.forEach(js => {
            jobSeekerMap.set(String(js.id), [js.fullName, js.image]);
        });

        const applicantsListContainer = document.querySelector(".list-container tbody");
        if (!applicantsListContainer) throw new Error("The ‘.list-container tbody’ container was not found in the DOM.");

        applicantsListContainer.innerHTML = "";

        if (!Array.isArray(vacancy.applicants)) {
            throw new Error("The attribute ‘applicants’ is not a valid array.");
        }

        vacancy.applicants.forEach((applicant) => {
            const row = applicantsListTemplate.cloneNode(true);

            const applicantName = jobSeekerMap.get(String(applicant.id))[0];
            const applicantImage = jobSeekerMap.get(String(applicant.id))[1];

            row.querySelector("#applicant-image").src = applicantImage;
            row.querySelector("#applicant-name").innerText = applicantName;
            row.querySelector("#apply-date").innerText = applicant.applyDate;

            row.querySelector("#applicant-see-profile-button").onclick = function (event) {
                redirectToJobSeekerProfileViewCompany(event, this, applicant.id);
            };

            applicantsListContainer.appendChild(row);
        });

    } catch (error) {
        console.error("Error when uploading company vacancies:", error);
    }
}

// ---------- Headers content load ----------

async function loadHeaderLogo() {
    document.getElementById("header-logo").src = "/images/Logo_Jobtray_Texto.png";
}

async function loadJobSeekerProfileHeader(jobSeekerId) {
    const responseJobSeekers = await fetch(`${jobSeekersUrl}/${jobSeekerId}`);
    const jobSeeker = await responseJobSeekers.json();

    document.getElementById("job-seeker-header-profile-image").src = jobSeeker.image;
    document.getElementById("job-seeker-header-name").innerText = jobSeeker.fullName;
    document.getElementById("job-seeker-header-email").innerText = jobSeeker.email;
}

async function loadCompanyProfileHeader(companyId) {
    const responseCompany = await fetch(`${companiesUrl}/${companyId}`);
    const company = await responseCompany.json();

    document.getElementById("company-header-profile-image").src = company.image;
    document.getElementById("company-header-name").innerText = company.name;
    document.getElementById("company-header-email").innerText = company.email;
}

// ---------- Nav content load ----------

async function loadVacancyToggleNav(vacancyId) {
    const editLink = document.querySelector("#redirect-to-vacancy-edit a");
    const listLink = document.querySelector("#redirect-to-vacancy-list a");

    if (editLink) {
        editLink.onclick = function(event) {
            redirectToVacancyViewCompany(event, this, vacancyId);
        };
    }

    if (listLink) {
        listLink.onclick = function(event) {
            redirectToVacancyApplicantsViewCompany(event, this, vacancyId);
        };
    }
}

// ---------------------------------

function submitVacancyForm(event) {
    event.preventDefault();

    const jobTitle = document.querySelector("#job-title");
    const employmentType = document.querySelector('input[name="employment_type"]:checked');
    const salaryMin = document.querySelector("#salary-min");
    const salaryMax = document.querySelector("#salary-max");
    const sector = document.querySelector('input[name="sector"]:checked');
    const educationLevel = document.querySelector('input[name="education-level"]:checked');
    const description = document.querySelector("#education-description");

    document.querySelectorAll(".error-message").forEach(el => el.remove());
    document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));

    let hasError = false;

    function showErrorMessage(element, message) {
        element.classList.add("error");
        let errorElement = document.createElement("p");
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        errorElement.style.fontSize = "14px";
        errorElement.innerText = message;
        element.parentNode.appendChild(errorElement);
    }

    if (!jobTitle.value.trim()) {
        showErrorMessage(jobTitle, "The title of the vacancy is required.");
        hasError = true;
    }

    if (!employmentType) {
        showErrorMessage(document.querySelector(".checkbox-group"), "You must select a type of employment.");
        hasError = true;
    }

    if (!salaryMin.value.trim() || salaryMin.value < 0) {
        showErrorMessage(salaryMin, "The minimum wage must be a number greater than or equal to 0.");
        hasError = true;
    }

    if (!salaryMax.value.trim() || salaryMax.value < salaryMin.value) {
        showErrorMessage(salaryMax, "The maximum wage must be greater than or equal to the minimum wage.");
        hasError = true;
    }

    if (!sector) {
        showErrorMessage(document.querySelector(".radio-group"), "You must select a sector of employment.");
        hasError = true;
    }

    if (!educationLevel) {
        showErrorMessage(document.querySelectorAll(".radio-group")[1], "You must select a level of education.");
        hasError = true;
    }

    if (!description.value.trim()) {
        showErrorMessage(description, "Job description is can on the must.");
        hasError = true;
    }

    if (hasError) {
        return;
    }

    const actualDate = new Date();
    actualDate.setMonth(actualDate.getMonth() + 3);
    const dueDate = actualDate.toISOString().split("T")[0];

    const newVacancy = {
        owner: 1,
        name: jobTitle.value,
        stage: "Open",
        postedDate: new Date().toISOString().split("T")[0],
        dueDate: dueDate,
        jobType: employmentType.value,
        minimumSalary: parseInt(salaryMin.value),
        maximumSalary: parseInt(salaryMax.value),
        applicants: [],
        employmentSector: sector.value,
        minimumEducationRequired: educationLevel.value,
        description: description.value,
        image: "/images/vacancies/vacancy_default.jpg"
    };

    console.log("Sending data:", newVacancy);

    fetch(`${vacanciesUrl}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newVacancy)
    })
        .then(response => response.json())
        .then(data => {
            console.log("Vacancy successfully created:", data);
            alert("Vacancy successfully published!");
            redirectToJobListingCompany(event, null);
        })
        .catch(error => {
            console.error("Error submitting vacancy:", error);
            alert("Error submitting vacancy. Please try again.");
        });
}

async function addApplicantToVacancy(vacancyId, applicantId) {
    try {
        const response = await fetch(`${vacanciesUrl}/${vacancyId}`);
        if (!response.ok) throw new Error("Vacancy not found");

        const vacancy = await response.json();

        const alreadyApplied = vacancy.applicants.some(applicant => applicant.id === applicantId);
        if (alreadyApplied) {
            alert("The applicant has already applied for this vacancy.");
            return;
        }

        const applyDate = new Date().toISOString().split("T")[0];

        const updatedApplicants = [...vacancy.applicants, { id: applicantId, stage: "new", applyDate }];

        const updateResponse = await fetch(`${vacanciesUrl}/${vacancyId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ applicants: updatedApplicants })
        });

        if (!updateResponse.ok) throw new Error("Error updating vacancy");

        alert("Application submitted successfully!");
        console.log(`The applicant ${applicantId} has been added to the vacancy ${vacancyId}`);
    } catch (error) {
        console.error("Error:", error.message);
        alert(`Failed to submit application: ${error.message}`);
    }
}


async function saveVacancyChanges(vacancyId) {
    try {
        const name = document.getElementById("vacancy-name").textContent.trim();
        const description = document.getElementById("vacancy-description").value.trim();
        const dueDate = document.getElementById("vacancy-apply-before").value;
        const postedDate = document.getElementById("vacancy-posted-date").value;
        const jobType = document.getElementById("vacancy-job-type").value.trim();
        const minSalary = document.getElementById("vacancy-min-salary").value.trim();
        const maxSalary = document.getElementById("vacancy-max-salary").value.trim();

        const updatedData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(dueDate && { dueDate }),
            ...(postedDate && { postedDate }),
            ...(jobType && { jobType }),
            ...(minSalary && { minimumSalary: Number(minSalary) }),
            ...(maxSalary && { maximumSalary: Number(maxSalary) })
        };

        if (Object.keys(updatedData).length === 0) {
            alert("There are no changes to save.");
            return;
        }

        const response = await fetch(`${vacanciesUrl}/${vacancyId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) throw new Error("Error updating vacancy");

        alert("Vacancy properly updated.");
        console.log("Vacancy updated:", updatedData);
    } catch (error) {
        console.error("Error:", error.message);
        alert("Error saving changes.");
    }
}

async function saveJobSeekerProfile(jobSeekerId) {
    try {
        const fullName = document.getElementById("job-seeker-name").innerText.trim();
        const description = document.getElementById("job-seeker-description").value.trim();
        const portfolioLink = document.getElementById("job-seeker-portfolio").value.trim();
        const email = document.getElementById("job-seeker-email").value.trim();
        const phoneNumber = document.getElementById("job-seeker-phone-number").value.trim();
        const otherContactMethod = document.getElementById("job-seeker-other-contact-method").value.trim();

        const updatedData = {
            ...(fullName && { fullName }),
            ...(description && { userProfileDescription: description }),
            ...(portfolioLink && { portfolioLink }),
            ...(email && { email }),
            ...(phoneNumber && { phoneNumber }),
        };

        if (Object.keys(updatedData).length === 0) {
            alert("There are no changes to save.");
            return;
        }

        const response = await fetch(`${jobSeekersUrl}/${jobSeekerId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Error updating the profile: ${errorMessage}`);
        }

        alert("Profile updated correctly.");
        console.log("Updated profile:", updatedData);
    } catch (error) {
        console.error("Error:", error.message);
        alert(`Error saving changes: ${error.message}`);
    }
}