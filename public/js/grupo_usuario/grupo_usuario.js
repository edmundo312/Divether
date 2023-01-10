const eliminar_grupo_usuarios = async (grupo_usuarios_id) => {
    try {
        const form_data = {
            grupo_usuarios_id: grupo_usuarios_id,
        }
        const response = await fetch(`${base_url}dashboard/eliminar_grupo_usuarios`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                // 'auth-token': storage.token
            },
            body: new URLSearchParams(form_data)
        });
        
        const result = await response.json();
        const { status } = result;
        return status;

    } catch (error) {
        console.log(error);
    }
}

const alerta_eliminar_grupo_usuarios = e => {
    //obtener el proveedor_id a ser eliminado
    console.log(e);
    const { value } = e.path[1].attributes.grupo_usuarios_id;
    //obtener el proveedor_nombre que se quiere eliminar
    const { textContent } = e.path[1].attributes.grupo_usuarios_nombre;
       
    Swal.fire({
        title: `¿Estás seguro de eliminar el <br> grupo de usuarios ${textContent}?`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, eliminar!'
        }).then(async (result) => {
        if (result.isConfirmed) {
            const mensaje = await eliminar_grupo_usuarios(value);
            Swal.fire({
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/dashboard/grupo_usuarios';
            });
        }
    });
}

document.querySelectorAll('[class="eliminar_grupo_usuarios"]').forEach(e =>{
    e.addEventListener('click', alerta_eliminar_grupo_usuarios);
});