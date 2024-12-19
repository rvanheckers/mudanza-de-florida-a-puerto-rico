document.addEventListener("DOMContentLoaded", function() {
    // Logging toegevoegd voor debugging
    console.log("Document is geladen");
    
    let currentHighlight = -1;
    let highlights = [];

    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let query = document.getElementById('search-input').value.toLowerCase();
        console.log("Zoekopdracht: ", query);
        
        if (query.trim() === '') {
            alert('Por favor ingrese una consulta de búsqueda.');
            return;
        }

        let articles = document.querySelectorAll('article');
        let found = false;

        highlights = [];
        currentHighlight = -1;

        articles.forEach(function(article) {
            let content = article.textContent.toLowerCase();
            article.innerHTML = article.innerHTML.replace(/<mark class="highlight">|<\/mark>/g, "");
            if (content.includes(query)) {
                let regex = new RegExp(query, "gi");
                try {
                    article.innerHTML = article.innerHTML.replace(regex, function(matched) {
                        highlights.push(article);
                        return '<mark class="highlight">' + matched + '</mark>';
                    });
                    article.style.display = '';
                    if (!found) {
                        window.location.hash = '#' + article.id;
                        found = true;
                    }
                } catch (error) {
                    console.error('Error highlighting article:', error);
                }
            } else {
                article.style.display = 'none';
            }
        });

        console.log("Aantal highlights: ", highlights.length);

        if (highlights.length > 0) {
            currentHighlight = 0;
            scrollToHighlight(currentHighlight);
        }

        if (!found) {
            alert('No se encontraron artículos que coincidan con su búsqueda.');
            articles.forEach(function(article) {
                article.style.display = '';
            });
        }
    });

    document.getElementById('prev-button').addEventListener('click', function() {
        if (highlights.length > 0) {
            currentHighlight = (currentHighlight - 1 + highlights.length) % highlights.length;
            scrollToHighlight(currentHighlight);
        } else {
            alert('Por favor ingrese una consulta de búsqueda.');
        }
    });

    document.getElementById('next-button').addEventListener('click', function() {
        if (highlights.length > 0) {
            currentHighlight = (currentHighlight + 1) % highlights.length;
            scrollToHighlight(currentHighlight);
        } else {
            alert('Por favor ingrese una consulta de búsqueda.');
        }
    });

    function scrollToHighlight(index) {
        let element = highlights[index];
        let highlight = element.querySelector('mark.highlight');
        if (highlight) {
            highlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Toevoegen van functionaliteit voor artikel lijst dropdown
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            let targetId = this.getAttribute('href').substring(1);
            let targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });
});
