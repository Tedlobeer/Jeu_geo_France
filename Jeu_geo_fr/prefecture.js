async function chargerDepartements(){
    try {
        // Récupération des départements depuis le fichier JSON
    const reponse = await fetch("departements.json");
    const depjson = await reponse.json();
    
    } catch(error){
        console.error("Une erreur s'est produite lors du chargement du fichier JSON :", error);
    }
}

async function init() {

    await chargerDepartements();
    
    //masquage de l'onglet de nav et affichage de la range

    const boutonNumero = document.getElementById("nav_numero");
    const boutonLocalisation = document.getElementById("nav_localisation");
    const choixDepartement = document.querySelector(".choix_departement");
    const container = document.querySelector(".container");

    //affichage du nombre de départements dans l'input range

    const curseur = document.getElementById("range_dep");
    const valeurCurseur = document.getElementById("valeur_curseur");

    curseur.addEventListener("input", ()=>{
        valeurCurseur.textContent = curseur.value + " ";
    });

    //masquage de la range

    const boutonValider = document.getElementById("valider");

    boutonValider.addEventListener("click", ()=>{
        container.classList.add("disable");
    });
  }

init();
  

