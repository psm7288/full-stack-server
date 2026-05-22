const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(function (link) {
    const href = link.getAttribute("href");

    if (href === currentPath) {
        link.classList.add("active");
    }
});