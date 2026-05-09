/**
 * reset.js — Réinitialisation : annulation, retour aux données initiales, mélange.
 */
import { state } from './state.js';
import { dom } from './dom.js';
import { render } from './renderer.js';
import { ALGOS, lanes } from './lanes.js';
import { __ } from './i18n.js';

function generateData(count) {
  const result = [];
  for (let i = 0; i < count; i++) result.push(Math.floor(Math.random() * 190) + 10);
  return result;
}

function resetAllStats() {
  state.renderGeneration++;
  ALGOS.forEach(algo => {
    lanes[algo.id]._history = [];
    const bars = lanes[algo.id].cont.children;
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.boxShadow = 'none';
      bars[i].style.borderTop = 'none';
    }
    render(lanes[algo.id].cont, state.data, { _force: true });
    lanes[algo.id].cmpEl.textContent = '0';
    lanes[algo.id].swpEl.textContent = '0';
    lanes[algo.id].timeEl.textContent = '0';
    lanes[algo.id].okEl.style.opacity = '0';
    lanes[algo.id].typeEl.textContent = '—';
    lanes[algo.id].descEl.textContent = '';
  });
}

/** Mélanger : génère de nouvelles données aléatoires. */
export function shuffle() {
  state.data = generateData(state.size);
  state.initialData = [...state.data];
  dom.btnRun.disabled = false;
  dom.btnReset.disabled = false;
  resetAllStats();
  dom.status.innerHTML = __('status.ready');
}

/** Reset : restaure les données d'avant le tri. */
export function reset() {
  // Force reprise si en pause
  if (state.pauseResolve) {
    state.pauseResolve();
    state.pausePromise = null;
    state.pauseResolve = null;
  }

  // Préserve le focus avant d'annuler
  const hadFocus = state.focusedAlgorithm;

  // Annule les tris en cours
  state.abortControllers.forEach(c => c.abort());
  state.abortControllers = [];
  state.running = false;
  state.runGeneration++;

  // Réinitialise l'interface
  dom.btnRun.disabled = dom.btnRandom.disabled = false;
  dom.btnReset.disabled = false;
  dom.btnPause.disabled = true;
  dom.btnPause.textContent = '⏸ Pause';
  dom.btnPause.classList.remove('btn-pause-on');

  // Restaure le focus
  state.focusedAlgorithm = hadFocus;
  if (hadFocus) {
    document.body.classList.add('focused');
    ALGOS.forEach(algo => {
      const lane = lanes[algo.id].lane;
      const btn = lane.querySelector('.btn-focus');
      if (state.focusedAlgorithm === algo.id) {
        lane.classList.add('lane-focused');
        lane.classList.remove('lane-dim');
        lane.style.display = '';
        if (btn) btn.textContent = '✕';
      } else {
        lane.classList.add('lane-dim');
        lane.classList.remove('lane-focused');
        lane.style.display = 'none';
        if (btn) btn.textContent = '🔍';
      }
    });
  } else {
    document.body.classList.remove('focused');
    ALGOS.forEach(algo => {
      lanes[algo.id].lane.style.display = '';
      lanes[algo.id].lane.classList.remove('lane-dim', 'lane-focused');
    });
  }

  // Restaure les données d'origine
  state.data = [...state.initialData];
  resetAllStats();
  dom.status.innerHTML = __('status.ready');
}
