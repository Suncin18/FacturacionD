'use strict';

//El metodo para obtener datos es get
const obtenerDatos = async(purl) => {
    let listaDatos = [];
    await axios({
            url: purl,
            method: 'get',
            responseType: 'json'
        })
        .then(response => {
            listaDatos = response.data.lista;
        })
        .catch(error => {
            console.log(error);
        });

    return listaDatos;
};

//El metodo para enviar o registrar datos es post
const registrarDatos = async(purl, pdataJSON) => {
    await axios({
        url: purl,
        method: 'post',
        responseType: 'json',

        //Este data es una palabra reservada del axios y recibe los datos del front end en formato JSON,
        //los pasa al back end y de ahí a la base de datos
        data: pdataJSON
    })

    //La respuesta que recibimos del servidor
    .then(response => {
        console.log('Registrado');
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Ususario registrado exitosamente'
        // });
    })

    //Capturamos el servidor, de haber alguno
    .catch(error => {
        console.log(error);
    });
};

//El metodo para modificar datos es put
// const modificarDatos = async(purl, pdataJSON) => {
//     await axios({
//         url: purl,
//         method: 'post',
//         responseType: 'json',
//         data: pdataJSON
//     })
//     .then(response => {
//         console.log('Modificado');
//         Swal.fire({
//             icon: 'success',
//             title: 'Ususario modificado exitosamente'
//         });
//     })
//     .catch(error => {
//         console.log('ERROR FRONTEND AL MODIFICAR EL USUARIO');
//         console.log(error);
//     });
// };