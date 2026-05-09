/**
 * lanes.js — Construction des voies (lanes) pour chaque algorithme.
 * Exporte ALGOS, ALGO_MAP (depuis sorters.js) et lanes (objets DOM).
 */
import { el, dom } from './dom.js';
import { state } from './state.js';
import { showAlgoInfo } from './infoModal.js';
import { ALGOS, ALGO_MAP } from './sorters.js';

export { ALGOS, ALGO_MAP };

export const lanes = {};

document.addEventListener('DOMContentLoaded', () => {
  ALGOS.forEach(algo => {
    const lane = el('div', 'lane');
    lane.dataset.algo = algo.id;

    const nameSpan = el('span', 'nm');
    nameSpan.style.color = algo.col;
    nameSpan.textContent = algo.name;

    const cxSpan = el('span', 'cx');
    cxSpan.textContent = algo.cx;

    const focusBtn = el('button', 'btn-focus', '🔍');
    focusBtn.dataset.algo = algo.id;
    focusBtn.title = 'Focus sur ' + algo.name;

    const infoBtn = el('button', 'btn-algo-info', 'ℹ️');
    infoBtn.dataset.algo = algo.id;
    infoBtn.title = 'Fonctionnement de ' + algo.name;

    const histBtn = el('button', 'btn-hist', '📋');
    histBtn.dataset.algo = algo.id;
    histBtn.title = 'Historique des opérations';

    const hdrLeft = el('div');
    hdrLeft.append(nameSpan, cxSpan, focusBtn, infoBtn, histBtn);

    const cmpEl = el('span', 'v', '0');
    const swpEl = el('span', 'v', '0');
    const timeEl = el('span', 'v', '0');
    const okEl = el('span', 'done', '✅');

    const stats = el('div', 'st');
    stats.append(
      el('span', null, '🔄 ', cmpEl),
      el('span', null, '🔀 ', swpEl),
      el('span', null, '⏱ ', timeEl, document.createTextNode('ms')),
      okEl
    );

    const hdr = el('div', 'hdr');
    hdr.append(hdrLeft, stats);

    const typeEl = el('span', 'step-type', '—');
    const descEl = el('span', 'step-desc', '');
    const infoBar = el('div', 'step-info');
    infoBar.append(typeEl, descEl);

    const bars = el('div', 'bars');
    const barWrap = el('div', 'bar-wrap');
    barWrap.append(bars);
    const body = el('div', 'lane-body');
    body.append(barWrap);

    lane.append(hdr, infoBar, body);
    dom.track.appendChild(lane);

    lanes[algo.id] = { lane, cont: bars, cmpEl, swpEl, timeEl, okEl, typeEl, descEl, _histBtn: histBtn };

    histBtn.addEventListener('click', () => {
      showHistoryModal(algo, lanes[algo.id]._history);
    });
    focusBtn.addEventListener('click', () => toggleFocus(algo.id));
    infoBtn.addEventListener('click', () => showAlgoInfo(algo.id));
  });
});

// ─── Modal historique ────────────────────────────────────────────
function showHistoryModal(algo, history) {
  const old = document.getElementById('histModal');
  if (old) old.remove();

  if (!history || history.length === 0) {
    history = [{ emoji:'ℹ️', html:'Aucune opération pour le moment.', stepIndex:0 }];
  }

  // Compter les types d'opérations
  let nCmp = 0, nSwp = 0, nSrt = 0;
  history.forEach(e => {
    if (e.emoji === '🔄') nCmp++;
    else if (e.emoji === '🔀' || e.emoji === '✍️') nSwp++;
    else if (e.emoji === '✅') nSrt++;
  });

  const overlay = document.createElement('div');
  overlay.id = 'histModal-' + algo.id;
  overlay.className = 'algo-modal-overlay';
  overlay.style.zIndex = '1001';

  // En-tête avec résumé
  const header = '<div class="algo-modal hist-modal">'
    + '<div class="algo-modal-hdr">'
    + '<span>📋 ' + algo.name + ' — Historique</span>'
    + '<button class="algo-modal-close" id="histModalClose">✕</button>'
    + '</div>'
    + '<div class="hist-summary">'
    + '<span>📊 <b>' + history.length + '</b> étapes</span>'
    + '<span class="hs-cmp">🔄 <b>' + nCmp + '</b></span>'
    + '<span class="hs-swp">🔀 <b>' + nSwp + '</b></span>'
    + '<span class="hs-srt">✅ <b>' + nSrt + '</b></span>'
    + '</div>'
    + '<div class="hist-body" id="histBody-' + algo.id + '">';

  // Générer le corps (ordre chronologique : première → dernière)
  let bodyHtml = '';
  for (let i = 0; i < history.length; i++) {
    const e = history[i];
    bodyHtml += '<div class="hl-entry"><span class="hl-text">#' + (e.stepIndex + 1) + ' ' + e.emoji + ' ' + e.html + '</span></div>';
  }

  overlay.innerHTML = header + bodyHtml + '</div></div>';
  document.body.appendChild(overlay);

  document.getElementById('histModalClose').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

  // Scroll en bas (dernières opérations)
  const body = document.getElementById('histBody-' + algo.id);
  if (body) body.scrollTop = body.scrollHeight;
}

// ─── Focus mode ───────────────────────────────────────────────────
export function toggleFocus(id) {
  state.focusedAlgorithm = state.focusedAlgorithm === id ? null : id;
  applyFocus();
}

function applyFocus() {
  if (state.focusedAlgorithm === null) {
    document.body.classList.remove('focused');
    ALGOS.forEach(algo => {
      const lane = lanes[algo.id].lane;
      lane.classList.remove('lane-dim', 'lane-focused');
      lane.style.display = '';
      const btn = lane.querySelector('.btn-focus');
      if (btn) btn.textContent = '🔍';
    });
    return;
  }

  document.body.classList.add('focused');

  ALGOS.forEach(algo => {
    const lane = lanes[algo.id].lane;
    const btn = lane.querySelector('.btn-focus');
    if (state.focusedAlgorithm === algo.id) {
      lane.classList.remove('lane-dim');
      lane.classList.add('lane-focused');
      lane.style.display = '';
      if (btn) btn.textContent = '✕';
    } else {
      lane.classList.add('lane-dim');
      lane.classList.remove('lane-focused');
      lane.style.display = 'none';
      if (btn) btn.textContent = '🔍';
    }
  });
}
