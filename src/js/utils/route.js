import {logInAccountStorage} from './indexedDB.js'

//  Routing url

export function routing (){
    let currentPath = window.location.pathname
    console.log(currentPath)
    if ((currentPath === '/' || currentPath === '/dist/' || currentPath.includes("index.html")) && logInAccountStorage === null) {
        window.location.href = './login.html'
    }
    if (!currentPath.includes("index.html") && logInAccountStorage !== null) {
        window.location.href = './index.html'
    }
}