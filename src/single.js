import {
    Personajes,
    cargarPartida,
    ocultarBtn
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

    //BOTON INICIAR JUEGO
    let btnIniciar = document.getElementById("btnIniciar-SP");
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
    btnCP.addEventListener("click", cargarPartida);

}

//Renueva la pantalla y Muestra texto introductorio
function toIntro() {
    ocultarBtn("btnIniciar-SP");
    ocultarBtn("btnCP");

    document.getElementById("title-SP").innerHTML = `
    <h2>Intro</h2>`
    document.getElementById("seccion-principal-SP").classList.add("SPbody");
    document.getElementById("seccion-principal-SP").innerHTML = `
    <div class="wrapper">
    <div class="scroll-text">
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
        buttonNext.innerHTML = `<button class="buttons btn-next" id="btn-next-Crear-PJ"><span>Siguiente &#8594;</span></button>`;
        document.getElementById("body-sp").appendChild(buttonNext);
        document.getElementById("btn-next-Crear-PJ").addEventListener("click", toCrearPJ)
    }, 3000);

    setTimeout(() => {
        alert("Redirect");
    }, 20000)
}

function toCrearPJ() {
    alert("Funciona");
    document.getElementById("body-sp").innerHTML = `
        <div class="div-title" id="title-SP">
            <h1>Crear PJ</h1>
        </div>
        <section id="seccion-principal-SP">
        
        </section>
        <a href="./index.html"><button class="buttons" id="btn-back-i"><span>&#8592; volver</span></button></a>
        `
    let buttonNext = document.createElement("div");
    buttonNext.innerHTML = `<button class="buttons btn-next" id="btn-next-loader"><span>Siguiente &#8594;</span></button>`;
    document.getElementById("body-sp").appendChild(buttonNext);
    document.getElementById("btn-next-loader").addEventListener("click", toLoader)
}

function toLoader() {
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
    
    </section>
    <a href="./index.html"><button class="buttons" id="opciones"><span>Opciones</span></button></a>
    `
    }, 5000)
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