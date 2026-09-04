# Roue des champions — panneau de contrôle

## Version en ligne (GitHub Pages + Firebase)

- `index.html` : accès aux deux interfaces.
- `firebase-config.js` : configuration publique de l’application Firebase.
- `firebase-panel.js` : authentification et envoi des commandes.
- `firebase-wheel.js` : réception instantanée des commandes par la roue OBS.
- `database.rules.json` : lecture publique limitée à la commande de roue, écriture réservée au compte Google autorisé.

La clé Firebase d’une application Web est publique par conception. La sécurité réelle est assurée par les règles Realtime Database, qui limitent l’écriture à l’UID du propriétaire du panneau.

## Fichiers

- `roue-champions-obs.html` : source navigateur à ajouter dans OBS.
- `panneau-controle.html` : panneau permettant de déclencher et filtrer les tirages.
- `champion-data.js` : référentiel des 173 champions.

Les trois fichiers doivent rester dans le même dossier et être servis depuis la même adresse web.

## Filtres disponibles

- Rôle principal exclusif : Top, Jungle, Mid, ADC ou Support.
- Dégâts : AD ou AP. Les champions hybrides sont présents dans les deux pools.
- League Classic : roster actuel de 63 champions.
- Régions du lore : sélection multiple.
- Saison de sortie : sélection multiple et raccourci « sélectionner jusqu’à ».

Les sélections sont combinées avec la règle suivante :

- **OU** à l’intérieur d’une famille (Ionia ou Noxus, Saison 1 ou Saison 2) ;
- **ET** entre les familles (Jungle + AP + Ionia + League Classic).

Un tirage explicitement AD ou AP affiche `Build AD imposé` ou `Build AP imposé` sous le résultat.

## Test local

Il faut ouvrir les pages via un petit serveur web, et non directement avec une adresse `file://`.

```bash
python3 -m http.server 8000
```

Puis ouvrir :

- `http://localhost:8000/roue-champions-obs.html`
- `http://localhost:8000/panneau-controle.html`

La communication locale utilise `BroadcastChannel`. Elle fonctionne lorsque le panneau et la roue sont ouverts dans le même navigateur et sur le même domaine.

## Étape Firebase

Firebase sera ajouté pour commander la roue depuis un autre navigateur ou appareil. Il faudra alors renseigner la configuration du projet Firebase et sécuriser l’écriture du panneau de contrôle, tandis que la page OBS restera uniquement en lecture.
