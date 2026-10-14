# talk_ai

Application web qui permet de discuter avec le contenu d'une page web. On colle l'adresse d'un site dans l'URL de l'application, la page est lue et indexée, puis on pose ses questions dans un chat et l'IA répond à partir du contenu de cette page.

## Fonctionnalités

- Ouvrir une page web à partir de son URL (`/https://exemple.com/page`)
- Indexation automatique du contenu de la page (une seule fois par URL)
- Chat avec l'IA, qui répond à partir du contenu indexé
- Historique de conversation conservé pour chaque utilisateur et chaque page

## Technologies

- Next.js (App Router), React, TypeScript
- Tailwind CSS et daisyUI
- Upstash Redis (suivi des URLs indexées et historique des messages)
- Upstash Vector et `@upstash/rag-chat` (indexation et recherche dans le contenu)

## Comment ça marche

1. L'URL du site est lue depuis la route dynamique `app/[...link]/page.tsx`.
2. Si la page n'a jamais été indexée, son contenu HTML est découpé en morceaux (chunks) puis stocké dans Upstash Vector. L'URL est enregistrée dans Redis pour ne pas la réindexer.
3. Quand l'utilisateur pose une question, les morceaux les plus pertinents sont retrouvés et envoyés à l'IA pour générer la réponse.
4. L'historique est retrouvé grâce à un identifiant de session (l'URL combinée à un cookie).

## Lancer le projet

1. Cloner le dépôt :
```
   git clone https://github.com/JbDev-tech/talk_ai.git
   cd talk_ai
```
2. Installer les dépendances :
```
   npm install
```
3. Copier `.env.example` en `.env`, puis remplir les clés Upstash et celle du modèle de langage.
4. Lancer le serveur de développement :
```
   npm run dev
```
5. Ouvrir http://localhost:3000

## Crédits

Projet réalisé en suivant le tutoriel de Faiz Dev : https://www.youtube.com/watch?v=YS5etmvl5Ic

Ce que j'ai fait moi-même en plus du tutoriel : corrections de bugs rencontrés en cours de route (URL tronquée à cause du double slash, paramètres de découpage du texte, ordre des variables), configuration de Git et publication sur GitHub.

## Ce que j'ai appris

- Les routes dynamiques de Next.js et la lecture asynchrone de `params`
- Le principe du RAG : découper un texte, l'indexer, retrouver les passages utiles
- Le rôle de Redis et d'une base vectorielle
- Pourquoi garder ses clés API hors de GitHub (`.env` et `.gitignore`)
- Lire les messages d'erreur de Next.js et de TypeScript pour trouver la cause
- Les bases de Git et GitHub : commit, push, dépôt distant
