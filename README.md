# AI Finder 🚀

Une application web moderne et élégante pour découvrir les meilleurs outils d'IA adaptés à vos besoins.

## 🛠️ Stack Technique

- **Framework** : Next.js 14 (App Router)
- **Langage** : TypeScript
- **UI** : React
- **CSS** : Tailwind CSS
- **Animations** : Framer Motion
- **Icônes** : Lucide React

## 🚀 Installation

1. Installez les dépendances :
```bash
npm install
```

2. Lancez le serveur de développement :
```bash
npm run dev
```

3. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du Projet

```
├── app/
│   ├── globals.css          # Styles globaux et glassmorphism
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Page d'accueil
├── components/
│   ├── Header.tsx           # En-tête avec navigation
│   ├── Hero.tsx             # Section principale avec recherche
│   ├── AnimatedSearchBar.tsx # Barre de recherche avec effet typing
│   ├── AIToolsCarousel.tsx  # Carrousel d'icônes d'IA
│   ├── HowItWorks.tsx       # Section "Comment ça marche"
│   └── Footer.tsx           # Pied de page
└── package.json
```

## ✨ Fonctionnalités

- ✨ **Barre de recherche animée** avec effet de texte qui s'écrit automatiquement
- 🎨 **Design glassmorphism** avec dégradés sombres et effets de flou
- 🎭 **Animations fluides** avec Framer Motion
- 📱 **Design responsive** (mobile-first)
- 🔄 **Carrousel infini** des catégories d'IA
- 🎯 **Simulation de recherche** avec résultats fictifs

## 🎨 Personnalisation

Les couleurs et styles peuvent être modifiés dans :
- `app/globals.css` : Styles globaux et classes glassmorphism
- `tailwind.config.ts` : Configuration Tailwind
- Composants individuels : Couleurs des dégradés et animations

## 📝 Notes

- La recherche est actuellement simulée avec des résultats fictifs
- Le projet est prêt pour l'intégration d'un backend réel
- Toutes les animations sont optimisées pour les performances



