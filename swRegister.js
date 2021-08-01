// ------------------------------- Register ServiceWorker --------------------------------
if('serviceWorker' in navigator){
    window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./sw.bundle.js')
        .then(reg => console.log('ServiceWorker Registered',reg))
        .catch(error => console.log(`ServiceWorker Error : ${error}`))
    })
}