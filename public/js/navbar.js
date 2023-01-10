const user_name = document.querySelector("#user_name");

const perfil_usuario = () => {
    let storage = window.localStorage;
    const { user_nombre, user_group_id } = storage;
    console.log(storage);
    let estructura = '';
    // <li id="user_name"></li>
    if(user_group_id == 1){
        estructura+=`
        <a href="/dashboard">Dasbhoard</a>
        <a href="#">${user_nombre}</a>
        `;
    } else{
        estructura +=`
        <a href="#">${user_nombre}</a>

        `;
    }
    user_name.innerHTML = estructura;
} 
window.addEventListener("DOMContentLoaded", perfil_usuario);