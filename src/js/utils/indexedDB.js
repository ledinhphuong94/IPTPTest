import {rendertNoteFromDB} from './renderTableIndexPage.js';

export let logInAccountStorage = JSON.parse(localStorage.getItem("login"));

// open indexDB
let db;
export function openDB(){
    console.log("openDb ...");
    let req = indexedDB.open("userDB", 1);
    req.onsuccess = function (evt) {
        db = this.result;
        console.log("openDb DONE");
        if (logInAccountStorage) {
            // Render table from IndexDB
            rendertNoteFromDB();
        }
    };
    req.onerror = function (evt) {
        console.error("openDb:", evt.target.errorCode);
    };
    // open store "userlist" contain the data of all users
    req.onupgradeneeded = function (evt) {
        console.log("openDb.onupgradeneeded");
        evt.target.result.createObjectStore("userlist", { keyPath: 'signUpUsername' });
    };
}

export function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

openDB();