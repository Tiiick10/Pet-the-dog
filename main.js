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

// Mise à jour des jauges

function updateBars() {
    loveValue.style.width = LOVE + "%"
    foodValue.style.width = FOOD + "%"
    poopyValue.style.width = POOPY + "%"
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
