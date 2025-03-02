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
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Simulate form submission
    const form = e.target;
    const formData = new FormData(form);

    // Display success message
    alert('Thank you for contacting me! I will get back to you soon.');

    // Reset the form
    form.reset();
});
// Toggle "Show More Projects" button text
document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById('toggleProjects');
    const moreProjects = document.getElementById('moreProjects');

    moreProjects.addEventListener('show.bs.collapse', function() {
        toggleButton.textContent = 'Hide Projects';
    });

    moreProjects.addEventListener('hide.bs.collapse', function() {
        toggleButton.textContent = 'Show More Projects';
    });
});