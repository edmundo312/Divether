// const base_url = document.querySelector("#base_url").getAttribute("base_url");
const nombre = document.querySelector("#nombre");
const email = document.querySelector("#email");
const telefono = document.querySelector("#telefono");
const ubicacion = document.querySelector("#ubicacion");
const password = document.querySelector("#password");
const confirm = document.querySelector("#confirm");
const user_group_id = document.querySelector("#user_group_id");
const enviar_btn = document.querySelector("#enviar_btn");
let password_confirmation = false;

const enviar = async (e) => {
    e.preventDefault();
    if(
        nombre.value.trim() === "" ||
        email.value.trim() === "" ||
        telefono.value.trim() === "" ||
        ubicacion.value.trim() === "" ||
        password.value.trim() === "" ||
        confirm.value.trim() === "" ||
        password_confirmation === false
    ){
        alert("Todos los campos son obligatorios");
        return ;
    }
     
    try {
        const form_data = {
            nombre: nombre.value,
            email: email.value,
            telefono: telefono.value,
            ubicacion: ubicacion.value,
            password: password.value,
            user_group_id: user_group_id.value
        }
        // console.log(form_data);
        const response = await fetch(`${base_url}api/user/register`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams(form_data) 
        })
        const result = await response.json();
        if(result.error){
            alert(result.error);
        }else{
            alert(result.mensaje);
            window.location.href = `/dashboard/usuarios`;
        }


    } catch (error) {
        console.log(error);
    }
}

const confirm_validation = () => {
    const confirm_message = document.querySelector("#confirm_message");
    if(password.value.trim() === "" || confirm.value.trim() === ""){ return ;}

    if(password.value.trim() === confirm.value.trim()){
        confirm_message.innerText = "Confirmación correcta";
        confirm_message.classList.remove("text-secondary", "text-danger");
        confirm_message.classList.add("text-success");
        password_confirmation = true;
    }else{
        confirm_message.innerText = "Error: Confirmación incorrecta";
        confirm_message.classList.remove("text-secondary", "text-success");
        confirm_message.classList.add("text-danger");
        password_confirmation = false;
    }
}

enviar_btn.addEventListener("click", enviar);
confirm.addEventListener("change", confirm_validation);
password.addEventListener("change", confirm_validation);