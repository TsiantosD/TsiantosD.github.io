document.addEventListener("DOMContentLoaded", function() {
    
    const dark_button = document.querySelector("button");
    document.querySelector("button").onclick = () => {
        if (dark_button.innerHTML === "Dark Theme") {
            dark_button.innerHTML = "Light Theme";
            document.querySelector("body").classList.remove("dark_theme")
            document.querySelector("body").classList.add("light_theme")
            
        } else {
            dark_button.innerHTML = "Dark Theme";
            document.querySelector("body").classList.remove("light_theme")
            document.querySelector("body").classList.add("dark_theme")
        }
    }

    

});
