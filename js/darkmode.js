const elModeBtn = document.querySelector('.mode_btn');
const elBody = document.querySelector('body')
const elLi = document.querySelector('li')

function changeTheme() {
    if(window.localStorage.getItem("theme") == "dark"){
        elBody.classList.add("dark")
    }else {
        elBody.classList.remove("dark")
    }
    if(window.localStorage.getItem("theme") == "dark"){
        elBody.classList.add("color-white")
    }else {
        elBody.classList.remove("color-white")
    }
    

}

var theme = false;
elModeBtn.addEventListener("click", function() {
    theme = !theme

    window.localStorage.setItem("theme", theme ? "dark" : "light");

changeTheme()

})

changeTheme()
