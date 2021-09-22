// Código para los botones del dashboard nav
const btnNuevoCliente = document.getElementById('nuevo-cliente');
const btnCambiarContrasenna = document.getElementById('cambiar-contrasena');
const btnCerrarSesion = document.getElementById('cerrar-sesion');
const btnHistorial = document.getElementById('historial');

// LLAMAMOS A LOS SCT/DIV QUE OCULTAREMOS O MOSTRAREMOS
const divNuevoCliente = document.getElementById('div-nuevo-cliente');
const sctCambiarContrasenna = document.getElementById('sct-cambiar-contrasenna');
const sctHistorial = document.getElementById('sct-historial');

// OCULTAMOS/MOSTRAMOS LAS OPCIONES
btnNuevoCliente.addEventListener('click', ()=>{
    divNuevoCliente.classList.remove('ocultar');
    sctCambiarContrasenna.classList.add('ocultar');
    sctHistorial.classList.add('ocultar');

    btnNuevoCliente.classList.add('btn_color');
    btnCambiarContrasenna.classList.remove('btn_color');
    btnHistorial.classList.remove('btn_color');
});
btnCambiarContrasenna.addEventListener('click', ()=>{
    sctCambiarContrasenna.classList.remove('ocultar');
    divNuevoCliente.classList.add('ocultar');
    sctHistorial.classList.add('ocultar');

    btnCambiarContrasenna.classList.add('btn_color');
    btnNuevoCliente.classList.remove('btn_color');
    btnHistorial.classList.remove('btn_color');
});

// RECIBO PARA CLiENTE NUEVO
const btnEnviarRecibo = document.getElementById('btn-enviar-recibo');

const nombreCliente = document.getElementById('nombre-cliente');
const detallesPago = document.getElementById('detalles-pago');
const email = document.getElementById('email');
const cantidadPagada = document.getElementById('cantidad-pagada');
const fechaPago = document.getElementById('fecha-pago');

const validar = () => {
    if(nombreCliente.value == '' || detallesPago.value == '' || email.value == '' || cantidadPagada.value == '' || fechaPago.value == ''){
        alert('Todos los campos son requeridos');
    }else{
        let data = {
            nombre: nombreCliente.value,
            detalles: detallesPago.value,
            correo: email.value,
            cantidad: cantidadPagada.value,
            fecha: fechaPago.value
        };
        // registrarDatos('http://localhost:3000/api/registrar-factura', data);
        registrarDatos('https://factura-js.herokuapp.com/api/api/registrar-factura', data);
        alert('Registro completado');

        nombreCliente.value = '';
        detallesPago.value = '';
        email.value = '';
        cantidadPagada.value = '';
        fechaPago.value = '';
    }
};

btnEnviarRecibo.addEventListener('click', validar);

// Llamamos al back end
let coleccionFacturas = [];

const inicializarColeccion = async() => {
    // coleccionFacturas = await obtenerDatos('http://localhost:3000/api/obtener-facturas');
    coleccionFacturas = await obtenerDatos('https://factura-js.herokuapp.com/api/obtener-facturas');
    generarHistorial();
};

//Para ver el historial de facturas
let historialCreado = false;
const generarHistorial = () =>{
    if(historialCreado==false){

        // Seteamos el SPA
        sctHistorial.classList.remove('ocultar');
        sctCambiarContrasenna.classList.add('ocultar');
        divNuevoCliente.classList.add('ocultar');

        btnHistorial.classList.add('btn_color');
        btnCambiarContrasenna.classList.remove('btn_color');
        btnNuevoCliente.classList.remove('btn_color');

        // Llamamos la info del back end
        coleccionFacturas.forEach(objFactura => {
            let divHistorial = document.createElement('div');
            divHistorial.classList.add('historial_titulo');
            let nombreDinamico = document.createElement('h2');
            nombreDinamico.innerText = objFactura.nombre;
            let fechaDinamica = document.createElement('h2');
            fechaDinamica.innerText = objFactura.fecha;

            let divDetalles = document.createElement('div');
            divDetalles.classList.add('historial_detalles');
            let montoPagado = document.createElement('h2');
            montoPagado.innerText = '₡'+objFactura.cantidad;
            let detallesP = document.createElement('p');
            detallesP.innerText = objFactura.detalles;

            sctHistorial.appendChild(divHistorial);
            sctHistorial.appendChild(divDetalles);
            divHistorial.appendChild(nombreDinamico);
            divHistorial.appendChild(fechaDinamica);

            // Los detalles solo se desplegaran una vez que se de click al encabezado
            let display = false;
            divHistorial.addEventListener('click', () =>{
                if(display==false){
                    divDetalles.appendChild(montoPagado);
                    divDetalles.appendChild(detallesP);
                    display = true;
                }else if(display==true){
                    
                    // Ocultamos la info
                    divDetalles.removeChild(montoPagado);
                    divDetalles.removeChild(detallesP);
                    display = false;
                }
            });
        });

        historialCreado=true;
    }

    //Creamos los elementos desde JS
    // <div class="historial_titulo">
    //     <h2>Cliente</h2>
    //     <h2>19/08/2021</h2>
    // </div>
    // <div class="historial_detalles">
    //     <h2>$1,000</h2>
    //     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores dolore vero aliquam odit porro natus facilis, expedita aspernatur veritatis, placeat iure voluptatibus! Eveniet dicta velit quibusdam rem iste labore atque.</p>
    // </div>

    // sctHistorial.appendChild(divDetalles);
    // divDetalles.appendChild(montoPagado);
    // divDetalles.appendChild(detallesP);
};

// inicializarColeccion();
btnHistorial.addEventListener('click', inicializarColeccion);
// btnHistorial.addEventListener('click', generarHistorial);

// CERRAR SESIÓN
btnCerrarSesion.addEventListener('click', ()=>{
    window.location = 'index.html';
});