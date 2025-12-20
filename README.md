IP Sniffer Widget

Un script JavaScript qui détecte les adresses IP publiques via WebRTC et les affiche dans une interface utilisateur moderne, interactive et enrichie avec des données de géolocalisation.

🔹 Fonctionnalités principales

Détection WebRTC
Intercepte les ICE candidates pour extraire les adresses IP publiques (srflx).

Affichage structuré et enrichi

Heure de détection

Adresse IP

Fournisseur d’accès (ISP)

Ville

Nom du département / région

Numéro du département (France)

Exemple :
Marseille (Provence-Alpes-Côte d’Azur – 13)

Interface interactive

Bouton Copy IP pour copier l’adresse IP

Bouton Google Maps pour ouvrir directement la ville détectée

Bouton Clear pour vider la liste

Bouton Close pour supprimer le widget

Widget déplaçable et redimensionnable

Gestion des doublons
Chaque IP n’est affichée qu’une seule fois grâce à l’utilisation d’un Set.

Enrichissement des données IP
Récupération automatique des informations via l’API ipapi.co
.

📌 Utilisation

Copier le script ip-sniffer.js.

Ouvrir la console de votre navigateur (F12 → Console).

Coller le script et appuyer sur Entrée.

Le widget apparaît et commence à détecter les IP automatiquement via WebRTC.

🛠️ Aspects techniques

Langage : JavaScript (ES6+)

API utilisées :

RTCPeerConnection pour récupérer les IP publiques via WebRTC

fetch() pour interroger l’API ipapi.co

Géolocalisation (France) :

Nom du département / région : data.region

Numéro du département : deux premiers chiffres du code postal

Interface UI :

Créée dynamiquement avec document.createElement et innerHTML

Drag & Drop :

Implémenté via les événements mousedown, mousemove et mouseup

Gestion des états :

Utilisation d’un Set pour éviter les doublons d’IP

Robustesse :

Protection contre les erreurs liées aux données manquantes

📷 Aperçu
<img width="398" height="249" alt="image" src="https://github.com/user-attachments/assets/089821d5-818e-4b42-8273-7ba2884d099f" />

