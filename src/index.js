document.getElementById("btn-index").addEventListener( "click", ()=>{
    document.getElementById("section-index").classList.remove("height-100");
    document.getElementById("section-index").classList.add("height-0", "d-none");
    document.getElementById("game-mode").classList.add("height-100", "translate-anim");
    document.getElementById("game-mode").classList.remove("d-none","height-0");
    document.getElementById("btn-back-i").classList.remove("d-none");
})

document.getElementById("btn-back-i").addEventListener( "click", ()=>{
    document.getElementById("section-index").classList.add("height-100");
    document.getElementById("section-index").classList.remove("height-0", "d-none");
    document.getElementById("game-mode").classList.add("d-none","height-0");
    document.getElementById("game-mode").classList.remove("height-100");
    document.getElementById("btn-back-i").classList.add("d-none");
})

/* document.getElementById("btn-singleplayer").addEventListener( "click", ()=>{
    document.getElementById("pop-up").classList.toggle("d-none");
}) */
