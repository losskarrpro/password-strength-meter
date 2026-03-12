# Password Strength Meter

Un vérificateur de force de mot de passe moderne avec interface interactive qui évalue la sécurité des mots de passe en temps réel.

## Fonctionnalités

- **Évaluation en temps réel** : Analyse immédiate du mot de passe pendant la saisie
- **Barre de progression visuelle** : Changement de couleur selon la force (rouge → orange → vert)
- **Score numérique** : Notation de 0 à 100 points
- **Critères de validation** : Liste des exigences avec indicateurs visuels
- **Suggestions intelligentes** : Conseils personnalisés pour améliorer la sécurité
- **Animations fluides** : Transitions et effets visuels modernes
- **Tests unitaires** : Validation du moteur d'évaluation

## Critères d'évaluation

Le système évalue les mots de passe selon 5 critères principaux :

1. **Longueur minimale** : Au moins 8 caractères
2. **Lettres majuscules** : Au moins une lettre majuscule (A-Z)
3. **Lettres minuscules** : Au moins une lettre minuscule (a-z)
4. **Chiffres** : Au moins un chiffre (0-9)
5. **Caractères spéciaux** : Au moins un caractère spécial (!@#$%^&* etc.)

## Installation

### Prérequis

- Navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Node.js (optionnel, pour les tests)

### Installation locale

1. Clonez le dépôt :
```bash
git clone https://github.com/votre-username/password-strength-meter.git
cd password-strength-meter
```

2. Ouvrez le fichier `index.html` directement dans votre navigateur

OU

3. Lancez un serveur local (recommandé) :
```bash
# Avec Python
python -m http.server 7500

# Avec Node.js (si http-server est installé)
npx http-server -p 7500
```

4. Accédez à l'application via : `http://localhost:7500`

### Installation avec npm (optionnel)

```bash
npm install
npm test  # Exécute les tests unitaires
```

## Structure du projet

```
password-strength-meter/
├── index.html              # Page principale
├── css/
│   └── style.css          # Styles CSS
├── js/
│   ├── password-strength.js  # Logique d'évaluation
│   ├── ui-handler.js      # Gestion de l'interface
│   ├── animations.js      # Animations et transitions
│   ├── suggestions.js     # Système de suggestions
│   └── tests/
│       └── password-strength.test.js  # Tests unitaires
├── package.json           # Configuration npm
└── README.md             # Documentation
```

## Utilisation

1. Saisissez un mot de passe dans le champ prévu à cet effet
2. Observez en temps réel :
   - La barre de progression qui change de couleur
   - Le score numérique qui s'ajuste
   - Les critères qui se cochent au fur et à mesure
   - Les suggestions d'amélioration
3. Utilisez les suggestions pour renforcer votre mot de passe

## Niveaux de sécurité

- **Faible (0-39)** : Rouge - Mot de passe vulnérable
- **Moyen (40-69)** : Orange - Sécurité acceptable
- **Fort (70-89)** : Vert clair - Bonne sécurité
- **Très fort (90-100)** : Vert foncé - Excellente sécurité

## Tests

Pour exécuter les tests unitaires :

```bash
npm test
```

Les tests couvrent :
- Calcul du score de force
- Validation des critères
- Génération des suggestions
- Logique métier principale

## Technologies utilisées

- HTML5
- CSS3 (Flexbox, Grid, Variables CSS)
- JavaScript (ES6+)
- Modularité JavaScript
- Tests unitaires

## Personnalisation

### Modifier les critères

Pour ajuster les règles d'évaluation, modifiez le fichier `js/password-strength.js` :

```javascript
const criteria = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true
};
```

### Changer les couleurs

Les couleurs sont définies dans `css/style.css` via des variables CSS :

```css
:root {
  --strength-weak: #ff4757;
  --strength-medium: #ffa502;
  --strength-strong: #2ed573;
  --strength-very-strong: #1e90ff;
}
```

## Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Auteur

Développé avec ❤️ par l'équipe Password Strength Meter

## Support

Pour toute question ou problème, veuillez ouvrir une issue sur le dépôt GitHub.