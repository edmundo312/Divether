const contenedor = document.querySelector(".contenedor");
const user = document.querySelector("#user");
const password = document.querySelector("#password");
const btn_login = document.querySelector("#btn_login");

const login = async (e)=> {
    try {
        e.preventDefault();
        const base_url = contenedor.getAttribute("base_url");
        if(
            user.value.trim() === "" || 
            password.value.trim() === ""
        ){
            alert("Todos los campos son requeridos");
            return;
        }
        //checkConnection();
        let login_data = {
            'nombre': user.value,
            'password': password.value
        }
        const response = await fetch(`${base_url}api/user/login`, {              
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams(login_data)
        });
        const result = await response.json();
        if(result.error){
            alert(result.error);
            return;
        }
        let storage = window.localStorage;
        
        storage.setItem("user_nombre", result.user.user_nombre);
        storage.setItem("user_email", result.user.user_email);
        storage.setItem("user_group_id", result.user.user_group_id);
        storage.setItem("token", result.token);
        storage.setItem("loged", true);        
        window.location.href="/";
    } catch (error) {
        console.log(error);
    }
}

btn_login.addEventListener("click", login);