let depjson = []; // Déclarer depjson en tant que variable globale

// Cette fonction permet de charger les départements depuis le fichier JSON
function chargerDepartements(){
    // Récupération des départements depuis le fichier JSON
    return fetch("departements.json")
      .then(reponse => reponse.json())
      .then(data => {
        // Mettre à jour la variable globale depjson avec les données JSON résolues
        depjson = data;
        return depjson; // Renvoyer les données JSON pour une utilisation éventuelle
      })
      .catch(error => {
        // Gérer les erreurs ici...
      });
}

chargerDepartements().then(() => {
  // Maintenant, depjson est accessible ici avec les données JSON chargées
  // Vous pouvez accéder aux données JSON et les utiliser ici
 
  //fonction qui va générer un nb aléatoire parmi tous les départements fr
    function genererAlea(){
        return Math.floor(Math.random() * (100)) + 1;
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
        return curseur.value;
    }

    //fonction au clic de valider masquage de la range, apparition du container questions, création du tableau contenant les index et appel de la fonction principale du quizz
    function preLaunch(){
        const curseur = document.getElementById("range_dep");
        const boutonValider = document.getElementById("valider");
        const containerQuestions = document.getElementById("container_questions");
        const container = document.querySelector(".container");

        boutonValider.addEventListener("click", ()=>{
            container.classList.add("disable");
            containerQuestions.classList.remove("disable");
            const nbDepUser = curseur.value;
            let tab_index = genererTabJeu(nbDepUser);

            //appel de la fonction principale du quizz
            launchQuizz(tab_index,depjson);
        });
    }
  
  // Fonction principale du quizz
  function launchQuizz(tab_index, depjson) {
    let score = 0;
    let currentQuestionIndex = 0;
    const baliseQuestions = document.getElementById("affichage_questions");
    const boutonValidation = document.getElementById("validation_reponse");
    const champInput = document.getElementById("reponse_utilisateur");
    const containerQuestions = document.getElementById("container_questions");
    
    function afficherQuestion(index) {
      if (index < tab_index.length) {
        baliseQuestions.textContent = depjson[tab_index[index]].departement;
        champInput.value = ""; // Réinitialiser le champ de saisie
      } else {
        // Toutes les questions ont été répondues, afficher le score
        afficherScore(score, tab_index);
      }
    }
  
    function verifierReponse() {
      if (champInput.value === depjson[tab_index[currentQuestionIndex]].numero) {
        score++;
      }
  
      currentQuestionIndex++;
      afficherQuestion(currentQuestionIndex); // Afficher la question suivante
    }
  
    // Attacher l'événement click au bouton de validation
    boutonValidation.addEventListener("click", verifierReponse);
  
    // Afficher la première question
    afficherQuestion(currentQuestionIndex);
  }
  
  // Fonction d'affichage du score
  function afficherScore(score, tab_index) {
    const containerQuestions = document.getElementById("container_questions");
    const boutonRejouer = document.getElementById("rejouer");

    containerQuestions.classList.add("disable");
    let pourcentage = (score / tab_index.length) * 100;
    let div = `<div id="resultat">
                  <p>Votre score est de ${pourcentage.toFixed(0)}% !</p>
                  <div id="endgame">
                    <button><a href="numero.html">Rejouer</a></button>
                    <button><a href="index.html">Menu principal</a></button>
                  </div>
               </div>`;
    let body = document.querySelector("body");
    body.innerHTML = div;
  }

    //appel de la fonction de préparation du quizz
    preLaunch();
    
    //appel de la fonction d'affichage du nombre lié au curseur
    affichageCurseur();
});
