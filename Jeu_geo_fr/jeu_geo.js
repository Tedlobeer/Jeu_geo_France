//affichage du menu france ou monde au click

let boutonNavFrance = document.getElementById("mode_france");
let boutonNavMonde = document.getElementById("mode_monde");
let navFrance = document.getElementById("nav_france");
let navMonde = document.getElementById("nav_monde");

boutonNavFrance.addEventListener("click", ()=>{
    navFrance.classList.add("enable");
    navMonde.classList.remove("enable");
    navFrance.classList.remove("disable");
    navMonde.classList.add("disable");
});

boutonNavMonde.addEventListener("click", ()=>{
    navFrance.classList.remove("enable");
    navMonde.classList.add("enable");
    navFrance.classList.add("disable");
    navMonde.classList.remove("disable");
});

