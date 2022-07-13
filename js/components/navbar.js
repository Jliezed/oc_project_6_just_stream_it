/* ---------- NAVBAR & CLOSING BUTTON ---------- */

// Navbar Transparent to Solid on scroll
function navabarTransparent() {
    document.addEventListener("scroll", function () {
        let navbar = document.querySelector(".navbar");
        let scrollDown = window.scrollY;
        if (scrollDown > 100) {
            navbar.classList.add("navbar--solid");
        }
        if (scrollDown < 100) {
            navbar.classList.remove("navbar--solid");
        }
    })
}


// Burger Menu Toggle
function menuBurger() {
    document.querySelector(".burger-icon").addEventListener("click", function () {
        document.querySelector(".burger-nav").classList.toggle("deactivate");
    })
}


export {navabarTransparent, menuBurger};