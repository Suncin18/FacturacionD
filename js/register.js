const btnRegistrar = document.getElementById('btn-registrar');

const registrarNombre = document.getElementById('nombre-registrar');
const registrarCorreo = document.getElementById('correo-registrar');
const firstPassd = document.getElementById('contrasenna-registrar');
const secondPassd = document.getElementById('rep-contrasenna-registrar');

const validar = ()=>{
    if(registrarNombre.value == '' || registrarCorreo.value == '' || firstPassd.value == '' || secondPassd.value == ''){
        alert('Todos los campos son obligatorios');
    }else if(firstPassd.value != secondPassd.value){
        alert('Las contraseñas deben de ser iguales');
    }else{

        let data = {
            nombre: registrarNombre.value,
            correo: registrarCorreo.value,
            contrasenna: firstPassd.value
        }
        
        // registrarDatos('http://localhost:3000/api/registrar-usuarios', data);
        registrarDatos('https://factura-js.herokuapp.com/api/registrar-usuarios', data);
        alert('registrado éxitosamente '+ registrarNombre.value);
        window.location = 'index.html';
    }
};

btnRegistrar.addEventListener('click', validar);