//variavles glovales
let numeroSecreto = 0;
let intentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let numeroIntentosPosibles = 3;

//funciones de js
//Funcion que coloca texto en los elementos html
function asignarTextoElemento(elemento, texto) {
    let elementoHtml = document.querySelector(elemento);
    elementoHtml.innerHTML = texto;
    return;
}

function recargarPagina() {
    location.reload();
}

//funcion que genera numero secreto
function generarNumeroSecreto() {

    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    //si ya se sorteron todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo) {
        alert(`TODOS LOS NUMEROS FUERON SORTEADOS`);
        recargarPagina();
    } else {
        //si el munero esta en el array 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            //si el numero no esta en el array
            listaNumerosSorteados.push(numeroGenerado);
        }
    }
    return numeroSecreto = numeroGenerado;

}

//funcion realizada cuando se preciona el boton intentar
function verificarIntento() {

    //si aun tenemos intentos disponibles
    if (numeroIntentosPosibles > 1) {

        //optener numero insertado por usuario 
        let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
        //validar que sea el mismo que el programa genero
        if (numeroSecreto === numeroDeUsuario) {
            //mensaje de que es el numero correcto
            asignarTextoElemento('#pistaJuego', `Correcto, acertaste en ${intentos} ${intentos == 1 ? 'vez' : 'veces'}`);
            //nuevo juego
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('intentar').setAttribute('disabled', 'true');
            //en caso de que no acierte
        } else {
            //pistas de numero secreto
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('#pistaJuego', 'El numero secreto es menor');

            } else {
                asignarTextoElemento('#pistaJuego', 'El numero secreto es mayor');
            }

            //decremento intentos posibles
            numeroIntentosPosibles--;
            asignarTextoElemento('#intentosRestantes', `Tienes ${numeroIntentosPosibles} ${numeroIntentosPosibles > 1 ? 'intentos disponibles' : 'intento disponible'}`);
            //incremento contador intentos
            intentos++;
            //limpiar caja
            limpiarCajaNumero();
        }
    }
    else {
        alert('TE HAS QUEDADO SIN INTENTOS, MEJOR SUERTE PARA LA PROXIA');
        recargarPagina();
    }
    return;
}

//funcion de mensajes incio juego
function condicionesIniciales() {

    //dejar contador intentos en 1
    intentos = 1;
    //dejar numeroIntentosPosibles = 3;
    numeroIntentosPosibles = 3;
    //colocar texto a elementos html
    asignarTextoElemento('h1', 'JUEGO DEL NÚMERO SECRETO');
    asignarTextoElemento('#pistaJuego', `Indica un numero del 1 al ${numeroMaximo}`);
    asignarTextoElemento('#intentosRestantes', `Tienes ${numeroIntentosPosibles} ${numeroIntentosPosibles > 1 ? 'intento disponible' : 'intentos disponibles'}`);
    
    //cambiar numero secreto
    numeroSecreto = generarNumeroSecreto();

    //avilitar boton intentar 
    document.getElementById('intentar').removeAttribute('disabled');
    //desabilitar boton nuevo juego
    document.getElementById('reiniciar').setAttribute('disabled', 'true');


}

//funcion de reinicio
function reiniciarJuego() {
    //iniciar juego
    condicionesIniciales();
    //limpiar caja numero
    limpiarCajaNumero();
}

//funcion que limpia el numero ingresado por el usuario
function limpiarCajaNumero() {
    //optiene el numero y lo deja vacio 
    document.querySelector('#valorUsuario').value = '';
    return;
}

//mensajes iniciales
condicionesIniciales();


