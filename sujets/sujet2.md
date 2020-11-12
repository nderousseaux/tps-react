Requêtes HTTP et tableaux de données
===

Ecrire une application qui récupère des données de l'API `swapi.dev` et les affiche.

V1
---

Le composant principal de l'application affiche un bouton qui, au clic, déclenche une requête à l'URL `https://swapi.dev/api/people/`. En réponse, le serveur renvoie un objet composé des champs :
 - `results` : tableau d'objets contenant des informations sur les personnages
 - `next` : URL permettant de récupérer les personnages suivants
 - `previous` : URL permettant de récupérer les personnages précédents

En attendant la réponse du serveur, le composant affiche le texte "Loading...".
En cas d'erreur, il affiche le message d'erreur correspondant.

Une fois les données arrivées, il rend :
 - un bouton `previous` permettant de récupérer les personnages précédents
 - un bouton `next` permettant de récupérer les personnages suivants
 - un composant `CharactersList` en lui passant le tableau de personnages. Ce dernier affiche une liste des noms des personnages.

Bien déterminer les différents éléments devant être stockés sous forme de `state` dans le composant principal.

V2
---

Faire en sorte que le composant principal de l'application récupère la liste de personnages dès son chargement.

Permettre à l'utilisateur de sélectionner un personnage dans la liste.
Ce dernier est alors affiché en gras.

Quand un personnage est sélectionné, un composant `CharacterDetail`, ajouté sous la liste principale, affiche des détails concernant ce personnage (nom, genre, taille, couleur des cheveux et des yeux, ...).

Parmi les données obtenues sur un personnage, on trouve un champ `films` qui est un tableau d'URL pointant vers les ressources film correspondantes.
Faire en sorte que le composant `CharacterDetail` récupère l'ensemble des films associés au personnage sélectionné et affiche leur titre dans une liste.
Comme pour la liste de personnages, en attendant la réponse du serveur, le composant affiche le texte "Loading...", et en cas d'erreur, il affiche le message d'erreur correspondant.

S'assurer que la liste de films est bien mise à jour lors de la sélection d'un nouveau personnage.

V3
---

Ecrire un custom hook `useDataFromUrl`.
Ce dernier prend en paramètre une URL et retourne un objet contenant 3 champs : `loading`, `error` et `data`.

En interne, cette fonction déclare les éléments de `state` nécessaire, et déclenche si besoin la requête à destination de l'URL reçue.

Utiliser ce custom hook dans l'ensemble des composants qui font des requêtes.

Comment faire pour que l'on puisse passer un tableau d'URL à la fonction `useDataFromUrl`, et que le champ `data` obtenu soit un tableau contenant les données obtenue depuis chaque URL ?

V4
---

Utiliser la bibliothèque [react-query](https://react-query.tanstack.com/) pour gérer les requêtes à l'API (à la place de notre custom hook).
Bien lire la documentation sur les requêtes (https://react-query.tanstack.com/docs/guides/queries) et s'assurer d'avoir compris le fonctionnement des `keys` et le passage de paramètres à la fonction asynchrone de récupération des données.

> ___Indication___ : pour récupérer un tableau d'identifiants de films à partir d'un tableau d'URL du type `https://swapi.dev/api/films/3` -> `const filmsId = filmsUrl.map(u => u.split('/').filter(Boolean).pop());`.

Utiliser `react-query-devtools` pour observer le comportement de cette bibliothèque.
