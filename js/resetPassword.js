const btnResetContrasenna = document.getElementById('btn-cambiar-contrasenna');
const btnToken = document.getElementById('btn-token');

const inputCorreoCambiar = document.getElementById('correo-cambiar');
const inputContrasenna = document.getElementById('contrasenna');
const inputToken = document.getElementById('token');

//Conexión con el back end
let coleccionUsuarios = [];

const llamarColeccion = async ()=>{
    // coleccionUsuarios = await obtenerDatos('http://localhost:3000/api/obtener-usuarios');
    coleccionUsuarios = await obtenerDatos('https://factura-js.herokuapp.com/api/obtener-usuarios');
};

const validarReset = ()=>{
    if(inputCorreoCambiar.value == '' || inputContrasenna.value == '' || inputToken.value == ''){
        alert('Todos los campos son obligatorios');
    }else{

        //Se modifica la contraseña
        let correoTemporal
        let encontrado = false;
        let nombreUser

        coleccionUsuarios.forEach(objUsuario =>{
            if(inputCorreoCambiar.value == objUsuario.correo && inputToken.value == objUsuario.token){
                
                correoTemporal = objUsuario.correo;
                nombreUser = objUsuario.nombre;
                encontrado = true;

            }
        });

        if(encontrado == true){
            let newData = {
                correo: correoTemporal,
                contrasenna: inputContrasenna.value,
                notificar: false
            }
            // modificarDatos('http://localhost:3000/api/modificar-usuarios', newData);
            modificarDatos('https://factura-js.herokuapp.com/api/modificar-usuarios', newData);
            alert('La contraseña se actualizó para '+nombreUser);
            window.location = 'index.html';
        }else{
            alert('El usuario no fue encontrado');
        }
    }
};

const enviarToken = ()=>{

    //Generamos el token aleatoreamente
    const generarToken = ()=>{
        let token = '';
        let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let numeros = '0123456789';
        for(let i=0; i<3; i++){
            token += letras.charAt(Math.floor(Math.random()*letras.length))
            token += numeros.charAt(Math.floor(Math.random()*numeros.length))
        }
        return token
    }

    let correoEnviarToken = prompt('Ingrese su correo, por favor');

    //Modificamos la BD
    let correoTemporal
    let encontrado = false;
    coleccionUsuarios.forEach(objUsuario =>{
        if(correoEnviarToken == objUsuario.correo){
            correoTemporal = objUsuario.correo;
            encontrado = true;
        }
    });

    if(encontrado == true){
        let newData = {
            correo: correoTemporal,
            notificar: false,
            token: generarToken()
        }
        // modificarDatos('http://localhost:3000/api/modificar-usuarios', newData);
        modificarDatos('https://factura-js.herokuapp.com/api/modificar-usuarios', newData);
        alert('El token se ha enviado al correo '+newData.correo);
    }else{
        alert('El usuario no fue encontrado');
    }
};

btnResetContrasenna.addEventListener('click', validarReset);
btnToken.addEventListener('click', enviarToken);
llamarColeccion();