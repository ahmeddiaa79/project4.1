var email = document.querySelector("#email")
var password = document.querySelector("#password")
var login = document.querySelector("#login")
login.addEventListener("click", function (e) {
    e.preventDefault()
    if (email.value === "" || password.value === "") {
        alert("please full your data")
    }
    else if (localStorage.getItem("email") && localStorage.getItem("password")) {
        if (email.value.trim() === localStorage.getItem("email").trim() && password.value.trim() === localStorage.getItem("password").trim()) {
            alert("your log in is successfully")
            setTimeout(function () {
                window.location = "index.html"
            }, 1500)

        }
        else {
            alert("your email or password is wrong")
        }
    }
    else {
        alert("no acount found please register first")
        setTimeout(function(){
            window.location="register.html"
        },1500)
    }
})