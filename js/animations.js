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

// ─── Animation de deplacement unidirectionnel ───────────────────
function animateMove(cont, fromIdx, toIdx, duration) {
  return new Promise(resolve => {
    const bars = cont.children;
    if (!bars[fromIdx] || !bars[toIdx]) { resolve(); return; }
    const rectFrom = bars[fromIdx].getBoundingClientRect();
    const rectTo = bars[toIdx].getBoundingClientRect();
    const deltaX = rectTo.left - rectFrom.left;
    const deltaY = Math.min(rectTo.top - rectFrom.top, 10);
    const easing = 'cubic-bezier(0.34, 1.56, 0.64, 1)';

    // La barre source glisse vers la destination
    bars[fromIdx].style.transition = 'transform ' + duration + 'ms ' + easing;
    bars[fromIdx].style.transform = 'translate(' + deltaX + 'px,' + deltaY + 'px)';
    // La barre destination pulse pour indiquer qu'elle va etre remplacee
    bars[toIdx].style.transition = 'transform ' + (duration * 0.3) + 'ms ease-out';
    bars[toIdx].style.transform = 'scaleY(0.85)';

    setTimeout(() => {
      bars[fromIdx].style.transition = 'none';
      bars[fromIdx].style.transform = '';
      bars[toIdx].style.transition = 'none';
      bars[toIdx].style.transform = '';
      resolve();
    }, duration + 20);
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
    } else if (step.type === 'swp') {
      if (step.i != null && step.j != null && delay > 10) {
        classes[step.i] = 2; classes[step.j] = 2;
        render(dom.cont, workArray, classes);
        dom.typeEl.textContent = __('typeLabels.swap');
        dom.timeEl.textContent = Math.round(performance.now() - t0);
        const dur = Math.min(600, Math.max(80, delay * 1.5));
        await animateSwap(dom.cont, step.i, step.j, dur);
      }
      if (step.i != null && step.j == null && step.v !== undefined && delay > 10) {
        if (step.from != null && step.from !== step.i) {
          classes[step.i] = 2; classes[step.from] = 1;
          render(dom.cont, workArray, classes);
          dom.typeEl.textContent = __('typeLabels.move');
          dom.timeEl.textContent = Math.round(performance.now() - t0);
          const dur = Math.min(600, Math.max(80, delay * 1.5));
          await animateMove(dom.cont, step.from, step.i, dur);
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
        }
      }
      if (step.i != null && step.j != null)
        [workArray[step.i], workArray[step.j]] = [workArray[step.j], workArray[step.i]];
      else if (step.i != null && step.v !== undefined)
        workArray[step.i] = step.v;
      swaps++;
      dom.swpEl.textContent = swaps;
      classes[step.i] = 2;
      if (step.j != null) classes[step.j] = 2;
    } else if (step.type === 'mov') {
      // Deplacement unidirectionnel : valeur a l'index i va a l'index j
      if (step.k !== undefined) {
        // Placement de la cle : valeur k arrive a la position i
        workArray[step.i] = step.k;
        classes[step.i] = 2;
      } else {
        // Decalage : valeur a l'index i copiee a l'index j
        workArray[step.j] = workArray[step.i];
        classes[step.i] = 1;
        classes[step.j] = 2;
      }
      if (delay > 10) {
        render(dom.cont, workArray, classes);
        const dur = Math.min(400, Math.max(60, delay));
        if (step.k !== undefined) {
          // Animation de la cle : pulse a la position d'arrivee
          const bar = dom.cont.children[step.i];
          if (bar) {
            bar.style.transition = 'transform ' + dur + 'ms ease-out';
            bar.style.transform = 'scaleY(1.15)';
            await new Promise(r => setTimeout(r, dur));
            bar.style.transform = ''; bar.style.transition = 'none';
          }
        } else {
          // Decalage : barre source glisse a la position destination
          await animateMove(dom.cont, step.i, step.j, dur);
        }
      }
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
