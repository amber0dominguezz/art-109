// console.log ("meow");


// select html elements
let header = document.querySelector("#header");
let changeHeaderButton = document.querySelector("#change-header-button");
let changeThemeButton = document.querySelector("#change-theme-button");
let img1 = document.querySelector("#img1");
let img2 = document.querySelector("#img2");
let img3 = document.querySelector("#img3");


// change header with button click
changeHeaderButton.addEventListener("click", () => {
    header.innerHTML = "BOOM HOE!";
})

// toggle color theme

// create function to changing button text
function changeButtonText(){
    if (document.body.classList.contains("dark")) {
        changeThemeButton.textContent = "Switch to Light Theme";
    } else {
        changeThemeButton.textContent = "Switch to Dark Theme";
    }
}


// click event on button
changeThemeButton.addEventListener("click", () => {
    // add dark class to body
    document.body.classList.toggle("dark");
    changeButtonText();
})

// toggle image visibility
img1.addEventListener("click", (event) => {
    img2.classList.remove("hidden");
});

img2.addEventListener("click", (event) => {
    img3.classList.remove("hidden");
});
  