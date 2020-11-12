Toggle
===

Ecrire un composant `Toggle` qui stocke une valeur boolénne, affiche sa valeur courante ainsi qu'un bouton permettant de la modifier.

Counter
===

Ecrire un composant `Counter` qui stocke une valeur entière, affiche sa valeur courante ainsi qu'un bouton permettant de l'incrémenter.

Question
--

Comment faire pour compter et afficher le nombre de fois que la valeur du `Toggle` est passée à `true` ?

Clock
===

Ecrire un composant `Clock` qui affiche l'heure (hh:mm:ss) courante.
Le composant ne reçoit pas de propriété d'entrée et est autonome pour son rafraichissement régulier.

Extraire la logique de l'horloge dans un custom hook.

Dans l'application principale, déclarer un composant `Clock` ainsi qu'une checkbox indiquant si oui ou non le composant Clock doit être rendu.

TodoList
===

Ecrire une petite application de TodoList.
Il doit être possible d'ajouter un nouvel item, de supprimer un item existant, et de marquer un item comme `fait` (qui s'affiche alors en texte barré).

Faire en sorte que les items soient sauvegardés dans le `localStorage`.
Ecrire un custom hook pour déclarer du `state` sauvegardé dans le `localStorage`.
