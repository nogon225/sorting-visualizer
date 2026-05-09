/**
 * pause.js — Pause / Resume de l'animation.
 */
import { state } from './state.js';
import { dom } from './dom.js';
import { __ } from './i18n.js';

export function togglePause() {
  const isPaused = state.pausePromise !== null;

  if (!isPaused) {
    // PAUSE
    state.pausePromise = new Promise(resolve => { state.pauseResolve = resolve; });
    dom.btnPause.textContent = '▶ Resume';
    dom.btnPause.classList.add('btn-pause-on');
    dom.status.innerHTML = __('status.paused');
  } else {
    // RESUME
    const resolveFn = state.pauseResolve;
    state.pausePromise = null;
    state.pauseResolve = null;
    if (resolveFn) resolveFn();
    dom.btnPause.textContent = '⏸ Pause';
    dom.btnPause.classList.remove('btn-pause-on');
    dom.status.innerHTML = __('status.resuming');
  }
}
