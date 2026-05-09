/**
 * pause.js — Pause / Resume de l'animation.
 */
import { state } from './state.js';
import { dom } from './dom.js';

export function togglePause() {
  const isPaused = state.pausePromise !== null;

  if (!isPaused) {
    // PAUSE
    state.pausePromise = new Promise(resolve => { state.pauseResolve = resolve; });
    dom.btnPause.textContent = '▶ Resume';
    dom.btnPause.classList.add('btn-pause-on');
    dom.status.innerHTML = '⏸ En pause';
  } else {
    // RESUME
    const resolveFn = state.pauseResolve;
    state.pausePromise = null;
    state.pauseResolve = null;
    if (resolveFn) resolveFn();
    dom.btnPause.textContent = '⏸ Pause';
    dom.btnPause.classList.remove('btn-pause-on');
    dom.status.innerHTML = '▶ Reprise…';
  }
}
