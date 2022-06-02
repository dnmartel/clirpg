import {
    Personajes,
    cargarPartida,
    ocultarBtn,
    between
} from "./multi.js";

//############### CLASES #####################
class Enemigos {
    constructor(asd) {
        this.asd = asd;
    }
}

//############### ARRAYS ####################
let pjActivoSP = [];
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
    <div class="div-title" id="title-SP">
        <h1>LALALA</h1>
    </div>
    <section id="seccion-principal-SP">
    a
    </section>
    <a href="./index.html"><button class="buttons" id="opciones"><span>Opciones</span></button></a>
    `
        }, 2000);
    }, 1500);
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
    <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime incidunt maiores accusantium eum molestias, cupiditate eius quis laborum qui a, ut in deleniti necessitatibus consectetur debitis quidem dicta repudiandae minima dolor et quibusdam. Ea ut quam voluptate nemo inventore nostrum, repudiandae quae, dolore consequatur beatae culpa exercitationem recusandae perferendis cum voluptatum fugit nobis doloribus neque harum similique facilis.</p>
    </div>
    </div>`

    setTimeout(() => {
        let buttonNext = document.createElement("div");
        buttonNext.innerHTML = `<button class="buttons fadein btn-next" id="btn-next-Crear-PJ"><span>Siguiente &#8594;</span></button>`;
        document.getElementById("body-sp").appendChild(buttonNext);
        document.getElementById("btn-next-Crear-PJ").addEventListener("click", toCrearPJ)
    }, 3000);

    setTimeout(() => {
        document.getElementById("seccion-principal-SP").innerHTML = `

        <div class="fadein fixed-text">
        <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime incidunt maiores accusantium eum molestias, cupiditate eius quis laborum qui a, ut in deleniti necessitatibus consectetur debitis quidem dicta repudiandae minima dolor et quibusdam. Ea ut quam voluptate nemo inventore nostrum, repudiandae quae, dolore consequatur beatae culpa exercitationem recusandae perferendis cum voluptatum fugit nobis doloribus neque harum similique facilis.</p>
        <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime incidunt maiores accusantium eum molestias, cupiditate eius quis laborum qui a, ut in deleniti necessitatibus consectetur debitis quidem dicta repudiandae minima dolor et quibusdam. Ea ut quam voluptate nemo inventore nostrum, repudiandae quae, dolore consequatur beatae culpa exercitationem recusandae perferendis cum voluptatum fugit nobis doloribus neque harum similique facilis.</p>
        <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus maxime incidunt maiores accusantium eum molestias, cupiditate eius quis laborum qui a, ut in deleniti necessitatibus consectetur debitis quidem dicta repudiandae minima dolor et quibusdam. Ea ut quam voluptate nemo inventore nostrum, repudiandae quae, dolore consequatur beatae culpa exercitationem recusandae perferendis cum voluptatum fugit nobis doloribus neque harum similique facilis.</p>
        </div>
    `
    }, 10000)
}

function toCrearPJ() {
    document.getElementById("body-sp").innerHTML = `
        <div class="div-title fadein" id="title-SP">
            <h1>Crear PJ</h1>
        </div>
        <section class="fadein" id="seccion-principal-SP">
        
        </section>
        <a href="./index.html"><button class="buttons fadein" id="btn-back-i"><span>&#8592; volver</span></button></a>
        `
    let buttonNext = document.createElement("div");
    buttonNext.innerHTML = `<button class="buttons btn-next" id="btn-next-loader"><span>Siguiente &#8594;</span></button>`;
    document.getElementById("body-sp").appendChild(buttonNext);
    document.getElementById("btn-next-loader").addEventListener("click", toLoader)
}


// ################### INICIALIZO E IMPRIMO ###################
//Válido que se inicie solo en Single Player
(document.title == 'RPG CLI - SP') && initSingle();

// TESTS

pjActivoSP.push(new Personajes("myle", "paladin"));
pjActivoSP.push(new Personajes("brotana", "cazador"));
arrEnemigos.push(new Enemigos("a"));
console.log(pjActivoSP);
console.log(arrEnemigos);