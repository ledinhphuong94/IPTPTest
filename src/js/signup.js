// ------------------------------- Sign Up --------------------------------
// Import for webpack
import '../img/background.jpeg'
import '../css/style.css'

import { nameValidate, usernameValidate, passwordValidate, checkEmpty } from './utils/validation.js';
import { getObjectStore } from './utils/indexedDB.js'
import { routing } from './utils/route.js'

//Routing
window.addEventListener("DOMContentLoaded", () => {
    routing()
})

// variables
let registerUserInfo = {
    signUpFullName: "",
    signUpUsername: "",
    signUpPassword: "",
    note: []
}
let nameValidationFlag = false;
let passwordValidationFlag = false;
let usernameValidateFlag = false;

let signupButton = document.getElementById("signup__submit")

// Reset after submit
function resetFlagAfterRegister() {
    document.getElementById("signUpUsername-notice").textContent = "";
    document.getElementById("signup-form").reset();
    usernameValidateFlag = false;
    nameValidationFlag = false;
    passwordValidationFlag = false;
    registerUserInfo.signUpFullName = ""
    registerUserInfo.signUpPassword = ""
    registerUserInfo.signUpUsername = ""
    signupButton.disabled = true;
}

// Add event listener to all sign up input
let singupInputList = document.getElementsByClassName("signup__input")
Array.from(singupInputList, element => {
    element.addEventListener('keyup', () => {
        registerUserInfo[element.name] = element.value
        if (checkEmpty(registerUserInfo.signUpFullName, registerUserInfo.signUpUsername, registerUserInfo.signUpPassword)) {
            signupButton.disabled = true;
        } else {
            signupButton.disabled = false;

            // Validation
            // validation for Fullname
            if (nameValidate("signUpFullName-notice", registerUserInfo.signUpFullName, "Your name can not contain number, special charecter or just empty space")) {
                nameValidationFlag = true
            } else {
                nameValidationFlag = false
            }

            // validation for username
            if (usernameValidate("signUpUsername-notice", registerUserInfo.signUpUsername, "Username must be at least 3 characters, NO special character or empty space")) {
                usernameValidateFlag = true
            } else {
                usernameValidateFlag = false
            }

            // validation for Password
            if (passwordValidate("signUpPassword-notice", registerUserInfo.signUpPassword, "Your passsword must be at least 5 characters")) {
                passwordValidationFlag = true;
            } else {
                passwordValidationFlag = false;
            }

        }
    })
})

let registerNotice = document.getElementById("signup__notice")
// Signup notice function
function signupNoticeResult(value) {
    if (value === "success") {
        registerNotice.innerHTML = `✓ Register Account successfully! Loading to LogIn Page...`
        registerNotice.style.color = '#01937C'
    }
    if (value === "fail") {
        registerNotice.innerHTML = `✘ Error: please re-check above fields`
        registerNotice.style.color = 'red'
    }
}

signupButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (nameValidationFlag && passwordValidationFlag && usernameValidateFlag) {
        // change username to LowerCase & remove empty space
        let cloneRegisterUserInfo = { ...registerUserInfo, signUpUsername: registerUserInfo.signUpUsername.toLowerCase().trim() }

        // Add userinfo to DB
        let store = getObjectStore("userlist", 'readwrite');
        let req = store.add(cloneRegisterUserInfo);
        req.onsuccess = function (evt) {
            console.log("Insertion in DB successful");
            signupNoticeResult("success")
            // reset after register successfully
            resetFlagAfterRegister()
            // redirect to Log In page
            setTimeout(() => {
                window.location.href = "./login.html"
                registerNotice.innerHTML = ""
            }, 2500)

        };
        req.onerror = function () {
            // If username already existed
            document.getElementById("signUpUsername-notice").textContent = 'Username existed'
            document.getElementById("signUpUsername-notice").style.color = '#F38BA0';
            signupNoticeResult("fail");
            console.error("username existed", this.error);
        };
    } else {
        signupNoticeResult("fail")
    }
})

