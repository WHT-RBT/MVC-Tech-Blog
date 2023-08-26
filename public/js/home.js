document.addEventListener('DOMContentLoaded', () => {
    console.log("Linked to home");

    // Highlights the active nav item
    const navItems = document.querySelectorAll('.navItem');

    if (navItems.length == 2) {
        if (window.location.pathname == '/') {
            navItems[0].classList.add('active');
        }
        if (window.location.pathname == '/login') {
            navItems[1].classList.add('active');
        }
    } else {
        if (window.location.pathname == '/') {
            navItems[0].classList.add('active');
        }
        if (window.location.pathname == '/dashboard') {
            navItems[1].classList.add('active');
        }
        if (window.location.pathname == '/login') {
            navItems[2].classList.add('active');
        }
    }
});
