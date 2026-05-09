/**
 * controls.js — Événements des contrôles : vitesse, boutons, modales.
 * S'exécute après DOMContentLoaded.
 */
import { state } from './state.js';
import { dom } from './dom.js';
import { runRace } from './race.js';
import { togglePause } from './pause.js';
import { reset, shuffle } from './reset.js';
import { showHelp, hideHelp } from './infoModal.js';

document.addEventListener('DOMContentLoaded', () => {
  // ─── Vitesse ──────────────────────────────────────────────────
  const SPEED_TABLE = [350, 200, 120, 70, 40, 20, 10, 5, 1, 0];
  const SPEED_LABELS = [
    '🐢 Très lent', '🐢 Lent', '🐢', 'Normal', 'Normal',
    'Normal', '🚀 Rapide', '🚀', '🚀 Très rapide', '⚡ Éclair',
  ];

  dom.speedLabel.textContent = 'Normal';
  dom.speedSlider.addEventListener('input', () => {
    const value = parseInt(dom.speedSlider.value);
    state.currentDelayMs = SPEED_TABLE[value - 1] || 0;
    dom.speedLabel.textContent = SPEED_LABELS[value - 1] || 'Normal';
  });

  // ─── Taille des données ───────────────────────────────────────
  dom.sizeSlider.addEventListener('input', () => {
    state.size = +dom.sizeSlider.value;
    dom.sizeDisplay.textContent = state.size;
    if (!state.running) shuffle();
  });

  // ─── Boutons ──────────────────────────────────────────────────
  dom.btnRun.addEventListener('click', runRace);
  dom.btnPause.addEventListener('click', togglePause);
  dom.btnReset.addEventListener('click', reset);
  dom.btnRandom.addEventListener('click', shuffle);
  dom.btnPause.disabled = true;

  // ─── Modales ──────────────────────────────────────────────────
  document.getElementById('bHelp').addEventListener('click', showHelp);
  document.getElementById('modalClose').addEventListener('click', hideHelp);
  document.getElementById('modalHelp').addEventListener('click', e => {
    if (e.target === document.getElementById('modalHelp')) hideHelp();
  });
});
