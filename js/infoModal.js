/**
 * infoModal.js — Modale d'information pour chaque algorithme (langage naturel).
 */
import { infoModalHTML } from './algoInfo.js';

/** Affiche la modale d'explication d'un algorithme. */
export function showAlgoInfo(algoId) {
  const old = document.querySelector('.algo-modal-overlay');
  if (old) old.remove();

  const wrapper = document.createElement('div');
  wrapper.innerHTML = infoModalHTML(algoId);
  document.body.appendChild(wrapper.firstElementChild);

  const closeBtn = document.getElementById('algoModalClose');
  const overlay = document.getElementById('algoModal');
  if (closeBtn) closeBtn.addEventListener('click', () => overlay.remove());
  if (overlay) overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.remove();
  });
}

/** Ouvre la modale d'aide globale. */
export function showHelp() {
  document.getElementById('modalHelp').style.display = 'flex';
}

export function hideHelp() {
  document.getElementById('modalHelp').style.display = 'none';
}
