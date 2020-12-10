Application Listes
===

Dans cette application, on va interagir avec un serveur qui dispose du modèle de données suivant :
 - _User_ : id (pk), username, password
 - _List_ : id (pk), title, UserId (fk)
 - _Item_ : id (pk), title, ListId (fk)

En plus des routes de gestion des User, l'API fournit les routes suivantes :
 - `GET /list` : renvoie un tableau d'objets _List_
 - `POST /list` : attend un objet contenant un champ `title`, crée et renvoie une nouvelle _List_
 - `DELETE /list/:id` : supprime la _List_ d'id `id`
 - `GET /list/:id/items` : renvoie un tableau d'objets _Item_ associés à la _List_ d'id `id`
 - `POST /list/:id/items` : attend un objet contenant un champ `text`, crée et renvoie un nouvel _Item_ associé à _List_ d'id `id`
 - `DELETE /item/:id` : supprime l'_Item_ d'id `id`

Toutes ces routes ne sont accessibles qu'à un utilisateur authentifié et attendent un token dans l'en-tête `Authorization`.

> ___Indication___ : le code serveur fourni a besoin d'un serveur MySql avec une base existante (les tables sont créées si besoin au lancement). Il vous faut modifier le fichier `list_api/models/index.js` pour y saisir les nom de user, mot de passe et nom de base.

___

Ajouter une route `/lists` dans l'application (ainsi que l'entrée de menu correspondante) dans laquelle on rend un composant `Lists`.

Au montage du composant `Lists`, l'ensemble des _List_ de l'utilisateur sont récupérées.
Les titres de ces _List_ sont affichés avec pour chacun un bouton permettant d'en demander la suppression et un bouton permettant d'en afficher le détail.
Un composant `AddListForm` permet l'ajout d'une nouvelle _List_.

Une demande de détail pour la _List_ d'id `id` nous fait changer de route (client) pour aller à la route `/lists/:id`.
C'est dans cette sous-route que l'on rend un composant `ListDetail`.

> ___Indications___ : on peut déclarer un composant `Route` à n'importe quel niveau de l'application, pas uniquement au top level. Pour déclarer une sous-route en fonction de la route courante (en concaténant la sous-route après la route courante par exemple), on peut récupérer la route courante grâce à la fonction `useRouteMatch` de React Router. On récupère les valeurs des paramètres des routes paramétrées (ici `:id`) grâce à la fonction `useParams`.

Ce dernier récupère et affiche l'ensemble des _Item_ de la _List_ avec également pour chacun un bouton permettant d'en demander la suppression.
Un composant `AddItemForm` permet l'ajout d'un nouvel _Item_ dans la _List_.

> ___Contraintes___ : utiliser la bibliothèque `react-query` pour accéder aux données (`useQuery`) ainsi que pour les ajouts et suppressions (`useMutation`). Toutes les fonctions exécutant les requêtes (`fetch`) et ayant donc connaissance de l'API seront déclarées dans un module séparé.

**Test ultime**

Le rafraîchissement de l'application à la route `/lists/2` doit restaurer l'interface dans un état où l'utilisateur est considéré authentifié, les titres des `List` de cet utilisateurs sont affichés ainsi que les _Item_ de la _List_ d'id 2.

Code splitting
---

Faire en sorte que le code du composant `Lists` soit chargé dynamiquement uniquement lors du premier accès à cette section de l'application :
https://reactjs.org/docs/code-splitting.html#route-based-code-splitting
