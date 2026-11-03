// Extrae los beats narrados de docs/02-guion.md y genera src/data/guion.generado.ts.
// Fuente única del texto: el guion. Ejecutar con `npm run guion` cada vez que cambie.
import {readFileSync, writeFileSync} from 'node:fs';

const md = readFileSync(new URL('../docs/02-guion.md', import.meta.url), 'utf8');
const beats = [];
const re = /^### (S(\d\d)-B\d+) · (.+)$/gm;
const heads = [...md.matchAll(re)];
heads.forEach((m, i) => {
  const start = m.index + m[0].length;
  const nextBeat = heads[i + 1]?.index ?? md.length;
  const nextScene = md.indexOf('\n## ', start);
  const end = nextScene !== -1 && nextScene < nextBeat ? nextScene : nextBeat;
  const texto = md
    .slice(start, end)
    .split('\n')
    .filter((l) => l.trim() && !l.startsWith('[') && !l.startsWith('**') && !l.startsWith('>'))
    .join(' ')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .trim();
  beats.push({id: m[1], escena: m[2], titulo: m[3].trim(), texto, palabras: texto.split(/\s+/).length});
});

const out = `// ARCHIVO GENERADO por scripts/generar-guion.mjs a partir de docs/02-guion.md. No editar a mano.
export type BeatGuion = {id: string; escena: string; titulo: string; texto: string; palabras: number};
export const BEATS_GUION: BeatGuion[] = ${JSON.stringify(beats, null, 2)};
`;
writeFileSync(new URL('../src/data/guion.generado.ts', import.meta.url), out);
console.log(`${beats.length} beats, ${beats.reduce((a, b) => a + b.palabras, 0)} palabras`);
