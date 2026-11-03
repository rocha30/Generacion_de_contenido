// Lectura de beats y duraciones para los scripts de Node (misma fórmula que src/lib/tiempo.ts).
import {readFileSync} from 'node:fs';
import path from 'node:path';

export const RAIZ = path.resolve(new URL('..', import.meta.url).pathname);
export const FPS = 30;
export const CREDITOS_S = 25;

export const leerBeats = () => {
  const gen = readFileSync(path.join(RAIZ, 'src/data/guion.generado.ts'), 'utf8');
  const beats = JSON.parse(gen.slice(gen.indexOf('= [') + 2).replace(/;\s*$/, ''));
  const medidas = Object.fromEntries(
    [...readFileSync(path.join(RAIZ, 'src/data/duraciones.ts'), 'utf8').matchAll(/^\s*'(S\d\d-B\d+)':\s*(\d+(?:\.\d+)?)/gm)].map((m) => [m[1], Number(m[2])]),
  );
  let acc = 0;
  return beats.map((b) => {
    const medido = b.id in medidas;
    const segundos = medido ? medidas[b.id] : Math.round((b.palabras / 138) * 60 + 3);
    const frames = Math.round(segundos * FPS);
    const r = {...b, segundos, frames, inicioFrame: acc, medido};
    acc += frames;
    return r;
  });
};
