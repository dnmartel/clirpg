// ################### FUNCIONES AUXILIARES ###################

//Defino función auxiliar de busqueda para metodos
function buscarNombres(origen, destino) {
    pjActivo.forEach(element => {
        if (element.nombre.toLowerCase() == origen.toLowerCase()) {
            nombreOrigen = element;
        }
    });
    pjActivo.forEach(element => {
        if (element.nombre.toLowerCase() == destino.toLowerCase()) {
            nombreDestino = element;
        }
    });
};

//Función de experiencia y nivel
function expNivel(nombreOrigen) {
    if (nombreOrigen.exp > 100) {
        nombreOrigen.exp -= 100;
        nombreOrigen.nivel += 1;
        alert(`${nombreOrigen.nombre} ha subido al nivel ${nombreOrigen.nivel}`);
        nombreOrigen.vida = Math.round(nombreOrigen.vida * 1.04);
        nombreOrigen.vidaMax = Math.round(nombreOrigen.vidaMax * 1.04);
        nombreOrigen.ataque = Math.round(nombreOrigen.ataque * 1.06);
        nombreOrigen.defensa = Math.round(nombreOrigen.defensa * 1.06);
    }
};


//Funciones para ocultar y mostrar botones segun ID
function ocultarBtn(ID) {
    let ocultarBtn = document.getElementById(`${ID}`);
    ocultarBtn.classList.add("ocultar");
}

function mostrarBtn(ID) {
    let mostrarBtn = document.getElementById(`${ID}`);
    mostrarBtn.classList.add("mostrar-margin");
    mostrarBtn.classList.remove("ocultar")
}


//Defino variables globales
let nombreOrigen, nombreDestino;

//Funcion numero aleatorio
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
};

//Funciones de apoyo al renderizado de botones
function retornaAQuienID(index) {
    let retornaAQuienID = document.getElementById(`aQuien${index}`);
    return retornaAQuienID.value;
};


// ################### CLASES ###################

//Genero la clase constructora para los personajes
class Personajes {
    constructor(nombre, clase) {
        this.nombre = nombre;
        this.clase = clase;
        this.vida;
        this.ataque;
        this.defensa;
        this.nivel;
        this.exp;
    }

    atacar(origen, destino) {
        buscarNombres(origen, destino);

        if (nombreOrigen.vida == 0) {
            alert(`${origen} está muerto, los muertos no pueden atacar.. o si?`)
        } else if (nombreDestino.vida == 0) {
            alert(`Ya dejalo, ${destino} está muerto.`)
        } else {
            let luckyNumber = between((nombreOrigen.ataque - nombreDestino.defensa), nombreOrigen.ataque);
            let puntosADescontar = 0;
            let esCrit = (Math.random() * 11)
            console.log(esCrit);
            if (esCrit > 8) {
                puntosADescontar = Math.round((nombreOrigen.ataque - (nombreDestino.defensa / luckyNumber)) * luckyNumber);
                alert("El ataque ha sido critico!")
            } else {
                puntosADescontar = Math.round((nombreOrigen.ataque - (nombreDestino.defensa / luckyNumber)));
            }

            if (puntosADescontar < 0) {
                puntosADescontar = 0;
            }
            nombreDestino.vida -= puntosADescontar
            console.log(`${origen} ha atacado a ${destino}, quitandole ${puntosADescontar} puntos de vida !`);
            alert(`${origen} ha atacado a ${destino}, quitandole ${puntosADescontar}  puntos de vida !`);
            if (nombreDestino.vida < 0) {
                nombreDestino.vida = 0;
            }
            nombreOrigen.exp += Math.floor(Math.random() * 20);
            expNivel(nombreOrigen);
        }
    };

    curar(origen, destino) {
        buscarNombres(origen, destino);

        if (nombreOrigen.vida == 0) {
            alert(`${origen} está muerto, los muertos ya no pueden curarse`)
        } else if (nombreDestino.vida == 0) {
            alert(`Un vendaje no revivira a ${destino}.`)
        } else if (nombreDestino.vida == nombreDestino.vidaMax) {
            alert(`${destino} ya tiene la vida al máximo.`)
        } else {
            let luckyNumber = between(1, (nombreOrigen.vida / 10));
            let puntosASumar = 0;
            let esCrit = (Math.random() * 11)
            console.log(esCrit);
            if (esCrit > 7) {
                puntosASumar = (Math.ceil((nombreOrigen.vida + 10) * 0.1)) * luckyNumber;
                alert("El efecto ha sido critico!")
            } else {
                puntosASumar = Math.ceil((nombreOrigen.vida + 1) * 0.1);
            }
            nombreDestino.vida += puntosASumar;
            console.log(`${origen} ha curado a ${destino}, sumandole ${puntosASumar} puntos de vida !`);
            alert(`${origen} ha curado a ${destino}, sumandole ${puntosASumar} puntos de vida !`);
            nombreOrigen.exp += Math.floor(Math.random() * 15);
            expNivel(nombreOrigen);

            if (nombreDestino.vida > nombreDestino.vidaMax) {
                nombreDestino.vida = nombreDestino.vidaMax
            }
        }
    }

    insultar(origen, destino) {
        buscarNombres(origen, destino);
        console.log(`${nombreOrigen.nombre} ha insultado a ${nombreDestino.nombre}! Su moral y experiencia han bajado ! `);
        alert(`${nombreOrigen.nombre} ha insultado a ${nombreDestino.nombre}! Su moral y experiencia han bajado ! `);
        nombreDestino.exp -= Math.floor(Math.random() * 15);
        if (nombreDestino.exp <= 0) {
            nombreDestino.exp = 0;
        }
    }

};

// ################### FUNCIONES PRINCIPALES ###################
// Funcion que agregar stats segun clase   ---- Acá también las defino
function statClase() {

    pjActivo.forEach(element => {
        switch (element.clase.toLowerCase()) {
            case `paladin`:
                element.nivel = 1;
                element.exp = 0;
                element.vida = 170;
                element.vidaMax = 170;
                element.ataque = 9;
                element.defensa = 8;
                element.img = `./img/char/paladin.png`;
                break;
            case `cazador`:
                element.nivel = 1;
                element.exp = 0;
                element.vida = 150;
                element.vidaMax = 150;
                element.ataque = 11;
                element.defensa = 5;
                element.img = `./img/char/cazador.png`;
                break;
            case `mago`:
                element.nivel = 1;
                element.exp = 0;
                element.vida = 120;
                element.vidaMax = 120;
                element.ataque = 13;
                element.defensa = 4;
                element.img = `./img/char/mago.png`;
                break;
            case `guerrero`:
                element.nivel = 1;
                element.exp = 0;
                element.vida = 200;
                element.vidaMax = 200;
                element.ataque = 12;
                element.defensa = 10;
                element.img = `./img/char/guerrero.png`;
                break;
            case `brujo`:
                element.nivel = 1;
                element.exp = 0;
                element.vida = 120;
                element.vidaMax = 120;
                element.ataque = 13;
                element.defensa = 4;
                element.img = `./img/char/brujo.png`;
                break;

            case `picaro`:
                element.nivel = 1;
                element.exp = 0;
                element.vida = 110;
                element.vidaMax = 110;
                element.ataque = 14;
                element.defensa = 2;
                element.img = `./img/char/picaro.png`;
                break;
            default:
                break;
        }
    });
};

//Funcion agrega personajes
function newPJ() {
    let formNewPJID = document.getElementById("formNewPJ");
    let clasesDisponibles = ""
    let arrayClasesDisponibles = [`paladin`, `cazador`, `mago`, `brujo`, `guerrero`, `picaro`];
    arrayClasesDisponibles.forEach(element => {
        clasesDisponibles += `<option>${element}</option> \n`;
    })

    formNewPJID.innerHTML = `<span><span>
    <input class="formNewPJ" type="text" placeholder="Nombre" id="nombreNewPJ"></span></span>
    <select class="formNewPJ" type="text" placeholder="Clase" id="claseNewPJ">
    <option value="0" selected disabled hidden>Clase</option>
    ${clasesDisponibles}
    </select>
    <button class="buttons" id="newPJButton"><span>Crear</span></button>
    `;

    ocultarBtn("btnAP");
    ocultarBtn("btnIniciar");
    ocultarBtn("btnCP");
    ocultarBtn("btnGP");

    /* function aValidar(params) {
        if (params == 0) {
            document.getElementById("claseNewPJ").innerHTML += `<p>Error</p>`
        } 
    } */

    document.getElementById("newPJButton").addEventListener("click", () => {

        pjActivo.push(new Personajes((document.getElementById("nombreNewPJ").value).toLowerCase(), /* aValidar( */document.getElementById("claseNewPJ").value/* ) */));

        statClase();

        printPJ(pjActivo);

        formNewPJID.innerHTML = "";

        mostrarBtn("btnAP");
        mostrarBtn("btnIniciar");
        // LO OCULTO, DE MOMENTO NO LE VEO SENTIDO MOSTRARLO SI YA DECIDI CARGAR PERSONAJE mostrarBtn("btnCP");
    });
};

// Función que imprime PJ en pantalla segun Array
function printPJ(array) {
    let seccionPrincipalID = document.getElementById(`seccion-principal`);

    seccionPrincipalID.innerHTML = " ";
    array.forEach(element => {
        seccionPrincipalID.innerHTML += `
        <div class="container cards">
            <div class="avatar">
                <img src="${element.img}">
            </div>
            <div class="nombre-clase-nivel" id="ncn-${parseInt(pjActivo.indexOf(element))}">
                <span class="nombre-card">${element.nombre}</span><br>
                <span class="clase-card">${element.clase}</span><br>
                <span class="nivel-card"><strong>Nivel: </strong>${element.nivel}</span>
            </div>
        
            <div class="objetivo-label ocultar" id="obj-label-${parseInt(pjActivo.indexOf(element))}">
                <span>Objetivo</span>
            </div>
            <div class="acciones-label ocultar" id="acc-label-${parseInt(pjActivo.indexOf(element))}">
                <span>Acciones</span>
            </div>
            <div class="objetivo-select ocultar" id="obj-${parseInt(pjActivo.indexOf(element))}">
            </div>
            <div class="acciones-botones ocultar" id="acc-${parseInt(pjActivo.indexOf(element))}">
            </div>
            <div class="exp-vida" id="ev-${parseInt(pjActivo.indexOf(element))}">
                <span>
                    <strong>Exp.: </strong>${element.exp}<br>
                    <strong>Vida: </strong>${element.vida}<br>
                </span>
            </div>
            <div class="ata-def" id="atadef-${parseInt(pjActivo.indexOf(element))}">
                <span>
                <strong>Ataque: </strong>${element.ataque}<br>
                <strong>Defensa: </strong>${element.defensa}<br>
                </span>
            </div>
        </div>
        `


    });
};

//Función que refresca la info de los pjs, asignado en botones que modifican valores de objetos en array
function refreshStats(array) {
    array.forEach(element => {
        document.getElementById(`ncn-${parseInt(array.indexOf(element))}`).innerHTML = `
        <span class="nombre-card">${element.nombre}</span><br>
        <span class="clase-card">${element.clase}</span><br>
        <span class="nivel-card"><strong>Nivel: </strong>${element.nivel}</span>`;

        document.getElementById(`ev-${parseInt(array.indexOf(element))}`).innerHTML = `
        <span>
            <strong>Exp.: </strong>${element.exp}<br>
            <strong>Vida: </strong>${element.vida}<br>
        </span>`

        document.getElementById(`atadef-${parseInt(array.indexOf(element))}`).innerHTML = `
        <span>
            <strong>Ataque: </strong>${element.ataque}<br>
            <strong>Defensa: </strong>${element.defensa}<br>
        </span>`
    });

}

//Función que guarda la partida en localStorage
function guardarPartida() {
    localStorage.setItem(`partidaGuardada`, JSON.stringify(pjActivo));
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Partida guardada',
        showConfirmButton: false,
        timer: 1500
    })
}

//Función que carga la partida guardada en localStorage

function cargarPartida() {
    objetoRecuperado = JSON.parse(localStorage.getItem(`partidaGuardada`));

    pjActivo.splice(0, pjActivo.length);
    let indexRec = 0;

    objetoRecuperado.forEach(element => {
        pjActivo.push(new Personajes(element.nombre, element.clase));

        pjActivo[indexRec].vida = element.vida;
        pjActivo[indexRec].ataque = element.ataque;
        pjActivo[indexRec].defensa = element.defensa;
        pjActivo[indexRec].nivel = element.nivel;
        pjActivo[indexRec].exp = element.exp;
        pjActivo[indexRec].vidaMax = element.vidaMax;
        pjActivo[indexRec].img = element.img;

        indexRec += 1;
    });

    printPJ(pjActivo);

    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Partida cargada',
        showConfirmButton: false,
        timer: 1500
    })

    initG();


}

//Funcion que inicia el juego
function initG() {

    let inputAccionesID = "";

    let opcionesSelect;
    pjActivo.forEach(element => {
        opcionesSelect += `<option value="${element.nombre}">${element.nombre}</option> \n`
    })

    pjActivo.forEach(element => {
        inputAccionesID = document.getElementById(`obj-${parseInt(pjActivo.indexOf(element))}`);
        inputAccionesID.innerHTML = `

        <form>
        <select id="aQuien${parseInt(pjActivo.indexOf(element))}">
        <option value="0" selected hidden disabled>Seleccione un objetivo</option>
        ${opcionesSelect}
        </select>
        </form>
        `;
        document.getElementById(`obj-label-${parseInt(pjActivo.indexOf(element))}`).classList.remove("ocultar");
        document.getElementById(`obj-${parseInt(pjActivo.indexOf(element))}`).classList.remove("ocultar");
    });

    pjActivo.forEach(element => {
        accionesID = document.getElementById(`acc-${parseInt(pjActivo.indexOf(element))}`);
        accionesID.innerHTML = `
            <button class="buttons-acciones" onclick=pjA("${element.nombre}",retornaAQuienID(${parseInt(pjActivo.indexOf(element))})),refreshStats(pjActivo) ><span>Atacar</span></button>
            
            <button class="buttons-acciones" onclick=pjC("${element.nombre}",retornaAQuienID(${parseInt(pjActivo.indexOf(element))})),refreshStats(pjActivo) ><span>Curar</span></button>
            
            <button class="buttons-acciones" onclick=pjI("${element.nombre}",retornaAQuienID(${parseInt(pjActivo.indexOf(element))})),refreshStats(pjActivo) ><span>Insultar</span></button>
            `;
        document.getElementById(`acc-label-${parseInt(pjActivo.indexOf(element))}`).classList.remove("ocultar");
        document.getElementById(`acc-${parseInt(pjActivo.indexOf(element))}`).classList.remove("ocultar");

    });

    ocultarBtn("btnAP");
    ocultarBtn("btnIniciar");
    ocultarBtn("btnCP");
    mostrarBtn("btnGP");
    mostrarBtn("btnR");


    document.getElementsByClassName("")

}

//Funcion que reinicia el juego
function resetG() {

    //Restablezco clases de botones
    mostrarBtn("btnAP");
    mostrarBtn("btnIniciar");
    mostrarBtn("btnCP");
    ocultarBtn("btnR");
    ocultarBtn("btnGP");
    //Vacio htmls

    pjActivo.forEach(element => {
        document.getElementById(`obj-${parseInt(pjActivo.indexOf(element))}`).innerHTML = ``;
    });
    pjActivo.forEach(element => {
        document.getElementById(`acc-${parseInt(pjActivo.indexOf(element))}`).innerHTML = ``;
    });

    // Elimino personajes agregados
    pjActivo.splice(0, pjActivo.length);
    pjActivo.push(new Personajes("myle", "paladin"));
    pjActivo.push(new Personajes("brotana", "cazador"));
    statClase();
    printPJ(pjActivo);

};

//Abreviación del metodo para atacar
function pjA(origen, destino) {
    pjActivo[0].atacar(origen, destino)
};

//Abreviación del metodo para curarse
function pjC(origen, destino) {
    pjActivo[0].curar(origen, destino)
};

//Abreviación del metodo para insultar
function pjI(origen, destino) {
    pjActivo[0].insultar(origen, destino)
};

// ################### ARRAYS ###################

//Armo el array donde irán los personajes activos
const pjActivo = [];

pjActivo.push(new Personajes("myle", "paladin"));
pjActivo.push(new Personajes("brotana", "cazador"));


// ################### EVENTOS ###################

//BOTON AÑADIR PERSONAJE
let bntAP = document.getElementById("btnAP");
bntAP.addEventListener("click", newPJ);

//BOTON INICIAR JUEGO
let btnIniciar = document.getElementById("btnIniciar");
btnIniciar.addEventListener("click", () => {

    //SWEET ALERT
    let timerInterval
    Swal.fire({
        title: 'Preparando todo!',
        html: 'Listos en <b></b>...',
        timer: 500,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Inicio del juego');
        }
    })

    //INICIA
    initG();
});

//BOTON RESET
let btnR = document.getElementById("btnR");
btnR.addEventListener("click", () => {
    Swal.fire({
        title: 'Estás seguro?',
        text: "Si no has guardado la partida, se perderá el progreso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#023859',
        cancelButtonColor: '#F26444',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                text: 'Progreso reiniciado!',
                confirmButtonColor: '#023859',
            })
            resetG()
        }

    })


});

//BOTON GUARDAR PARTIDA
let btnGP = document.getElementById("btnGP");
btnGP.addEventListener("click", guardarPartida);

//BOTON CARGAR PARTIDA
let btnCP = document.getElementById("btnCP");
btnCP.addEventListener("click", cargarPartida);



// ################### INICIALIZO E IMPRIMO ###################
statClase();
printPJ(pjActivo);