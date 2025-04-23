# Weather App

Une application mobile de météo développée avec React Native et Expo pour la Start-up Sun Forecast. L'application permet de visualiser les prévisions météorologiques sur 5 jours pour optimiser la production d'énergie photovoltaïque.

## Fonctionnalités

- Affichage de la météo actuelle basée sur la géolocalisation
- Recherche de météo par ville
- Prévisions sur 5 jours avec données horaires
- Interface utilisateur intuitive avec fond d'écran
- Affichage des icônes météo
- Températures en degrés Celsius
- Descriptions météo en français

## Technologies utilisées

- React Native
- Expo
- TypeScript
- OpenWeather API
- Expo Location
- Font Awesome
- Axios

## Installation

1. Clonez le dépôt :
```bash
git clone git@github.com:anthozb3x/Weather_App.git
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez l'application :
```bash
npx expo start
```

## Structure du projet

```
Weather_App/
├── assets/              # Images et ressources
├── components/          # Composants React
│   ├── CurrentWeather.tsx
│   ├── ForecastWeather.tsx
│   ├── ShowIcon.tsx
│   └── Weather.tsx
├── App.tsx             # Composant principal
└── package.json        # Dépendances
```

## Composants

- **CurrentWeather** : Affiche la météo du jour
- **ForecastWeather** : Affiche la météo sur 5 jours
- **ShowIcon** : Affiche les icônes météo
- **Weather** : Affiche la météo pour une heure spécifique

## API

L'application utilise l'API OpenWeather pour :
- Obtenir les prévisions météo sur 5 jours
- Géolocaliser les villes
- Récupérer les icônes météo

## Auteur

Anthony béal

