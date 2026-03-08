document.getElementById("signInBtn").addEventListener("click", () => {
    let userNameInputField = document.getElementById("username-input-field");
    let passwordInputField = document.getElementById("password-input-field");
    

    let userNameInputValue = userNameInputField.value;
    let passwordInputValue = passwordInputField.value;

    let userName = "admin";
    let password = "admin123";

    if(userNameInputValue.toLowerCase() === userName) {
           if(passwordInputValue.toLowerCase() === password) {
               window.location.href = "./Home Page/Home-Page.html"
           }
           else {
              alert("Please Enter admin123")
           }
    }
    else {
        alert("Please Enter admin")
    }

    userNameInputField.value = "";
    passwordInputField.value = "";
    
    
})