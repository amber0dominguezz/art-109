// console.log("sup fucker");

let hamburger = document.querySelector(".hamburger");
let menu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
});
