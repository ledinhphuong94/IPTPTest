// Validation function
// - Validation function for empty feild
export function checkEmpty(...value){
    let emptyFlag = true;
    let countEmpty = 0;
    value.map((item, index)=>{
        if(item.trim() === ""){
            return countEmpty++
        }
    })

    if(countEmpty === 0){
        return emptyFlag = false;
    }
    return emptyFlag = true;
}

// - Validation function for fullname
export function nameValidate(id, type, message) {
    let regex = /^[_A-z]*((-|\s)*[_A-z])*$/;
    if (regex.test(type)) {
        document.getElementById(id).textContent = "";
        return true
    } else {
        document.getElementById(id).textContent = message;
        return false
    };
}

// - Validation function for username
export function usernameValidate(id, type, message) {
    let regex = /^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\d.-]{2,19}$/;

    if (regex.test(type)) {
        document.getElementById(id).textContent = "";
        return true
    } else {
        document.getElementById(id).textContent = message;
        document.getElementById(id).style.color = '#F38BA0';
        return false
    };
}

// - Validation function for password
export function passwordValidate(id, type, message) {
    if (type.length >= 5) {
        document.getElementById(id).textContent = "";
        return true
    } else {
        document.getElementById(id).textContent = message
        return false
    };
}