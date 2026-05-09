/**
 * en.js — English translations for the sorting visualizer.
 * Note: algo descriptions and step texts are kept in French for now.
 */
export const en = {
  meta: {
    title: "Sorting Algorithms — Visualization",
    description: "Interactive real-time sorting algorithm visualization"
  },

  controls: {
    elements: "Elements",
    vitesse: "Speed",
    speedLabels: [
      "🐢 Very slow", "🐢 Slow", "🐢", "Normal",
      "Normal", "Normal", "🚀 Fast", "🚀", "🚀 Very fast", "⚡ Lightning"
    ]
  },

  buttons: {
    shuffle: "🎲 Shuffle",
    sort: "▶ Sort",
    pause: "⏸ Pause",
    resume: "▶ Resume",
    reset: "↺ Reset",
    help: "❓",
    focus: "🔍",
    unfocus: "✕",
    algoInfo: "ℹ️",
    history: "📋",
    lang: "🇫🇷 FR"
  },

  status: {
    ready: 'Ready — click <strong>▶ Sort</strong>',
    sorting: '⏳ Sorting…',
    paused: '⏸ Paused',
    resuming: '▶ Resuming…',
    winner: (p) => `🏆 <span class="win">${p.name}</span> wins in <strong>${p.ms}ms</strong> ! 2<sup>nd</sup> ${p.second} ${p.secondMs}ms`,
    singleWinner: (p) => `✅ <span class="win">${p.name}</span> done in <strong>${p.ms}ms</strong>`,
    cancelled: '❌ All cancelled.',
    done: (p) => `Array sorted in <strong>${p.ms}ms</strong> (${p.steps} steps)`
  },

  algo: {
    bubble:    { name: "Bubble Sort",    cx: "O(n²)" },
    selection: { name: "Selection Sort", cx: "O(n²)" },
    insertion: { name: "Insertion Sort", cx: "O(n²)" },
    merge:     { name: "Merge Sort",     cx: "O(n log n)" },
    quick:     { name: "Quick Sort",     cx: "O(n log n)" },
    heap:      { name: "Heap Sort",      cx: "O(n log n)" }
  },

  legend: [
    "🔵 Default",
    "🟡 Comparison",
    "🔴 Swap",
    "🟢 Sorted"
  ],

  lane: {
    focusTooltip: (p) => `Focus on ${p.algo}`,
    infoTooltip: (p) => `How ${p.algo} works`,
    histTooltip: "Operation history",
    histModalTitle: (p) => `📋 ${p.algo} — History`,
    histEmpty: "No operations yet.",
    histSteps: (p) => `📊 <b>${p.n}</b> steps`,
    histCmp: (p) => `🔄 <b>${p.n}</b>`,
    histSwp: (p) => `🔀 <b>${p.n}</b>`,
    histSrt: (p) => `✅ <b>${p.n}</b>`
  },

  typeLabels: {
    swap: "🔀 ← Swap →",
    move: "➡️ Move",
    write: "✍️ Write",
    done: "✅ Done"
  },

  steps: {
    cmp: {
      label: "Comparison",
      text: (p) => `Compare a[${p.i}]=${p.vI} with a[${p.j}]=${p.vJ}`,
      html: (p) =>
        '<span class="sc-cmp">Compare</span> <b>a[' + p.i + ']</b> = <span class="sc-val">' + p.vI + '</span> '
        + '<span class="sc-cmp">with</span> <b>a[' + p.j + ']</b> = <span class="sc-val">' + p.vJ + '</span>'
        + (p.gt
          ? ' → <span class="sc-swap">' + p.vI + ' > ' + p.vJ + ', <span class="sc-swap">swap</span></span>'
          : ' → <span class="sc-ok">' + p.vI + ' ≤ ' + p.vJ + ', <span class="sc-ok">OK</span></span>')
        + ' <span class="sc-step">' + p.step + '</span>'
    },
    swp: {
      label: "Swap",
      html: (p) =>
        '<span class="sc-swap">Swap</span> <b>a[' + p.i + ']</b> = <span class="sc-val">' + p.vI + '</span> ↔ <b>a[' + p.j + ']</b> = <span class="sc-val">' + p.vJ + '</span>'
        + ' <span class="sc-step">' + p.step + '</span>'
    },
    write: {
      label: "Write",
      html: (p) =>
        '<span class="sc-swap">Write</span> <span class="sc-val">' + p.v + '</span> into <b>a[' + p.i + ']</b>'
        + ' <span class="sc-step">' + p.step + '</span>'
    },
    srt: {
      label: "Placement",
      html: (p) =>
        '<b>a[' + p.i + ']</b> = <span class="sc-val">' + p.v + '</span> → <span class="sc-sorted">definitively sorted!</span>'
        + ' <span class="sc-step">' + p.step + '</span>'
    },
    default: {
      label: "Step",
      html: (p) => 'Step <span class="sc-step">' + p.step + '</span>'
    },
    emojiLabels: {
      cmp: "🔄 Comparison",
      swp: "🔀 Swap",
      srt: "✅ Sorted",
      unknown: "❓"
    }
  },

  algoInfo: {
    howItWorks: "📖 How it works",
    whenToUse: "💡 When to use",
    complexityLabel: "⏱ Complexity",
    memoryLabel: "💾 Memory",
    stabilityLabel: "⚖️ Stability",
    stableYes: "✅ Yes — equal elements keep their relative order",
    stableNo: "❌ No — relative order of equal elements is not guaranteed",

    bubble: {
      name: 'Bubble Sort',
      description: `Le tri à bulles parcourt le tableau en comparant les éléments deux par deux, comme si tu vérifiais chaque paire de voisins. Si le voisin de gauche est plus grand que celui de droite, on les échange : le plus grand "remonte" vers la droite comme une bulle dans un verre d'eau. On répète l'opération en ignorant le dernier élément à chaque fois (puisqu'il est déjà à sa place), jusqu'à ce que tout le tableau soit parcouru sans aucun échange. C'est simple à comprendre, mais très lent sur de grands tableaux.`,
      goodFor: `Idéal pour apprendre le tri, ou pour trier de très petits ensembles de données déjà presque en ordre.`,
      complexity: 'O(n²)',
      space: 'O(1)',
      stable: true
    },
    selection: {
      name: 'Selection Sort',
      description: `Le tri par sélection fonctionne comme si tu cherchais la plus petite carte d'un jeu pour la mettre en première position. Tu parcours tout le tableau, tu repères le plus petit élément, et tu l'échanges avec le premier élément. Ensuite, tu recommences à partir de la deuxième position, puis la troisième, et ainsi de suite. À chaque passage, la partie non triée rétrécit et la partie triée s'agrandit. L'avantage, c'est qu'il fait très peu d'échanges : au maximum n échanges pour n éléments.`,
      goodFor: `Utile quand écrire en mémoire coûte cher (peu d'échanges), ou pour des petits tableaux.`,
      complexity: 'O(n²)',
      space: 'O(1)',
      stable: false
    },
    insertion: {
      name: 'Insertion Sort',
      description: `Le tri par insertion fonctionne exactement comme quand tu ranges des cartes à jouer dans ta main. Tu prends une nouvelle carte, et tu la glisses à sa bonne place parmi les cartes déjà triées, en décalant les plus grandes vers la droite pour faire de la place. On commence avec le premier élément tout seul (il est déjà "trié" tout seul), puis on insère le deuxième à la bonne place, puis le troisième, et ainsi de suite jusqu'au dernier. C'est très efficace pour les petits tableaux ou les données presque triées.`,
      goodFor: `Parfait pour du tri en temps réel (données qui arrivent une par une), ou pour de petits tableaux déjà bien ordonnés.`,
      complexity: 'O(n²)',
      space: 'O(1)',
      stable: true
    },
    merge: {
      name: 'Merge Sort',
      description: `Le tri fusion utilise la stratégie "diviser pour régner". Imagine que tu dois trier une pile de papiers. Tu coupes la pile en deux, tu donnes chaque moitié à deux amis, ils coupent encore en deux et donnent à d'autres amis, jusqu'à ce que chaque personne n'ait qu'un seul papier (forcément trié tout seul). Ensuite, chacun fusionne ses deux petits tas triés en un seul tas trié : tu compares les premiers éléments des deux tas, tu prends le plus petit, et tu remontes la chaîne jusqu'à reconstituer la pile originale complètement triée.`,
      goodFor: `Excellent pour les très grands tableaux. Performances stables dans tous les cas.`,
      complexity: 'O(n log n)',
      space: 'O(n) — nécessite de la mémoire supplémentaire',
      stable: true
    },
    quick: {
      name: 'Quick Sort',
      description: `Le tri rapide est le plus utilisé en pratique. On choisit un élément au hasard (ou le dernier) qu'on appelle le "pivot". Ensuite, on réorganise le tableau pour mettre tous les éléments plus petits que le pivot à gauche, et tous les plus grands à droite. Le pivot se retrouve à sa place définitive. On applique la même chose récursivement sur la partie gauche et la partie droite, jusqu'à ce que tout soit trié. C'est comme organiser des livres sur une étagère : tu en prends un au hasard, tu mets ceux qui vont avant à gauche, ceux qui vont après à droite, et tu recommences sur chaque tas.`,
      goodFor: `Le plus rapide en moyenne. Idéal pour la plupart des usages courants.`,
      complexity: 'O(n log n) en moyenne, O(n²) dans le pire cas',
      space: 'O(log n) — pile de récursion',
      stable: false
    },
    heap: {
      name: 'Heap Sort',
      description: `Le tri par tas imagine le tableau comme un arbre binaire où chaque parent doit être plus grand que ses enfants — c'est ce qu'on appelle un "tas max". C'est comme organiser un tournoi où le champion (la plus grande valeur) est à la racine. On échange le champion avec le dernier élément du tableau, et on réduit la taille du tas d'un cran. Le champion est maintenant à sa place définitive. On réorganise le nouveau tas pour faire remonter le nouveau champion, et on répète jusqu'à ce qu'il ne reste plus personne dans le tas.`,
      goodFor: `Quand on a besoin d'une garantie de performance même dans le pire des cas (pas de mauvaise surprise).`,
      complexity: 'O(n log n)',
      space: 'O(1) — tri en place',
      stable: false
    }
  },

  helpModal: {
    title: "📖 Legend & Indicators",
    sections: [
      {
        title: "🎨 Bar Colors",
        rows: [
          { icon: "🔵", label: "Default",     desc: "Value waiting, not yet touched" },
          { icon: "🟡", label: "Comparison", desc: "Two elements are being compared" },
          { icon: "🔴", label: "Swap",     desc: "Elements are swapped or a value is written" },
          { icon: "🟢", label: "Sorted",        desc: "Element is at its final position" }
        ]
      },
      {
        title: "📊 Performance Indicators",
        rows: [
          { icon: "🔄", label: "Comparisons", desc: "Total times the algorithm compares two elements. The lower the better." },
          { icon: "🔀", label: "Swaps", desc: "Total swaps or writes. Some algorithms swap a lot (Bubble), others less (Selection)." },
          { icon: "⏱", label: "Time (ms)", desc: "Actual execution time in milliseconds. Depends on data size and machine speed." },
          { icon: "🔍", label: "Focus", desc: "Click to isolate one algorithm. Useful to study its behavior in detail." },
          { icon: "🎲", label: "Shuffle", desc: "Generates a new random dataset to start fresh." },
          { icon: "▶", label: "Sort", desc: "Launches all algorithms simultaneously on the same data." },
          { icon: "⏸", label: "Pause / Resume", desc: "Pauses or resumes the animation to analyze a specific step." }
        ]
      },
      {
        title: "🎚 Animation Speed",
        rows: [
          { icon: "🐢", label: "Very slow", desc: "One step at a time with delay — ideal for understanding" },
          { icon: "", label: "Normal", desc: "Smooth, good overview" },
          { icon: "⚡", label: "Lightning", desc: "Maximum speed, to see the final result quickly" }
        ]
      },
      {
        title: "ℹ️ Text Description",
        intro: "Below each algorithm, a line describes the current operation:",
        example: '<code>🔄 Compare a[3]=42 and a[4]=17 → 42 > 17, swap needed</code>',
        footer: "This lets you follow exactly what the algorithm does at each step."
      }
    ]
  }
};
