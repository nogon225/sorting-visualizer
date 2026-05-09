/**
 * stepInfo.js — Descriptions textuelles lisibles et colorées des étapes de tri.
 */

/**
 * Retourne une description claire d'une étape avec codes couleur.
 * @param {object}  st      - { type, i, j, v }
 * @param {number[]} array  - état actuel du tableau
 * @param {number}  total   - nombre total d'étapes
 * @param {number}  current - index de l'étape courante
 * @returns {{ emoji: string, label: string, detail: string, html: string }}
 */
export function stepInfo(st, array, total, current) {
  const iVal = st.i != null ? array[st.i] : null;
  const jVal = st.j != null ? array[st.j] : null;
  const step = (current + 1) + '/' + total;

  switch (st.type) {
    case 'cmp':
      return {
        emoji: '🔄',
        label: 'Comparaison',
        detail: `a[${st.i}] (${iVal}) vs a[${st.j}] (${jVal})`,
        html: '<span class="sc-cmp">Compare</span> <b>a[' + st.i + ']</b> = <span class="sc-val">' + iVal + '</span> '
          + '<span class="sc-cmp">avec</span> <b>a[' + st.j + ']</b> = <span class="sc-val">' + jVal + '</span>'
          + (iVal > jVal
            ? ' → <span class="sc-swap">' + iVal + ' > ' + jVal + ', <span class="sc-swap">échange</span></span>'
            : ' → <span class="sc-ok">' + iVal + ' ≤ ' + jVal + ', <span class="sc-ok">OK</span></span>')
          + ' <span class="sc-step">' + step + '</span>',
      };
    case 'swp':
      if (st.j != null) {
        return {
          emoji: '🔀',
          label: 'Échange',
          detail: 'a[' + st.i + '] ↔ a[' + st.j + ']',
          html: '<span class="sc-swap">Échange</span> <b>a[' + st.i + ']</b> = <span class="sc-val">' + iVal + '</span> ↔ <b>a[' + st.j + ']</b> = <span class="sc-val">' + jVal + '</span>'
            + ' <span class="sc-step">' + step + '</span>',
        };
      }
      return {
        emoji: '✍️',
        label: 'Écriture',
        detail: 'a[' + st.i + '] = ' + st.v,
        html: '<span class="sc-swap">Écrit</span> <span class="sc-val">' + st.v + '</span> dans <b>a[' + st.i + ']</b>'
          + ' <span class="sc-step">' + step + '</span>',
      };
    case 'srt':
      return {
        emoji: '✅',
        label: 'Placement',
        detail: 'a[' + st.i + '] (' + iVal + ')',
        html: '<b>a[' + st.i + ']</b> = <span class="sc-val">' + iVal + '</span> → <span class="sc-sorted">définitivement trié !</span>'
          + ' <span class="sc-step">' + step + '</span>',
      };
    default:
      return {
        emoji: '❓',
        label: 'Étape',
        detail: '' + (current + 1) + '/' + total,
        html: 'Étape <span class="sc-step">' + step + '</span>',
      };
  }
}

/**
 * Emoji et libellé du type d'étape (pour la barre d'info).
 */
export function stepEmoji(st) {
  if (st.type === 'cmp') return '🔄 Comparaison';
  if (st.type === 'swp') return '🔀 Échange';
  if (st.type === 'srt') return '✅ Placement';
  return '❓';
}
