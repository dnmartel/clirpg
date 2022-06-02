//Funcion recursiva que vuelve a ejecutarse cuando se toca el botón "volver"
function botonRecursivo(btn) {
    // Le doy acción al boton "iniciar"
    document.getElementById(btn).addEventListener("click", () => {
        document.getElementById("div-btn-index").innerHTML = `
            <button class="buttons" id="btnToSingle"><span>Single Player</span></button>
            <button class="buttons" id="btnToMulti"><span>Multiplayer</span></button>
            <button class="buttons" id="btn-back-i"><span>&#8592; volver</span></button>
            `;
        document.getElementById("btnToMulti").focus();

        //Pruebo redirecciones evitando mostrar <a> en el html
        document.getElementById("btnToSingle").addEventListener("click", () => {
            location.pathname = '/single.html';
        })

        //Pruebo redirecciones evitando mostrar <a> en el html
        document.getElementById("btnToMulti").addEventListener("click", () => {
            location.pathname = '/multiplayer.html';
        })

        //Le doy acción al botón "volver"
        document.getElementById("btn-back-i").addEventListener("click", () => {
            document.getElementById("div-btn-index").innerHTML = `    <button class="buttons"
            id="btn-index"> <span> Iniciar </span></button >`;
            //Antes de cerrar, vuelvo a darle acción al botón "Iniciar", llamando a la función nuevamente para que reimprima las acciones
            botonRecursivo(btn);
        })
    })
}

botonRecursivo("btn-index");