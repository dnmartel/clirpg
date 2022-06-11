import {
    Personajes,
    cargarPartida,
    ocultarBtn,
    between,
    statClase
} from "./multi.js";

//############### CLASES #####################
class Enemigos {
    constructor(asd) {
        this.asd = asd;
    }
}

//############### ARRAYS ####################
let pjActivoSP = [];

let pjBaseSP = new Array(6);
pjBaseSP = [{
        clase: "paladin",
        vida: 170,
        ataque: 10,
        defensa: 6,
        magicPower: 9,
        magicDefense: 6
    },
    {
        clase: "cazador",
        vida: 150,
        ataque: 13,
        defensa: 6,
        magicPower: 5,
        magicDefense: 6
    },
    {
        clase: "mago",
        vida: 120,
        ataque: 5,
        defensa: 3,
        magicPower: 16,
        magicDefense: 12
    },
    {
        clase: "guerrero",
        vida: 200,
        ataque: 14,
        defensa: 10,
        magicPower: 3,
        magicDefense: 3
    },
    {
        clase: "brujo",
        vida: 120,
        ataque: 6,
        defensa: 2,
        magicPower: 17,
        magicDefense: 11
    },
    {
        clase: "picaro",
        vida: 110,
        ataque: 15,
        defensa: 2,
        magicPower: 2,
        magicDefense: 7
    }
];

let arrEnemigos = [];

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

function toLoader() {
    setTimeout(() => {
        document.getElementById("body-sp").innerHTML = `
        <div class="loader">
        <div class="lds-dual-ring"></div>
        </div>
        `
        setTimeout(() => {
            document.getElementById("body-sp").innerHTML = `
    <div class="div-title fadein" id="title-SP">
        <h1> </h1>
    </div>
    <section id="seccion-principal-SP">
    a
    </section>
    <button class="buttons btn-next" id="opciones"><span>Opciones</span></button>
    `
        }, 1500);
    }, 300);
}

//Renueva la pantalla y Muestra texto introductorio
function toIntro() {
    document.getElementById("title-SP").innerHTML = `
    <h2>Intro</h2>`
    document.getElementById("seccion-principal-SP").classList.add("SPbody");
    document.getElementById("seccion-principal-SP").innerHTML = `
    <div class="wrapper">
    <div class="fadein scroll-text">
    <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime incidunt maiores accusantium eum molestias, cupiditate eius quis laborum qui a, ut in deleniti necessitatibus consectetur debitis quidem dicta repudiandae minima dolor et quibusdam. Ea ut quam voluptate nemo inventore nostrum, repudiandae quae, dolore consequatur beatae culpa exercitationem recusandae perferendis cum voluptatum fugit nobis doloribus neque harum similique facilis.</p>
    <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime incidunt maiores accusantium eum molestias, cupiditate eius quis laborum qui a, ut in deleniti necessitatibus consectetur debitis quidem dicta repudiandae minima dolor et quibusdam. Ea ut quam voluptate nemo inventore nostrum, repudiandae quae, dolore consequatur beatae culpa exercitationem recusandae perferendis cum voluptatum fugit nobis doloribus neque harum similique facilis.</p>
    </div>
    </div>`

    setTimeout(() => {
        let buttonNext = document.createElement("div");
        buttonNext.innerHTML = `<button class="buttons fadein btn-next" id="btn-next-Crear-PJ"><span>Siguiente &#8594;</span></button>`;
        document.getElementById("body-sp").appendChild(buttonNext);
        document.getElementById("btn-next-Crear-PJ").addEventListener("click", toCrearPJ)
    }, 1000);

    setTimeout(() => {
        /*         document.getElementById("seccion-principal-SP").innerHTML = `

                <div class="fadein fixed-text">
                <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime incidunt maiores accusantium eum molestias, cupiditate eius quis laborum qui a, ut in deleniti necessitatibus consectetur debitis quidem dicta repudiandae minima dolor et quibusdam. Ea ut quam voluptate nemo inventore nostrum, repudiandae quae, dolore consequatur beatae culpa exercitationem recusandae perferendis cum voluptatum fugit nobis doloribus neque harum similique facilis.</p>
                <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime incidunt maiores accusantium eum molestias, cupiditate eius quis laborum qui a, ut in deleniti necessitatibus consectetur debitis quidem dicta repudiandae minima dolor et quibusdam. Ea ut quam voluptate nemo inventore nostrum, repudiandae quae, dolore consequatur beatae culpa exercitationem recusandae perferendis cum voluptatum fugit nobis doloribus neque harum similique facilis.</p>
                </div>
            ` */
        toCrearPJ();
    }, 2000)
}

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
        <div class="div2-crearPJ">
        <form id="formDiv2">
            <img src="./img/char/paladin.png" id="img-crearPJ">
            <input class="formNewPJ" type="text" placeholder="Nombre" id="nombre-crearPJ"required><br>
        </form>
        </div>
        <div class="div3-crearPJ cards" id="stats-crearPJ">

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
        pjActivoSP.push(new Personajes(`${nombrePJ}`, `${clasePJ}`));
        statClase(pjActivoSP);
        toLoader();
    });
}


// ################### INICIALIZO E IMPRIMO ###################
//Valido que se inicie solo en Single Player
(document.title == 'RPG CLI - SP') && initSingle();

// TESTS

arrEnemigos.push(new Enemigos("a"));
console.log(pjActivoSP);
console.log(pjBaseSP);
console.log(arrEnemigos);