var firstname=document.querySelector("#firstname")
var lastname=document.querySelector("#lastname")
var email=document.querySelector("#email")
var password=document.querySelector("#password")
var register=document.querySelector("#register")
register.addEventListener("click",function(e){
    e.preventDefault()
    if(firstname.value===""||lastname.value===""||email.value===""||password.value===""){
        alert("please full your data")
    }
    else{
        localStorage.setItem("firstname",firstname.value)
        localStorage.setItem("lastname",lastname.value)
        localStorage.setItem("email",email.value)
        localStorage.setItem("password",password.value)
        alert("registration successful")
        setTimeout(function(){
            window.location="login.html"
        },1500)
    }
})