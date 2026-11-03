import {useCurrentFrame} from 'remotion';
import {BEATS_GUION, type BeatGuion} from '../data/guion.generado';
import {DURACION_MEDIDA} from '../data/duraciones';

export const FPS = 30;
export const ANCHO = 1920;
export const ALTO = 1080;

/** Ritmo pausado de narración usado para estimar duraciones antes de grabar. */
const PALABRAS_POR_MINUTO = 138;
/** Respiro visual al final de cada beat. */
const RESPIRO_S = 3;
export const CREDITOS_S = 25;

export type Beat = BeatGuion & {segundos: number; frames: number};

export const BEATS: Beat[] = BEATS_GUION.map((b) => {
  const segundos = DURACION_MEDIDA[b.id] ?? Math.round((b.palabras / PALABRAS_POR_MINUTO) * 60 + RESPIRO_S);
  return {...b, segundos, frames: Math.round(segundos * FPS)};
});

export const ESCENAS = ['01', '02', '03', '04', '05', '06', '07', '08', '09'] as const;
export type Escena = (typeof ESCENAS)[number];

export const beatsDe = (escena: Escena) => BEATS.filter((b) => b.escena === escena);

export const framesDeEscena = (escena: Escena) =>
  escena === '09' ? CREDITOS_S * FPS : beatsDe(escena).reduce((a, b) => a + b.frames, 0);

export const framesTotales = () => ESCENAS.reduce((a, e) => a + framesDeEscena(e), 0);

/** Frame (relativo a la escena) en que empieza un beat. */
export const inicioDeBeat = (id: string) => {
  const beat = BEATS.find((b) => b.id === id);
  if (!beat) throw new Error(`Beat inexistente: ${id}`);
  let acc = 0;
  for (const b of beatsDe(beat.escena as Escena)) {
    if (b.id === id) return acc;
    acc += b.frames;
  }
  return acc;
};

/** Frame (relativo al video completo) en que empieza un beat. */
export const inicioGlobal = (id: string) => {
  const beat = BEATS.find((b) => b.id === id);
  if (!beat) throw new Error(`Beat inexistente: ${id}`);
  const previas = ESCENAS.slice(0, ESCENAS.indexOf(beat.escena as Escena));
  return previas.reduce((a, e) => a + framesDeEscena(e), 0) + inicioDeBeat(id);
};

/** Beat activo dentro de la escena actual. */
export const useBeat = (escena: Escena) => {
  const frame = useCurrentFrame();
  const lista = beatsDe(escena);
  let acc = 0;
  for (const b of lista) {
    if (frame < acc + b.frames) return {beat: b, local: frame - acc, progreso: (frame - acc) / b.frames};
    acc += b.frames;
  }
  const ultimo = lista[lista.length - 1];
  return {beat: ultimo, local: ultimo?.frames ?? 0, progreso: 1};
};

/**
 * Un fotograma clave: `en` es la fracción (0..1) del beat donde ocurre el cambio.
 * Así, si el beat se alarga tras grabar la voz, la animación se reescala sola.
 */
export type Clave<T> = {beat: string; en?: number; estado: T};

export const frameDeClave = (c: Clave<unknown>) => {
  const beat = BEATS.find((b) => b.id === c.beat);
  if (!beat) throw new Error(`Beat inexistente: ${c.beat}`);
  return inicioDeBeat(c.beat) + Math.round((c.en ?? 0) * beat.frames);
};

/** Devuelve el estado vigente, el anterior y cuántos frames lleva vigente. */
export const useClaves = <T,>(claves: Clave<T>[]) => {
  const frame = useCurrentFrame();
  const ordenadas = claves.map((c) => ({...c, f: frameDeClave(c)})).sort((a, b) => a.f - b.f);
  let i = 0;
  for (let k = 0; k < ordenadas.length; k++) if (ordenadas[k].f <= frame) i = k;
  return {actual: ordenadas[i].estado, previo: i > 0 ? ordenadas[i - 1].estado : undefined, desde: frame - ordenadas[i].f};
};
