/**
 * dom.js — Références DOM lazy (résolues au premier appel).
 */
const $ = id => () => document.getElementById(id);

export const dom = {
  get track()    { return this._track    || (this._track    = $('track')()); },
  get sizeSlider()  { return this._sizeSlider  || (this._sizeSlider  = $('sS')()); },
  get sizeDisplay() { return this._sizeDisplay || (this._sizeDisplay = $('sD')()); },
  get btnRun()   { return this._btnRun   || (this._btnRun   = $('bGo')()); },
  get btnPause() { return this._btnPause || (this._btnPause = $('bPa')()); },
  get btnReset() { return this._btnReset || (this._btnReset = $('bRs')()); },
  get btnRandom(){ return this._btnRandom|| (this._btnRandom= $('bRnd')()); },
  get speedSlider(){ return this._speedSlider|| (this._speedSlider= $('speed')()); },
  get speedLabel() { return this._speedLabel || (this._speedLabel = $('speedV')()); },
  get status()   { return this._status   || (this._status   = $('status')()); },
};

/**
 * Fabrique un élément DOM avec classes et enfants.
 */
export function el(tag, cls, ...children) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  children.filter(Boolean).forEach(child =>
    e.appendChild(typeof child === 'string' ? document.createTextNode(child) : child));
  return e;
}
