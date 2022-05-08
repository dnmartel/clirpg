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
        nombreOrigen.ataque = Math.round(nombreOrigen.ataque * 1.03);
        nombreOrigen.defensa = Math.round(nombreOrigen.defensa * 1.03);
    }
};

//Defino variables globales
let nombreOrigen, nombreDestino;

//Funcion numero aleatorio
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
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
                puntosADescontar = Math.round((nombreOrigen.ataque - nombreDestino.defensa) * luckyNumber);
                alert("El ataque ha sido critico!")
            } else {
                puntosADescontar = Math.round((nombreOrigen.ataque - nombreDestino.defensa));
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
        if (nombreDestino.vida == nombreDestino.vidaMax) {
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
//Funcion agrega personajesm
function newPJ() {
    pjActivo.push(new Personajes(prompt("Ingresa el nombre del personaje").toLowerCase(), prompt("Ingresa la clase del personaje: \n\nPaladin\nCazador\nGuerrero\nMago\nBrujo\nPicaro").toLowerCase()));
};

// Funcion que agregar stats segun clase   ---- Acá también las defino
function statClase() {
    do {
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
                    repeat = false;
                    break;
                case `cazador`:
                    element.nivel = 1;
                    element.exp = 0;
                    element.vida = 150;
                    element.vidaMax = 150;
                    element.ataque = 11;
                    element.defensa = 5;
                    element.img = `./img/char/cazador.png`;
                    repeat = false;
                    break;
                case `mago`:
                    element.nivel = 1;
                    element.exp = 0;
                    element.vida = 120;
                    element.vidaMax = 120;
                    element.ataque = 13;
                    element.defensa = 4;
                    element.img = `./img/char/mago.png`;
                    repeat = false;
                    break;
                case `guerrero`:
                    element.nivel = 1;
                    element.exp = 0;
                    element.vida = 200;
                    element.vidaMax = 200;
                    element.ataque = 12;
                    element.defensa = 10;
                    element.img = `./img/char/guerrero.png`;
                    repeat = false;
                    break;
                case `brujo`:
                    element.nivel = 1;
                    element.exp = 0;
                    element.vida = 120;
                    element.vidaMax = 120;
                    element.ataque = 13;
                    element.defensa = 4;
                    element.img = `./img/char/brujo.png`;
                    repeat = false;
                    break;

                case `picaro`:
                    element.nivel = 1;
                    element.exp = 0;
                    element.vida = 110;
                    element.vidaMax = 110;
                    element.ataque = 14;
                    element.defensa = 2;
                    element.img = `./img/char/picaro.png`;
                    repeat = false;
                    break;
                default:
                    alert(`la clase especificada no existe`);
                    element.clase = prompt("Ingresa la clase del personaje: \n\nPaladin\nCazador\nGuerrero\nMago\nBrujo").toLowerCase();
                    repeat = true;
                    break;
            }
        });
    } while (repeat);
};

// Función que imprime PJ en pantalla
function printPJ() {
    let nombreImagenID = document.getElementById(`nombreImagen`);
    let statsID = document.getElementById(`stats`);

    nombreImagenID.innerHTML = " ";
    statsID.innerHTML = " ";
    pjActivo.forEach(element => {
        nombreImagenID.innerHTML += "<img src=" + element.img + " </img> <p>" + element.nombre + ` <br> ${element.clase}` + " </p>";
        statsID.innerHTML += "<p> <strong>Nivel:</strong> " + element.nivel + "<br><strong>Experiencia:</strong> " + element.exp + "<br><strong>Vida:</strong> " + element.vida + "<br><strong>Ataque:</strong> " + element.ataque + "<br><strong>Defensa:</strong> " + element.defensa + " </p>";
    });
};

//Funcion que inicia el juego
function initG() {
    let accionesID = document.getElementById(`acciones`);
    accionesID.innerHTML = "";
    pjActivo.forEach(element => {
        accionesID.innerHTML += `<div class=acciones id=acc-` + (parseInt(pjActivo.indexOf(element)) + 1) + `> <button name=btnA` + (parseInt(pjActivo.indexOf(element)) + 1) + ` class=ocultar onclick=pjA(` + `"${element.nombre}",` + `"brotana",` + `1),printPJ()` + `>Atacar</button><button name=btnC` + (parseInt(pjActivo.indexOf(element)) + 1) + ` class=ocultar onclick=pjC(` + `"${element.nombre}",` + `"${element.nombre}",` + `1),printPJ()` + `>Curarse</button><button name=btnI` + (parseInt(pjActivo.indexOf(element)) + 1) + ` class=ocultar onclick=pjI(` + `"${element.nombre}",` + `"${(element.nombre)}",` + `1),printPJ()` + `>Insultar</button></div>`;
    });

    let inputAccionesID = document.getElementById(`inputAcciones`);
    inputAccionesID.innerHTML = "";
    pjActivo.forEach(element => {
        inputAccionesID.innerHTML += `<form><input type="text" placeholder="A quien?" id="aQuien-` + (parseInt(pjActivo.indexOf(element)) + 1) + `">
    <input type="number" placeholder="Cuantas veces?" name="repeticiones-` + (parseInt(pjActivo.indexOf(element)) + 1) + `"></form>`;
    });

    let ocultarBtn = document.getElementById("btnAP");
    ocultarBtn.className = "ocultar";
    ocultarBtn = document.getElementById("btnIniciar");
    ocultarBtn.className = "ocultar";

    let mostrarBtn = document.getElementById("btnR");
    mostrarBtn.className = "";
};

//Funcion que reinicia el juego
function resetG() {
    let ocultarBtn = document.getElementById("btnAP");
    ocultarBtn.className = "";
    ocultarBtn = document.getElementById("btnIniciar");
    ocultarBtn.className = "";

    let mostrarBtn = document.getElementById("btnR");
    mostrarBtn.className = "ocultar";

    let accionesID = document.getElementById(`acciones`);
    accionesID.innerHTML = "";

    let inputAccionesID = document.getElementById(`inputAcciones`);
    inputAccionesID.innerHTML = "";

    pjActivo.splice(2, 10);
    printPJ();
};

//Abreviación del metodo para atacar
function pjA(origen, destino, repeticiones) {
    /* let quienID = document.getElementById(`quien`) */
    /*     let aQuienID = document.getElementById(`aQuien-${(parseInt(pjActivo.indexOf(element)) + 1)}`).value;
        let repeticionesID = document.getElementById(`repeticiones-${(parseInt(pjActivo.indexOf(element)) + 1)}`).value; */
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
printPJ();


// ################### EVENTOS ###################

//BOTON AÑADIR PERSONAJE
let bntAP = document.getElementById("btnAP");
bntAP.addEventListener("click", () => {
    newPJ();
    statClase();
    printPJ()
});

//BOTON INICIAR JUEGO
let btnIniciar = document.getElementById("btnIniciar");
btnIniciar.addEventListener("click", initG);

//BOTON RESET
let btnR = document.getElementById("btnR");
btnR.addEventListener("click", resetG);