console.log("Base SQLite utilisée :", require('path').resolve('./database.db'));
const express = require('express');
const cors = require('cors');
const { PORT } = require('./PORT');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 👉 SERVIR TON SITE ICI (AVANT LES ROUTES)
app.use(express.static('./'));

// Connexion à la base SQLite
const db = new sqlite3.Database('./database.db');

// Création des tables
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS produits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            description TEXT,
            prix REAL NOT NULL,
            stock INTEGER NOT NULL DEFAULT 0
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS commandes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            total REAL,
            status TEXT,
            date TEXT
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS lignes_commandes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            commande_id INTEGER,
            produit_id INTEGER,
            quantite INTEGER,
            prix_unitaire REAL
        )
    `);

    db.get('SELECT COUNT(*) AS count FROM produits', (err, row) => {
        if (row.count === 0) {
            const stmt = db.prepare(
                'INSERT INTO produits (nom, description, prix, stock) VALUES (?, ?, ?, ?)'
            );
            stmt.run('T-shirt Punk', 'T-shirt noir imprimé', 19.90, 50);
            stmt.run('Vinyle Ska', 'Album vinyle édition limitée', 24.90, 20);
            stmt.run('Poster Rock', 'Poster format A2', 9.90, 100);
            stmt.finalize();
            console.log('Produits de test insérés.');
        }
    });
});

/********************************************
 * ROUTE : Liste des produits
 ********************************************/
app.get('/api/produits', (req, res) => {
    db.all('SELECT * FROM produits', (err, rows) => {
        if (err) return res.status(500).json({ error: 'Erreur serveur' });
        res.json(rows);
    });
});

/********************************************
 * ROUTE : Création d’une commande
 ********************************************/
app.post('/api/commande', (req, res) => {
    const produits = req.body.produits;

    if (!produits || produits.length === 0) {
        return res.status(400).json({ error: "Panier vide" });
    }

    db.run(
        `INSERT INTO commandes (total, status, date) VALUES (?, ?, datetime('now'))`,
        [0, 'en_attente'],
        function(err) {
            if (err) return res.status(500).json({ error: err });

            const commandeId = this.lastID;

            produits.forEach(id => {
                db.run(
                    `INSERT INTO lignes_commandes (commande_id, produit_id, quantite, prix_unitaire)
                     SELECT ?, id, 1, prix FROM produits WHERE id = ?`,
                    [commandeId, id]
                );
            });

            res.json({ message: "Commande enregistrée", commandeId });
        }
    );
});

/********************************************
 * Démarrage du serveur
 ********************************************/
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
