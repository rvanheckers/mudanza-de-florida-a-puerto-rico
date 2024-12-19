let jobIndex = 0;
let jobs = [];

async function fetchJobs() {
    try {
        const response = await fetch('https://remotive.com/api/remote-jobs?limit=20');
        const data = await response.json();
        jobs = data.jobs;
        displayJobs(); // Eerste weergave van vacatures
        setInterval(displayJobs, 10000); // Vernieuw de vacatures om de 10 seconden
    } catch (error) {
        console.error('Error fetching jobs:', error);
        const jobListings = document.getElementById('job-listings');
        if (jobListings) {
            jobListings.innerHTML = '<p>Error fetching jobs. Please try again later.</p>';
        }
    }
}

function displayJobs() {
    const jobListings = document.getElementById('job-listings');
    if (!jobListings) return;
    jobListings.innerHTML = '';

    // Toon 4 vacatures
    for (let i = 0; i < 4; i++) {
        const job = jobs[(jobIndex + i) % jobs.length];
        jobListings.innerHTML += `
            <div class="job mb-4">
                <h3><a href="${job.url}" target="_blank">${job.title}</a></h3>
                <p><strong>Company:</strong> ${job.company_name}</p>
                <p><strong>Location:</strong> ${job.candidate_required_location}</p>
                <p><strong>Published:</strong> ${new Date(job.publication_date).toLocaleDateString()}</p>
            </div>
        `;
    }

    // Update de jobIndex voor de volgende set vacatures
    jobIndex = (jobIndex + 4) % jobs.length;
}

// Roep de functie aan om de vacatures te laden en weer te geven wanneer de pagina geladen is
document.addEventListener('DOMContentLoaded', fetchJobs);
