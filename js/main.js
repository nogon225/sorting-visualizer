/**
 * main.js — Point d'entrée, initialise les données au chargement du DOM.
 */
import { state } from './state.js';
import { dom } from './dom.js';
import { render } from './renderer.js';
import { ALGOS, lanes } from './lanes.js';
import './controls.js';

document.addEventListener('DOMContentLoaded', () => {
  // Génère les données initiales
  const result = [];
  for (let i = 0; i < state.size; i++) result.push(Math.floor(Math.random() * 190) + 10);
  state.data = result;
  state.initialData = [...result];

  dom.btnPause.disabled = true;
  dom.btnReset.disabled = false;

  // Premier rendu
  state.renderGeneration++;
  ALGOS.forEach(algo => {
    render(lanes[algo.id].cont, state.data, { _force: true });
    lanes[algo.id].cmpEl.textContent = '0';
    lanes[algo.id].swpEl.textContent = '0';
    lanes[algo.id].timeEl.textContent = '0';
    lanes[algo.id].okEl.style.opacity = '0';
    lanes[algo.id].typeEl.textContent = '—';
    lanes[algo.id].descEl.textContent = '';
  });

  dom.status.innerHTML = 'Prêt — clique sur <strong>▶ Trier</strong>';
});
