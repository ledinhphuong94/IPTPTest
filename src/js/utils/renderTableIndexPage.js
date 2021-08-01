import {logInAccountStorage, getObjectStore} from './indexedDB.js';


// Render table from indexedDB store
export function rendertNoteFromDB() {
    if (logInAccountStorage) {
        let store = getObjectStore("userlist", 'readonly');
        let req = store.get(logInAccountStorage.username);
        req.onsuccess = function (evt) {
            let data = evt.target.result;
            console.log(data)
            renderTableFromIndexedDB(data);
            document.querySelector(".index-page__name").textContent = data.signUpFullName;
        }
        req.onerror = function () {
            console.error(this.error);
        };
    }
}

// Add new row to the table function
export function addRowsToTable(data) {
    let table = document.getElementById("table-note");
    let row = table.insertRow(1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    cell1.innerHTML = data.date;
    cell2.innerHTML = data.comment;
}

// render tables function
export function renderTableFromIndexedDB(accountLogIn) {
    accountLogIn.note.map(item => {
        addRowsToTable(item)
    })
}