/**
 * race.js — Lancement des algorithmes en parallèle et classement.
 */
import { state } from './state.js';
import { dom } from './dom.js';
import { ALGOS, ALGO_MAP, lanes } from './lanes.js';
import { animate } from './animations.js';
import { __ } from './i18n.js';

/** Lance tous les algorithmes simultanément sur les mêmes données. */
export async function runRace() {
  if (state.running) return;

  state.running = true;
  const genId = ++state.runGeneration;

  dom.btnRun.disabled = dom.btnRandom.disabled = true;
  dom.btnPause.disabled = false;
  dom.btnPause.textContent = '⏸ Pause';
  dom.btnPause.classList.remove('btn-pause-on');
  dom.status.innerHTML = __('status.sorting');

  state.abortControllers.forEach(c => c.abort());
  state.abortControllers = [];

  if (!state.running || genId !== state.runGeneration) { state.running = false; return; }

  const getDelayMs = () => state.currentDelayMs;
  const getPausePromise = () => state.pausePromise;

  const algosToRun = state.focusedAlgorithm
    ? ALGOS.filter(a => a.id === state.focusedAlgorithm)
    : ALGOS;

  const dataClones = algosToRun.map(() => [...state.data]);

  const controllers = algosToRun.map(() => {
    const ac = new AbortController();
    state.abortControllers.push(ac);
    return ac;
  });

  const promises = algosToRun.map((algo, index) => {
    const steps = ALGO_MAP[algo.id](dataClones[index]);
    return animate(
      algo.id, steps, state.data, lanes[algo.id],
      getDelayMs, getPausePromise, controllers[index].signal
    );
  });

  try {
    const results = await Promise.allSettled(promises);
    if (genId !== state.runGeneration) return;

    state.running = false;
    dom.btnRun.disabled = true;
    dom.btnRandom.disabled = false;
    dom.btnReset.disabled = false;
    dom.btnPause.disabled = true;
    dom.btnPause.textContent = '⏸ Pause';
    dom.btnPause.classList.remove('btn-pause-on');

    // Classement
    const ranking = algosToRun.map((algo, index) => {
      const r = results[index];
      const elapsed = r.status === 'fulfilled' && !r.value.aborted ? r.value.elapsed : Infinity;
      return { name: __('algo.' + algo.id + '.name'), elapsed };
    }).filter(x => x.elapsed < Infinity).sort((a, b) => a.elapsed - b.elapsed);

    if (ranking.length > 1) {
      dom.status.innerHTML = __('status.winner', {
        name: ranking[0].name, ms: ranking[0].elapsed,
        second: ranking[1].name, secondMs: ranking[1].elapsed
      });
    } else if (ranking.length === 1) {
      dom.status.innerHTML = __('status.singleWinner', {
        name: ranking[0].name, ms: ranking[0].elapsed
      });
    } else {
      dom.status.innerHTML = __('status.cancelled');
    }
  } finally {
    if (genId === state.runGeneration) {
      state.running = false;
      dom.btnRun.disabled = true;
      dom.btnRandom.disabled = false;
      dom.btnReset.disabled = false;
    }
  }
}
