/**
 * Sorters — Tous les algorithmes de tri.
 * Chaque fonction prend un tableau en entrée et retourne
 * un tableau d'étapes { type, i, j } pour l'animateur.
 *
 * Types d'étapes :
 *   cmp  → comparaison entre i et j
 *   swp  → échange (i ↔ j, ou i seul pour merge)
 *   srt  → élément i est à sa place définitive
 */

import { __ } from './i18n.js';

export function bubbleSort(a) {
  const s = []; const n = a.length;
  for (let i = 0; i < n-1; i++) {
    for (let j = 0; j < n-i-1; j++) {
      s.push({ type:'cmp', i:j, j:j+1 });
      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]];
        s.push({ type:'swp', i:j, j:j+1 });
      }
    }
    s.push({ type:'srt', i: n-i-1 });
  }
  s.push({ type:'srt', i:0 });
  return s;
}

export function selectionSort(a) {
  const s = []; const n = a.length;
  for (let i = 0; i < n-1; i++) {
    let mi = i;
    for (let j = i+1; j < n; j++) {
      s.push({ type:'cmp', i:mi, j });
      if (a[j] < a[mi]) mi = j;
    }
    if (mi !== i) { [a[i], a[mi]] = [a[mi], a[i]]; s.push({ type:'swp', i, j:mi }); }
    s.push({ type:'srt', i });
  }
  s.push({ type:'srt', i: n-1 });
  return s;
}

export function insertionSort(a) {
  const s = []; const n = a.length;
  for (let i = 1; i < n; i++) {
    let k = a[i], j = i-1;
    while (j >= 0) {
      s.push({ type:'cmp', i:j, j:j+1 });
      if (a[j] > k) { a[j+1] = a[j]; s.push({ type:'swp', i:j, j:j+1 }); j--; }
      else break;
    }
    a[j+1] = k;
    s.push({ type:'srt', i });
  }
  return s;
}

export function mergeSort(a) {
  const s = []; const n = a.length;

  function merge(lo, mid, hi) {
    const l = a.slice(lo, mid), r = a.slice(mid, hi);
    let i = 0, j = 0, k = lo;
    while (i < l.length && j < r.length) {
      s.push({ type:'cmp', i:lo+i, j:mid+j, lo, mid, hi });
      if (l[i] <= r[j]) { a[k] = l[i]; s.push({ type:'swp', i:k, v:a[k], from: lo+i, side:'L', lo, mid, hi }); i++; }
      else { a[k] = r[j]; s.push({ type:'swp', i:k, v:a[k], from: mid+j, side:'R', lo, mid, hi }); j++; }
      k++;
    }
    while (i < l.length) { a[k] = l[i]; s.push({ type:'swp', i:k, v:a[k], from: lo+i, side:'L', lo, mid, hi }); i++; k++; }
    while (j < r.length) { a[k] = r[j]; s.push({ type:'swp', i:k, v:a[k], from: mid+j, side:'R', lo, mid, hi }); j++; k++; }
  }

  function ms(lo, hi, depth) {
    if (hi - lo <= 1) return;
    const mid = Math.floor((lo+hi)/2);
    s.push({ type:'div', lo, mid, hi, depth: depth || 0 });
    ms(lo, mid, (depth||0)+1); ms(mid, hi, (depth||0)+1);
    merge(lo, mid, hi);
    s.push({ type:'mrk', lo, mid, hi, level: Math.round(Math.log2(hi - lo)) });
  }

  ms(0, n, 0);
  for (let i = 0; i < n; i++) s.push({ type:'srt', i });
  return s;
}

export function quickSort(a) {
  const s = []; const n = a.length;

  function partition(lo, hi) {
    const pv = a[hi];
    let i = lo - 1;
    for (let j = lo; j < hi; j++) {
      s.push({ type:'cmp', i:hi, j });
      if (a[j] <= pv) {
        i++;
        [a[i], a[j]] = [a[j], a[i]];
        s.push({ type:'swp', i, j });
      }
    }
    [a[i+1], a[hi]] = [a[hi], a[i+1]];
    s.push({ type:'swp', i:i+1, j:hi });
    s.push({ type:'srt', i:i+1 });
    return i + 1;
  }

  function qs(lo, hi) {
    if (lo >= hi || lo < 0) return;
    const p = partition(lo, hi);
    qs(lo, p-1);
    qs(p+1, hi);
    if (lo === 0 && hi === n-1)
      for (let i = 0; i < n; i++) s.push({ type:'srt', i });
  }

  qs(0, n-1);
  return s;
}

/** Helper : retourne le nom traduit d'un algo */
export function getAlgoName(id) {
  return __('algo.' + id + '.name');
}

export function heapSort(a) {
  const s = []; const n = a.length;

  function heapify(sz, rt) {
    let lg = rt;
    const l = 2*rt+1, r = 2*rt+2;
    if (l < sz) {
      s.push({ type:'cmp', i:l, j:lg });
      if (a[l] > a[lg]) lg = l;
    }
    if (r < sz) {
      s.push({ type:'cmp', i:r, j:lg });
      if (a[r] > a[lg]) lg = r;
    }
    if (lg !== rt) {
      [a[rt], a[lg]] = [a[lg], a[rt]];
      s.push({ type:'swp', i:rt, j:lg });
      heapify(sz, lg);
    }
  }

  // Construction du max-heap
  for (let i = Math.floor(n/2)-1; i >= 0; i--) heapify(n, i);
  // Extraction
  for (let i = n-1; i > 0; i--) {
    [a[0], a[i]] = [a[i], a[0]];
    s.push({ type:'swp', i:0, j:i });
    s.push({ type:'srt', i });
    heapify(i, 0);
  }
  s.push({ type:'srt', i:0 });
  return s;
}

/** Registry des algorithmes */
export const ALGO_MAP = {
  bubble:    bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge:     mergeSort,
  quick:     quickSort,
  heap:      heapSort,
};

/** Métadonnées des algorithmes (id, complexité, couleur) */
export const ALGOS = [
  { id:'bubble',    cx:'O(n²)',       col:'#3b82f6' },
  { id:'selection', cx:'O(n²)',       col:'#8b5cf6' },
  { id:'insertion', cx:'O(n²)',       col:'#ec4899' },
  { id:'merge',     cx:'O(n log n)',  col:'#f59e0b' },
  { id:'quick',     cx:'O(n log n)',  col:'#10b981' },
  { id:'heap',      cx:'O(n log n)',  col:'#06b6d4' },
];
