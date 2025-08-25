# 🐕 Le Monde Des Chiens Et Des Nacs - Garderie & Pension Canine

Site web moderne et responsive pour une garderie canine professionnelle à Vitry Sur Seine.

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé sur votre ordinateur :

- **Node.js** (version 16 ou plus récente)
  - Téléchargez-le sur [nodejs.org](https://nodejs.org/)
  - Choisissez la version "LTS" (recommandée)
  - Suivez les instructions d'installation

## 🚀 Installation

### Étape 1 : Ouvrir le terminal
- Sur **Windows** : Appuyez sur `Windows + R`, tapez `cmd` et appuyez sur Entrée
- Sur **Mac** : Ouvrez "Terminal" depuis Applications > Utilitaires
- Sur **Linux** : Appuyez sur `Ctrl + Alt + T`

### Étape 2 : Naviguer vers le dossier du projet
```bash
cd "chemin/vers/votre/dossier/garderie"
```
**Exemple** : `cd "C:\Users\votre-nom\Desktop\garderie"`

### Étape 3 : Installer les dépendances
```bash
npm install
```
Cette commande va télécharger et installer tous les modules nécessaires (cela peut prendre quelques minutes).

### Étape 4 : Démarrer le serveur de développement
```bash
npm run dev
```

### Étape 5 : Ouvrir le site
- Ouvrez votre navigateur web (Chrome, Firefox, Edge...)
- Allez à l'adresse : `http://localhost:3000`
- Le site devrait s'afficher !

## 📧 Configuration EmailJS (IMPORTANT !)

**⚠️ ATTENTION : Cette étape est obligatoire pour que les formulaires de contact fonctionnent !**

Le site utilise EmailJS pour envoyer des emails depuis les formulaires. Voici comment le configurer :

### 1. Créer un compte EmailJS
- Allez sur [emailjs.com](https://www.emailjs.com/)
- Cliquez sur "Sign Up" et créez un compte gratuit
- Confirmez votre email

### 2. Configurer le service email
- Dans votre tableau de bord EmailJS, cliquez sur "Email Services"
- Cliquez sur "Add New Service"
- Choisissez "Gmail" (ou votre fournisseur d'email)
- Connectez-vous avec votre compte Gmail
- Notez l'**ID du service** (ex: `service_abc123`)

### 3. Créer un template d'email
- Cliquez sur "Email Templates"
- Cliquez sur "Create New Template"
- Créez un template simple, par exemple :
  ```
  Nouveau message de {{name}}
  
  Email: {{email}}
  Téléphone: {{phone}}
  Message: {{message}}
  ```
- Notez l'**ID du template** (ex: `template_xyz789`)

### 4. Obtenir votre clé publique
- Cliquez sur "Account" dans le menu
- Copiez votre **Public Key** (ex: `user_def456`)

### 5. Mettre à jour le fichier de configuration
Ouvrez le fichier `src/components/Calendar.tsx` et modifiez ces lignes (vers la ligne 20) :

```typescript
// Remplacez ces valeurs par les vôtres
const EMAILJS_SERVICE_ID = 'VOTRE_ID_SERVICE'; // ex: service_abc123
const EMAILJS_TEMPLATE_ID = 'VOTRE_ID_TEMPLATE'; // ex: template_xyz789
const EMAILJS_PUBLIC_KEY = 'VOTRE_CLE_PUBLIQUE'; // ex: user_def456
```

**Exemple concret :**
```typescript
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY = 'user_def456';
```

### 6. Faire la même chose pour le formulaire de contact
Ouvrez le fichier `src/components/Contact.tsx` et modifiez les mêmes valeurs.

## 🛠️ Commandes utiles

```bash
# Démarrer le serveur de développement
npm run dev

# Arrêter le serveur
# Appuyez sur Ctrl + C dans le terminal

# Construire le projet pour la production
npm run build

# Tester le projet
npm test
```

## 📱 Fonctionnalités du site

- **Page d'accueil** : Présentation des services et témoignages
- **Planning** : Calendrier de réservation avec formulaire
- **À propos** : Informations sur la garderie et tarifs
- **Contact** : Formulaire de contact et informations
- **Responsive** : S'adapte à tous les écrans (mobile, tablette, ordinateur)

## 🔧 Structure du projet

```
garderie/
├── public/           # Images et fichiers publics
├── src/
│   ├── components/   # Composants React
│   ├── assets/       # Images et ressources
│   └── App.tsx       # Composant principal
├── package.json      # Dépendances du projet
└── README.md         # Ce fichier
```

## ❓ Problèmes courants

### "npm n'est pas reconnu"
- Réinstallez Node.js et redémarrez votre ordinateur

### "Port 3000 déjà utilisé"
- Fermez les autres onglets de terminal
- Ou utilisez : `npm run dev -- --port 3001`

### Les formulaires n'envoient pas d'emails
- Vérifiez que vous avez bien configuré EmailJS
- Vérifiez que les IDs sont corrects dans les fichiers

### Le site ne se charge pas
- Vérifiez que le serveur est démarré (`npm run dev`)
- Vérifiez l'URL dans votre navigateur

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez que vous avez suivi toutes les étapes
2. Assurez-vous que Node.js est bien installé
3. Vérifiez que EmailJS est correctement configuré
4. Redémarrez le serveur avec `npm run dev`

## 🚀 Déploiement

Pour mettre le site en ligne :
1. Exécutez `npm run build`
2. Le dossier `build/` contient votre site prêt à être hébergé
3. Uploadez le contenu de ce dossier sur votre hébergeur web

---

**Bon développement ! 🎉**
