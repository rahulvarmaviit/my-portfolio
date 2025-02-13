document.addEventListener("DOMContentLoaded", function() {
    let lastScrollPosition = window.pageYOffset;
    const navbar = document.getElementById('navbar');

    if (!navbar) {
        console.error("Navbar element not found");
        return;
    }

    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;

        if (currentScrollPosition > lastScrollPosition) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollPosition = currentScrollPosition;
    });
});