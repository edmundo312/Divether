const form = document.querySelector("#form");
const laboratorio_nombre = document.querySelector('#laboratorio_nombre');
// const laboratorio_imagen = document.querySelector('#laboratorio_imagen');
const enviar_btn = document.querySelector("#enviar_btn");
// const base_url = document.querySelector("#base_url").getAttribute("base_url");
console.log('Desde js');

const agregar_laboratorio = async(e) => {
    try {
        e.preventDefault();
        // const storage = window.localStorage;
        // if (  modalidad_manejo.value.trim() === "" ) {
        //     Swal.fire(
        //         'Oops...',
        //         'Selecciona una modalidad de manejo',
        //         'warning'
        //     );
        //     return;
        // }

        var url = ''
    if(archivo.value == ''){
      url = '';
    } else {
      url = document.getElementById('archivo').files[0].name;
    }
    console.log('multer',url);

        const formData = new FormData(form);
        formData.append('laboratorio_nombre', laboratorio_nombre.value);
        formData.append('imagen_nombre', url);
        formData.get('archivo');

        console.log(formData);

        const response = await fetch(`${base_url}dashboard/register/nuevo_laboratorio`, {
            method: "POST",            
            body: formData
        });
        const result = await response.json();
        console.log(result);
        if(result.error){
            alert(result.error);
        }else{
            alert(result.mensaje);
            window.location.href = `/dashboard/laboratorios`;
        }
        // Swal.fire({
        //     title: 'Disposición final',
        //     text: 'Se ha recibido el transporte correctamente',
        //     icon: 'success',
        //     confirmButtonText: 'Aceptar',
        // }).then(() => {
        //     window.location.href = `/disposicion_final/principal/1`;
        // });
    } catch (error) {
        console.log(error);
    }
}

enviar_btn.addEventListener("click", agregar_laboratorio);