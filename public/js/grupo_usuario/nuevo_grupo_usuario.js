const nombre_grupo = document.querySelector("#nombre_grupo");
const enviar_btn = document.querySelector("#enviar_btn");

const enviar = async (e) => {
    e.preventDefault();
    if(
        nombre_grupo.value.trim() === ""
    ){
        alert("Todos los campos son obligatorios");
        return ;
    }
     
    try {
        const form_data = {
            nombre_grupo: nombre_grupo.value
        }
        console.log(form_data);
        const response = await fetch(`${base_url}dashboard/register/nuevo_grupo_usuarios`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: new URLSearchParams(form_data) 
        })
        const result = await response.json();
        console.log(result);
        if(result.error){
            alert(result.error);
        }else{
            alert(result.mensaje);
            window.location.href = `/dashboard/grupo_usuarios`;
        }
    } catch (error) {
        console.log(error);
    }
}

enviar_btn.addEventListener("click", enviar);