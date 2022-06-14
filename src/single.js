import {
    cargarPartida,
    ocultarBtn,
    between,
    statClase,
    battleLog
} from "./multi.js";

//############### CLASES #####################
//Defino variables globales
let nombreOrigenSP, nombreDestinoSP, expNecesaria = 100;

class PersonajesSP {
    constructor(nombre, clase) {
        this.nombre = nombre;
        this.clase = clase;
        this.vida;
        this.ataque;
        this.defensa;
        this.nivel;
        this.exp;
        this.magicPower;
        this.magicDefense;
    }

    atacar(origen, destino) {
        buscarNombresSP(origen, destino);

        if (nombreOrigenSP.vida == 0) {
            battleLog(`${origen} está muerto. Los muertos no pueden atacar.. o si?`);
        } else if (nombreDestinoSP.vida == 0) {
            battleLog(`Ya dejalo, ${destino} está muerto.`);
        } else if (nombreOrigenSP === nombreDestinoSP) {
            battleLog(`No puedes atacarte a ti mismo.`);
        } else {
            let luckyNumber = between((nombreOrigenSP.ataque - nombreDestinoSP.defensa), nombreOrigenSP.ataque);
            let puntosADescontar = 0;
            let esCrit = (Math.random() * 11);

            if (esCrit > 8) {
                puntosADescontar = Math.round((nombreOrigenSP.ataque - (nombreDestinoSP.defensa / (luckyNumber - 2))) * (luckyNumber - 2));
                battleLog(`<h5>El ataque ha sido critico!</h5>`);
            } else {
                puntosADescontar = Math.round((nombreOrigenSP.ataque - (nombreDestinoSP.defensa / (luckyNumber - 2))));
            }
            dañoRealizado += puntosADescontar;
            if (puntosADescontar < 0) {
                puntosADescontar = 0;
            }
            nombreDestinoSP.vida -= puntosADescontar;
            battleLog(`${origen} ha atacado a ${destino}, quitandole ${puntosADescontar} puntos de vida !`);
            if (nombreDestinoSP.vida <= 0) {
                nombreDestinoSP.vida = 0;
                /*                 document.getElementById(`card-${arrEnemigos.indexOf(nombreDestinoSP)}`).classList.add("cards-kill"); */
            }
            nombreOrigenSP.exp += Math.floor(Math.random() * 20);
            expGanada += nombreOrigenSP.exp;
            expNivelSP(nombreOrigenSP);
            
        }
    };

    curar(origen, destino) {
        buscarNombresSP(origen, destino);

        nombreDestinoSP = nombreOrigenSP;
        if (nombreOrigenSP.vida == 0) {
            battleLog(`${origen} está muerto! Ya no puede curarse.`);
        } else if (nombreDestinoSP.vida == nombreDestinoSP.vidaMax) {
            battleLog(`${destino} ya tiene la vida al máximo.`);
        } else {
            let luckyNumber = between(1, (nombreOrigenSP.vida / 10));
            let puntosASumar = 0;
            let esCrit = (Math.random() * 11);

            if (esCrit > 8) {
                puntosASumar = (Math.ceil((nombreOrigenSP.vida + 20) * 0.15)) * (luckyNumber);
                battleLog("<h5>El efecto ha sido critico!</h5>");
            } else {
                puntosASumar = Math.ceil((nombreOrigenSP.vida + 10) * 0.10);
            }
            curacionRealizada += puntosASumar;
            nombreDestinoSP.vida += puntosASumar;
            battleLog(`${origen} ha curado a ${destino}, sumandole ${puntosASumar} puntos de vida !`);
            nombreOrigenSP.exp += Math.floor(Math.random() * 15);
            expGanada += nombreOrigenSP.exp;
            expNivelSP(nombreOrigenSP);

            if (nombreDestinoSP.vida > nombreDestinoSP.vidaMax) {
                nombreDestinoSP.vida = nombreDestinoSP.vidaMax;
            }
        }
    }

    spell(origen, destino) {
        buscarNombresSP(origen, destino);

        if (nombreOrigenSP.vida == 0) {
            battleLog(`Los muertos no pueden lanzar hechizos!`);
        } else if (nombreDestinoSP.vida == 0) {
            battleLog(`Ya dejalo, ${destino} está muerto.`);
        } else if (nombreOrigenSP === nombreDestinoSP) {
            battleLog(`No puedes atacarte a ti mismo.`);
        } else {
            let luckyNumber = Math.round(between(0, nombreOrigenSP.magicPower));
            let puntosADescontar = 0;
            let esCrit = (Math.random() * 11);

            if (esCrit > 9) {
                puntosADescontar = Math.round((nombreOrigenSP.magicPower - (nombreDestinoSP.magicDefense / (luckyNumber - 4))) * (luckyNumber - 5));
                battleLog(`<h5>El ataque ha sido critico!</h5>`);
            } else {
                puntosADescontar = Math.round((nombreOrigenSP.magicPower - (nombreDestinoSP.magicDefense / (luckyNumber - 2))));
            }

            dañoRealizado += puntosADescontar;
            (puntosADescontar < 0) && (puntosADescontar = 0);

            nombreDestinoSP.vida -= puntosADescontar;


            //FUNCIÓN ASINCRONICA - CAPTURA LOS DATOS DE LA API DE FORMA ALEATORIA Y LOS DEVUELVE DENTRO DEL BATTLE LOG COMO VARIABLE
            async function nombreSpell() {
                let response = await fetch(`https://www.dnd5eapi.co/api/spells/`);
                let resAPI = await response.json();
                let rand = Math.round(Math.random() * 320)
                await battleLog(`${origen} ha utlizado ${resAPI.results[rand].name} sobre ${destino}, quitandole ${puntosADescontar} puntos de vida !`);
            };

            nombreSpell();

            if (nombreDestinoSP.vida <= 0) {
                nombreDestinoSP.vida = 0;
                document.getElementById(`card-${pjActivoSP[0]}`).classList.add("cards-kill");
            }
            nombreOrigenSP.exp += Math.floor(Math.random() * 20);
            expGanada += nombreOrigenSP.exp;
            expNivelSP(nombreOrigenSP);
        }
    }
};

class Enemigos {
    constructor(nombre, vida, vidaMax, ata, def, magP, magD, img) {
        this.nombre = nombre;
        this.vida = vida;
        this.vidaMax = vidaMax;
        this.ataque = ata;
        this.defensa = def;
        this.magicPower = magP;
        this.magicDefense = magD;
        this.img = img;
    }

    atacar(origen, destino) {
        buscarNombresE(origen, destino);

        if (nombreOrigenSP.vida == 0) {
            battleLog(`${origen} está muerto. Los muertos no pueden atacar.. o si?`);
            setTimeout(toGanaste(), 3000);
        } else if (nombreDestinoSP.vida == 0) {
            battleLog(`Ya dejalo, ${destino} está muerto.`);
            setTimeout(toPerdiste(), 3000);
        } else {
            let luckyNumber = between((arrEnemigos[0].ataque - nombreDestinoSP.defensa), arrEnemigos[0].ataque);
            let puntosADescontar = 0;
            let esCrit = (Math.random() * 11);

            if (esCrit > 8) {
                puntosADescontar = Math.round((arrEnemigos[0].ataque - (nombreDestinoSP.defensa / (luckyNumber - 2))) * (luckyNumber - 2));
                battleLog(`<h5>El ataque ha sido critico!</h5>`);
            } else {
                puntosADescontar = Math.round((arrEnemigos[0].ataque - (nombreDestinoSP.defensa / (luckyNumber - 2))));
            }

            dañoRecibido += puntosADescontar;
            if (puntosADescontar < 0) {
                puntosADescontar = 0;
            }
            nombreDestinoSP.vida -= puntosADescontar;
            battleLog(`${origen} ha atacado a ${destino}, quitandole ${puntosADescontar} puntos de vida !`);
            if (nombreDestinoSP.vida <= 0) {
                nombreDestinoSP.vida = 0;
                battleLog(`<h5>${nombreDestinoSP} ha muerto !</h5><br>
                <h5>Has Ganado !</h5>`)
                setTimeout(toGanaste(), 3000);
            }
        }
    };

    curar(origen, destino) {
        buscarNombresE(origen, destino);

        if (arrEnemigos[0].vida == 0) {
            battleLog(`${origen} está muerto! Ya no puede curarse.`);
            setTimeout(toGanaste(), 3000);
        } else if (nombreDestinoSP.vida == 0) {
            battleLog(`Un vendaje no revivira a ${destino}.`);
            setTimeout(toGanaste(), 3000);
        } else if (nombreDestinoSP.vida == nombreDestinoSP.vidaMax) {
            battleLog(`${destino} ya tiene la vida al máximo.`);
        } else {
            let luckyNumber = between(1, (arrEnemigos[0].vida / 10));
            let puntosASumar = 0;
            let esCrit = (Math.random() * 11);

            if (esCrit > 8) {
                puntosASumar = (Math.ceil((arrEnemigos[0].vida + 20) * 0.15)) * (luckyNumber);
                battleLog("<h5>El efecto ha sido critico!</h5>");
            } else {
                puntosASumar = Math.ceil((arrEnemigos[0].vida + 10) * 0.10);
            }
            nombreDestinoSP.vida += puntosASumar;
            battleLog(`${origen} ha curado a ${destino}, sumandole ${puntosASumar} puntos de vida !`);

            if (nombreDestinoSP.vida > nombreDestinoSP.vidaMax) {
                nombreDestinoSP.vida = nombreDestinoSP.vidaMax;
            }
        }
    }

    spell(origen, destino) {
        buscarNombresE(origen, destino);

        if (arrEnemigos[0].vida == 0) {
            battleLog(`Los muertos no pueden lanzar hechizos!`);
            setTimeout(toGanaste(), 3000);
        } else if (nombreDestinoSP.vida == 0) {
            battleLog(`Ya dejalo, ${destino} está muerto.`);
            setTimeout(toPerdiste(), 3000);
        } else if (arrEnemigos[0] === nombreDestinoSP) {
            battleLog(`No puedes atacarte a ti mismo.`);
        } else {
            let luckyNumber = Math.round(between(0, arrEnemigos[0].magicPower));
            let puntosADescontar = 0;
            let esCrit = (Math.random() * 11);

            if (esCrit > 9) {
                puntosADescontar = Math.round((arrEnemigos[0].magicPower - (nombreDestinoSP.magicDefense / (luckyNumber - 4))) * (luckyNumber - 5));
                battleLog(`<h5>El ataque ha sido critico!</h5>`);
            } else {
                puntosADescontar = Math.round((arrEnemigos[0].magicPower - (nombreDestinoSP.magicDefense / (luckyNumber - 2))));
            }

            dañoRecibido += puntosADescontar;
            (puntosADescontar < 0) && (puntosADescontar = 0);

            nombreDestinoSP.vida -= puntosADescontar;
            


            //FUNCIÓN ASINCRONICA - CAPTURA LOS DATOS DE LA API DE FORMA ALEATORIA Y LOS DEVUELVE DENTRO DEL BATTLE LOG COMO VARIABLE
            async function nombreSpell() {
                let response = await fetch(`https://www.dnd5eapi.co/api/spells/`);
                let resAPI = await response.json();
                let rand = Math.round(Math.random() * 320)
                await battleLog(`${origen} ha utlizado ${resAPI.results[rand].name} sobre ${destino}, quitandole ${puntosADescontar} puntos de vida !`);
            };

            nombreSpell();

            if (nombreDestinoSP.vida <= 0) {
                nombreDestinoSP.vida = 0;
            }

        }
    }
};

//############### ARRAYS ####################
let pjActivoSP = [];

let pjBaseSP = new Array(6);
pjBaseSP = [{
        clase: "paladin",
        vida: 170,
        vidaMax: 170,
        ataque: 10,
        defensa: 6,
        magicPower: 9,
        magicDefense: 6,
        nivel: 1
    },
    {
        clase: "cazador",
        vida: 150,
        vidaMax: 150,
        ataque: 13,
        defensa: 6,
        magicPower: 5,
        magicDefense: 6,
        nivel: 1
    },
    {
        clase: "mago",
        vida: 120,
        vidaMax: 120,
        ataque: 5,
        defensa: 3,
        magicPower: 16,
        magicDefense: 12,
        nivel: 1
    },
    {
        clase: "guerrero",
        vida: 200,
        vidaMax: 200,
        ataque: 14,
        defensa: 10,
        magicPower: 3,
        magicDefense: 3,
        nivel: 1
    },
    {
        clase: "brujo",
        vida: 120,
        vidaMax: 120,
        ataque: 6,
        defensa: 2,
        magicPower: 17,
        magicDefense: 11,
        nivel: 1
    },
    {
        clase: "picaro",
        vida: 110,
        vidaMax: 110,
        ataque: 15,
        defensa: 2,
        magicPower: 2,
        magicDefense: 7,
        nivel: 1
    }
];

let arrEnemigos = [];

// ############# FUNCIONES ##################
// ############# FUNCIONES AUX ##################
//buscarNombres adaptado a los arrays del SP
function buscarNombresE(origen, destino) {

    //Reemplazo IF por &&
    arrEnemigos.forEach(element => {
        element.nombre.toLowerCase() == origen.toLowerCase() && (nombreOrigenSP = element);
    });

    //Reemplazo IF por &&
    pjActivoSP.forEach(element => {
        element.nombre.toLowerCase() == destino.toLowerCase() && (nombreDestinoSP = element);
    });
};

function buscarNombresSP(origen, destino) {

    //Reemplazo IF por &&
    pjActivoSP.forEach(element => {
        element.nombre.toLowerCase() == origen.toLowerCase() && (nombreOrigenSP = element);
    });

    //Reemplazo IF por &&
    arrEnemigos.forEach(element => {
        element.nombre.toLowerCase() == destino.toLowerCase() && (nombreDestinoSP = element);
    });
};

function expNivelSP(nombreOrigen) {
    
    while (nombreOrigen.exp > expNecesaria) {
        nombreOrigen.exp -= expNecesaria;
        expNecesaria += 100;
        nombreOrigen.nivel += 1;
        battleLog(`<h5>${nombreOrigen.nombre} ha subido al nivel ${nombreOrigen.nivel}</h5>`);
        nombreOrigen.vida = Math.round(nombreOrigen.vida * 1.12);
        nombreOrigen.vidaMax = Math.round(nombreOrigen.vidaMax * 1.12);
        nombreOrigen.ataque = Math.round(nombreOrigen.ataque * 1.15);
        nombreOrigen.defensa = Math.round(nombreOrigen.defensa * 1.15);
    }
};

//Función randAction = ejecuta una acción al azar del enemigo actual
function randAction() {
    let randN = between(1, 4);
    console.log(Math.round(randN));
    switch (Math.round(randN)) {
        case 1:
            arrEnemigos[0].atacar(arrEnemigos[0].nombre, pjActivoSP[0].nombre)
            break;
        case 2:
            arrEnemigos[0].curar(arrEnemigos[0].nombre, arrEnemigos[0].nombre)
            break;
        case 3:
            arrEnemigos[0].spell(arrEnemigos[0].nombre, pjActivoSP[0].nombre)
            break;

        default:
            arrEnemigos[0].atacar(arrEnemigos[0].nombre, pjActivoSP[0].nombre)
            break;
    }

}

//Abreviación del metodo para atacar
function pjAE(origen, destino) {
    pjActivoSP[0].atacar(origen, destino)
};

//Abreviación del metodo para curarse
function pjCE(origen, destino) {
    pjActivoSP[0].curar(origen, destino)
};

//Abreviación del metodo para Lanzar hechizo
function pjSE(origen, destino) {
    pjActivoSP[0].spell(origen, destino)
};

//Refresca el renderizado de stats
function actualizaStatsSP() {
    document.getElementById("statsE").innerHTML = `
    <p><span>Ataque:</span> ${arrEnemigos[0].ataque}</p>
    <p><span>Defensa:</span> ${arrEnemigos[0].defensa}</p>
    <p><span>Ataque mágico:</span> ${arrEnemigos[0].magicPower}</p>
    <p><span>Defensa mágica:</span> ${arrEnemigos[0].magicDefense}</p>
    `;

    document.getElementById("statsPJSP").innerHTML = `
    <p><span>Ataque:</span> ${pjActivoSP[0].ataque}</p>
    <p><span>Defensa:</span> ${pjActivoSP[0].defensa}</p>
    <p><span>Ataque mágico:</span> ${pjActivoSP[0].magicPower}</p>
    <p><span>Defensa mágica:</span> ${pjActivoSP[0].magicDefense}</p>
    `;

    document.getElementById("div3-mainSP").innerHTML = `
        <img src="${arrEnemigos[0].img}">
        <progress id="vidaPJ" max="${arrEnemigos[0].vidaMax}" value="${arrEnemigos[0].vida}"></progress>
        `;
    document.getElementById("div4-mainSP").innerHTML = `
        <img src="${pjActivoSP[0].img}">
        <progress id="vidaPJ" max="${pjActivoSP[0].vidaMax}" value="${pjActivoSP[0].vida}"></progress>
        `;

}



// Inicializo enemigos
function initEnemies() {
    arrEnemigos.push(new Enemigos("Budoh", 100, 100, 14, 2, 4, 2, `./img/enemy/enemy1.gif`));
    arrEnemigos.push(new Enemigos("Eyedor", 110, 110, 16, 3, 6, 3, `./img/enemy/enemy2.gif`));
    arrEnemigos.push(new Enemigos("Puro Hueso", 125, 125, 19, 5, 9, 5, `./img/enemy/enemy3.gif`));
    arrEnemigos.push(new Enemigos("Gary", 135, 135, 12, 17, 12, 7, `./img/enemy/enemy4.gif`));
    arrEnemigos.push(new Enemigos("Booky", 150, 150, 18, 9, 14, 9, `./img/enemy/enemy5.gif`));
    arrEnemigos.push(new Enemigos("Spiro", 165, 165, 19, 10, 16, 10, `./img/enemy/enemy6.gif`));
    arrEnemigos.push(new Enemigos("Litto", 190, 190, 21, 12, 19, 12, `./img/enemy/enemy7.gif`));
    arrEnemigos.push(new Enemigos("Metrav", 200, 200, 22, 12, 21, 12, `./img/enemy/enemy8.gif`));
    arrEnemigos.push(new Enemigos("Kinua", 210, 210, 24, 15, 24, 15, `./img/enemy/enemy9.gif`));
    arrEnemigos.push(new Enemigos("Blups", 225, 225, 26, 18, 26, 18, `./img/enemy/enemy10.gif`));
    arrEnemigos.push(new Enemigos("Zorito", 250, 250, 30, 16, 32, 16, `./img/enemy/enemy11.gif`));
    arrEnemigos.push(new Enemigos("Vlem", 300, 300, 36, 15, 36, 15, `./img/enemy/enemy12.gif`));
};

// ############# FUNCIONES PRINCIPALES Y QUE SE MUEVEN POR EL FLOW DE LA APP ##################
//Da funcionalidad a los botones de Nueva Partida y Cargar Partida
function initSingle() {
    let number = between(1, 4);
    document.getElementById("seccion-principal-SP").innerHTML += `
    <div class="img-SP">
    <img src="./img/gifs/paladin_0${number}.gif"><img src="./img/gifs/pirata_0${number}.gif"><img src="./img/gifs/mago_0${number}.gif" ><img src="./img/gifs/caballero_0${number}.gif">
    </div>
    `;

    //BOTON INICIAR JUEGO
    let btnIniciar = document.getElementById("btnIniciar-SP");
    btnIniciar.addEventListener("click", () => {
        document.getElementById("seccion-principal-SP").innerHTML = "";
        ocultarBtn("btnIniciar-SP");
        ocultarBtn("btnCP");
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
                }, 114)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('Inicio del juego');

                //INICIA
                toIntro();
            }
        })



    });

    //BOTON CARGAR PARTIDA
    let btnCP = document.getElementById("btnCP");
    btnCP.addEventListener("click", () => {
        document.getElementById("seccion-principal-SP").innerHTML = "";
        ocultarBtn("btnIniciar-SP");
        ocultarBtn("btnCP");
        cargarPartida()
        toLoader()
    })

}

//Renueva la pantalla y Muestra texto introductorio
function toIntro() {
    document.getElementById("title-SP").innerHTML = `
    <h2>Intro</h2>`
    document.getElementById("seccion-principal-SP").classList.add("SPbody");
    document.getElementById("seccion-principal-SP").innerHTML = `
    <div class="wrapper fadein">
    <div class="fadein scroll-text">
    <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime incidunt maiores accusantium eum molestias, cupiditate eius quis laborum qui a, ut in deleniti necessitatibus consectetur debitis quidem dicta repudiandae minima dolor et quibusdam. Ea ut quam voluptate nemo inventore nostrum, repudiandae quae, dolore consequatur beatae culpa exercitationem recusandae perferendis cum voluptatum fugit nobis doloribus neque harum similique facilis.</p>
    <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime incidunt maiores accusantium eum molestias, cupiditate eius quis laborum qui a, ut in deleniti necessitatibus consectetur debitis quidem dicta repudiandae minima dolor et quibusdam. Ea ut quam voluptate nemo inventore nostrum, repudiandae quae, dolore consequatur beatae culpa exercitationem recusandae perferendis cum voluptatum fugit nobis doloribus neque harum similique facilis.</p>
    </div>
    </div>`

    //Asigno ID al timeout a través de una función para poder cortarlo
    let tToCrearPJ;

    function timeoutToCrearPJ() {
        tToCrearPJ = setTimeout(() => {
            toCrearPJ()
        }, 8000);
    }
    // LLamo a la función
    timeoutToCrearPJ();

    setTimeout(() => {
        let buttonNext = document.createElement("div");
        buttonNext.innerHTML = `<button class="buttons fadein btn-next" id="btn-next-Crear-PJ"><span>Siguiente &#8594;</span></button>`;
        document.getElementById("body-sp").appendChild(buttonNext);
        document.getElementById("btn-next-Crear-PJ").addEventListener("click", () => {
            clearTimeout(tToCrearPJ);;
            toCrearPJ();
        });
    }, 1500);

}

//Renderiza la selección del pj
function toCrearPJ() {

    let randBG = between(1, 6);

    document.getElementById("body-sp").innerHTML = `
        <div class="div-title fadein" id="title-SP">
            <h1>Crear PJ</h1>
        </div>
        <section class="fadein crearPJ-container cards" style="background: url(./img/bgi${randBG}.svg) no-repeat center center / cover" id="seccion-principal-SP">
        <div class="div1-crearPJ cards"> 
            <form id="form-clasePJ">
            <input class="formNewPJ" type="radio" placeholder="paladin" name="clase" value="0" checked><span>Paladin</span><br>
            <input class="formNewPJ" type="radio" placeholder="cazador" name="clase" value="1"><span>Cazador</span><br>
            <input class="formNewPJ" type="radio" placeholder="mago" name="clase" value="2"><span>Mago</span><br>
            <input class="formNewPJ" type="radio" placeholder="guerrero" name="clase" value="3"><span>Guerrero</span><br>
            <input class="formNewPJ" type="radio" placeholder="brujo" name="clase" value="4"><span>Brujo</span><br>
            <input class="formNewPJ" type="radio" placeholder="picaro" name="clase" value="5"><span>Picaro</span><br>
            </form>
        </div>
        <div class="div2-crearPJ fadein">
        <form id="formDiv2">
            <img src="./img/char/paladin.png" id="img-crearPJ">
            <input class="formNewPJ" type="text" placeholder="Nombre" id="nombre-crearPJ"required><br>
        </form>
        </div>
        <div class="div3-crearPJ cards fadein" id="stats-crearPJ">

        <p><span>Vida:</span> ${pjBaseSP[0].vida}</p>
        <p><span>Ataque:</span> ${pjBaseSP[0].ataque}</p>
        <p><span>Defensa:</span> ${pjBaseSP[0].defensa}</p>
        <p><span>Ataque mágico:</span> ${pjBaseSP[0].magicPower}</p>
        <p><span>Defensa mágica:</span> ${pjBaseSP[0].magicDefense}</p>

        </div>
        </section>
        <a href="./index.html"><button class="buttons fadein" id="btn-back-i"><span>&#8592; volver</span></button></a>
        `;


    document.getElementById(`form-clasePJ`).addEventListener("click", () => {
        document.getElementById(`img-crearPJ`).src = `./img/char/${document.querySelector('input[name=clase]:checked').placeholder}.png`;

        //Extraigo el valor (que indica la pos en el array)
        let selected = document.querySelector('input[name=clase]:checked').value;
        document.getElementById(`stats-crearPJ`).innerHTML = `        
        
        <p><span>Vida:</span> ${pjBaseSP[selected].vida}</p>
        <p><span>Ataque:</span> ${pjBaseSP[selected].ataque}</p>
        <p><span>Defensa:</span> ${pjBaseSP[selected].defensa}</p>
        <p><span>Ataque mágico:</span> ${pjBaseSP[selected].magicPower}</p>
        <p><span>Defensa mágica:</span> ${pjBaseSP[selected].magicDefense}</p>`;

    })

    let buttonNext = document.createElement("div");
    buttonNext.innerHTML = `<button class="buttons btn-next" id="btn-next-loader"><span>Siguiente &#8594;</span></button>`;
    document.getElementById("body-sp").appendChild(buttonNext);

    document.getElementById("btn-next-loader").addEventListener("click", () => {
        //valido el nombre
        if (document.getElementById(`nombre-crearPJ`).value == "") {
            document.getElementById(`nombre-crearPJ`).focus();
            Swal.fire({
                icon: 'error',
                title: 'Debes darle un nombre al personaje',
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false
            });
            return;
        };

        //Obtengo Nombre y Clase del formulario
        let nombrePJ = document.getElementById(`nombre-crearPJ`).value;
        let clasePJ = document.querySelector('input[name=clase]:checked').placeholder;
        pjActivoSP.push(new PersonajesSP(`${nombrePJ}`, `${clasePJ}`));
        statClase(pjActivoSP);
        toLoader();
    });
}

//Loader + "main" del juego single player
function toLoader() {
    let randBG = between(7, 13);
    setTimeout(() => {
        document.getElementById("body-sp").innerHTML = `
        <div class="loader">
        <div class="lds-dual-ring"></div>
        </div>
        `
        setTimeout(() => {
            document.getElementById("body-sp").innerHTML = `
    <div class="div-title fadein" id="title-SP">
    </div>
    <section class="mainSP fadein" style="background: url(./img/bgi${randBG}.svg) no-repeat center center / cover" id="seccion-principal-SP">
        
        <div class="div1-mainSP" id="battleLog"></div>
        <div class="div7-mainSP cards">
        <div class="div2-mainSP" id="statsE">
        <p><span>Ataque:</span> ${arrEnemigos[0].ataque}</p>
        <p><span>Defensa:</span> ${arrEnemigos[0].defensa}</p>
        <p><span>Ataque mágico:</span> ${arrEnemigos[0].magicPower}</p>
        <p><span>Defensa mágica:</span> ${arrEnemigos[0].magicDefense}</p>
        </div>
        <div class="div3-mainSP" id="div3-mainSP"> <img src="${arrEnemigos[0].img}">
        <progress id="vidaPJ" max="${arrEnemigos[0].vidaMax}" value="${arrEnemigos[0].vida}"></progress> </div>
        </div>
                
        <div class="div8-mainSP cards">
        <div class="div4-mainSP" id="div4-mainSP"> <img src="${pjActivoSP[0].img}">
        <progress id="vidaPJ" max="${pjActivoSP[0].vidaMax}" value="${pjActivoSP[0].vida}"></progress> </div>
        <div class="div5-mainSP" id="statsPJSP">

        <p><span>Ataque:</span> ${pjActivoSP[0].ataque}</p>
        <p><span>Defensa:</span> ${pjActivoSP[0].defensa}</p>
        <p><span>Ataque mágico:</span> ${pjActivoSP[0].magicPower}</p>
        <p><span>Defensa mágica:</span> ${pjActivoSP[0].magicDefense}</p>
        
        </div>
        <div class="div6-mainSP" id="div6-mainSP"> 
            <button class="buttons fadein" id="btnASP"><span>Atacar</span></button> 
            <button class="buttons fadein" id="btnCSP"><span>Curarse</span></button>
            <button class="buttons fadein" id="btnHSP"><span>Hechizo</span></button>
        </div></div>
    </section>
    <button class="buttons btn-next fadein" id="opciones"><span>Opciones</span></button>
    `
            document.getElementById(`opciones`).addEventListener("click", () => {
                alert("Acá va el menu de opciones")
            })

            //Comportamiento de los botones
            document.getElementById(`btnASP`).addEventListener("click", () => {
                movimientos++;
                document.getElementById(`btnASP`).disabled = true;
                document.getElementById(`btnASP`).classList.add("disabledBtn");
                document.getElementById(`btnCSP`).disabled = true;
                document.getElementById(`btnCSP`).classList.add("disabledBtn");
                document.getElementById(`btnHSP`).disabled = true;
                document.getElementById(`btnHSP`).classList.add("disabledBtn");
                pjAE(pjActivoSP[0].nombre, arrEnemigos[0].nombre);
                actualizaStatsSP();

                setTimeout(() => {
                    randAction();
                    actualizaStatsSP();
                }, 2000);

                setTimeout(() => {
                    document.getElementById(`btnASP`).disabled = false;
                    document.getElementById(`btnASP`).classList.remove("disabledBtn");
                    document.getElementById(`btnCSP`).disabled = false;
                    document.getElementById(`btnCSP`).classList.remove("disabledBtn");
                    document.getElementById(`btnHSP`).disabled = false;
                    document.getElementById(`btnHSP`).classList.remove("disabledBtn");
                }, 3000)
            });

            document.getElementById(`btnCSP`).addEventListener("click", () => {
                movimientos++;
                document.getElementById(`btnASP`).disabled = true;
                document.getElementById(`btnASP`).classList.add("disabledBtn");
                document.getElementById(`btnCSP`).disabled = true;
                document.getElementById(`btnCSP`).classList.add("disabledBtn");
                document.getElementById(`btnHSP`).disabled = true;
                document.getElementById(`btnHSP`).classList.add("disabledBtn");
                console.log(pjActivoSP[0].nombre);
                pjCE(pjActivoSP[0].nombre, pjActivoSP[0].nombre);
                actualizaStatsSP();

                setTimeout(() => {
                    randAction();
                    actualizaStatsSP();
                }, 2000);

                setTimeout(() => {
                    document.getElementById(`btnASP`).disabled = false;
                    document.getElementById(`btnASP`).classList.remove("disabledBtn");
                    document.getElementById(`btnCSP`).disabled = false;
                    document.getElementById(`btnCSP`).classList.remove("disabledBtn");
                    document.getElementById(`btnHSP`).disabled = false;
                    document.getElementById(`btnHSP`).classList.remove("disabledBtn");
                }, 3000)
            });

            document.getElementById(`btnHSP`).addEventListener("click", () => {
                movimientos++;
                document.getElementById(`btnASP`).disabled = true;
                document.getElementById(`btnASP`).classList.add("disabledBtn");
                document.getElementById(`btnCSP`).disabled = true;
                document.getElementById(`btnCSP`).classList.add("disabledBtn");
                document.getElementById(`btnHSP`).disabled = true;
                document.getElementById(`btnHSP`).classList.add("disabledBtn");
                pjSE(pjActivoSP[0].nombre, arrEnemigos[0].nombre);
                actualizaStatsSP();

                setTimeout(() => {
                    randAction();
                    actualizaStatsSP();
                }, 2000);

                setTimeout(() => {
                    document.getElementById(`btnASP`).disabled = false;
                    document.getElementById(`btnASP`).classList.remove("disabledBtn");
                    document.getElementById(`btnCSP`).disabled = false;
                    document.getElementById(`btnCSP`).classList.remove("disabledBtn");
                    document.getElementById(`btnHSP`).disabled = false;
                    document.getElementById(`btnHSP`).classList.remove("disabledBtn");
                }, 3000)
            });

        }, 1500);
    }, 300)

    ;
}

//Placa Ganaste
function toGanaste() {
    setTimeout(() => {
        document.getElementById("body-sp").innerHTML = `
        <div class="loader">
        <div class="lds-dual-ring"></div>
        </div>
        `
        setTimeout(() => {
            // Elimino al enemigo derrotado
            arrEnemigos.shift();

            //imprimo stats
            document.getElementById("body-sp").innerHTML = `
            <section class="div-title fadein" id="ganaste">
                <img src="">
                <div>
                    <h2>Resumen batalla</h2>
                    <p>Movimientos realizados: ${movimientos}</p>
                    <p>Daño efectuado: ${dañoRealizado}</p>
                    <p>Curación realizada: ${curacionRealizada}</p>
                    <p>Daño recibido: ${dañoRecibido} </p>
                    <p>Experiencia ganada: ${expGanada} </p>
                    <p>Enemigos derrotados: ${12 - arrEnemigos.length}</p>
                    <p>Enemigos restantes: ${arrEnemigos.length}</p>
                </div>
            </section>
            <section class="div-title fadein" id="ganaste">
                <h1>GANASTE</h1>
                <button class="buttons btn-next fadein" id="ganasteNext"><span>Avanzar</span></button>
            </section>
            `;

            //PowerUp Victoria
            pjActivoSP[0].exp += expGanada;
            expNivelSP(pjActivoSP[0]);
            pjActivoSP[0].vida += 30;
            
            document.getElementById(`ganasteNext`).addEventListener("click", () => {
                toLoader();
            });

        }, 1500);
    }, 300);
}

//Placa perdiste
function toPerdiste() {
    setTimeout(() => {
        document.getElementById("body-sp").innerHTML = `
        <div class="loader">
        <div class="lds-dual-ring"></div>
        </div>
        `
        setTimeout(() => {
            //imprimo stats
            document.getElementById("body-sp").innerHTML = `
            <section class="div-title fadein" id="perdiste">
                <img src="./img/gifs/perdiste.gif">
                <div>
                    <h2>Resumen batalla</h2>
                    <p>Movimientos realizados: ${movimientos}</p>
                    <p>Daño efectuado: ${dañoRealizado}</p>
                    <p>Curación realizada: ${curacionRealizada}</p>
                    <p>Daño recibido: ${dañoRecibido} </p>
                    <p>Experiencia ganada: ${expGanada} </p>
                    <p>Enemigos derrotados: ${12 - arrEnemigos.length}</p>
                    <p>Enemigos restantes: ${arrEnemigos.length}</p>
                </div>
            </section>
            <section class="div-title fadein" id="perdiste">
                <h1>PERDISTE</h1>
                <button class="buttons btn-next fadein" id="ganasteNext"><span>Avanzar</span></button>
            </section>
            `;

            document.getElementById(`reintentar`).addEventListener("click", () => {
                pjActivoSP.push(new PersonajesSP(`${nombrePJ}`, `${clasePJ}`));
                toLoader();
            })
        }, 1500);
    }, 300);
}



// ################### INICIALIZO E IMPRIMO ###################
//Valido que se inicie solo en Single Player
(document.title == 'RPG CLI - SP') && initSingle();
//Inicializo variables de registro
let expGanada = 0, dañoRecibido = 0, dañoRealizado = 0, movimientos = 0, curacionRealizada = 0;
initEnemies();