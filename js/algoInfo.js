/**
 * Algorithmes de tri expliqués en langage naturel (français).
 */

export const ALGO_INFO = {
  bubble: {
    name: 'Bubble Sort',
    emoji: '🫧',
    description: `Le tri à bulles parcourt le tableau en comparant les éléments deux par deux, comme si tu vérifiais chaque paire de voisins. Si le voisin de gauche est plus grand que celui de droite, on les échange : le plus grand "remonte" vers la droite comme une bulle dans un verre d'eau. On répète l'opération en ignorant le dernier élément à chaque fois (puisqu'il est déjà à sa place), jusqu'à ce que tout le tableau soit parcouru sans aucun échange. C'est simple à comprendre, mais très lent sur de grands tableaux.`,
    goodFor: `Idéal pour apprendre le tri, ou pour trier de très petits ensembles de données déjà presque en ordre.`,
    complexity: 'O(n²)',
    space: 'O(1)',
    stable: true,
  },
  selection: {
    name: 'Selection Sort',
    emoji: '👆',
    description: `Le tri par sélection fonctionne comme si tu cherchais la plus petite carte d'un jeu pour la mettre en première position. Tu parcours tout le tableau, tu repères le plus petit élément, et tu l'échanges avec le premier élément. Ensuite, tu recommences à partir de la deuxième position, puis la troisième, et ainsi de suite. À chaque passage, la partie non triée rétrécit et la partie triée s'agrandit. L'avantage, c'est qu'il fait très peu d'échanges : au maximum n échanges pour n éléments.`,
    goodFor: `Utile quand écrire en mémoire coûte cher (peu d'échanges), ou pour des petits tableaux.`,
    complexity: 'O(n²)',
    space: 'O(1)',
    stable: false,
  },
  insertion: {
    name: 'Insertion Sort',
    emoji: '📥',
    description: `Le tri par insertion fonctionne exactement comme quand tu ranges des cartes à jouer dans ta main. Tu prends une nouvelle carte, et tu la glisses à sa bonne place parmi les cartes déjà triées, en décalant les plus grandes vers la droite pour faire de la place. On commence avec le premier élément tout seul (il est déjà "trié" tout seul), puis on insère le deuxième à la bonne place, puis le troisième, et ainsi de suite jusqu'au dernier. C'est très efficace pour les petits tableaux ou les données presque triées.`,
    goodFor: `Parfait pour du tri en temps réel (données qui arrivent une par une), ou pour de petits tableaux déjà bien ordonnés.`,
    complexity: 'O(n²)',
    space: 'O(1)',
    stable: true,
  },
  merge: {
    name: 'Merge Sort',
    emoji: '🔀',
    description: `Le tri fusion utilise la stratégie "diviser pour régner". Imagine que tu dois trier une pile de papiers. Tu coupes la pile en deux, tu donnes chaque moitié à deux amis, ils coupent encore en deux et donnent à d'autres amis, jusqu'à ce que chaque personne n'ait qu'un seul papier (forcément trié tout seul). Ensuite, chacun fusionne ses deux petits tas triés en un seul tas trié : tu compares les premiers éléments des deux tas, tu prends le plus petit, et tu remontes la chaîne jusqu'à reconstituer la pile originale complètement triée.`,
    goodFor: `Excellent pour les très grands tableaux. Performances stables dans tous les cas.`,
    complexity: 'O(n log n)',
    space: 'O(n) — nécessite de la mémoire supplémentaire',
    stable: true,
  },
  quick: {
    name: 'Quick Sort',
    emoji: '⚡',
    description: `Le tri rapide est le plus utilisé en pratique. On choisit un élément au hasard (ou le dernier) qu'on appelle le "pivot". Ensuite, on réorganise le tableau pour mettre tous les éléments plus petits que le pivot à gauche, et tous les plus grands à droite. Le pivot se retrouve à sa place définitive. On applique la même chose récursivement sur la partie gauche et la partie droite, jusqu'à ce que tout soit trié. C'est comme organiser des livres sur une étagère : tu en prends un au hasard, tu mets ceux qui vont avant à gauche, ceux qui vont après à droite, et tu recommences sur chaque tas.`,
    goodFor: `Le plus rapide en moyenne. Idéal pour la plupart des usages courants.`,
    complexity: 'O(n log n) en moyenne, O(n²) dans le pire cas',
    space: 'O(log n) — pile de récursion',
    stable: false,
  },
  heap: {
    name: 'Heap Sort',
    emoji: '🏗️',
    description: `Le tri par tas imagine le tableau comme un arbre binaire où chaque parent doit être plus grand que ses enfants — c'est ce qu'on appelle un "tas max". C'est comme organiser un tournoi où le champion (la plus grande valeur) est à la racine. On échange le champion avec le dernier élément du tableau, et on réduit la taille du tas d'un cran. Le champion est maintenant à sa place définitive. On réorganise le nouveau tas pour faire remonter le nouveau champion, et on répète jusqu'à ce qu'il ne reste plus personne dans le tas.`,
    goodFor: `Quand on a besoin d'une garantie de performance même dans le pire des cas (pas de mauvaise surprise).`,
    complexity: 'O(n log n)',
    space: 'O(1) — tri en place',
    stable: false,
  },
};

/**
 * Génère le HTML du modal pour un algorithme donné.
 */
export function infoModalHTML(algoId) {
  const info = ALGO_INFO[algoId];
  if (!info) return '';

  const stableText = info.stable
    ? '✅ Oui — les éléments égaux gardent leur ordre relatif'
    : '❌ Non — l\'ordre relatif des éléments égaux n\'est pas garanti';

  return `
    <div class="algo-modal-overlay" id="algoModal" style="display:flex">
      <div class="algo-modal">
        <div class="algo-modal-hdr">
          <span>${info.emoji} ${info.name}</span>
          <button class="algo-modal-close" id="algoModalClose">✕</button>
        </div>
        <div class="algo-modal-body">
          <h3>📖 Comment ça marche</h3>
          <p class="algo-natural">${info.description}</p>

          <h3>💡 Quand l'utiliser</h3>
          <p class="algo-natural">${info.goodFor}</p>

          <table class="algo-table">
            <tr><td>⏱ Complexité</td><td>${info.complexity}</td></tr>
            <tr><td>💾 Mémoire</td><td>${info.space}</td></tr>
            <tr><td>⚖️ Stabilité</td><td>${stableText}</td></tr>
          </table>
        </div>
      </div>
    </div>
  `;
}
