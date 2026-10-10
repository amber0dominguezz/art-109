// console.log ("meow");

// select html elements
let header = document.querySelector("#header");
let changeHeaderButton = document.querySelector("#change-header-button");
let changeThemeButton = document.querySelector("#change-theme-button");


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