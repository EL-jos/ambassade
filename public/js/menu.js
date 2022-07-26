var nav = document.querySelector("nav");
const posYNav = nav.offsetTop;

window.addEventListener("scroll", (e) => {

    nav.classList.toggle("sticky", window.scrollY > 0)

});