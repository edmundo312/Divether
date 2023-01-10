let storage = window.localStorage;

const verify_sesion = () => {
    if(!storage.getItem("loged")){
        window.location.href="/login";
    }    
}

document.addEventListener("DOMContentLoaded", verify_sesion);