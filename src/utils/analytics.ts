/**
 * Gestor de analítica: Captura de parámetros UTM y preparación del Píxel de Meta
 */

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbclid?: string;
  gclid?: string;
}

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    META_PIXEL_ID?: string;
  }
}

const UTM_STORAGE_KEY = 'lucero_utms';
const CONSENT_STORAGE_KEY = 'meta_pixel_consent';

/**
 * Extrae y guarda los parámetros UTM de la URL actual en sessionStorage
 */
export function captureAndStoreUTMs(): UTMParams {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utms: UTMParams = {};

  const keys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'fbclid',
    'gclid',
  ];

  let hasUtm = false;
  keys.forEach((key) => {
    const val = params.get(key);
    if (val) {
      utms[key] = val;
      hasUtm = true;
    }
  });

  if (hasUtm) {
    try {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utms));
    } catch (e) {
      console.warn('No se pudo guardar UTMs en sessionStorage', e);
    }
    return utms;
  }

  // Si no hay en la URL actual, recuperar los almacenados previamente en la sesión
  return getStoredUTMs();
}

/**
 * Obtiene los parámetros UTM almacenados de la sesión
 */
export function getStoredUTMs(): UTMParams {
  if (typeof window === 'undefined') return {};
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

/**
 * Comprueba si el usuario ha otorgado consentimiento para analítica / cookies de marketing
 */
export function hasMetaConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const consent = localStorage.getItem(CONSENT_STORAGE_KEY);
    // Si no se ha denegado explícitamente y existe flag o consent aceptado
    return consent === 'granted' || consent === 'true';
  } catch {
    return false;
  }
}

/**
 * Guarda el estado de consentimiento
 */
export function setMetaConsent(granted: boolean, pixelId?: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, granted ? 'granted' : 'denied');
    if (granted) {
      initMetaPixel(pixelId);
    }
  } catch (e) {
    console.warn('Error al guardar consentimiento', e);
  }
}

/**
 * Inicializa el script oficial de Meta Pixel una sola vez tras consentimiento o configuración
 * @param pixelId - ID numérico del Píxel de Meta (ej. '123456789012345')
 */
export function initMetaPixel(pixelId?: string) {
  if (typeof window === 'undefined') return;

  const id = pixelId || (import.meta as any).env?.VITE_META_PIXEL_ID || window.META_PIXEL_ID;
  if (!id) {
    // Hueco preparado: El píxel se cargará en cuanto se proporcione el ID del Píxel de Meta
    return;
  }

  // Evitar doble inyección si ya existe
  if (window.fbq) {
    return;
  }

  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    if (s && s.parentNode) {
      s.parentNode.insertBefore(t, s);
    } else {
      b.head.appendChild(t);
    }
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  if (window.fbq) {
    window.fbq('init', id);
    window.fbq('track', 'PageView');
  }
}

/**
 * Envía el evento estándar 'Lead' a Meta Pixel
 */
export function trackMetaLead(customData?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  const utms = getStoredUTMs();
  const payload = {
    content_name: 'Solicitud Chalet Lucero del Alba',
    content_category: 'Inmobiliaria Premium',
    value: 0,
    currency: 'EUR',
    ...utms,
    ...customData,
  };

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', payload);
  }
}

/**
 * Envía evento de visualización de página 'PageView'
 */
export function trackMetaPageView() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
}
