/**
 * StoneBeam-NH - Blog Logic
 * Handles article searching, category filtering, reading mode, and newsletter subscription.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Selectors ---
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');
    const articles = document.querySelectorAll('article');
    const categoryLinks = document.querySelectorAll('.cat-list a');
    const newsletterBtn = document.querySelector('.newsletter-form button');
    const newsletterInput = document.querySelector('.newsletter-form input');

    // --- 1. Search Functionality ---
    
    // Function to execute search
    const performSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        
        articles.forEach(article => {
            const title = article.querySelector('h2, h3').innerText.toLowerCase();
            const excerpt = article.querySelector('.excerpt').innerText.toLowerCase();
            const badge = article.querySelector('.badge').innerText.toLowerCase();

            // Match query against title, excerpt, or category badge
            if (title.includes(query) || excerpt.includes(query) || badge.includes(query)) {
                article.style.display = 'block';
                article.style.animation = 'fadeIn 0.5s ease';
            } else {
                article.style.display = 'none';
            }
        });
    };

    // Event Listeners for Search
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') performSearch();
        // Optional: Real-time search as you type
        performSearch();
    });

    // --- 2. Category Filtering (Sidebar) ---
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Extract category name (remove the number count)
            // e.g., "Materials (8)" -> "Materials"
            const categoryText = link.firstChild.textContent.trim().toLowerCase(); 

            // Highlight active link
            categoryLinks.forEach(l => l.style.color = ''); // Reset
            link.style.color = '#ff7e5f'; // Active color

            articles.forEach(article => {
                const badge = article.querySelector('.badge').innerText.toLowerCase();
                
                // Show if badge matches category OR if category is "Showcases" (mapped to Project Showcase)
                // Note: "Company News" maps to badge "News"
                const match = 
                    (badge.includes(categoryText)) || 
                    (categoryText === 'showcases' && badge.includes('project')) ||
                    (categoryText === 'company news' && badge.includes('news'));

                if (match) {
                    article.style.display = 'block';
                    article.style.animation = 'fadeIn 0.5s ease';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });

    // --- 3. "Read More" Modal (Simulated Blog Post) ---
    
    const readButtons = document.querySelectorAll('.read-btn, .read-link');

    readButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get Data from the Card
            const card = btn.closest('article');
            const title = card.querySelector('h2, h3').innerText;
            const imgUrl = card.querySelector('.card-img').style.backgroundImage.slice(5, -2);
            const badge = card.querySelector('.badge').innerText;
            const date = card.querySelector('.meta') ? card.querySelector('.meta').innerText : "Dec 28, 2025";

            openBlogModal(title, imgUrl, badge, date);
        });
    });

    function openBlogModal(title, imgUrl, badge, date) {
        // Create Modal
        const modal = document.createElement('div');
        modal.className = 'blog-modal-overlay';
        modal.innerHTML = `
            <div class="blog-modal">
                <button class="close-modal"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-hero" style="background-image: url('${imgUrl}');">
                    <span class="badge">${badge}</span>
                </div>
                <div class="modal-content">
                    <span class="modal-date">${date}</span>
                    <h1>${title}</h1>
                    <div class="modal-body-text">
                        <p class="lead"><strong>Summary:</strong> This article explores the critical aspects of ${badge.toLowerCase()} in modern construction environments.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <h3>Key Takeaways</h3>
                        <ul>
                            <li>Understanding structural integrity requirements.</li>
                            <li>Cost-benefit analysis of premium materials.</li>
                            <li>Long-term maintenance schedules.</li>
                        </ul>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <div class="quote-box">
                            "Quality is not an act, it is a habit. StoneBeam-NH embodies this in every brick laid."
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        // Close Logic
        const closeFunc = () => {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = 'auto';
            }, 300);
        };

        modal.querySelector('.close-modal').addEventListener('click', closeFunc);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeFunc();
        });

        // Animate In
        requestAnimationFrame(() => modal.classList.add('visible'));
    }

    // --- 4. Newsletter Subscription ---
    
    newsletterBtn.addEventListener('click', () => {
        const email = newsletterInput.value;
        
        if(email && email.includes('@')) {
            // Success State
            const originalText = newsletterBtn.innerText;
            newsletterBtn.innerText = 'Subscribed!';
            newsletterBtn.style.background = '#2ecc71';
            newsletterInput.value = '';
            
            setTimeout(() => {
                newsletterBtn.innerText = originalText;
                newsletterBtn.style.background = ''; // Revert to gradient
            }, 3000);
        } else {
            // Error State
            newsletterInput.style.border = '1px solid #e74c3c';
            newsletterInput.classList.add('shake');
            setTimeout(() => {
                newsletterInput.style.border = '';
                newsletterInput.classList.remove('shake');
            }, 500);
        }
    });

    // --- 5. Inject Dynamic Styles ---
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Modal Styles */
        .blog-modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); z-index: 9999;
            display: flex; justify-content: center; align-items: center;
            opacity: 0; transition: opacity 0.3s ease;
            backdrop-filter: blur(5px);
            padding: 20px;
        }
        .blog-modal-overlay.visible { opacity: 1; }
        
        .blog-modal {
            background: #1e1e24; width: 100%; max-width: 800px;
            max-height: 90vh; overflow-y: auto;
            border-radius: 12px; position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        
        .modal-hero {
            height: 300px; background-size: cover; background-position: center;
            position: relative;
        }
        .modal-hero .badge {
            position: absolute; bottom: 20px; left: 20px;
            background: rgba(0,0,0,0.7); color: #fff;
            padding: 5px 12px; border-radius: 4px; font-weight: bold;
            text-transform: uppercase; font-size: 0.8rem;
        }
        
        .modal-content { padding: 40px; color: #e0e0e0; }
        .modal-date { color: #888; font-size: 0.9rem; display: block; margin-bottom: 10px; }
        .blog-modal h1 { font-size: 2rem; margin-bottom: 20px; color: #fff; line-height: 1.2; }
        .modal-body-text p { line-height: 1.8; margin-bottom: 20px; font-size: 1.05rem; }
        .modal-body-text h3 { color: #ff7e5f; margin-top: 30px; margin-bottom: 15px; }
        .modal-body-text ul { margin-bottom: 20px; padding-left: 20px; }
        .modal-body-text li { margin-bottom: 10px; }
        
        .quote-box {
            border-left: 4px solid #ff7e5f;
            padding: 20px; background: rgba(255,255,255,0.05);
            font-style: italic; margin: 30px 0; font-size: 1.1rem;
        }

        .close-modal {
            position: absolute; top: 20px; right: 20px;
            background: rgba(0,0,0,0.5); color: #fff;
            border: none; width: 40px; height: 40px; border-radius: 50%;
            cursor: pointer; z-index: 10; font-size: 1.2rem;
            transition: background 0.2s;
        }
        .close-modal:hover { background: #ff7e5f; }

        /* Shake Animation */
        .shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        
        /* Scrollbar for Modal */
        .blog-modal::-webkit-scrollbar { width: 8px; }
        .blog-modal::-webkit-scrollbar-track { background: #1e1e24; }
        .blog-modal::-webkit-scrollbar-thumb { background: #444; border-radius: 4px; }
    `;
    document.head.appendChild(style);

});