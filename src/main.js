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
    ocultarBtn.className = "ocultar";
}

function mostrarBtn(ID) {
    let mostrarBtn = document.getElementById(`${ID}`);
    mostrarBtn.className = "";
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

function retornaRepetID(index) {
    let retornaRepetID = document.getElementById(`repeticiones${index}`);
    return retornaRepetID.value;
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

    atacar(origen, destino, repeticiones = 1) {
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
            nombreDestino.vida -= (puntosADescontar * repeticiones)
            console.log(`${origen} ha atacado a ${destino}, quitandole ${puntosADescontar * repeticiones} puntos de vida !`);
            alert(`${origen} ha atacado a ${destino}, quitandole ${puntosADescontar * repeticiones}  puntos de vida !`);
            if (nombreDestino.vida < 0) {
                nombreDestino.vida = 0;
            }
            nombreOrigen.exp += Math.floor(Math.random() * 20);
            expNivel(nombreOrigen);
        }
    };

    curar(origen, destino, repeticiones = 1) {
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
            nombreDestino.vida += puntosASumar * repeticiones;
            console.log(`${origen} ha curado a ${destino}, sumandole ${puntosASumar * repeticiones} puntos de vida !`);
            alert(`${origen} ha curado a ${destino}, sumandole ${puntosASumar * repeticiones} puntos de vida !`);
            nombreOrigen.exp += Math.floor(Math.random() * 15);
            expNivel(nombreOrigen);

            if (nombreDestino.vida > nombreDestino.vidaMax) {
                nombreDestino.vida = nombreDestino.vidaMax
            }
        }
    }

    insultar(origen, destino, repeticiones = 1) {
        buscarNombres(origen, destino);
        console.log(`${nombreOrigen.nombre} ha insultado a ${nombreDestino.nombre} ${repeticiones} veces! Su moral y experiencia han bajado ! `);
        alert(`${nombreOrigen.nombre} ha insultado a ${nombreDestino.nombre}! Su moral y experiencia han bajado ! `);
        nombreDestino.exp -= Math.floor(Math.random() * 15) * repeticiones;
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

    formNewPJID.innerHTML = `
    <input type="text" placeholder="Nombre" id="nombreNewPJ">
    <select type="text" placeholder="Clase" id="claseNewPJ">
    <option selected disabled hidden>Clase</option>
    ${clasesDisponibles}
    </select>
    <button id="newPJButton">Crear</button>
    `;

    document.getElementById("newPJButton").addEventListener("click", () => {

        pjActivo.push(new Personajes((document.getElementById("nombreNewPJ").value).toLowerCase(), document.getElementById("claseNewPJ").value));

        statClase();

        printPJ(pjActivo);

        formNewPJID.innerHTML = "";
    });
};

// Función que imprime PJ en pantalla segun Array
function printPJ(array) {
    let nombreImagenID = document.getElementById(`nombreImagen`);
    let statsID = document.getElementById(`stats`);

    nombreImagenID.innerHTML = " ";
    statsID.innerHTML = " ";
    array.forEach(element => {
        nombreImagenID.innerHTML += "<img src=" + element.img + " </img> <p>" + element.nombre + ` <br> ${element.clase}` + " </p>";
        statsID.innerHTML += "<p> <strong>Nivel:</strong> " + element.nivel + "<br><strong>Experiencia:</strong> " + element.exp + "<br><strong>Vida:</strong> " + element.vida + "<br><strong>Ataque:</strong> " + element.ataque + "<br><strong>Defensa:</strong> " + element.defensa + " </p>";
    });
};

//Función que guarda la partida en localStorage
function guardarPartida() {
    localStorage.setItem(`partidaGuardada`, JSON.stringify(pjActivo));
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

    console.log(pjActivo);
    printPJ(pjActivo);

    initG();
}

//Funcion que inicia el juego
function initG() {
    let accionesID = document.getElementById(`acciones`);
    accionesID.innerHTML = "";
    pjActivo.forEach(element => {
        accionesID.innerHTML += `
            <div class=acciones id=acc-${parseInt(pjActivo.indexOf(element))}>

            <button class=ocultar onclick=pjA("${element.nombre}",retornaAQuienID(${parseInt(pjActivo.indexOf(element))}),retornaRepetID(${parseInt(pjActivo.indexOf(element))})),printPJ(pjActivo) >Atacar</button>
            <button class=ocultar onclick=pjC("${element.nombre}",retornaAQuienID(${parseInt(pjActivo.indexOf(element))}),retornaRepetID(${parseInt(pjActivo.indexOf(element))})),printPJ(pjActivo) >Curarse</button>
            <button class=ocultar onclick=pjI("${element.nombre}",retornaAQuienID(${parseInt(pjActivo.indexOf(element))}),retornaRepetID(${parseInt(pjActivo.indexOf(element))})),printPJ(pjActivo) >Insultar</button>
            
            </div>`;
    });

    let inputAccionesID = document.getElementById(`inputAcciones`);
    inputAccionesID.innerHTML = "";

    let opcionesSelect;
    pjActivo.forEach(element => {
        opcionesSelect += `<option value="${element.nombre}">${element.nombre}</option> \n`
    })

    pjActivo.forEach(element => {
        inputAccionesID.innerHTML += `

        <form>
        <select id="aQuien${parseInt(pjActivo.indexOf(element))}">
        <option value="${element.nombre}" selected hidden disabled>${element.nombre}</option>
        ${opcionesSelect}
        </select>
        <input type="number" placeholder="Cuantas veces?" value="1" min="1" max="5" id="repeticiones${parseInt(pjActivo.indexOf(element))}">
        </form>
        `;
    });

    ocultarBtn("btnAP");
    ocultarBtn("btnIniciar");
    mostrarBtn("btnR");
}

//Funcion que reinicia el juego
function resetG() {
    //Restablezco clases de botones
    mostrarBtn("btnAP");
    mostrarBtn("btnIniciar");
    ocultarBtn("btnR");
    //Vacio htmls
    let accionesID = document.getElementById(`acciones`);
    accionesID.innerHTML = "";
    let inputAccionesID = document.getElementById(`inputAcciones`);
    inputAccionesID.innerHTML = "";

    // Elimino personajes agregados
    printPJ(pjOriginales);
    pjActivo.splice(2, pjActivo.length);
};

//Abreviación del metodo para atacar
function pjA(origen, destino, repeticiones) {
    pjActivo[0].atacar(origen, destino, repeticiones)
};

//Abreviación del metodo para curarse
function pjC(origen, destino, repeticiones) {
    pjActivo[0].curar(origen, destino, repeticiones)
};

//Abreviación del metodo para insultar
function pjI(origen, destino, repeticiones) {
    pjActivo[0].insultar(origen, destino, repeticiones)
};

// ################### ARRAYS ###################

//Armo el array donde irán los personajes activos
const pjActivo = [];

pjActivo.push(new Personajes("myle", "paladin"));
pjActivo.push(new Personajes("brotana", "cazador"));


// ################### INICIALIZO E IMPRIMO ###################
statClase();
printPJ(pjActivo);

//Backup de PJ originales
const pjOriginales = pjActivo.map(x => x);

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
        timer: 1000,
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
            console.log('Me cerré')
        }
    })

    //INICIA
    initG();
});

//BOTON RESET
let btnR = document.getElementById("btnR");
btnR.addEventListener("click", resetG);

//BOTON GUARDAR PARTIDA
let btnGP = document.getElementById("btnGP");
btnGP.addEventListener("click", guardarPartida);

//BOTON CARGAR PARTIDA
let btnCP = document.getElementById("btnCP");
btnCP.addEventListener("click", cargarPartida);