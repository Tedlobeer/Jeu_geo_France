//affichage du nombre de départements dans l'input range

const curseur = document.getElementById("range_dep");
const valeurCurseur = document.getElementById("valeur_curseur");

curseur.addEventListener("input", ()=>{
    valeurCurseur.textContent = curseur.value + " ";
});