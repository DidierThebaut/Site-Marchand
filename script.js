/******************************
 * 0. CHANGER COULEUR
 ******************************/
const btn = document.getElementById("btn");
const message = document.getElementById("message");

if (btn && message) {
    btn.addEventListener("click", () => {
        const randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
        message.style.color = randomColor;
    });
}


/******************************
 * IMAGES PRODUITS
 ******************************/
const images = {
    1: "img/punk.png",
    2: "img/ska.png",
    3: "img/rock.png"
};


/******************************
 * 1. AFFICHAGE DES PRODUITS
 ******************************/
function afficherProduits() {
    const liste = document.getElementById('liste-produits');
    if (!liste) return;

    fetch('/api/produits')
        .then(response => response.json())
        .then(produits => {
            produits.forEach(p => {
                const div = document.createElement('div');
                div.className = 'produit';

                div.innerHTML = `
                    <img src="${images[p.id]}" class="photo-produit">
                    <h2>${p.nom}</h2>
                    <p>${p.description}</p>
                    <p><strong>${p.prix} €</strong></p>
                    <button onclick="ajouterPanier(${p.id})">Ajouter au panier</button>
                `;

                liste.appendChild(div);
            });
        });
}


/******************************
 * 2. AJOUT AU PANIER
 ******************************/
function ajouterPanier(idProduit) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    panier.push(idProduit);
    localStorage.setItem('panier', JSON.stringify(panier));
    alert("Produit ajouté au panier !");
}


/******************************
 * 3. AFFICHAGE DU PANIER
 ******************************/
function afficherPanier() {
    const zone = document.getElementById('contenu-panier');
    if (!zone) return;

    const panier = JSON.parse(localStorage.getItem('panier')) || [];

    if (panier.length === 0) {
        zone.innerHTML = "<p>Votre panier est vide.</p>";
        return;
    }

    fetch('/api/produits')
        .then(res => res.json())
        .then(produits => {
            let total = 0;

            panier.forEach(id => {
                const p = produits.find(prod => prod.id === id);
                if (p) {
                    total += p.prix;

                    const div = document.createElement('div');
                    div.className = 'produit';

                    div.innerHTML = `
                        <img src="${images[p.id]}" class="photo-produit">
                        <h2>${p.nom}</h2>
                        <p>${p.description}</p>
                        <p><strong>${p.prix} €</strong></p>
                    `;

                    zone.appendChild(div);
                }
            });

            const totalDiv = document.createElement('div');
            totalDiv.innerHTML = `<h3>Total : ${total.toFixed(2)} €</h3>`;
            zone.appendChild(totalDiv);
        });
}


/******************************
 * 4. VALIDATION DE LA COMMANDE
 ******************************/
function activerValidationCommande() {
    const btnValider = document.getElementById("valider-commande");
    if (!btnValider) return;

    btnValider.addEventListener("click", () => {
        const panier = JSON.parse(localStorage.getItem('panier')) || [];

        fetch('/api/commande', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ produits: panier })
        })
        .then(res => res.json())
        .then(data => {
            alert("Commande validée !");
            localStorage.removeItem('panier');
            window.location.href = "index.html";
        });
    });
}


/******************************
 * 5. LANCEMENT AUTOMATIQUE
 ******************************/
document.addEventListener("DOMContentLoaded", () => {
    afficherProduits();
    afficherPanier();
    activerValidationCommande();
});
