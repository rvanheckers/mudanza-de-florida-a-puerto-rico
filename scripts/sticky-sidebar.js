window.addEventListener('scroll', function() {
    var stickyElement = document.querySelector('.position-sticky'); // Selecteer het sticky element
    var stickyContainer = stickyElement.parentElement; // Selecteer de ouder container
    var stickyElementHeight = stickyElement.offsetHeight; // Hoogte van het sticky element
    var stickyContainerHeight = stickyContainer.offsetHeight; // Hoogte van de ouder container
    var stickyElementTop = stickyElement.getBoundingClientRect().top + window.scrollY; // Bovenkant van het sticky element inclusief scrollpositie
    var stickyContainerTop = stickyContainer.getBoundingClientRect().top + window.scrollY; // Bovenkant van de ouder container inclusief scrollpositie

    // Bereken het punt waar het sticky element moet stoppen
    var stopPoint = stickyContainerTop + stickyContainerHeight - stickyElementHeight;
    var scrollPosition = window.scrollY;

    if (scrollPosition > stopPoint) {
        stickyElement.style.position = 'absolute'; // Verander positie naar absoluut
        stickyElement.style.top = (stopPoint - stickyContainerTop) + 'px'; // Zet top op het stoppunt
    } else {
        stickyElement.style.position = 'sticky'; // Zet positie terug naar sticky
        stickyElement.style.top = '20px'; // Zet top terug naar de beginpositie
    }
});

window.addEventListener('resize', function() {
    // Reset the position on resize to handle size changes
    var stickyElement = document.querySelector('.position-sticky');
    stickyElement.style.position = 'sticky';
    stickyElement.style.top = '20px';
});
