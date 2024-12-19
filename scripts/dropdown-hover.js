document.addEventListener('DOMContentLoaded', function() {
    // Dropdown tooltips voor artikel menu
    const dropdownItems = document.querySelectorAll('.col-lg-4 .dropdown-item');
    
    dropdownItems.forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'dropdown-tooltip';
            tooltip.textContent = this.getAttribute('data-full-text');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.right + 10}px`;
            tooltip.style.top = `${rect.top}px`;
        });
        
        item.addEventListener('mouseleave', function() {
            const tooltips = document.querySelectorAll('.dropdown-tooltip');
            tooltips.forEach(t => t.remove());
        });
    });

    // Fix voor hoofdnavigatie dropdowns
    const navDropdowns = document.querySelectorAll('.navbar .nav-item.dropdown');
    
    navDropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Desktop hover functionaliteit
        if (window.innerWidth > 992) {
            dropdown.addEventListener('mouseenter', function() {
                dropdownMenu.classList.add('show');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                dropdownMenu.classList.remove('show');
            });
        }
        
        // Mobile click functionaliteit
        dropdownToggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdownMenu.classList.toggle('show');
            }
        });
    });

    const dropdownMenu = document.querySelector('.col-lg-4 .dropdown-menu');
    const dropdownToggle = document.querySelector('.col-lg-4 .dropdown-toggle');
    
    // Open dropdown bij klik
    dropdownToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.add('show');
    });
    
    // Sluit alleen bij klik buiten dropdown area
    document.addEventListener('click', function(e) {
        if (!dropdownMenu.contains(e.target) && !dropdownToggle.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});