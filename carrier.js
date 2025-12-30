/**
 * Toggles the visibility of job details
 * @param {string} jobId - The ID of the job element
 */
function toggleJob(jobId) {
    const content = document.getElementById(jobId);
    const isVisible = content.style.display === "block";

    // Close all other job descriptions first
    document.querySelectorAll('.job-content').forEach(el => {
        el.style.display = "none";
    });

    // Toggle the clicked one
    content.style.display = isVisible ? "none" : "block";
}

console.log("Stone Beam Career Page Initialized - Violet Theme.");