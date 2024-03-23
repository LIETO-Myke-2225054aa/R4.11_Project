# TodoApp

Un exemple d'application Todo réalisé avec React.

## Fonctionnalités

- Ajouter une tâche
- Cocher une tâche pour la marquer comme terminée
- Supprimer une tâche
- Déplacer une tâche vers le haut ou vers le bas
- Rechercher une tâche par titre

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Dans le répertoire du projet, exécutez `npm install` pour installer les dépendances.
3. Ensuite, lancez l'application avec `npm start`.

## Utilisation

- Pour ajouter une nouvelle tâche, cliquez sur le bouton "Ajouter une tâche" en bas de la liste.
- Pour marquer une tâche comme terminée, cochez la case à côté de la tâche.
- Pour supprimer une tâche, cliquez sur le bouton "Supprimer" à côté de la tâche.
- Pour déplacer une tâche vers le haut ou vers le bas, cliquez sur les flèches correspondantes.
- Pour rechercher une tâche par titre, saisissez le titre dans le champ de recherche en bas de la liste.

## Structure du Projet

- **src/** : Le répertoire racine du code source de l'application.
    - **assets/** : Contient les ressources statiques telles que les images.
        - **imgs/** : Contient les images utilisées dans l'application.
            - `downArrow.png` : Image de la flèche vers le bas.
            - `upArrow.png` : Image de la flèche vers le haut.
    - **styles/** : Contient les fichiers de styles CSS de l'application.
        - `TodoApp.css` : Styles spécifiques au composant TodoApp.
    - **components/** : Contient les composants React de l'application.
        - `Footer.js` : Composant de pied de page.
        - `Header.js` : Composant d'en-tête.
        - `Modal.js` : Composant de la fenêtre modale.

    - `index.js` : Point d'entrée de l'application React.
    - `TodoApp.js` : Composant principal de l'application Todo.

## License

Ce projet est sous licence MIT. Veuillez consulter le fichier LICENSE pour plus de détails.
