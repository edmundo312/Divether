const form = document.querySelector("#form");
const producto_nombre = document.querySelector('#producto_nombre');
const producto_uso = document.querySelector('#producto_uso');
const producto_descripcion = document.querySelector('#producto_descripcion');
const producto_precio = document.querySelector('#producto_precio');
const producto_laboratorio_id = document.querySelector('#producto_laboratorio_id');
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
        formData.append('producto_nombre', producto_nombre.value);
        formData.append('producto_uso', producto_uso.value);
        formData.append('producto_descripcion', producto_descripcion.value);
        formData.append('producto_precio', producto_precio.value);
        formData.append('producto_laboratorio_id', producto_laboratorio_id.value);
        formData.append('producto_imagen', url);
        formData.get('archivo');

        console.log(formData);

        const response = await fetch(`${base_url}dashboard/register/nuevo_producto`, {
            method: "POST",            
            body: formData
        });
        const result = await response.json();
        console.log(result);
        if(result.error){
            alert(result.error);
        }else{
            alert(result.mensaje);
            window.location.href = `/dashboard/productos`;
        }
    } catch (error) {
        console.log(error);
    }
}

enviar_btn.addEventListener("click", agregar_laboratorio);