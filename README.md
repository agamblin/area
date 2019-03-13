

# Action REAction (AREA)
Dans le cadre de notre 3ème année l'AREA est un projet Epitech compris dans le module de développement web

## SOMMAIRE
- **Information général**
- **Environnement général**
 - **Graphique technique**

## INFORMATION GÉNÉRAL

- **Taille du groupe** : 6
- **Répertoire** : DEV_area_2018
- **Droit de ramassage** : ramassage-tek
 - **Langage** : React native, Node.js, React.js
 - **Compilation** : docker-compose build && docker-compose up

## ENVIRONNEMENT GÉNÉRAL

- **Environnement technique** :

> Application web  [link](https://7rib3.com/signin).
>  Application mobile.
> Api web [link](https://documenter.getpostman.com/view/6448473/S11DVMpa).

```mermaid
graph LR
A((Api)) --> C
A --> B
B[App mobile] --> D
C[App web] --> D{Data}
```

- **Environnement fonctionnel** :

> Management du projet [Trello](https://trello.com/b/04fAMfBU/tribe).
> Hébergement [Github](http://github.com) &  [Aws](http://github.com)
> Documentation [Stackedit](stackedit.io) & [Postman](http://github.com)

```mermaid
graph LR
A((Fonction)) --> C[Trello]
C --> E[Github]
C --> D[Aws]
E --> F((Upload))
D --> F
F --> G[Stackedit]
F --> H[Postman]
```

## GRAPHIQUE TECHNIQUE

### Front
```mermaid
graph LR
A --> B
A((AREA)) --> C
B[App mobile] --> E{React native}
C[App web] --> D{React}
```

### Back
```mermaid
graph LR
A --> B
A((AREA)) --> C
B[App mobile] --> E{React native}
A --> F[Api]
F --> G{Node.js}
C[App web] --> D{React}
```

### Test
```mermaid
graph LR
A --> B
A((AREA)) --> C
B[App mobile] --> E{Yarn}
C[App web] --> D{Yarn}
```

## GRAPHIQUE DATABASE
```mermaid
graph LR
A((Projets)) --> B[Trello]
A --> C[Dossier]
A --> D[Dossier drive]
A --> E((User))
E --> F[Google provider]
D --> F
C --> F
B --> F
D --> G
C --> G
B --> G
D --> H
C --> H
B --> H
E --> G[Github provider]
E --> H[Trello provider]
G --> I{Token}
H --> I
F --> I
```
# Installation
- Prérequis.
  > Docker

- Etape 1.
  > sudo docker-compose up --build

- Etape 2.
  > Lancer [AREA](http://localhost/8081)
  
