Site e-commerce développé avec Node.js, permettant la présentation de produits et la gestion d'un panier d'achat.

## 📋 Description

Ce projet est une application web de type site marchand, offrant une interface pour parcourir des produits et gérer un panier d'achat côté client, avec un serveur backend en Node.js.

## 🗂️ Structure du projet

Site-Marchand/
├── .vscode/ # Configuration de l'éditeur VS Code
├── img/ # Images et ressources graphiques du site
├── node_modules/ # Dépendances Node.js (générées via npm install)
├── PORT.js # Configuration du port du serveur
├── database.db # Base de données du site
├── index.html # Page d'accueil / catalogue produits
├── panier.html # Page du panier d'achat
├── script.js # Logique JavaScript côté client
├── server.js # Serveur Node.js (backend)
├── style.css # Feuille de style du site
├── package.json # Dépendances et scripts npm
└── package-lock.json # Versions exactes des dépendances


## 🚀 Installation

1. Clonez le dépôt :
```bash
   git clone https://github.com/DidierThebaut/Site-Marchand.git
   cd Site-Marchand
```

2. Installez les dépendances :
```bash
   npm install
```

3. Lancez le serveur :
```bash
   node server.js
```

4. Ouvrez votre navigateur à l'adresse indiquée (voir `PORT.js` pour le port utilisé, par défaut souvent `http://localhost:3000`).

## 🛠️ Technologies utilisées

- **Node.js** – serveur backend
- **HTML / CSS / JavaScript** – interface utilisateur
- **Base de données** – stockage via `database.db`

## 📄 Pages principales

- `index.html` : page d'accueil présentant les produits disponibles
- `panier.html` : page permettant de consulter et gérer le panier d'achat

## ✨ Fonctionnalités

- Affichage du catalogue de produits
- Ajout de produits au panier
- Gestion du panier d'achat
- Interface responsive

## 👤 Auteur

**Didier Thébaut**

## 📝 Licence

Ce projet est un projet personnel / pédagogique.
