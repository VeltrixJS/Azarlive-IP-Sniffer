# IP Sniffer Widget pour Azar
Un script JavaScript conçu pour [Azar](https://azarlive.com/) qui détecte les adresses IP publiques via WebRTC et les affiche dans une interface utilisateur moderne, interactive et enrichie avec des données de géolocalisation.

---

## 🔹 Fonctionnalités principales

- **Détection WebRTC**  
  Intercepte les ICE candidates pour extraire les adresses IP publiques (srflx).

- **Affichage structuré et enrichi**
  - Heure de détection
  - Adresse IP
  - Fournisseur d'accès (ISP)
  - **Ville**
  - **Nom du département / région**
  - **Numéro du département (France)**
  
  *Exemple :*  
  `Marseille (Provence-Alpes-Côte d'Azur – 13)`

- **Interface interactive**
  - Bouton **Copy IP** pour copier l'adresse IP
  - Bouton **Google Maps** pour ouvrir directement la ville détectée
  - Bouton **Clear** pour vider la liste
  - Bouton **X** pour supprimer le widget
  - Widget **déplaçable** et redimensionnable
  - **Bouton "📺 2ème écran"** pour ouvrir une fenêtre popup indépendante
    - Permet de déplacer l'interface sur un second écran
    - Synchronisation automatique des IP détectées
    - Fenêtre redimensionnable et repositionnable

- **Enrichissement des données IP**  
  Récupération automatique des informations via l'API [ipapi.co](https://ipapi.co).

---

## 📌 Utilisation


1. Ouvrir https://azarlive.com/ dans votre navigateur.
2. Copier le script `ip-sniffer.js`.
3. Ouvrir la console de votre navigateur (**F12 → Console**).
4. Coller le script et appuyer sur **Entrée**.
5. Le widget apparaît et commence à détecter les IP automatiquement via WebRTC.
6. **(Optionnel)** Cliquer sur **📺 2ème écran** pour ouvrir une fenêtre popup et la déplacer sur un second écran.

---

## 🛠️ Aspects techniques

- **Langage** : JavaScript (ES6+)

- **API utilisées** :
  - `RTCPeerConnection` pour récupérer les IP publiques via WebRTC
  - `fetch()` pour interroger l'API `ipapi.co`
  - `window.open()` pour créer des fenêtres popup multi-écran

- **Géolocalisation (France)** :
  - Nom du département / région : `data.region`
  - Numéro du département : deux premiers chiffres du code postal

- **Interface UI** :
  - Créée avec `document.createElement` et `innerHTML`
  - Interface principale intégrée dans la page
  - Fenêtre popup indépendante avec HTML/CSS injecté dynamiquement


- **Multi-écran** :
  - Utilisation de `window.open()` pour créer une fenêtre séparée
  - Synchronisation en temps réel entre l'interface principale et la popup
  - Gestion de l'état de la fenêtre (ouverte/fermée)


## 📷 Aperçu

### Interface principale
<img width="403" height="289" alt="image" src="https://github.com/user-attachments/assets/d9de115f-344a-4984-abd7-d97a0ede3bb2" />

### Pop-up second écran 
<img width="450" height="444" alt="image" src="https://github.com/user-attachments/assets/344cc7a7-1174-4c3b-b515-972fbd3333cb" />



