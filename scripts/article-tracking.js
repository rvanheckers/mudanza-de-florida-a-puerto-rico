document.addEventListener('DOMContentLoaded', function() {
    // Basis variabelen
    let readArticles = JSON.parse(localStorage.getItem('readArticles')) || [];
    const articles = document.querySelectorAll('article');
    const dropdownToggle = document.querySelector('.col-lg-4 .dropdown-toggle');
    const dropdownMenu = document.querySelector('.col-lg-4 .dropdown-menu');
    const observers = new Map();
    let isDropdownOpen = false;

    // Reset initiële status (verwijder oude data)
    localStorage.removeItem('readArticles');
    readArticles = [];

    // Voortgangsbalk setup
    const progressContainer = document.createElement('div');
    progressContainer.className = 'mt-3';
    progressContainer.innerHTML = `
        <small class="text-muted mb-2 d-block">Progreso de lectura:</small>
        <div class="progress">
            <div class="progress-bar bg-primary" role="progressbar" style="width: 0%" 
                 aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    `;

    // Dropdown handlers
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        isDropdownOpen = !isDropdownOpen;
        dropdownMenu.classList.toggle('show', isDropdownOpen);
    });

    // Voorkom sluiten bij klik binnen dropdown
    dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Artikel selectie handlers
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const href = this.getAttribute('href');
            const articleId = href.replace('#', '');
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                // Direct markeren als gelezen
                if (!readArticles.includes(articleId)) {
                    readArticles.push(articleId);
                    localStorage.setItem('readArticles', JSON.stringify(readArticles));
                    
                    // Direct UI updaten
                    this.classList.add('read');
                    updateProgress();
                }
                
                // Scroll naar artikel
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Houd dropdown open
                dropdownMenu.classList.add('show');
                isDropdownOpen = true;
            }
        });
    });

    // Sluit alleen bij klik buiten dropdown area
    document.addEventListener('click', function(e) {
        if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
            isDropdownOpen = false;
            dropdownMenu.classList.remove('show');
        }
    });

    // Artikel tracking voor scroll (optioneel)
    articles.forEach(article => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                    const articleId = entry.target.querySelector('h1').id;
                    if (!readArticles.includes(articleId)) {
                        markArticleAsRead(articleId);
                    }
                }
            });
        }, {
            threshold: 0.7,
            rootMargin: '-10% 0px'
        });
        
        observers.set(article, observer);
        observer.observe(article);
    });

    function markArticleAsRead(articleId) {
        if (!readArticles.includes(articleId)) {
            readArticles.push(articleId);
            localStorage.setItem('readArticles', JSON.stringify(readArticles));
            
            // Direct UI updaten
            const dropdownItem = document.querySelector(`.dropdown-item[href="#${articleId}"]`);
            if (dropdownItem) {
                dropdownItem.classList.add('read');
            }
            updateProgress();
        }
    }

    function markReadArticles() {
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
            item.classList.remove('read');
            const href = item.getAttribute('href');
            const articleId = href.replace('#', '');
            if (readArticles.includes(articleId)) {
                item.classList.add('read');
            }
        });
    }

    function updateProgress() {
        const totalArticles = articles.length;
        const progress = (readArticles.length / totalArticles) * 100;
        const progressBar = progressContainer.querySelector('.progress-bar');
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
        progressBar.textContent = `${Math.round(progress)}% completado`;
    }

    // Reset button met subtiele maar opvallende styling
    const resetButton = document.createElement('button');
    resetButton.className = 'btn mt-3 w-100 d-flex align-items-center justify-content-center';
    resetButton.style.cssText = `
        background-color: #0d6efd !important; /* Bootstrap primary blue */
        background: linear-gradient(145deg, #0d6efd, #0b5ed7) !important;
        color: white !important;
        border: none !important;
        padding: 12px !important;
        transition: all 0.3s ease !important;
        font-weight: 500 !important;
        box-shadow: 0 2px 8px rgba(13, 110, 253, 0.2) !important;
        border-radius: 8px !important;
        opacity: 0.9 !important;
    `;
    resetButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise me-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
        </svg>
        Restablecer progreso
    `;

    // Hover effect voor reset button
    resetButton.addEventListener('mouseenter', () => {
        resetButton.style.cssText += `
            background: linear-gradient(145deg, #0b5ed7, #0a58ca) !important;
            opacity: 1 !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3) !important;
        `;
    });
    resetButton.addEventListener('mouseleave', () => {
        resetButton.style.cssText = `
            background-color: #0d6efd !important;
            background: linear-gradient(145deg, #0d6efd, #0b5ed7) !important;
            color: white !important;
            border: none !important;
            padding: 12px !important;
            transition: all 0.3s ease !important;
            font-weight: 500 !important;
            box-shadow: 0 2px 8px rgba(13, 110, 253, 0.2) !important;
            border-radius: 8px !important;
            opacity: 0.9 !important;
            transform: translateY(0);
        `;
    });
    
    resetButton.onclick = function() {
        if (confirm('¿Está seguro que desea restablecer su progreso de lectura?')) {
            localStorage.removeItem('readArticles');
            readArticles = [];
            markReadArticles();
            updateProgress();
            // Force UI refresh
            dropdownMenu.classList.add('show');
        }
    };

    // Initialisatie
    const sidebarDropdown = document.querySelector('.col-lg-4 .dropdown');
    if (sidebarDropdown) {
        sidebarDropdown.parentElement.insertBefore(progressContainer, sidebarDropdown.nextSibling);
        sidebarDropdown.parentElement.insertBefore(resetButton, progressContainer.nextSibling);
    }

    // Cleanup
    window.addEventListener('beforeunload', () => {
        observers.forEach((observer, element) => observer.unobserve(element));
        observers.clear();
    });

    // Initiële status
    markReadArticles();
    updateProgress();
});