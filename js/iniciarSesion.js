const btnIniciarSesion = document.getElementById('iniciar-sesion');
const inputEmail = document.getElementById('email');
const inputContrasenna = document.getElementById('contrasenna');

//Conexión con el back end
let coleccionUsuarios = [];

const llamarColeccion = async ()=>{
    // coleccionUsuarios = await obtenerDatos('http://localhost:3000/api/obtener-usuarios');
    coleccionUsuarios = await obtenerDatos('https://factura-js.herokuapp.com/api/obtener-usuarios');
    validar();
};

const validar = ()=>{
    let autenticado = false;
    let usuarioR;
    if(inputEmail.value == '' || inputContrasenna.value == ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios!',
        })
    }else{
        coleccionUsuarios.forEach(objUsuario =>{
            if(inputEmail.value == objUsuario.correo && inputContrasenna.value == objUsuario.contrasenna){
                autenticado = true;

                switch(inputEmail.value){
                    case objUsuario.correo:
                        usuarioR = inputEmail.value;
                        break;
                    default:
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Credenciales incorrectos!',
                        })
                        break;
                }
            }
        });
    }

    if(autenticado == true){
        Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión correcto.'
        }).then(() => {
            switch(usuarioR){
                case inputEmail.value:
                    window.location = 'dashboard.html';
                    break;
                default:
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Credenciales incorrectos!',
                    })
                    break;
            }
        });
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Credenciales incorrectos!',
        })
    }
};

btnIniciarSesion.addEventListener('click', llamarColeccion);