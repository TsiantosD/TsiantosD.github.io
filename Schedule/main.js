
if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "dark_theme");
}   


document.addEventListener("DOMContentLoaded", function() {
    let theme = localStorage.getItem("theme");
    document.querySelector("body").classList.add(`${theme}`);
    document.querySelector("button").onclick = () => {
        const dark_button = document.querySelector("button");
        // if the current theme is dark and the "light theme" button is clicked
        if (dark_button.innerHTML === "Light Theme") { 
            dark_button.innerHTML = "Dark Theme";
            document.querySelector("body").classList.remove(`${theme}`);
            theme = "light_theme"
            document.querySelector("body").classList.add(`${theme}`);
            localStorage.setItem("theme", theme)
            
            // if the current theme is light and the "dark theme" button is clicked
        } else {
            dark_button.innerHTML = "Light Theme";
            document.querySelector("body").classList.remove(`${theme}`);
            theme = "dark_theme"
            document.querySelector("body").classList.add(`${theme}`);
            localStorage.setItem("theme", theme)
        }
    }
});
