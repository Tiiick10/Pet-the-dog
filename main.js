// Initialisation des variables de base

let LOVE = 100
let FOOD = 100
let POOPY = 0
let CHOCOLAT = 0

// Récupération des éléments HTML

let loveValue = document.getElementById("loveValue")
let foodValue = document.getElementById("foodValue")
let poopyValue = document.getElementById("poopyValue")
let chocolatCount = document.getElementById("chocolatCount")

function updateDogImage() {

    let dogImage = document.getElementById("imgDog")

    if (LOVE < 30) {

        dogImage.src = "./img/mad_dog.png"

    } else (LOVE > 70 && FOOD > 70) ; {
        
        dogImage.src = "./img/happy_dog.png"
    }
}

// Mise à jour des jauges

function updateBars() {
    loveValue.style.width = LOVE + "%"
    foodValue.style.width = FOOD + "%"
    poopyValue.style.width = POOPY + "%"
    updateDogImage()
}

// Initialisation des valeurs de départ

updateBars()
chocolatCount.innerText = CHOCOLAT

// Objectif 2 : Première interaction (exploration)

let CHOCOLAT_BY_CLICK = 1
let btnExplore = document.getElementById("btnExplore")

function plusChocolat(quantity) {
    CHOCOLAT += quantity
    chocolatCount.innerText = CHOCOLAT
}

btnExplore.addEventListener("click", () => {
    plusChocolat(CHOCOLAT_BY_CLICK)
})

// Objectif 3 : Dégradation de la santé

let LOVE_LOST_BY_SEC = 2
let FOOD_LOST_BY_SEC = 5

function lostLove(quantity) {
    if (LOVE > 0) {
        LOVE -= quantity
        if (LOVE < 0) LOVE = 0
        updateBars()
        checkGameOver()
    }
}

function lostFood(quantity) {
    if (FOOD > 0) {
        FOOD -= quantity
        if (FOOD < 0) FOOD = 0
        updateBars()
        checkGameOver()
    }
}

// Intervalle pour perte automatique de LOVE et FOOD

let lost_interval = setInterval(() => {
    lostLove(LOVE_LOST_BY_SEC)
    lostFood(FOOD_LOST_BY_SEC)
}, 1000)

// Objectif 4 : Rétablir les stats

let btnFeed = document.getElementById("btnFeed")
let btnPet = document.getElementById("btnPet")
let LOVE_RESTORE = 3
let FOOD_RESTORE = 10

function restoreLove(quantity) {
    if (LOVE < 100) {
        LOVE += quantity
        if (LOVE > 100) LOVE = 100
        updateBars()
    }
}

function restoreFood(quantity) {
    if (FOOD < 100) {
        FOOD += quantity
        if (FOOD > 100) FOOD = 100
        updateBars()
    }
}

btnFeed.addEventListener("click", () => restoreFood(FOOD_RESTORE))
btnPet.addEventListener("click", () => restoreLove(LOVE_RESTORE))

// Objectif 5 : Ajouter des Buddies

let btnBuyBuddy = document.getElementById("btnBuyBuddy")
let spanBuddyCount = document.getElementById("buddyCount")

let BUDDY_COST = 10
let BUDDY_COUNT = 0
let BUDDY_CHOCOLAT_BY_SEC = 1
let BUDDY_LIST = []

btnBuyBuddy.addEventListener("click", () => {
    if (CHOCOLAT >= BUDDY_COST) {
        CHOCOLAT -= BUDDY_COST
        chocolatCount.innerText = CHOCOLAT

        BUDDY_COUNT++
        spanBuddyCount.innerText = BUDDY_COUNT

        // Création d'un intervalle pour le Buddy
        
        let intervalId = setInterval(() => {
            plusChocolat(BUDDY_CHOCOLAT_BY_SEC)
        }, 1000)
        BUDDY_LIST.push(intervalId)
    }
})

// BONUS : Acheter une fonction pour augmenter regenfood

let FOOD_REGEN_COST = 500;
let hasFoodRegen = false;

document.getElementById("btnFoodRegen").addEventListener("click", () => {
    if (CHOCOLAT >= FOOD_REGEN_COST && !hasFoodRegen) {
        CHOCOLAT -= FOOD_REGEN_COST;
        chocolatCount.innerText = CHOCOLAT;
        hasFoodRegen = true;

        // Activer la régénération
        setInterval(() => {
            restoreFood(20);
            restoreLove(5);
        }, 2000);
    }
})

// BONUS : Poop Function 

// Ajouter un excrément

function addPoop() {
    let poopContainer = document.getElementById("poopCount");
    let poop = document.createElement("img");
    poop.src = "./img/poop.png";
    poop.classList.add("poop");

    poop.addEventListener("click", () => {
        poop.remove();
        POOPY = Math.max(POOPY - 10, 0);
        updateBars();
    });

    poopContainer.appendChild(poop);
    POOPY = Math.min(POOPY + 10, 100);
    updateBars();
    checkPoopyEffect();
}

// Vérifier les effets de la barre POOPY

function checkPoopyEffect() {
    if (POOPY >= 80) {
        LOVE_LOST_BY_SEC = 4; // Double la perte d'amour
    } else {
        LOVE_LOST_BY_SEC = 2; // Revenir à la normale
    }
}

// Générer automatiquement des excréments

setInterval(() => {
    if (Math.random() < 0.3) { // 30% de chance toutes les 5 secondes
        addPoop();
    }
}, 5000);

document.getElementById("btnClean").addEventListener("click", () => {
    let poopContainer = document.getElementById("poopCount");
    poopContainer.innerHTML = ""; // Supprimer tous les excréments
    POOPY = 0; // Réinitialiser la barre POOPY
    updateBars();
});



// Objectif 6 : Prévoir une fin de partie

let divGameover = document.getElementById("gameover")

function checkGameOver() {
    if (LOVE === 0 || FOOD === 0) {
        divGameover.classList.remove("hide")

        // Arrêter tous les intervalles des Buddies

        BUDDY_LIST.forEach((intervalId) => clearInterval(intervalId))
        clearInterval(lost_interval)
    }
}

// Sauvegarder les données

function saveGame() {
    localStorage.setItem("LOVE", LOVE);
    localStorage.setItem("FOOD", FOOD);
    localStorage.setItem("POOPY", POOPY);
    localStorage.setItem("CHOCOLAT", CHOCOLAT);
    localStorage.setItem("BUDDY_COUNT", BUDDY_COUNT);
}

// Charger les données

function loadGame() {
    LOVE = parseInt(localStorage.getItem("LOVE")) || 100;
    FOOD = parseInt(localStorage.getItem("FOOD")) || 100;
    POOPY = parseInt(localStorage.getItem("POOPY")) || 0;
    CHOCOLAT = parseInt(localStorage.getItem("CHOCOLAT")) || 0;
    BUDDY_COUNT = parseInt(localStorage.getItem("BUDDY_COUNT")) || 0;

    chocolatCount.innerText = CHOCOLAT;
    spanBuddyCount.innerText = BUDDY_COUNT;
    updateBars();
}

// Boutons SAVE/RESET

document.getElementById("btnSAVE").addEventListener("click", saveGame);
document.getElementById("btnRESET").addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

// Recréer les intervalles des buddies après le chargement

function recreateBuddyIntervals() {
    for (let i = 0; i < BUDDY_COUNT; i++) {
        let intervalId = setInterval(() => {
            plusChocolat(BUDDY_CHOCOLAT_BY_SEC);
        }, 1000);
        BUDDY_LIST.push(intervalId);
    }
}

// Charger les données au démarrage et recréer les intervalles

loadGame();
recreateBuddyIntervals();
