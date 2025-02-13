<script>
document.addEventListener("DOMContentLoaded", function() {
    let lastScrollPosition = window.pageYOffset;
    const navbar = document.getElementById('navbar');

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
</script>