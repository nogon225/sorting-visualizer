/**
 * animations.js — Animation des étapes de tri : swap, pulse, pop, historique.
 */
import { render } from './renderer.js';
import { stepInfo, stepEmoji } from './stepInfo.js';
import { __ } from './i18n.js';

// ─── Animation de swap (translation) ────────────────────────────

function animateSwap(cont, idxA, idxB, duration) {
  return new Promise(resolve => {
    const bars = cont.children;
    if (!bars[idxA] || !bars[idxB]) { resolve(); return; }
    const rectA = bars[idxA].getBoundingClientRect();
    const rectB = bars[idxB].getBoundingClientRect();
    const deltaX = rectB.left - rectA.left;
    const easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
    bars[idxA].style.transition = 'transform ' + duration + 'ms ' + easing;
    bars[idxB].style.transition = 'transform ' + duration + 'ms ' + easing;
    bars[idxA].style.transform = 'translate(' + deltaX + 'px,' + Math.min(rectB.top - rectA.top, 10) + 'px)';
    bars[idxB].style.transform = 'translate(' + (-deltaX) + 'px,' + Math.min(rectA.top - rectB.top, 10) + 'px)';
    setTimeout(() => {
      bars[idxA].style.transition = 'none';
      bars[idxB].style.transition = 'none';
      bars[idxA].style.transform = '';
      bars[idxB].style.transform = '';
      resolve();
    }, duration + 20);
  });
}

// ─── Indicateur de niveau de fusion (Merge Sort) ─────────────
function showMergeLevel(dom, hi, lo) {
  const size = hi - lo;
  let level;
  if (size <= 2) level = 1;
  else if (size <= 4) level = 2;
  else if (size <= 8) level = 3;
  else if (size <= 16) level = 4;
  else if (size <= 32) level = 5;
  else level = 6;

  if (level !== dom._mergeLevel) {
    dom._mergeLevel = level;
    const subSize = size / 2;
    dom.typeEl.textContent = '📊 Passe ' + level + ' (fusion ' + subSize + '-a-' + subSize + ')';
  }
}

// ─── Surlignage des sous-tableaux (Merge Sort) ───────────────
// Applique une teinte bleue/rouge sur les barres du sous-tableau gauche/droit.
function clearMergeRange(cont) {
  const bars = cont.children;
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.boxShadow = 'none';
  }
}

function applyDivRange(cont, lo, mid, hi) {
  // Coloriage de la phase DIVISION : seule la moitie gauche est marquee en violet
  const bars = cont.children;
  for (let i = lo; i < mid && i < bars.length; i++) {
    bars[i].style.boxShadow = 'inset 0 0 0 1000px rgba(168, 85, 247, 0.35)';
  }
  if (mid > lo && mid-1 < bars.length) {
    bars[mid-1].style.boxShadow = 'inset 0 0 0 1000px rgba(168, 85, 247, 0.35), 2px 0 0 0 rgba(255,255,255,0.4)';
  }
}

function applyMergeRange(cont, lo, mid, hi) {
  // Coloriage de la phase FUSION : gauche bleu, droite rouge
  const bars = cont.children;
  for (let i = lo; i < hi && i < bars.length; i++) {
    bars[i].style.boxShadow = 'none';
  }
  for (let i = lo; i < hi && i < bars.length; i++) {
    if (i < mid) {
      bars[i].style.boxShadow = 'inset 0 0 0 1000px rgba(59, 130, 246, 0.35)';
    } else if (i < hi) {
      bars[i].style.boxShadow = 'inset 0 0 0 1000px rgba(239, 68, 68, 0.35)';
    }
  }
  if (mid > lo && mid <= hi && mid-1 < bars.length) {
    bars[mid-1].style.boxShadow = 'inset 0 0 0 1000px rgba(59, 130, 246, 0.35), 2px 0 0 0 rgba(255,255,255,0.4)';
  }
}

// ─── Animation de copie (Merge Sort) ──────────────────────────
// Pas de deplacement. Le gagnant recoit un halo vert, la destination bounce,
// puis la hauteur de la destination est mise a jour.
function animateMerge(cont, fromIdx, toIdx, duration, side) {
  return new Promise(resolve => {
    const bars = cont.children;
    if (!bars[fromIdx] || !bars[toIdx]) { resolve(); return; }

    // Etape 1: le gagnant brille en vert
    bars[fromIdx].style.transition = 'box-shadow ' + 80 + 'ms ease-out';
    bars[fromIdx].style.boxShadow = '0 0 18px 6px rgba(34, 197, 94, 0.8)';

    // Etape 2: la destination se contracte
    setTimeout(() => {
      bars[toIdx].style.transition = 'transform ' + (duration * 0.3) + 'ms ease-out';
      bars[toIdx].style.transform = 'scaleY(0.6)';

      // Etape 3: le gagnant perd son halo, la destination rebondit avec la nouvelle valeur
      setTimeout(() => {
        bars[fromIdx].style.transition = 'box-shadow 150ms ease-out';
        bars[fromIdx].style.boxShadow = 'none';

        bars[toIdx].style.transition = 'transform ' + (duration * 0.25) + 'ms ease-out';
        bars[toIdx].style.transform = 'scaleY(1.15)';

        setTimeout(() => {
          bars[toIdx].style.transition = 'transform ' + (duration * 0.2) + 'ms ease-out';
          bars[toIdx].style.transform = '';

          setTimeout(() => {
            bars[fromIdx].style.transition = 'none';
            bars[fromIdx].style.boxShadow = 'none';
            bars[toIdx].style.transition = 'none';
            bars[toIdx].style.transform = '';
            resolve();
          }, duration * 0.2 + 10);
        }, duration * 0.25 + 10);
      }, duration * 0.3 + 10);
    }, 100);
  });
}

function triggerAnimation(bar, className) {
  if (!bar) return;
  bar.classList.remove(className);
  void bar.offsetWidth;
  bar.classList.add(className);
}

// ─── Historique ─────────────────────────────────────────────────
const MAX_HISTORY = 500;

function pushHistory(dom, info, stepIndex) {
  if (!dom._history) dom._history = [];
  dom._history.push({ emoji:info.emoji, html:info.html, stepIndex });
  if (dom._history.length > MAX_HISTORY) dom._history.shift();

  // Mise à jour temps réel si la modale est ouverte
  const modal = document.getElementById('histModal-' + dom._algoId);
  if (modal && modal.style.display !== 'none') {
    const body = modal.querySelector('.hist-body');
    if (body) {
      const entry = document.createElement('div');
      entry.className = 'hl-entry';
      entry.innerHTML = '<span class="hl-text">#' + (stepIndex + 1) + ' ' + info.emoji + ' ' + info.html + '</span>';
      body.appendChild(entry);
      // Scroll en bas pour voir la nouvelle entrée
      body.scrollTop = body.scrollHeight;
    }
  }
}

// ─── Animate : boucle principale ────────────────────────────────

export async function animate(id, steps, arr, dom, getDelayMs, getPausePromise, sig) {
  const t0 = performance.now();
  let comparisons = 0, swaps = 0;
  const workArray = [...arr];
  const classes = {};
  const totalSteps = steps.length;

  // Reset history
  dom._history = [];
  dom._algoId = id;

  clearMergeRange(dom.cont);
  dom._mergeLevel = -1;
  render(dom.cont, workArray, {});

  for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
    if (sig.aborted) return { cmp: comparisons, swp: swaps, elapsed: 0, aborted: true };
    const step = steps[stepIndex];
    const pauseP = getPausePromise ? getPausePromise() : null;
    if (pauseP) await pauseP;
    if (sig.aborted) return { cmp: comparisons, swp: swaps, elapsed: 0, aborted: true };
    for (const key of Object.keys(classes)) delete classes[key];
    const delay = getDelayMs();

    if (step.type === 'cmp') {
      comparisons++;
      dom.cmpEl.textContent = comparisons;
      classes[step.i] = 1; classes[step.j] = 1;
    } else if (step.type === 'div') {
      // Division recursive : montre le decoupage du tableau
      if (step.lo != null && step.hi != null) {
        clearMergeRange(dom.cont);
        applyDivRange(dom.cont, step.lo, step.mid, step.hi);
        dom._mergeLevel = -1;
        dom.typeEl.textContent = '🔪 Division [' + step.lo + '..' + step.hi + '[ en [' + step.lo + '..' + step.mid + '[ [' + step.mid + '..' + step.hi + '[';
        if (delay > 10) {
          render(dom.cont, workArray, {});
          await new Promise(r => setTimeout(r, Math.min(600, delay)));
        }
      }
    } else if (step.type === 'mrk') {
      // Marqueur de fin de fusion : le segment [lo..hi[ est merge
      if (step.lo != null && step.hi != null) {
        const bars = dom.cont.children;
        for (let i = step.lo; i < step.hi && i < bars.length; i++) {
          bars[i].style.borderTop = '2px solid rgba(34, 197, 94, 0.6)';
        }
        dom.typeEl.textContent = '✅ [' + step.lo + '..' + step.hi + '[ trie par fusion';
        if (delay > 10) {
          render(dom.cont, workArray, {});
          await new Promise(r => setTimeout(r, Math.min(400, delay)));
        }
      }
    } else if (step.type === 'swp') {
      if (step.i != null && step.j != null) {
        // Swap entre deux elements
        if (delay > 10) {
          classes[step.i] = 2; classes[step.j] = 2;
          render(dom.cont, workArray, classes);
          dom.typeEl.textContent = __('typeLabels.swap');
          dom.timeEl.textContent = Math.round(performance.now() - t0);
          const dur = Math.min(600, Math.max(80, delay * 1.5));
          await animateSwap(dom.cont, step.i, step.j, dur);
          // Met a jour les valeurs ET les hauteurs immediatement apres l'animation
          [workArray[step.i], workArray[step.j]] = [workArray[step.j], workArray[step.i]];
          render(dom.cont, workArray, classes);
        } else {
          // Vitesse rapide : pas d'animation, juste les valeurs
          [workArray[step.i], workArray[step.j]] = [workArray[step.j], workArray[step.i]];
        }
      } else if (step.i != null && step.v !== undefined && delay > 10) {
        if (step.from != null && step.from !== step.i) {
          classes[step.i] = 2; classes[step.from] = 1;
          render(dom.cont, workArray, classes);
          dom.typeEl.textContent = __('typeLabels.move');
          dom.timeEl.textContent = Math.round(performance.now() - t0);
          const dur = Math.min(600, Math.max(80, delay * 1.5));
          await animateMerge(dom.cont, step.from, step.i, dur, step.side);
          workArray[step.i] = step.v;
          render(dom.cont, workArray, classes);
        } else {
          classes[step.i] = 2;
          render(dom.cont, workArray, classes);
          dom.typeEl.textContent = __('typeLabels.write');
          dom.timeEl.textContent = Math.round(performance.now() - t0);
          const bar = dom.cont.children[step.i];
          if (bar) {
            bar.style.transition = 'transform ' + Math.min(300, delay) + 'ms ease-out';
            bar.style.transform = 'scaleY(0.7)';
            await new Promise(r => setTimeout(r, Math.min(300, delay)));
            bar.style.transform = ''; bar.style.transition = 'none';
          }
          workArray[step.i] = step.v;
          render(dom.cont, workArray, classes);
        }
      } else if (step.i != null && step.v !== undefined) {
        // Vitesse rapide : ecriture sans animation
        workArray[step.i] = step.v;
      }
      swaps++;
      dom.swpEl.textContent = swaps;
      classes[step.i] = 2;
      if (step.j != null) classes[step.j] = 2;
    } else if (step.type === 'srt') {
      classes[step.i] = 3;
    }

    dom.timeEl.textContent = Math.round(performance.now() - t0);

    // Description lisible
    const info = stepInfo(step, workArray, totalSteps, stepIndex);
    dom.typeEl.textContent = info.emoji + ' ' + info.label;
    dom.descEl.innerHTML = info.html;
    pushHistory(dom, info, stepIndex);

    if (!sig.aborted) {
      render(dom.cont, workArray, classes);
      // Surlignage des sous-tableaux pour le tri fusion
      if (step.lo != null && step.hi != null && step.type !== 'div') {
        applyMergeRange(dom.cont, step.lo, step.mid, step.hi);
        showMergeLevel(dom, step.hi, step.lo);
      }
      if (step.type === 'cmp' && delay > 15) {
        triggerAnimation(dom.cont.children[step.i], 'b-cmp');
        triggerAnimation(dom.cont.children[step.j], 'b-cmp');
      }
      if (step.type === 'srt' && delay > 15) {
        triggerAnimation(dom.cont.children[step.i], 'b-srt');
      }
      if (delay > 0) await new Promise(r => setTimeout(r, delay));
      else await new Promise(r => requestAnimationFrame(r));
    }
  }

  const finalClasses = {};
  for (let i = 0; i < workArray.length; i++) finalClasses[i] = 3;
  render(dom.cont, workArray, finalClasses);
  dom.timeEl.textContent = Math.round(performance.now() - t0);
  dom.typeEl.textContent = __('typeLabels.done');
  dom.descEl.innerHTML = __('status.done', { ms: Math.round(performance.now() - t0), steps: totalSteps });
  dom.okEl.style.opacity = '1';
  return { cmp: comparisons, swp: swaps, elapsed: performance.now() - t0, aborted: false };
}
