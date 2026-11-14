# GameOn

Page de présentation d’un tournoi de jeux vidéo, avec formulaire d’inscription en JavaScript. Projet réalisé dans le cadre du parcours Développeur d’application JavaScript React d’OpenClassrooms.

[Voir la démo GitHub Pages](https://drgyz.github.io/GameOn-website-FR-master/)

## Démarrage

Depuis la racine du dépôt, lancer `python -m http.server 8000` puis ouvrir `http://localhost:8000`. Aucun paquet ni build nécessaire.

- `index.html` : page, menu mobile et formulaire.
- `modal.css` : styles de la page et de la fenêtre d’inscription.
- `modal.js` : ouverture, navigation et validation du formulaire.
- `DM_Sans/` : police locale et licence.

Le formulaire est une démo : les données sont validées dans le navigateur, sans envoi ni enregistrement. Les rubriques « À propos », « Contact » et « Évènements passés » sont des liens de maquette.

Pour vérifier le JavaScript : `node --check modal.js`. Dans le navigateur, tester un formulaire vide, une inscription valide et la fermeture avec Échap. Sur mobile, vérifier aussi l’ouverture du menu au clavier.
