let sections = document.querySelectorAll(".nav-btn");
let jobs = document.querySelectorAll(".job");
sections.forEach((section)=>section.addEventListener("click", (e)=>{scrollIntoView(e, section)}))
function scrollIntoView(event, sect) {
    event.preventDefault();
    let sectionName = sect.getAttribute("data-section");
    let section = document.querySelector(`.${sectionName}`);
    section.scrollIntoView();
}

let jobDescriptions = document.querySelectorAll(".job-description");
jobDescriptions.forEach((job, index) => {
    job.style.transform = `translateY(${(index * 100)}%)`;
    job.classList.add(`index-${index}`);
    if (index !== 0) {
        job.classList.add("hidden");
    }
    else {
        job.classList.add("active");
    }
})
jobs.forEach((job, index) => {
    job.addEventListener("click", (e) => {
        jobDescriptions.forEach((job, ind) => {
            job.style.transform = `translateY(${(ind * 100) - (index * 100)}%)`;
            if ((ind * 100) - (index * 100) == 0) {
                job.classList.add("active")
                job.classList.remove("hidden")
            }
            else {
                job.classList.remove("active")
                job.classList.add("hidden")
            }
        })
    })
})
function getIndex(description) {
    return description.classList[1].substr(6);
}