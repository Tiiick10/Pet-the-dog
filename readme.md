# DONT FORGET TO PET THE DOG !

"DONT FORGET TO PET THE DOG" ou "pet the dog" est un jeu incrémental où l'objectif est d'accumulé des friandises à l'aide de ton fidèle chien.
Pour ce faire il suffit d'appuyer sur le bouton "explore" pour recolter du chocolat.
Il faudra cependant aussi gérer la santé de ton chien représenté par 3 statistique: l'affection(love), la satiété(food) et la propreté(poopy)
En accumulant du chocolat il sera possible d'acheter des améliorations qui permettera de produire automatiquement des friandises.
Ainsi, plus tu achetera des améliorations, plus tu produira rapidement des ressources.

- Consigne
Pour ce projet j'ai écrit la majorité du HTML et du CSS que tu aura besoin pour réalisé ce jeu. Ton objectif sera de créer la logique du jeu sur bases des directifs mentionné plus bas.
chaque exo sera appeler "Objectif" et aura pour but d'ajouté une nouvelle fonctionalité. elles doivent être réalisé dans le bonne ordres.

1. Objectif 1 : création du contexte JS.
lors du lancement de ton jeux il faudra créer un ensemble de variable JS représentant les différents aspect du jeu ainsi que des Element HTML présent sur la page.
après avoir fait celà, il faudra assigner au Element Html les valeurs initales des variable JS.
Commençons par les trois statistiques LOVE, FOOD et POOPY

- dans le fichier JS, créer trois variable LOVE, FOOD et POOPY
- LOVE ET FOOD commence à 100 POOPY commence à 0
- créer ensuite 3 autre variables pour récupèrer les jauges contenu dans le HTML : loveValue, foodValue et poopyValue
- ces 3 div on une largeur(width) de 0, attribue leur véritable valeur en manipulant l'attribut style.width et donne leur la valeur des variable LOVE, FOOD et POOPY

Un fois celà fait il faut initialisé le nombre de chocolat qu'on possède et afficher cette valeur dans le html

- créer un variable CHOCOLAT initialisé à 0
- récupère la balise span ayant l'id chocolatCount dans une variavle chocolatCount et attribut lui la valeur de CHOCOLAT dans son innerText

2. Objectif 2 : première intéraction
Il est temps de trouver du chocolat !
Nous allons rendre le bouton "explore" fonctionel

- créer une variable CHOCOLAT_BY_CLICK initialisé à 1. celà représente le nombre de chocolat qui sera ajouté après chaque click
- récupère le bouton explore ayant l'id btnExplore
- créer la fonction plusChocolat(quantity). cette fonction augmentera la valeur CHOCOLAT de la valeur de quantity et ensuite mettera à jour l'affichage du nombre de chocolat

désormais, quand tu appuie sur le bouton "explore", tu est sensé voir ton score de chocolat augmenté.

3. Objectif 3 : dégrader de la santé du chien.
quand le temps passe, notre chien verra son affection et sa satiété diminué progressivement.

- créer deux variable: LOVE_LOST_BY_SEC et FOOD_LOST_BY_SEC respectivment initialisé à 2 et 5
- créer un fonction lostLove(quantity) qui retire de LOVE la valeur de quantity et qui met à jour l'affichage de la barLove
- faite une fonction lostFood(quantity) qui fait la même chose que la fonction précédente mais avec la variale FOOD
- initialisé un variable lost_interval qui est égal à un intervale d'une seconde et qui execute la fonction lostLove(LOVE_LOST_BY_SEC) et lostFood(FOOD_LOST_BY_SEC)

vous devriez voir les jauges diminué jusque à être complètement vide.
mais en réalité les variable LOVE et FOOD continurons de diminué une fois atteint 0

- ajouté une condition dans les fonctions lostLove et lostFood qui vérifie si LOVE ou FOOD est plus petit ou égal à zéro. si c'est le cas, on ne fait rien, sinon on à le droit de diminué la valeur

Désormais LOVE et FOOD reste à zéro et ne vont pas plus bas

4. Objectif 4 : rétablir les stats de votre chien

Pour éviter que notre chien meurt de faim, voir pire, qu'il arrête de nous aimé il faut pouvoir restaurer ses statistiques LOVE et FOOD

- récupère les boutons ayant l'id btnFeed et btnPet et place les dans des variables avec le même nom

- créer deux variables LOVE_RESTORE et FOOD_RESTORE initialement attribué à 3

- créer une fonction restoreLove(quantity) qui augmente la valeur LOVE par la valeur quantity et qui met à jour l'affichage de la jauge loveValue

- faite de même pour FOOD avec restoreFood(quantity)

- ajoutez un écouteur d'evenement sur vos bouton pet et feed qui lance la fonction correspondante 

vous devriez pouvoir augmentez les jauge en appuyant sur les boutons

mais une fois remplie il faut faire en sorte qu'on ne puisse pas dépassé la valeur 100

- Ajouter une condition dnas la fonction restoreLove et restoreFeed pour empècher que LOVE et FOOD dépasse 100

5. Ajouter des Buddy à votre chien

Pour le moment, il n'y que ton fidèle chien qui récolte de chocolat pour toi. On va l'aider dans sa tache avec des Buddies.

Un Buddy trouvera un chocolat tout les secondes

Il sera possible d'acheter un Buddy pour un certain montant de chocolat

commençons par rendre le bouton fonctionel

- récupère le bouton ayant l'id btnBuyBuddy et stock le dans la variable btnBuyBuddy
- récupère le span ayant l'id buddyCount et stock le dans la variable spanBuddyCount
- crée une variable BUDDY_COST avec comme valeur 100
- crée une variable BUDDY_COUNT avec comme valeur 0
- crée une variable BUDDY_CHOCOLAT_BY_SEC avec comme valeur 1
- crée un tableau BUDDY_LIST initialement vide

- ajouter une écouteur d'évenement au bouton btnBuyBuddy qui fera ce qui suit :
- -  si vous avez assez de CHOCOLAT demandé par BUDDY_COST vous pouvez exécuter la suite du code
- -  incrémenté BUDDY_COUNT et mettez à jour l'affichage de spanBuddyCount
- -  lancer une nouvelle intervalle qui tout les secondes appelle la fonction plusChocolat avec BUDDY_CHOCOLAT_BY_SEC en paramètre
- -  stoquer l'id de l'intervalle dans le tableau BUDDY_LIST

Tu devrais pouvoir acheter des amies pour ton chien qui génèrerons du chocolat chaque seondes.

à partir de là tu a tout ce qu'il te faut pour améliorer le jeu et rajouté des fonctionnalité.

6. Prévoir une fin de partie 
Si la variable LOVE ou FOOD tombe à 0, il s'agit d'une fin de partie. il faudra vérifié à chaque fois que vous diminué l'une de ces deux valeur si oui ou non la partie est fini.

- récupère la balise div ayant pour id gameover et place là dans une variable divGameover
- ajoute dans la fonction lostLove et lostFOOD une condtion après avoir diminué la valeur LOVE ou FOOD pour vérifié si elles valent 0. Si c'est le cas:
- - retire la classe 'hide' de la balise divGameOver
- - intérompe tout les intervalles stocké dans le tableau BUDDY_LIST

