/**
 * StoneBeam-NH - Login Logic
 * Handles authentication, password visibility, and session management.
 */

// 1. Expose togglePass to the global scope
// This is required because your HTML uses an inline 'onclick="togglePass(...)"'
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
    const loginForm = document.getElementById('loginForm');
    const errorBox = document.getElementById('error-msg');
    const submitBtn = loginForm.querySelector('button');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const inputVal = document.getElementById('loginInput').value.trim();
        const passVal = document.getElementById('loginPass').value;

        // Reset error state
        errorBox.style.display = 'none';
        
        // UI Loading State (Simulating server request)
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = "Verifying...";
        submitBtn.style.opacity = "0.7";

        setTimeout(() => {
            attemptLogin(inputVal, passVal, submitBtn, originalBtnText);
        }, 800); // 800ms delay for realism
    });

    function attemptLogin(identifier, password, btn, btnText) {
        // Retrieve registered users from LocalStorage
        const users = JSON.parse(localStorage.getItem('sb_users')) || [];
        
        // Find user by Phone OR Email
        const user = users.find(u => u.phone === identifier || u.email === identifier);

        if (!user) {
            showError("Account not registered. Please check your details.");
            resetButton(btn, btnText);
            return;
        }

        if (user.password !== password) {
            showError("Incorrect password. Please try again.");
            resetButton(btn, btnText);
            return;
        }

        // --- SUCCESS ---
        // Save active session (so other pages know we are logged in)
        sessionStorage.setItem('sb_currentUser', JSON.stringify({
            name: user.name,
            email: user.email,
            role: user.role || 'User'
        }));

        btn.innerText = "Success! Redirecting...";
        btn.style.background = "#27ae60"; // Green color for success
        
        setTimeout(() => {
            window.location.href = 'index.html'; // Redirect to home
        }, 1000);
    }

    function showError(msg) {
        errorBox.style.display = 'block';
        errorBox.innerText = msg;
        // Shake animation effect for better UX
        loginForm.classList.add('shake');
        setTimeout(() => loginForm.classList.remove('shake'), 500);
    }

    function resetButton(btn, originalText) {
        btn.disabled = false;
        btn.innerText = originalText;
        btn.style.opacity = "1";
    }
});