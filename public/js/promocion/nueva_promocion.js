const form = document.querySelector("#form");
const promocion_nombre = document.querySelector('#promocion_nombre');
const promocion_laboratorio_id = document.querySelector('#promocion_laboratorio_id');
// const laboratorio_imagen = document.querySelector('#laboratorio_imagen');
const enviar_btn = document.querySelector("#enviar_btn");
// const base_url = document.querySelector("#base_url").getAttribute("base_url");
console.log('Desde js');
console.log(document.querySelector('.nombre_pdf'));

const agregar_promocion = async(e) => {
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

        // var url = ''
    // if(archivo.value == ''){
    //   url = '';
    // } else {
    // }
    var url = document.getElementById('archivo').files[0].name;
    console.log('multer',url);

        // var url2 = ''
    // if(archivo.value == ''){
    //   url2 = '';
    // } else {
    // }
    var url2 = document.querySelector('.nombre_pdf').files[0].name;
    console.log('multer2',url2);

        const formData = new FormData(form);
        formData.append('promocion_nombre', promocion_nombre.value);
        formData.append('promocion_laboratorio_id', promocion_laboratorio_id.value);
        formData.append('promocion_imagen', url);
        formData.append('promocion_pdf', url2);
        formData.get('archivo');
        // formData.get('archivo_pdf');

        console.log(formData);

        const response = await fetch(`${base_url}dashboard/register/nueva_promocion`, {
            method: "POST",            
            body: formData
        });
        const result = await response.json();
        console.log(result);
        if(result.error){
            alert(result.error);
        }else{
            alert(result.mensaje);
            window.location.href = `/dashboard/promociones`;
        }
    } catch (error) {
        console.log(error);
    }
}

enviar_btn.addEventListener("click", agregar_promocion);