# IP Sniffer Widget

Un script JavaScript qui détecte les adresses IP locales et publiques via **WebRTC** et les affiche dans une interface utilisateur simple et interactive.

---

## 🔹 Fonctionnalités principales

- **Détection WebRTC** : Intercepte les ICE candidates pour extraire les adresses IP.
- **Affichage structuré** : Montre l’heure, l’IP, le fournisseur d’accès (ISP) et la ville.
- **Interface interactive** :
  - Bouton “Copy” pour copier l’IP
  - Bouton “Clear” pour vider la liste
  - Bouton “Close” pour supprimer le widget
  - Widget **déplaçable** et redimensionnable
- **Gestion des doublons** : Chaque IP n’est affichée qu’une seule fois.
- **Enrichissement des données** : Récupère des informations supplémentaires sur l’IP via l’API [ipapi.co](https://ipapi.co).

---

## 📌 Utilisation

1. Copier le script `ip-sniffer.js`.
2. Ouvrir la console de votre navigateur (F12 → Console).
3. Coller le script et appuyer sur Entrée.
4. Le widget apparaît et commence à détecter les IP automatiquement.

---

## 🛠️ Aspects techniques

- **Langage** : JavaScript (ES6+)
- **API utilisée** :
  - `RTCPeerConnection` pour récupérer les IP locales et publiques
  - `fetch()` pour interroger `ipapi.co` et obtenir les infos de l’IP
- **Interface UI** : créée dynamiquement avec `document.createElement` et `innerHTML`.
- **Drag & Drop** : implémenté via écoute des événements `mousedown`, `mousemove` et `mouseup`.
- **Gestion des états** : utilisation d’un `Set` pour éviter les doublons d’IP.

---

## 📷 Aperçu

<img width="424" height="297" alt="image" src="<img width="398" height="249" alt="image" src="https://github.com/user-attachments/assets/089821d5-818e-4b42-8273-7ba2884d099f" />
" />

