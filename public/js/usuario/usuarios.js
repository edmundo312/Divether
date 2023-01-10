const eliminar_usuario = async (usuario_id) => {
    try {
        const form_data = {
            usuario_id: usuario_id,
        }
        const response = await fetch(`${base_url}dashboard/eliminar_usuario`, {
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

const alerta_eliminar_usuario = e => {
    //obtener el proveedor_id a ser eliminado
    console.log(e);
    const { value } = e.path[1].attributes.usuario_id;
    //obtener el proveedor_nombre que se quiere eliminar
    const { textContent } = e.path[1].attributes.usuario_nombre;
       
    Swal.fire({
        title: `¿Estás seguro de eliminar el <br> usuario ${textContent}?`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#198754',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, eliminar!'
        }).then(async (result) => {
        if (result.isConfirmed) {
            const mensaje = await eliminar_usuario(value);
            Swal.fire({
                icon: 'success',
                title: mensaje,
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.href = '/dashboard/usuarios';
            });
        }
    });
}

document.querySelectorAll('[class="eliminar_usuario"]').forEach(e =>{
    e.addEventListener('click', alerta_eliminar_usuario);
});