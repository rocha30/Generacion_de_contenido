import {loadFont as cargarSans} from '@remotion/google-fonts/Inter';
import {loadFont as cargarMono} from '@remotion/google-fonts/JetBrainsMono';

// Inter y JetBrains Mono: licencia SIL Open Font License (ver docs/04-atribuciones.md).
const sans = cargarSans('normal', {weights: ['400', '600', '800'], subsets: ['latin', 'latin-ext']});
const mono = cargarMono('normal', {weights: ['400', '700'], subsets: ['latin', 'latin-ext']});

export const FUENTE = {sans: sans.fontFamily, mono: mono.fontFamily};

/** El código debe verse tal cual se escribe: sin ligaduras (p. ej. !== no se convierte en ≢). */
export const SIN_LIGADURAS = {fontVariantLigatures: 'none', fontFeatureSettings: '"liga" 0, "calt" 0'} as const;

// Sistema visual del plan: fondo claro, código oscuro de alto contraste, un único verde de acento.
export const COLOR = {
  fondo: '#F4F5F0',
  tinta: '#1B1F24',
  tintaSuave: '#5B6470',
  linea: '#D5D9D0',
  tarjeta: '#FFFFFF',
  acento: '#159957',
  acentoSuave: '#DDF3E6',
  error: '#D64545',
  errorSuave: '#FBE3E3',
  cerrado: '#B9BEC4',
  codigoFondo: '#1D2026',
  codigoLinea: '#2A2F38',
  codigoTexto: '#E6E8EB',
  codigoComentario: '#7C8794',
  codigoClave: '#7FD4A8',
  codigoCadena: '#F2C38B',
  codigoNumero: '#9CC7FF',
  codigoFuncion: '#E5E1A3',
} as const;
