/**
 * StoneBeam-NH - Signup Logic
 * Handles user registration, input validation, and secure local storage.
 */

// 1. Expose togglePass to global scope (Required for HTML onclick attribute)
window.togglePass = function(inputId, icon) {
    const input = document.getElementById(inputId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const msgBox = document.getElementById('msg-box');
    const submitBtn = signupForm.querySelector('button');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get Values
        const name = document.getElementById('regName').value.trim();
        const phone = document.getElementById('regPhone').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const pass = document.getElementById('regPass').value;

        // --- 1. Validation Logic ---
        
        // Validate Phone (Must be 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            showMsg("Please enter a valid 10-digit phone number.", "error");
            return;
        }

        // Validate Password Strength (Min 6 chars)
        if (pass.length < 6) {
            showMsg("Password must be at least 6 characters long.", "error");
            return;
        }

        // --- 2. Database Check (LocalStorage) ---
        let users = JSON.parse(localStorage.getItem('sb_users')) || [];

        // Check if Phone already exists
        if (users.some(u => u.phone === phone)) {
            showMsg("This phone number is already registered.", "error");
            return;
        }

        // Check if Email already exists (only if email was provided)
        if (email && users.some(u => u.email === email)) {
            showMsg("This email address is already in use.", "error");
            return;
        }

        // --- 3. Create Account Simulation ---
        
        // UI Loading State
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = "Creating Account...";
        submitBtn.style.opacity = "0.7";

        setTimeout(() => {
            // Save new user
            const newUser = {
                id: Date.now(), // Unique ID
                name: name,
                phone: phone,
                email: email || "", // Allow empty string if optional
                password: pass,
                role: 'User', // Default role
                joined: new Date().toLocaleDateString()
            };

            users.push(newUser);
            localStorage.setItem('sb_users', JSON.stringify(users));

            // Success Feedback
            showMsg("Account created successfully! Redirecting...", "success");
            submitBtn.innerText = "Success";
            submitBtn.style.background = "#27ae60";

            // Redirect to Login
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);

        }, 1000); // 1 second delay for realism
    });

    // Helper function to display messages
    function showMsg(text, type) {
        msgBox.style.display = 'block';
        msgBox.className = 'msg-box ' + type; // Applies .error or .success CSS
        msgBox.innerText = text;

        // If it's an error, shake the form slightly
        if (type === 'error') {
            signupForm.classList.add('shake');
            setTimeout(() => signupForm.classList.remove('shake'), 500);
        }
    }
});

// Inject "Shake" animation for error feedback
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes shake {
        0% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        50% { transform: translateX(5px); }
        75% { transform: translateX(-5px); }
        100% { transform: translateX(0); }
    }
    .shake {
        animation: shake 0.3s ease-in-out;
    }
    .msg-box.success {
        background-color: rgba(46, 204, 113, 0.1);
        color: #27ae60;
        border: 1px solid #2ecc71;
    }
    .msg-box.error {
        background-color: rgba(231, 76, 60, 0.1);
        color: #c0392b;
        border: 1px solid #e74c3c;
    }
`;
document.head.appendChild(styleSheet);