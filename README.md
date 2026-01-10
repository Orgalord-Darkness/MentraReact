# MentraReact 

Une application React de quiz. Elle se base sur une api en open data. Les questions sont sur un large éventail de thèmes 

## Règles : 
  - Vous pouvez choisir le nombre de questions, la difficulté, le thème et le type de questions ( vrai ou faux | questionnaire à choix multiples). 
  - Vous disposez de 15 secondes pour répondre à une question, sinon le quiz passe à la question suivante
  - Il n'y a qu'une bonne réponse à chaque question. 
  - Une fois toutes les questions passés, une alert apparaît sur votre page avec votre score

## Conventions : 
  - Logique de découpage des composants : Découpage par fonctionnalité 
  - Convetion de nommage : camalCase

## Technologies : 
  - ### React
    - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
  - ### Vite 
    - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
