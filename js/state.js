/**
 * state.js — État partagé (objet mutable, live binding ES module).
 */
export const state = {
  data: [],
  initialData: [],
  size: 60,
  running: false,
  abortControllers: [],
  focusedAlgorithm: null,
  runGeneration: 0,
  currentDelayMs: 20,
  pausePromise: null,
  pauseResolve: null,
};
