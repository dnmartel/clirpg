//Defino variables globales
let nombreOrigen, nombreDestino;

//Defino función auxiliar de busqueda para metodos
function buscarNombres(origen, destino) {
    pjActivo.forEach(element => {
        if (element.nombre == origen) {
            nombreOrigen = element;
        }
    });
    pjActivo.forEach(element => {
        if (element.nombre == destino) {
            nombreDestino = element;
        }
    });
}

//Funcion agrega personajes
function newPJ() {
    pjActivo.push(new Personajes(prompt("Ingresa el nombre del personaje"), prompt("Ingresa la clase del personaje: \n paladin, cazador, guerrero, mago, brujo")));
}

//Función de experiencia y nivel
function expNivel(nombreOrigen) {
    if (nombreOrigen.exp > 100) {
        nombreOrigen.exp -= 100;
        nombreOrigen.nivel += 1;
        alert(`${nombreOrigen.nombre} ha subido al nivel ${nombreOrigen.nivel}`);
        nombreOrigen.vida = Math.round(nombreOrigen.vida * 1.03);
        nombreOrigen.vidaMax = Math.round(nombreOrigen.vidaMax * 1.03);
        nombreOrigen.ataque = Math.round(nombreOrigen.ataque * 1.02);
        nombreOrigen.defensa = Math.round(nombreOrigen.defensa * 1.02);
    }
}

// Funcion que agregar stats segun clase   ---- Acá también las defino
function statClase() {
    pjActivo.forEach(element => {
        switch (element.clase.toLowerCase()) {
            case `paladin`:
                element.nivel = 1;
                element.exp = 0;
                element.vida = 180;
                element.vidaMax = 180;
                element.ataque = 8;
                element.defensa = 7;
                element.img = `./img/char/paladin.png`;
                break;
            case `cazador`:
                element.nivel = 1;
                element.exp = 0;
                element.vida = 150;
                element.vidaMax = 150;
                element.ataque = 10;
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
                element.ataque = 11;
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

            default:
                alert(`la clase especificada no existe`)
                break;
        }
    });
}

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
        let puntosADescontar = nombreOrigen.ataque - nombreDestino.defensa;
        nombreDestino.vida -= puntosADescontar;
        console.log(`${origen} ha atacado a ${destino}, quitandole ${puntosADescontar} puntos de vida !`);
        if (nombreDestino.vida < 0) {
            nombreDestino.vida = 0;
        }
        nombreOrigen.exp += Math.floor(Math.random() * 10);
        expNivel(nombreOrigen);
    };

    curar(origen, destino) {

        buscarNombres(origen, destino);

        let puntosASumar = Math.ceil((nombreOrigen.vida + 1) * 0.05);
        nombreDestino.vida += puntosASumar;
        console.log(`${origen} ha curado a ${destino}, sumandole ${puntosASumar} puntos de vida !`);
        nombreOrigen.exp += Math.floor(Math.random() * 10);
        expNivel(nombreOrigen);

        if (nombreDestino.vida > nombreDestino.vidaMax) {
            nombreDestino.vida = nombreDestino.vidaMax
        }

    }

    insultar(origen, destino) {
        buscarNombres(origen, destino);
        console.log(`${nombreOrigen.nombre} ha insultado a ${nombreDestino.nombre}! Su moral y experiencia han bajado ! `);
        nombreDestino.exp -= Math.floor(Math.random() * 5);
        if (nombreDestino.exp <= 0) {
            nombreDestino.exp = 0;
        }
    }

}

//Armo el array donde irán los personajes activos
const pjActivo = [];

pjActivo.push(new Personajes("myle", "paladin"));
pjActivo.push(new Personajes("brotana", "cazador"))


function printPJ() {
    let nombreImagenID = document.getElementById(`nombreImagen`);
    let statsID = document.getElementById(`stats`);
    nombreImagenID.innerHTML = " ";
    statsID.innerHTML = " ";
    pjActivo.forEach(element => {
        nombreImagenID.innerHTML += "<img src=" + element.img + " </img> <p>" + element.nombre + " </p>";
        statsID.innerHTML += "<p> Nivel: " + element.nivel + "<br>Experiencia: " + element.exp + "<br>Vida: " + element.vida + "<br>Ataque: " + element.ataque + "<br>Defensa: " + element.defensa +" </p> <br><br><br><br>" ;
    });
}

console.log(pjActivo);

/* let parrafo = document.createElement("p")
parrafo.textContent = (<></>) */

//TEST
/* console.log("Estado inicial");
console.log(pjActivo);
pjA("myle", "brotana");
console.log("Luego de recibir ataque")
for (let i = 0; i < 50; i++) {
    pjA("myle", "brotana");
}

for (let i = 0; i < 50; i++) {
    pjC("brotana", "brotana");
}

for (let i = 0; i < 130; i++) {
    pjI("brotana", "myle");
}
alert("oko")
console.log(pjActivo); */



// Atacar
// pjA(prompt("origen"), prompt("destino"));

// Curar
// pjC(prompt("origen"), prompt("destino"));

// Insultar
// pjI(prompt("origen"), prompt("destino"));






statClase();
printPJ();
console.log(pjActivo);

