# LP2 - TP noté

Vous allez écrire une application web permettant la gestion d'événements de soirées jeu de société.
Cette application est composée :
 - d'une API HTTP (fournie)
 - d'un client web développé avec la bibliothèque React (à réaliser)

# Modèle de données

Le modèle de données est le suivant :
- `Player` : représente un joueur
  - `name` : nom du joueur
- `Game` : représente un jeu
  - `title` : titre du jeu
- `Event` : représente un événement
  - `date` : date de l'événement
  - `GameId` : identifiant du jeu joué lors de l'événement

Une table de liaison permet également de représenter l'inscription des joueurs à des événements.

# API HTTP

L'API HTTP est fournie dans le dossier `server`. Elle expose les routes suivantes :
 - `GET /player` : obtenir l'ensemble des `Player`
 - `POST /player {name}` : créer un nouveau `Player`
 - `DELETE /player/:id` : supprimer un `Player` existant
 - `GET /game` : obtenir l'ensemble des `Game`
 - `POST /game {title}` : créer un nouvel `Game`
 - `DELETE /game/:id` : supprimer un `Game` existant
 - `GET /event` : obtenir l'ensemble des `Event`
 - `POST /event {date, GameId}` : créer un nouvel `Event` (lors de sa création, un `Event` est déjà associé à un `Game`, mais aucun `Player` n'est inscrit)
 - `DELETE /event/:id` : supprimer un `Event` existant
 - `GET /player/:id/events` : obtenir l'ensemble des `Event` auquel un `Player` est inscrit
 - `GET /game/:id/events` : obtenir l'ensemble des `Event` existant pour un `Game`
 - `GET /event/:id/players` : obtenir l'ensemble des `Player` inscrits à un `Event`
 - `POST /event/:eventId/players/:playerId` : inscrit un `Player` à un `Event`
 - `DELETE /event/:eventId/players/:playerId` : désinscrit un `Player` à un `Event`

Cette API utilise un fichier de données `SQLite` local et ne nécessite aucun serveur de base de données.
Pour la démarrer, il suffit d'aller dans le dossier `server`, puis de lancer les commandes :
```sh
npm install
node server.js
```

> **Des fonctions permettant de faire appel à toutes ces routes sont déjà fournies pour le client, comme décrit plus loin ci-dessous**

# Client web

Le client web doit proposer des interfaces permettant de :

 - gérer les `Player` (route `/players`) :
   - liste des `Player`
   - ajout/suppression d'un `Player`
   - détails d'un `Player` (route `/players/:playerId`) :
     - affichage de la liste des `Event` auxquels il est inscrit, avec pour chaque `Event` un lien permettant de se rendre au détail de l'`Event`

Exemple (pour la route `/players/1`) :

<img src="img/players.png" alt="Players" width="300" />

 - gérer les `Game` (route `/games`) :
   - liste des `Game`
   - ajout/suppression d'un `Game`
   - détails d'un `Game` (route `/games/:gameId`) :
     - affichage de la liste des `Event` prévus pour ce `Game`, avec pour chaque `Event` un lien permettant de se rendre au détail de l'`Event`

Exemple (pour la route `/games/1`) :

<img src="img/games.png" alt="Games" width="300" />

 - gérer les `Event` (route `/events`) :
   - liste des `Event`
   - ajout/suppression d'un `Event`
   - détails d'un `Event` (route `/events/:eventId`) :
     - affichage de la date, du jeu (ainsi que d'un lien permettant de se rendre au détail du `Game`)
	 - affichage de la liste des `Player` inscrits, avec :
     - un bouton permettant de désinscrire le `Player`
     - un lien permettant de se rendre au détail du `Player`
	 - formulaire permettant d'inscrire un nouveau `Player`

Exemple (pour la route `/events/1`) :

<img src="img/events.png" alt="Events" width="300" />

# Indications & Rappels

Pour développer, vous partirez de l'état actuel du dossier `client` fourni.
Ce projet a été généré avec `create-react-app`.
Tout ce que vous avez à faire est d'exécuter la commande :
```sh
npm install
```

Pour travailler vous pouvez ensuite lancer :
```sh
npm run start
```

Le fichier `events_api.js` exporte un objet qui contient déjà l'ensemble des fonctions permettant de dialoguer avec l'API (les fonctions sont écrites ici dans l'ordre de la description des routes ci-dessus).

## Paramètres des routes client

On peut récupérer les paramètres des routes à l'aide du hook `useParams` fourni par `react-router`.
Attention cependant au fait que tout ce qui est issu du parsing de la route est du type `string`.
Si on récupère un identifiant dans une route paramétrée et que l'on souhaite l'interpréter comme un `number`, il faut utiliser la fonction `parseInt`.

_Exemple_ :
```js
// la route courante est /lists/3
// et nous sommes sous un composant <Route path="/lists/:listId">
let { listId } = useParams();  // ici listId est une chaîne de caractères
listId = parseInt(listId); // ici c'est un nombre
```

## react-query

La documentation de la v2 de `react-query` (version que l'on a commencé à utiliser, et que vous récupérez lors du `npm install` du client) est disponible ici : [https://react-query-v2.tanstack.com/docs](https://react-query-v2.tanstack.com/docs).

Le site officiel de la bibliothèque donne maintenant la documentation de la v3, sortie entre temps, et qui comporte quelques modifications majeures par rapport à ce que l'on a vu.

Les indications qui suivent concernent la v2.

**`useQuery(key, asyncFunc)`**

Permet d'obtenir le contenu (`data`) (et d'autres informations (`isLoading`, `isError`, ...)) de l'entrée de cache correspondant à la clé `key` et obtenu grâce à la fonction asynchrone `asyncFunc`.

_Exemples_ :
```js
let { isLoading, isError, error, data } = useQuery('lists', listAPI.getLists);
// la clé est une chaîne de caractères

let { isLoading, isError, error, data } = useQuery(['listitems', 3], () => listAPI.getListItems(3));
// ici la clé est un tableau composé d'une chaîne et d'un nombre
```

**`useQueryCache()`**

Permet d'obtenir une variable représentant le cache courant.

_Exemple_ :
```js
let queryCache = useQueryCache();
```

**`queryCache.getQueryData(key)`**

Permet d'obtenir directement le contenu actuel du cache correspondant à la clé `key` (ou `undefined` si cette entrée n'existe pas).

_Exemple_ :
```js
let items = queryCache.getQueryData(['listitems', 3]);
```

**`queryCache.setQueryData(key, updateFunc)`**

Permet de modifier directement le contenu du cache correspondant à la clé `key`. La fonction `updateFunc` sera appelée avec le contenu actuel du cache et doit retourner le nouveau contenu par lequel le remplacer.

_Exemple_ :
```js
let newItem = { ... };
queryCache.setQueryData(['listitems', 3], items => [...items, newItem]);
// un nouvel élément est ajouté dans le tableau d'items correspondant à cette entrée de cache
```

**`let [mutate] = useMutation(asyncFunc, { onSuccess })`**

Permet d'obtenir une fonction `mutate` qui déclenchera l'appel à la fonction asynchrone `asyncFunc` fournie. En cas de succès, la fonction `onSuccess` sera appelée avec en paramètres : les données de résolution de la fonction asynchrone, puis le paramètre qui avait été fourni lors de l'appel à `mutate`.

_Exemple_ :
```js
let [addItem] = useMutation(listAPI.addItem, {
  onSuccess: item => queryCache.setQueryData(
    ['listitems', 3],
      items => [...items, item]
  )
});
// les données de résolution de la fonction listAPI.addItem est le nouvel item
// en cas de succès, on modifie l'entrée de cache correspondant à la liste 3 (exemple) pour y ajouter ce nouvel élément
```

## Combo box

Pour gérer une combo box, on utilise un élément `<select>`.
Si l'on dispose d'un tableau d'objets ayant chacun un identifiant, on peut sélectionner l'identifiant d'un élément par exemple de la façon suivante :
```js
let [selectedId, setSelectedId] = useState(0);

let objects = [
    { id: 1, prop1: 'bla', prop2: 'bla' },
    { id: 2, prop1: 'bli', prop2: 'bli' },
    { id: 3, prop1: 'blu', prop2: 'blu' }
];

return <form>
    <select value={selectedId} onChange={e => setSelectedId(parseInt(e.target.value))}>
        <option key={0} value={0}>--Please select an object--</option>
        {objects.map(o => <option key={o.id} value={o.id}>{o.prop1} {o.prop2}</option>)}
    </select>
</form>;
```
