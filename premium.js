/**
 * StoneBeam-NH - Premium Logic
 * Handles policy calculations, form submissions, and visual interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Smooth Scroll for Hero Button ---
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector('#quotation');
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- 2. Interactive Policy Simulators ---
    // Allows users to click cards to see real-money examples of the policies
    
    // A. Delay Protection Calculator
    const delayCard = document.querySelector('.benefit-card');
    if (delayCard) {
        makeInteractive(delayCard);
        delayCard.addEventListener('click', () => {
            const projectValue = prompt("Hypothetical Calculator:\nEnter a Project Value (e.g., 50000) to see penalty protections:");
            
            if (projectValue && !isNaN(projectValue)) {
                const val = parseFloat(projectValue);
                const tier1 = (val * 0.02).toFixed(2); // 2%
                const tier2 = (val * 0.05).toFixed(2); // 5%
                const tier3 = (val * 0.10).toFixed(2); // 10%
                
                alert(`🛡️ PROTECTION GUARANTEE FOR $${val}:\n\n` +
                      `• 1-3 Days Delay: We pay you $${tier1}\n` +
                      `• 4-7 Days Delay: We pay you $${tier2}\n` +
                      `• 7+ Days Delay:  We pay you $${tier3}\n\n` +
                      `We put our money where our mouth is.`);
            }
        });
    }

    // B. Cancellation Policy Calculator
    const cancelCard = document.querySelector('.protection-card');
    if (cancelCard) {
        makeInteractive(cancelCard);
        cancelCard.addEventListener('click', () => {
            const orderValue = prompt("Hypothetical Calculator:\nEnter Total Order Value to calculate cancellation retention:");
            
            if (orderValue && !isNaN(orderValue)) {
                const val = parseFloat(orderValue);
                const retention = (val * 0.50).toFixed(2);
                
                alert(`⚠️ CANCELLATION POLICY SIMULATION:\n\n` +
                      `For an order of $${val}, if cancelled after processing:\n` +
                      `• Refund Amount: $${retention}\n` +
                      `• Retained Fee:  $${retention} (50%)\n\n` +
                      `This covers sourced materials and logistics already in motion.`);
            }
        });
    }

    // Helper to make cards look clickable
    function makeInteractive(element) {
        element.style.cursor = "pointer";
        element.title = "Click to run a simulation";
        element.addEventListener('mouseenter', () => {
            element.style.transform = "translateY(-5px)";
            element.style.transition = "transform 0.3s ease";
            element.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = "translateY(0)";
            element.style.boxShadow = "none";
        });
    }


    // --- 3. Quotation Form Handling ---
    const form = document.querySelector('.premium-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button');
            const originalText = submitBtn.innerText;
            const inputs = form.querySelectorAll('input');
            const name = inputs[0].value;

            // Loading State
            submitBtn.disabled = true;
            submitBtn.innerText = "Processing Request...";
            submitBtn.style.opacity = "0.7";

            // Simulate Server API Call
            setTimeout(() => {
                // Success State
                submitBtn.innerText = "Request Sent!";
                submitBtn.style.backgroundColor = "#27ae60"; // Green
                submitBtn.style.color = "white";

                // Show Success Toast
                showToast(`Thank you, ${name}. A premium agent will contact you within 24 hours.`);

                // Reset Form
                form.reset();

                // Reset Button after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = ""; 
                    submitBtn.style.opacity = "1";
                }, 3000);

            }, 1500);
        });
    }

    // --- 4. Toast Notification System (Injected via JS) ---
    function showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'premium-toast';
        toast.innerText = message;
        
        // Append to body
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('show'), 100);

        // Remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 4000);
    }

    // Inject CSS for the Toast and Interactions
    const style = document.createElement('style');
    style.innerHTML = `
        .premium-toast {
            visibility: hidden;
            min-width: 250px;
            background-color: #333;
            color: #fff;
            text-align: center;
            border-radius: 4px;
            padding: 16px;
            position: fixed;
            z-index: 1000;
            left: 50%;
            bottom: 30px;
            transform: translateX(-50%);
            font-size: 15px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border-left: 5px solid #d4af37; /* Gold accent */
        }
        .premium-toast.show {
            visibility: visible;
            animation: fadein 0.5s, fadeout 0.5s 3.5s;
        }
        @keyframes fadein {
            from {bottom: 0; opacity: 0;}
            to {bottom: 30px; opacity: 1;}
        }
        @keyframes fadeout {
            from {bottom: 30px; opacity: 1;}
            to {bottom: 0; opacity: 0;}
        }
    `;
    document.head.appendChild(style);

});