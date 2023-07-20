// Cette fonction permet de charger les départements depuis le fichier JSON
export async function chargerDepartements(){
    try {
        // Récupération des départements depuis le fichier JSON
    const reponse = await fetch("departements.json");
    const depjson = await reponse.json();
    
    } catch(error){
        console.error("Une erreur s'est produite lors du chargement du fichier JSON :", error);
    }
}
    // Récupération des éléments du DOM departement.html
    export function recupererDOMdep(){
        const boutonNumero = document.getElementById("nav_numero");
        const boutonLocalisation = document.getElementById("nav_localisation");
        const choixDepartement = document.querySelector(".choix_departement");
    }

    // Récupération des éléments de tous les DOM
    export function recupererContainer(){
        const container = document.querySelector(".container");
    }
    
    //fonction qui va générer un nb aléatoire parmi tous les départements fr
    export function genererAlea(){
        return Math.floor(Math.random() * (101)) + 1;
    } 

    // Fonction qui vérifie si le nombre généré n'existe pas déjà dans le tableau de stockage
    export function verifierAbs(nbAlea,index,tab_stockage){
        let condition = true;
        for (let i = 0; i <= index; i++) {
            if (nbAlea == tab_stockage[i]) {
                condition = false;
            };
        }
        return condition;
    }

    // Fonction qui génère le tableau contenant les indices aléatoires des départements à deviner
    export function genererTabJeu(nbUser){
        let tab_stockage = [];
        for (let i = 0; i < nbUser; i++) {
            let condition = false;
            let index = i;
            let nbAlea = 0;
            while (condition == false) {
                nbAlea = genererAlea();
                condition = verifierAbs(nbAlea,index,tab_stockage);
            }
            tab_stockage[i] = nbAlea; 
        }
        return tab_stockage;
    }

// Fonction d'initialisation
export async function init() {
    // Attendre que les départements soient chargés avant de continuer
    await chargerDepartements();
    
    //affichage du nombre de départements dans l'input range
    
    const curseur = document.getElementById("range_dep");
    const valeurCurseur = document.getElementById("valeur_curseur");
    
    curseur.addEventListener("input", ()=>{
        valeurCurseur.textContent = curseur.value + " ";
    });

    // Masquage de la range lorsque l'utilisateur clique sur "Valider"

    const boutonValider = document.getElementById("valider");
    boutonValider.addEventListener("click", ()=>{
        container.classList.add("disable");

        // Génération du tableau et affichage dans la console
        const nbDepUser = curseur.value;
        let test = genererTabJeu(nbDepUser);
        console.log(test);
    });
}

init();