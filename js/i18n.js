/**
 * i18n.js — Système de traduction simple
 *
 * Supporte :
 *  - `__(key)` → traduction simple
 *  - `__(key, { param: val })` → template {{param}}
 *  - `__(key, { param: val })` → si la valeur est une fonction, l'appelle avec params
 *  - `data-i18n="key"` pour les éléments HTML
 *  - `data-i18n-title="key"` pour les tooltips
 *  - Détection de la langue du navigateur au chargement
 *  - localStorage pour persister le choix
 */

import { fr } from './lang/fr.js';
import { en } from './lang/en.js';

const LOCALES = { fr, en };
const STORAGE_KEY = 'sorting-visualizer-lang';

let currentLocale = detectLanguage();

/**
 * Détecte la langue à utiliser :
 * 1. localStorage
 * 2. navigator.language (premier segment)
 * 3. 'fr' par défaut
 */
function detectLanguage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && LOCALES[saved]) return saved;

  const navLang = (navigator.language || '').split('-')[0];
  if (navLang === 'en') return 'en';

  return 'fr';
}

/**
 * Définit la locale active et persiste le choix.
 */
export function setLocale(locale) {
  if (!LOCALES[locale]) return;
  currentLocale = locale;
  try { localStorage.setItem(STORAGE_KEY, locale); } catch (_) {}
}

/**
 * Retourne la locale active.
 */
export function getLocale() {
  return currentLocale;
}

/**
 * Traduit une clé avec paramètres optionnels.
 *
 * @param {string} key    - Clé de traduction (ex: "algo.bubble.name" ou "status.winner")
 * @param {object} params - Paramètres pour les templates {{key}}
 * @returns {string}
 */
export function __(key, params = {}) {
  const locale = LOCALES[currentLocale];
  if (!locale) return key;

  const keys = key.split('.');
  let val = locale;
  for (const k of keys) {
    if (val && val[k] !== undefined) val = val[k];
    else return key; // fallback to key
  }

  // Si c'est une fonction, l'appeler avec les params
  if (typeof val === 'function') return val(params);

  // Remplacer les placeholders {{param}}
  if (typeof val === 'string') {
    return val.replace(/\{\{(\w+)\}\}/g, (_, k) =>
      params[k] !== undefined ? params[k] : '{{' + k + '}}'
    );
  }

  return val;
}

/**
 * Applique les traductions à tous les éléments marqués data-i18n et data-i18n-title.
 */
export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = __(key);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.dataset.i18nTitle;
    el.title = __(key);
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    el.innerHTML = __(key);
  });
}

/**
 * Détecte la langue et active la locale au chargement.
 */
export function initI18n() {
  setLocale(currentLocale);

  // Applique les traductions initiales
  applyTranslations();

  // Bascule de langue sur le bouton dédié
  const btn = document.getElementById('btnLang');
  if (btn) {
    btn.textContent = currentLocale === 'fr'
      ? __('buttons.lang')
      : __('buttons.lang');
    btn.addEventListener('click', () => {
      const next = currentLocale === 'fr' ? 'en' : 'fr';
      setLocale(next);
      btn.textContent = __('buttons.lang');
      applyTranslations();

      // Met à jour les textes dynamiques qui ne sont pas en data-i18n
      updateDynamicTexts();

      // Dispatch un événement pour que les modules réagissent
      document.dispatchEvent(new CustomEvent('locale-changed', { detail: { locale: next } }));
    });
  }
}

/**
 * Ré-applique les textes qui ont été définis dynamiquement par le JS
 * (légende, lane names, tooltips, etc.)
 */
function updateDynamicTexts() {
  // Legend (array of strings: "🔵 Défaut", etc.)
  const legendLabels = document.querySelectorAll('.legend span');
  const legendData = __('legend');
  if (Array.isArray(legendData)) {
    legendLabels.forEach((el, idx) => {
      if (legendData[idx]) el.textContent = legendData[idx];
    });
  }

  // Lane names (algo names in headers)
  document.querySelectorAll('.lane .nm').forEach(el => {
    const lane = el.closest('.lane');
    if (lane) {
      const algoId = lane.dataset.algo;
      if (algoId) {
        el.textContent = __('algo.' + algoId + '.name');
      }
    }
  });

  // Slider labels
  const speedLabel = document.getElementById('speedV');
  if (speedLabel) {
    const slider = document.getElementById('speed');
    if (slider) {
      const value = parseInt(slider.value);
      const labels = __('controls.speedLabels');
      if (Array.isArray(labels) && labels[value - 1]) {
        speedLabel.textContent = labels[value - 1];
      }
    }
  }
}

// Auto-init après DOMContentLoaded (importé depuis main.js)
document.addEventListener('DOMContentLoaded', () => {
  // Re-détection déjà faite au moment de l'import
  initI18n();
});
