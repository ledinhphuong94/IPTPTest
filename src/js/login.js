// ------------------------------- Log In --------------------------------
// Import for webpack
import '../img/background.jpeg'
import '../css/style.css'

import { getObjectStore } from './utils/indexedDB.js';
import { checkEmpty } from './utils/validation.js';
import { routing } from './utils/route.js';

//Routing
window.addEventListener("DOMContentLoaded", () => {
    routing()
})

let logInAccount = {
    username: "",
    password: "",
}

let loginButton = document.getElementById("login__submit")

// Show password function
function showPassword() {
    let password = document.getElementById("login__input-password")
    password.attributes.type.value === "text" ? password.setAttribute("type", "password") : password.setAttribute("type", "text")
    document.getElementById("eye-open").classList.toggle("activeEye")
    document.getElementById("eye-close").classList.toggle("activeEye")
}
let showPassWord = document.querySelector("#showPassword")
showPassWord.addEventListener('click', showPassword)

// Add value to logInAccount Object
let loginInputList = document.getElementsByClassName("login-input")
Array.from(loginInputList, element => {
    element.addEventListener('keyup', () => {
        logInAccount[element.name] = element.value
        // Check null --> dissble login button
        if (checkEmpty(logInAccount.username, logInAccount.password)) {
            loginButton.disabled = true;
        } else {
            loginButton.disabled = false;
        }
    })
})

// Log In Result Notice function
function logInNoticeResult(value) {
    let loginNotice = document.getElementById("login__notice")
    if (value === "success") {
        loginNotice.innerHTML = `✓ Log In Successfull. Loading to Index Page...`
        loginNotice.style.color = "#01937C"
    }
    if (value === "fail") {
        loginNotice.innerHTML = `✘ Wrong username or password`
        loginNotice.style.color = "red"
    }
}

loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    // change username to LowerCase
    let cloneLogInAccount = { ...logInAccount, username: logInAccount.username.toLowerCase() }
    // Authorize log in account
    // Get user info in DB
    let store = getObjectStore("userlist", 'readonly');
    let req;
    req = store.get(logInAccount.username);
    req.onsuccess = function (evt) {

        if (logInAccount.username === req?.result?.signUpUsername && logInAccount.password === req?.result?.signUpPassword) {
            // save to local storage login info
            localStorage.setItem('login', JSON.stringify(cloneLogInAccount));

            logInNoticeResult("success")

            setTimeout(() => {
                window.location.href = "./index.html";
                if (registerNotice) {
                    registerNotice.textContent = "";
                }
            }, 1500)

        } else {
            logInNoticeResult("fail")
        }
    };
    req.onerror = function () {
        console.error(this.error);
    };

})


