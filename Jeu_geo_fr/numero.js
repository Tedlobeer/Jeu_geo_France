// Cette fonction permet de charger les départements depuis le fichier JSON
async function chargerDepartements(){
    try {
        // Récupération des départements depuis le fichier JSON
    const reponse = await fetch("departements.json");
    const depjson = await reponse.json();
    
    } catch(error){
        console.error("Une erreur s'est produite lors du chargement du fichier JSON :", error);
    }
}
// Récupération des éléments du DOM
const container = document.querySelector(".container");

    

//fonction qui va générer un nb aléatoire parmi tous les départements fr
function genererAlea(){
    return Math.floor(Math.random() * (101)) + 1;
} 

// Fonction qui vérifie si le nombre généré n'existe pas déjà dans le tableau de stockage

function verifierAbs(nbAlea,index,tab_stockage){
    let condition = true;
    for (let i = 0; i <= index; i++) {
        if (nbAlea == tab_stockage[i]) {
            condition = false;
        };
    }
    return condition;
}

// Fonction qui génère le tableau contenant les indices aléatoires des départements à deviner

function genererTabJeu(nbUser){
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

//fonction qui affiche le nombre correspondant au curseur de la range
function affichageCurseur(){
    const curseur = document.getElementById("range_dep");
    const valeurCurseur = document.getElementById("valeur_curseur");

    curseur.addEventListener("input", ()=>{
        valeurCurseur.textContent = curseur.value + " ";
    });
}

//fonction au clic de valider masquage de la range, apparition du container questions et création du tableau contenant les index
function preLaunch(){
    const curseur = document.getElementById("range_dep");
    const boutonValider = document.getElementById("valider");
    const containerQuestions = document.getElementById("container_questions");

    boutonValider.addEventListener("click", ()=>{
        container.classList.add("disable");
        containerQuestions.classList.remove("disable");
        const nbDepUser = curseur.value;
        let tab_index = genererTabJeu(nbDepUser);
    });
}

// Fonction d'initialisation
async function init() {
    // Attendre que les départements soient chargés avant de continuer
    await chargerDepartements();
    //appel de la fonction d'affichage du nombre lié au curseur
    affichageCurseur();
    //appel de la fonction de préparation du quizz
    preLaunch();
}

init();