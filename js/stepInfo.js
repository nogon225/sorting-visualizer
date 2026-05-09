/**
 * stepInfo.js — Descriptions textuelles lisibles et colorées des étapes de tri.
 */

import { __ } from './i18n.js';

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
        label: __('steps.cmp.label'),
        detail: `a[${st.i}] (${iVal}) vs a[${st.j}] (${jVal})`,
        html: __('steps.cmp.html', {
          i: st.i, vI: iVal, j: st.j, vJ: jVal,
          gt: iVal > jVal,
          step: step
        }),
      };
    case 'swp':
      if (st.j != null) {
        return {
          emoji: '🔀',
          label: __('steps.swp.label'),
          detail: 'a[' + st.i + '] ↔ a[' + st.j + ']',
          html: __('steps.swp.html', { i: st.i, vI: iVal, j: st.j, vJ: jVal, step: step }),
        };
      }
      return {
        emoji: '✍️',
        label: __('steps.write.label'),
        detail: 'a[' + st.i + '] = ' + st.v,
        html: __('steps.write.html', { i: st.i, v: st.v, step: step }),
      };
    case 'srt':
      return {
        emoji: '✅',
        label: __('steps.srt.label'),
        detail: 'a[' + st.i + '] (' + iVal + ')',
        html: __('steps.srt.html', { i: st.i, v: iVal, step: step }),
      };
    default:
      return {
        emoji: '❓',
        label: __('steps.default.label'),
        detail: '' + (current + 1) + '/' + total,
        html: __('steps.default.html', { step: step }),
      };
  }
}

/**
 * Emoji et libellé du type d'étape (pour la barre d'info).
 */
export function stepEmoji(st) {
  const labels = __('steps.emojiLabels');
  if (st.type === 'cmp') return labels.cmp;
  if (st.type === 'swp') return labels.swp;
  if (st.type === 'srt') return labels.srt;
  return labels.unknown;
}
