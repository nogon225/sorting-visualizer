/**
 * fr.js — Traductions françaises du sorting visualizer.
 */
export const fr = {
  meta: {
    title: "Algorithmes de Tri — Visualisation",
    description: "Visualisation interactive d'algorithmes de tri en temps réel"
  },

  controls: {
    elements: "Éléments",
    vitesse: "Vitesse",
    speedLabels: [
      "🐢 Très lent", "🐢 Lent", "🐢", "Normal",
      "Normal", "Normal", "🚀 Rapide", "🚀", "🚀 Très rapide", "⚡ Éclair"
    ]
  },

  buttons: {
    shuffle: "🎲 Mélanger",
    sort: "▶ Trier",
    pause: "⏸ Pause",
    resume: "▶ Resume",
    reset: "↺ Reset",
    help: "❓",
    focus: "🔍",
    unfocus: "✕",
    algoInfo: "ℹ️",
    history: "📋",
    lang: "🇬🇧 EN"
  },

  status: {
    ready: 'Prêt — clique sur <strong>▶ Trier</strong>',
    sorting: '⏳ Tri en cours…',
    paused: '⏸ En pause',
    resuming: '▶ Reprise…',
    winner: (p) => `🏆 <span class="win">${p.name}</span> gagne en <strong>${p.ms}ms</strong> ! 2<sup>e</sup> ${p.second} ${p.secondMs}ms`,
    singleWinner: (p) => `✅ <span class="win">${p.name}</span> terminé en <strong>${p.ms}ms</strong>`,
    cancelled: '❌ Tous annulés.',
    done: (p) => `Tableau trié en <strong>${p.ms}ms</strong> (${p.steps} étapes)`
  },

  algo: {
    bubble:    { name: "Tri à bulles",    cx: "O(n²)" },
    selection: { name: "Tri par sélection", cx: "O(n²)" },
    insertion: { name: "Tri par insertion", cx: "O(n²)" },
    merge:     { name: "Tri fusion",     cx: "O(n log n)" },
    quick:     { name: "Tri rapide",     cx: "O(n log n)" },
    heap:      { name: "Tri par tas",      cx: "O(n log n)" }
  },

  legend: [
    "🔵 Défaut",
    "🟡 Comparaison",
    "🔴 Échange",
    "🟢 Trié"
  ],

  lane: {
    focusTooltip: (p) => `Focus sur ${p.algo}`,
    infoTooltip: (p) => `Fonctionnement de ${p.algo}`,
    histTooltip: "Historique des opérations",
    histModalTitle: (p) => `📋 ${p.algo} — Historique`,
    histEmpty: "Aucune opération pour le moment.",
    histSteps: (p) => `📊 <b>${p.n}</b> étapes`,
    histCmp: (p) => `🔄 <b>${p.n}</b>`,
    histSwp: (p) => `🔀 <b>${p.n}</b>`,
    histSrt: (p) => `✅ <b>${p.n}</b>`
  },

  typeLabels: {
    swap: "🔀 ← Échange →",
    move: "➡️ Déplacement",
    write: "✍️ Écriture",
    done: "✅ Terminé"
  },

  steps: {
    cmp: {
      label: "Comparaison",
      text: (p) => `Compare a[${p.i}]=${p.vI} avec a[${p.j}]=${p.vJ}`,
      html: (p) =>
        '<span class="sc-cmp">Compare</span> <b>a[' + p.i + ']</b> = <span class="sc-val">' + p.vI + '</span> '
        + '<span class="sc-cmp">avec</span> <b>a[' + p.j + ']</b> = <span class="sc-val">' + p.vJ + '</span>'
        + (p.gt
          ? ' → <span class="sc-swap">' + p.vI + ' > ' + p.vJ + ', <span class="sc-swap">échange</span></span>'
          : ' → <span class="sc-ok">' + p.vI + ' ≤ ' + p.vJ + ', <span class="sc-ok">OK</span></span>')
        + ' <span class="sc-step">' + p.step + '</span>'
    },
    swp: {
      label: "Échange",
      html: (p) =>
        '<span class="sc-swap">Échange</span> <b>a[' + p.i + ']</b> = <span class="sc-val">' + p.vI + '</span> ↔ <b>a[' + p.j + ']</b> = <span class="sc-val">' + p.vJ + '</span>'
        + ' <span class="sc-step">' + p.step + '</span>'
    },
    write: {
      label: "Écriture",
      html: (p) =>
        '<span class="sc-swap">Écrit</span> <span class="sc-val">' + p.v + '</span> dans <b>a[' + p.i + ']</b>'
        + ' <span class="sc-step">' + p.step + '</span>'
    },
    shift: {
      label: "Décalage",
      html: (p) =>
        '<span class="sc-cmp">Décale</span> <b>a[' + p.i + ']</b> → <b>a[' + p.j + ']</b>'
        + ' <span class="sc-step">' + p.step + '</span>'
    },
    insert: {
      label: "Insertion",
      html: (p) =>
        '<span class="sc-swap">Insère</span> <span class="sc-val">' + p.v + '</span> dans <b>a[' + p.i + ']</b>'
        + ' <span class="sc-step">' + p.step + '</span>'
    },
    srt: {
      label: "Placement",
      html: (p) =>
        '<b>a[' + p.i + ']</b> = <span class="sc-val">' + p.v + '</span> → <span class="sc-sorted">définitivement trié !</span>'
        + ' <span class="sc-step">' + p.step + '</span>'
    },
    default: {
      label: "Étape",
      html: (p) => 'Étape <span class="sc-step">' + p.step + '</span>'
    },
    emojiLabels: {
      cmp: "🔄 Comparaison",
      swp: "🔀 Échange",
      srt: "✅ Placement",
      unknown: "❓"
    }
  },

  algoInfo: {
    howItWorks: "📖 Comment ça marche",
    whenToUse: "💡 Quand l'utiliser",
    complexityLabel: "⏱ Complexité",
    memoryLabel: "💾 Mémoire",
    stabilityLabel: "⚖️ Stabilité",
    stableYes: "✅ Oui — les éléments égaux gardent leur ordre relatif",
    stableNo: "❌ Non — l'ordre relatif des éléments égaux n'est pas garanti",

    bubble: {
      name: "Tri à bulles",
      description: `Le tri à bulles parcourt le tableau en comparant les éléments deux par deux, comme si tu vérifiais chaque paire de voisins. Si le voisin de gauche est plus grand que celui de droite, on les échange : le plus grand "remonte" vers la droite comme une bulle dans un verre d'eau. On répète l'opération en ignorant le dernier élément à chaque fois (puisqu'il est déjà à sa place), jusqu'à ce que tout le tableau soit parcouru sans aucun échange. C'est simple à comprendre, mais très lent sur de grands tableaux.`,
      goodFor: `Idéal pour apprendre le tri, ou pour trier de très petits ensembles de données déjà presque en ordre.`,
      complexity: 'O(n²)',
      space: 'O(1)',
      stable: true
    },
    selection: {
      name: 'Tri par sélection',
      description: `Le tri par sélection fonctionne comme si tu cherchais la plus petite carte d'un jeu pour la mettre en première position. Tu parcours tout le tableau, tu repères le plus petit élément, et tu l'échanges avec le premier élément. Ensuite, tu recommences à partir de la deuxième position, puis la troisième, et ainsi de suite. À chaque passage, la partie non triée rétrécit et la partie triée s'agrandit. L'avantage, c'est qu'il fait très peu d'échanges : au maximum n échanges pour n éléments.`,
      goodFor: `Utile quand écrire en mémoire coûte cher (peu d'échanges), ou pour des petits tableaux.`,
      complexity: 'O(n²)',
      space: 'O(1)',
      stable: false
    },
    insertion: {
      name: 'Tri par insertion',
      description: `Le tri par insertion fonctionne exactement comme quand tu ranges des cartes à jouer dans ta main. Tu prends une nouvelle carte, et tu la glisses à sa bonne place parmi les cartes déjà triées, en décalant les plus grandes vers la droite pour faire de la place. On commence avec le premier élément tout seul (il est déjà "trié" tout seul), puis on insère le deuxième à la bonne place, puis le troisième, et ainsi de suite jusqu'au dernier. C'est très efficace pour les petits tableaux ou les données presque triées.`,
      goodFor: `Parfait pour du tri en temps réel (données qui arrivent une par une), ou pour de petits tableaux déjà bien ordonnés.`,
      complexity: 'O(n²)',
      space: 'O(1)',
      stable: true
    },
    merge: {
      name: 'Tri fusion',
      description: `Le tri fusion utilise la stratégie "diviser pour régner". Imagine que tu dois trier une pile de papiers. Tu coupes la pile en deux, tu donnes chaque moitié à deux amis, ils coupent encore en deux et donnent à d'autres amis, jusqu'à ce que chaque personne n'ait qu'un seul papier (forcément trié tout seul). Ensuite, chacun fusionne ses deux petits tas triés en un seul tas trié : tu compares les premiers éléments des deux tas, tu prends le plus petit, et tu remontes la chaîne jusqu'à reconstituer la pile originale complètement triée.`,
      goodFor: `Excellent pour les très grands tableaux. Performances stables dans tous les cas.`,
      complexity: 'O(n log n)',
      space: 'O(n) — nécessite de la mémoire supplémentaire',
      stable: true
    },
    quick: {
      name: 'Tri rapide',
      description: `Le tri rapide est le plus utilisé en pratique. On choisit un élément au hasard (ou le dernier) qu'on appelle le "pivot". Ensuite, on réorganise le tableau pour mettre tous les éléments plus petits que le pivot à gauche, et tous les plus grands à droite. Le pivot se retrouve à sa place définitive. On applique la même chose récursivement sur la partie gauche et la partie droite, jusqu'à ce que tout soit trié. C'est comme organiser des livres sur une étagère : tu en prends un au hasard, tu mets ceux qui vont avant à gauche, ceux qui vont après à droite, et tu recommences sur chaque tas.`,
      goodFor: `Le plus rapide en moyenne. Idéal pour la plupart des usages courants.`,
      complexity: 'O(n log n) en moyenne, O(n²) dans le pire cas',
      space: 'O(log n) — pile de récursion',
      stable: false
    },
    heap: {
      name: 'Tri par tas',
      description: `Le tri par tas imagine le tableau comme un arbre binaire où chaque parent doit être plus grand que ses enfants — c'est ce qu'on appelle un "tas max". C'est comme organiser un tournoi où le champion (la plus grande valeur) est à la racine. On échange le champion avec le dernier élément du tableau, et on réduit la taille du tas d'un cran. Le champion est maintenant à sa place définitive. On réorganise le nouveau tas pour faire remonter le nouveau champion, et on répète jusqu'à ce qu'il ne reste plus personne dans le tas.`,
      goodFor: `Quand on a besoin d'une garantie de performance même dans le pire des cas (pas de mauvaise surprise).`,
      complexity: 'O(n log n)',
      space: 'O(1) — tri en place',
      stable: false
    }
  },

  helpModal: {
    title: "📖 Légende & Indicateurs",
    sections: [
      {
        title: "🎨 Couleurs des barres",
        rows: [
          { icon: "🔵", label: "Défaut",     desc: "Valeur en attente, pas encore touchée" },
          { icon: "🟡", label: "Comparaison", desc: "Deux éléments sont en train d'être comparés" },
          { icon: "🔴", label: "Échange",     desc: "Les éléments sont permutés ou une valeur est écrite" },
          { icon: "🟢", label: "Trié",        desc: "L'élément est à sa position définitive" }
        ]
      },
      {
        title: "📊 Indicateurs de performance",
        rows: [
          { icon: "🔄", label: "Comparaisons", desc: "Nombre total de fois où l'algorithme compare deux éléments entre eux. Plus ce nombre est bas, plus l'algorithme est efficace." },
          { icon: "🔀", label: "Échanges", desc: "Nombre total de swaps ou d'écritures. Certains algorithmes échangent beaucoup (Tri à bulles), d'autres peu (Tri par sélection)." },
          { icon: "⏱", label: "Temps (ms)", desc: "Temps réel d'exécution en millisecondes. Dépend de la taille des données et de la vitesse de votre machine." },
          { icon: "🔍", label: "Focus", desc: "Cliquez pour isoler un algorithme. Utile pour étudier son comportement en détail sans distraction." },
          { icon: "🎲", label: "Mélanger", desc: "Génère un nouveau jeu de données aléatoires pour repartir à zéro." },
          { icon: "▶", label: "Trier", desc: "Lance tous les algorithmes simultanément sur les mêmes données." },
          { icon: "⏸", label: "Pause / Resume", desc: "Met en pause ou reprend l'animation pour analyser une étape précise." }
        ]
      },
      {
        title: "🎚 Vitesse d'animation",
        rows: [
          { icon: "🐢", label: "Très lent", desc: "Une étape à la fois avec délai — idéal pour comprendre le fonctionnement" },
          { icon: "", label: "Normal", desc: "Fluide, bonne vision d'ensemble" },
          { icon: "⚡", label: "Éclair", desc: "Maximum de vitesse, pour voir le résultat final rapidement" }
        ]
      },
      {
        title: "ℹ️ Description textuelle",
        intro: "Sous chaque algorithme, une ligne décrit l'opération en cours :",
        example: '<code>🔄 Compare a[3]=42 et a[4]=17 → 42 > 17, échange nécessaire</code>',
        footer: "Ça vous permet de suivre exactement ce que l'algorithme fait à chaque instant."
      }
    ]
  }
};
