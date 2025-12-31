/**
 * StoneBeam-NH - Main Page Logic
 * Version: 1.0.0
 * Date: 2025
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navigation Logic ---
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all and add to clicked
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // --- 2. Search Functionality ---
    const searchIcon = document.querySelector('.fa-magnifying-glass');
    searchIcon.addEventListener('click', () => {
        const query = prompt("Search for projects, contractors, or quotations:");
        if (query) {
            console.log(`Searching for: ${query}`);
            alert(`Searching for "${query}"... This feature will be available soon!`);
        }
    });

    // --- 3. Notification Logic ---
    const bellIcon = document.querySelector('.fa-bell');
    let notificationCount = 3; // Example starting count

    bellIcon.addEventListener('click', () => {
        alert(`You have ${notificationCount} new notifications regarding your quotations.`);
        bellIcon.style.color = "white"; // "Clear" the notification visual
    });

    // --- 4. Hero Button Actions ---
    const findProjectBtn = document.querySelector('.btn-primary');
    const viewQuotesBtn = document.querySelector('.btn-secondary');

    findProjectBtn.addEventListener('click', () => {
        window.location.href = '#'; // In a real app, link to project-list.html
        alert("Redirecting to the Project Marketplace...");
    });

    viewQuotesBtn.addEventListener('click', () => {
        // Smooth scroll to the quotation services section
        const serviceSection = document.querySelector('.main-container');
        serviceSection.scrollIntoView({ behavior: 'smooth' });
    });

    // --- 5. Quick Action Hover/Click Effects ---
    const actionItems = document.querySelectorAll('.action-item');
    
    actionItems.forEach(item => {
        item.addEventListener('click', () => {
            const actionName = item.querySelector('span').innerText;
            handleQuickAction(actionName);
        });
    });

    function handleQuickAction(action) {
        switch(action) {
            case 'Upload Files':
                alert("Opening file uploader...");
                break;
            case 'Schedule':
                alert("Loading your construction calendar...");
                break;
            case 'Premium':
                window.location.href = 'premium.html';
                break;
            case 'Support':
                window.location.href = 'help_support.html';
                break;
        }
    }

    // --- 6. Live Updates Auto-Refresh Simulation ---
    // This simulates real-time data coming in without reloading the page
    const updateList = document.querySelector('.update-list');
    
    function addLiveUpdate(title, subtitle) {
        const newUpdate = document.createElement('li');
        newUpdate.style.animation = "fadeIn 0.5s ease-in";
        newUpdate.innerHTML = `
            <i class="fa-solid fa-bolt" style="color: #f1c40f;"></i>
            <div>
                <strong>${title}</strong>
                <span>${subtitle}</span>
            </div>
        `;
        // Insert at the top of the list
        updateList.insertBefore(newUpdate, updateList.firstChild);
        
        // Remove oldest if list gets too long (max 5)
        if (updateList.children.length > 5) {
            updateList.removeChild(updateList.lastChild);
        }
    }
});

// --- Simple CSS Animation for the Live Updates ---
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

document.head.appendChild(style);
