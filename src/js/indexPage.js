// ------------------------------- Index Page --------------------------------
// Import for webpack
import '../img/note-picture.jpeg'
import '../css/style.css'

import { logInAccountStorage, getObjectStore } from './utils/indexedDB.js'
import { addRowsToTable } from './utils/renderTableIndexPage.js'
import { routing } from './utils/route.js'

let noteContent = document.getElementById("floatingTextarea")
let pickDate = document.getElementById("pickDate")
let addNoteButton = document.getElementById("add-note__save-button")

// Routing url
window.addEventListener("DOMContentLoaded", () => {
    routing()
})

// Pop Up
let addNote = document.getElementById("addNote")
let createNote = document.getElementById("create-note-button")
createNote.addEventListener('click', () => {
    addNote.classList.remove("addNote__active")
})

let closeAddNote = document.querySelector(".addNote__close")
closeAddNote.addEventListener('click', () => {
    addNote.classList.add("addNote__active")
})

// Add note notification 
function addNoteNoti(message) {
    let indexNotification = document.querySelector("#indexNotification")
    indexNotification.style.top = '50px'
    indexNotification.innerHTML = message
    setTimeout(() => {
        indexNotification.style.top = '-100px'
    }, 2000)
}

// sign out
let logoutButton = document.querySelector("#logout-button")
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem("login")
        window.location.href = "./login.html"
    })
}

// Reset after submit
function resetAfterSubmit(data) {
    data.comment = "";
    noteContent.value = "";
    pickDate.value = "";
    flagAddNote = false;
    addNoteButton.disabled = true;
}

// Format date to dd/mm/yy
function reformatDate(dateStr) {
    let dateArray = dateStr.split("-");  
    return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0].substring(2); 
}

// Check empty field 
let flagAddNote = false;
function test(pickDate, noteContent) {
    if (pickDate.value && noteContent.value.trim() !== "") {
        addNoteButton.disabled = false;
        flagAddNote = true;
    } else {
        addNoteButton.disabled = true;
        flagAddNote = false
    }
}
pickDate.addEventListener('change', () => test(pickDate, noteContent))
noteContent.addEventListener('keyup', () => test(pickDate, noteContent))

addNoteButton.addEventListener('click', () => {
    if (flagAddNote) {
        let noteContentObject = {
            date: "",
            comment: ""
        }
        noteContentObject.date = reformatDate(pickDate.value);
        noteContentObject.comment = noteContent.value;

        // Update data to indexedDB
        let store = getObjectStore("userlist", 'readwrite');
        let req = store.get(logInAccountStorage.username);
        req.onsuccess = function (evt) {
            let data = evt.target.result;
            data.note.push(noteContentObject)
            let reqUpdate = store.put(data);
            reqUpdate.onerror = function (event) {
                console.log("error")
            };
            reqUpdate.onsuccess = function (event) {
                console.log("add note success")
                addRowsToTable(noteContentObject);
                resetAfterSubmit(noteContentObject);
            };
            // alert("Add note successfully!. Click OK to continue to write")
            addNoteNoti("✓ Add note successfully")
            addNote.classList.add("addNote__active")
        }

        req.onerror = function () {
            console.error(this.error);
        };

    }
})
