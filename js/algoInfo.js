/**
 * algoInfo.js — Contenu des modales d'information sur les algorithmes.
 * Les textes sont chargés depuis le système de traduction i18n.
 */
import { __ } from './i18n.js';

/**
 * Retourne les données d'information pour un algorithme.
 */
export function getAlgoInfo(algoId) {
  const info = {
    name: __('algoInfo.' + algoId + '.name'),
    emoji: __(`algo.${algoId}.name`), // fallback: just use algo name for emoji-less display
    description: __('algoInfo.' + algoId + '.description'),
    goodFor: __('algoInfo.' + algoId + '.goodFor'),
    complexity: __('algoInfo.' + algoId + '.complexity'),
    space: __('algoInfo.' + algoId + '.space'),
    stable: (() => {
      const s = __('algoInfo.' + algoId + '.stable');
      return s === true || s === 'true';
    })(),
  };

  // Fallback key for unknown algos
  if (info.description === 'algoInfo.' + algoId + '.description') return null;

  const emojiMap = {
    bubble: '🫧', selection: '👆', insertion: '📥',
    merge: '🔀', quick: '⚡', heap: '🏗️',
  };
  info.emoji = emojiMap[algoId] || '📊';

  return info;
}

/**
 * Génère le HTML du modal pour un algorithme donné.
 */
export function infoModalHTML(algoId) {
  const info = getAlgoInfo(algoId);
  if (!info) return '';

  const stableText = info.stable
    ? __('algoInfo.stableYes')
    : __('algoInfo.stableNo');

  return `
    <div class="algo-modal-overlay" id="algoModal" style="display:flex">
      <div class="algo-modal">
        <div class="algo-modal-hdr">
          <span>${info.emoji} ${info.name}</span>
          <button class="algo-modal-close" id="algoModalClose">✕</button>
        </div>
        <div class="algo-modal-body">
          <h3>${__('algoInfo.howItWorks')}</h3>
          <p class="algo-natural">${info.description}</p>

          <h3>${__('algoInfo.whenToUse')}</h3>
          <p class="algo-natural">${info.goodFor}</p>

          <table class="algo-table">
            <tr><td>${__('algoInfo.complexityLabel')}</td><td>${info.complexity}</td></tr>
            <tr><td>${__('algoInfo.memoryLabel')}</td><td>${info.space}</td></tr>
            <tr><td>${__('algoInfo.stabilityLabel')}</td><td>${stableText}</td></tr>
          </table>
        </div>
      </div>
    </div>
  `;
}
