/**
 * renderer.js — Rendu des barres en CSS Grid (DOM persistant).
 */

const CSS_CLS = { 0: 'b0', 1: 'b1', 2: 'b2', 3: 'b3' };

/**
 * Crée ou met à jour l'affichage des barres.
 * Les éléments DOM sont créés une fois puis réutilisés (pas de innerHTML à chaque frame).
 *
 * @param {HTMLElement} cont    - conteneur .bars
 * @param {number[]}    values  - valeurs à afficher
 * @param {object}      classes - mapping index → clé CSS (0-3)
 */
export function render(cont, values, classes = {}) {
  const count = values.length;
  const max = Math.max(...values, 1);

  // Initialisation unique ou redimensionnement
  if (!cont._initialized || cont.children.length !== count) {
    cont.style.gridTemplateColumns = 'repeat(' + count + ', 1fr)';
    cont.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const bar = document.createElement('div');
      bar.className = 'b';
      const label = document.createElement('span');
      label.className = 'bv';
      bar.appendChild(label);
      cont.appendChild(bar);
    }
    cont._initialized = true;
  }

  const bars = cont.children;
  for (let i = 0; i < count; i++) {
    const height = Math.max(4, (values[i] / max) * 100);
    const bar = bars[i];
    const cls = classes[i] !== undefined ? CSS_CLS[classes[i]] : 'b0';

    if (bar.className !== 'b ' + cls) bar.className = 'b ' + cls;
    bar.style.height = height.toFixed(1) + '%';
    bar.firstChild.textContent = values[i];
  }

  // Indices sous les barres (dans le bar-wrap, pas dans les barres ni le lane-body)
  if (!cont._idxEl) {
    const barWrap = cont.parentElement;
    if (!barWrap) return;
    const wrap = document.createElement('div');
    wrap.className = 'bi-wrap';
    wrap.style.gridTemplateColumns = 'repeat(' + count + ', 1fr)';
    barWrap.appendChild(wrap);
    cont._idxEl = wrap;
  }
  const idxWrap = cont._idxEl;
  const step = count <= 30 ? 1 : count <= 60 ? 5 : 10;
  idxWrap.style.gridTemplateColumns = 'repeat(' + count + ', 1fr)';
  let idxHtml = '';
  for (let i = 0; i < count; i++) {
    if (i % step === 0)
      idxHtml += '<span class="bi" style="grid-column:' + (i+1) + ';text-align:center">' + i + '</span>';
  }
  idxWrap.innerHTML = idxHtml;
}
