// Genera docs/06-marcas-de-tiempo.md a partir del guion y de src/data/duraciones.ts.
// Ejecutar con `npm run marcas` después de cambiar el guion o de anotar duraciones medidas.
import {writeFileSync} from 'node:fs';
import path from 'node:path';
import {CREDITOS_S, FPS, RAIZ, leerBeats} from './beats.mjs';

const beats = leerBeats();
const mmss = (frames) => {
  const s = frames / FPS;
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${(s % 60).toFixed(1).padStart(4, '0')}`;
};
const palabras = (t, n, desdeFinal) => {
  const w = t.split(/\s+/);
  return desdeFinal ? '…' + w.slice(-n).join(' ') : w.slice(0, n).join(' ') + '…';
};
const esc = (s) => s.replace(/\|/g, '\\|');

const filas = beats.map((b, i) => {
  const sig = beats[i + 1];
  const trans = !sig ? '→ Escena 09 (créditos)' : sig.escena !== b.escena ? `→ Escena ${sig.escena} (cambio de escena)` : 'continúa en la escena';
  return `| ${b.id} | ${b.escena} | ${mmss(b.inicioFrame)} | ${mmss(b.inicioFrame + b.frames)} | ${b.segundos} s | ${b.medido ? 'medido' : 'estimado'} | ${esc(b.titulo)} | «${esc(palabras(b.texto, 7))}» | «${esc(palabras(b.texto, 6, true))}» | ${trans} |`;
});
const fin = beats.at(-1);
const inicioCreditos = fin.inicioFrame + fin.frames;
const total = inicioCreditos + CREDITOS_S * FPS;
const medidos = beats.filter((b) => b.medido).length;

const md = `# 06. Marcas de tiempo por beat

> **Archivo generado** por \`npm run marcas\` (scripts/marcas.mjs). No editar a mano: el texto sale de \`docs/02-guion.md\` y las duraciones de \`src/data/duraciones.ts\`.

**Estado:** ${medidos} de ${beats.length} beats con duración medida; el resto son **estimados** (≈138 palabras/min + 3 s de respiro). **Duración total actual:** ${mmss(total)} (contenido ${mmss(inicioCreditos)} + ${CREDITOS_S} s de créditos).

## Cómo usar esta tabla (Persona 3)

Guía paso a paso: \`GUIA-PERSONA-3.md\` (raíz del repositorio). En resumen:

1. Grabar la narración (con la composición \`Teleprompter\` o leyendo \`docs/02-guion.md\`) y exportar **un WAV por beat** a \`public/narracion/\` con el nombre exacto del beat (\`S01-B1.wav\`, …). Las columnas «Empieza con» / «Termina con» indican dónde cortar.
2. \`npm run medir\`: mide cada WAV, ajusta la duración de cada beat (audio + 1 s) y el video entero se reajusta solo.
3. \`npm run marcas\`: actualiza esta tabla con los tiempos reales.

## Tabla

| Beat | Escena | Inicio | Fin | Duración | Origen | Título | Empieza con | Termina con | Transición |
|---|---|---|---|---|---|---|---|---|---|
${filas.join('\n')}
| Créditos | 09 | ${mmss(inicioCreditos)} | ${mmss(total)} | ${CREDITOS_S} s | fijo | Créditos (sin narración) | — | — | fin del video |
`;
writeFileSync(path.join(RAIZ, 'docs/06-marcas-de-tiempo.md'), md);
console.log(`docs/06-marcas-de-tiempo.md · ${beats.length} beats · total ${mmss(total)}`);
