# 🏁 Algorithmes de Tri — Visualisation Interactive

Visualisez 6 algorithmes de tri en action, en parallèle, sur les mêmes données.
Comprenez comment ils fonctionnent grâce aux animations, bulles de dialogue et descriptions textuelles.

## 🚀 Lancement

```bash
cd sorting-visualizer
python3 -m http.server 5174 --bind 127.0.0.1
```

Ouvrir **http://127.0.0.1:5174/** dans un navigateur.

> Pas de build, pas de dépendances. Du HTML + CSS + JS modules.

## 🎮 Utilisation

| Bouton | Action |
|---|---|
| **🎲 Nouveaux** | Génère un nouveau jeu de données aléatoires |
| **▶ Trier** | Lance les 6 algorithmes simultanément |
| **⏸ Pause** | Met en pause / reprend l'animation |
| **↺ Reset** | Réinitialise tout (annule si en cours) |
| **🔍 Focus** | Isole un seul algorithme pour l'étudier |
| **❓ Aide** | Ouvre la légende détaillée |
| **Slider Éléments** | Change le nombre de barres (10–200) |
| **Slider Vitesse** | 🐢 Très lent → ⚡ Éclair (modifiable en temps réel) |

## 📊 Algorithmes

| Algorithme | Complexité |
|---|---|
| **Bubble Sort** | O(n²) |
| **Selection Sort** | O(n²) |
| **Insertion Sort** | O(n²) |
| **Merge Sort** | O(n log n) |
| **Quick Sort** | O(n log n) |
| **Heap Sort** | O(n log n) |

Tous trient exactement les mêmes données, générées aléatoirement.

## 🗯️ Fonctionnalités

- **Barres en CSS Grid** : chaque barre occupe `1/n` de la largeur totale
- **Swap animé** : translation visuelle des barres lors d'un échange
- **Bulles de dialogue** : le plus grand baratine pendant les comparaisons
- **Description textuelle** : chaque étape est décrite en français sous l'algorithme
- **Focus mode** : isole un algorithme avec des barres agrandies
- **Pause / Resume** : pour analyser une étape précise
- **Vitesse dynamique** : changez la vitesse pendant l'exécution
- **Génération** : système anti-conflit qui ignore les résultats d'une course si un reset a eu lieu
- **DOM persistant** : les barres sont créées une fois et mises à jour par classe/hauteur (pas de recréation à chaque frame)

## 📁 Architecture

```
sorting-visualizer/
├── index.html          # Structure HTML + modale d'aide
├── css/
│   └── style.css       # Styles complets (~280 lignes)
└── js/
    ├── main.js         # Orchestrateur : DOM, événements, état
    ├── renderer.js     # Rendu + animation des barres
    └── sorters.js      # Algorithmes de tri purs
```

### Séparation des responsabilités

- **`sorters.js`** — pur JavaScript, sans DOM. Chaque fonction prend un tableau, retourne une séquence d'étapes. Testable unitairement.
- **`renderer.js`** — gère le DOM et l'animation. Crée/met à jour les barres, anime les swaps, affiche les bulles.
- **`main.js`** — orchestre le tout. Monte l'interface, connecte les événements, lance les tris et traite les résultats.

## 🔧 Étapes de tri

Chaque algorithme produit un tableau d'étapes :

```js
{ type: 'cmp', i: 3, j: 4 }   // Comparaison entre a[3] et a[4]
{ type: 'swp', i: 3, j: 4 }   // Échange a[3] ↔ a[4]
{ type: 'swp', i: 5, v: 42 }  // Écriture : a[5] = 42 (Merge Sort)
{ type: 'srt', i: 2 }         // a[2] est définitivement trié
```

## Construit avec

Ce projet a ete entierement code par **Claw** (agent OpenClaw) en utilisant **DeepSeek** comme modele de raisonnement.

- [OpenClaw](https://github.com/openclaw/openclaw) — framework agentique open-source
- [DeepSeek](https://deepseek.com) — modele de langage

## Prérequis

Aucun. Un navigateur moderne suffit (ES modules + CSS Grid + `:has()` selector).
