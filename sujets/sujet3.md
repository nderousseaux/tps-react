Authentification, routage et contextes
===

Ecrire une application qui gère la connexion d'un utilisateur en lien avec une API HTTP distante.

Lire la [doc de `react-router`](https://reacttraining.com/react-router/web/guides/quick-start).

V1
---

L'application affiche un menu (donné par un composant `Menu`) contenant les entrées suivantes :
 - Home (qui mène à la route "/")
 - si l'utilisateur n'est pas connecté :
   - Signin (qui mène à la route "/signin")
   - Signup (qui mène à la route "/signout")
 - si l'utilisateur est connecté :
    - le nom de l'utilisateur connecté ("Connected as ...")
    - Signout (qui appelle la logique de déconnexion)

A chaque route ("/", "/signin", "/signup") correspond le rendu d'un composant particulier (`Home`, `Signin`, `Signup`).

Les informations relatives à l'utilisateur connecté sont maintenues dans le composant principal (seul à contenir la logique de connexion ainsi que la connaissance de l'API) :
 - Un objet `user` dans le state (initialisé à `null`) contenant l'utilisateur actuellement connecté
 - Une fonction `signin` qui permet de soumettre un couple (identifiant, mot de passe) à l'API distante qui, en cas de succès, renvoie un JSON Web Token (JWT) ainsi qu'un objet correspondant au `user` authentifié. Le token doit alors être stocké en `localStorage` et l'utilisateur peut être emmené vers la route "/".
 - Une fonction `signup` qui permet de soumettre un couple (identifiant, mot de passe) pour inscription. En cas de succès, on emmène l'utilisateur vers la route "/signin".

Les composants `Signin` et `Signup` proposent un formulaire adéquat et font appel, lors de la soumission du formulaire, à une fonction `onSubmit` reçue en prop qui fait à son tour appel respectivement aux fonctions `signin` et `signup` du composant principal.
Faire en sorte qu'en cas d'échec des requêtes, le message d'erreur reçu s'affiche sous le formulaire.

Au lancement de l'application, faire en sorte de restaurer l'utilisateur connecté en exploitant le JSON Web Token présent en `localStorage` si il existe (voir la route `/whoami` de l'API).
En attendant la réponse du serveur, ne rendre qu'un message d'attente.

API
---

L'API HTTP fournie comprend les routes suivantes :
 - `POST /signin` : reçoit un objet de la forme `{ username: '...', password: '...' }`. En cas de succès, renvoie une réponse HTTP code 200 avec un objet de la forme `{ token: '...', user: { id: 42, username: '...' } }`. En cas d'échec, renvoie une réponse HTTP code 401 avec un message d'erreur.
 - `POST /signup` : reçoit un objet de la forme `{ username: '...', password: '...' }`. En cas de succès, renvoie une réponse HTTP code 200. En cas d'échec, renvoie une réponse HTTP code 500 avec un message d'erreur.
 - `GET /whoami` : lit l'en-tête `Authorization` de la requête HTTP au format `"Bearer [JSON Web Token]"`. En cas de succès du décodage du token, renvoie une réponse HTTP code 200 avec un objet de la forme `{ id: 42, username: '...' }`. En cas d'échec, renvoie une réponse HTTP code 404 avec un message d'erreur.

V2
---

Les données concernant l'utilisateur connecté sont potentiellement utiles à différents niveaux de l'application.
Pour éviter d'avoir à passer ces informations manuellement au travers de nombreuses couches de composants ("props drilling"), on peut mettre en place un contexte, qui donnera accès aux données souhaitées dans tout le sous-arbre de l'application.

Dans un module séparé (`auth.js` par exemple), créer un contexte `AuthContext`, et exporter 2 éléments :
 - un composant `AuthProvider` dans lequel on va déplacer les données et la logique liées à la gestion de l'utilisateur. Ce composant rend le `Provider` du contexte `AuthContext` en lui passant comme valeur un objet contenant les champs `user`, `signup`, `signin` et `signout`. Le contenu du `Provider` est les éléments fils reçus par le composant `AuthProvider` (`children`).
 - un custom hook `useAuth` qui retourne simplement le résultat de `useContext(AuthContext)`

Nettoyer le composant principal de l'application qui ne devrait plus contenir que la déclaration du `AuthProvider`, le menu et les routes.

Dans les composants `Menu`, `Signin` et `Signup`, récupérer les données nécessaires du contexte d'authentification grâce à la fonction `useAuth`.
