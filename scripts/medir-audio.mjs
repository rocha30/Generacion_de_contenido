// Lee public/narracion/<BEAT>.wav (p. ej. S01-B1.wav), mide cada archivo y escribe src/data/duraciones.ts.
// Uso: npm run medir
import {existsSync, readFileSync, readdirSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {RAIZ, leerBeats} from './beats.mjs';

/** Pausa que se agrega después de cada beat para que la imagen respire. */
const RESPIRO_S = 1.0;
const carpeta = path.join(RAIZ, 'public/narracion');

const duracionWav = (archivo) => {
  const b = readFileSync(archivo);
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WAVE') throw new Error('no es un WAV válido');
  let byteRate = 0;
  for (let p = 12; p + 8 <= b.length; ) {
    const id = b.toString('ascii', p, p + 4);
    const size = b.readUInt32LE(p + 4);
    if (id === 'fmt ') byteRate = b.readUInt32LE(p + 16);
    if (id === 'data') {
      if (!byteRate) throw new Error('falta el bloque fmt');
      return Math.min(size, b.length - p - 8) / byteRate;
    }
    p += 8 + size + (size % 2);
  }
  throw new Error('falta el bloque data');
};

const beats = leerBeats();
const ids = new Set(beats.map((b) => b.id));
const archivos = existsSync(carpeta) ? readdirSync(carpeta).filter((f) => f.toLowerCase().endsWith('.wav')) : [];
const medidas = {};
const conAudio = [];
const problemas = [];
for (const f of archivos) {
  const id = path.basename(f, path.extname(f)).toUpperCase();
  if (!ids.has(id)) {
    problemas.push(`  ? ${f}: el nombre no corresponde a ningún beat (debe ser como S01-B1.wav)`);
    continue;
  }
  try {
    medidas[id] = Math.round((duracionWav(path.join(carpeta, f)) + RESPIRO_S) * 10) / 10;
    if (f === `${id}.wav`) conAudio.push(id);
    else problemas.push(`  ! ${f}: renombrar exactamente a ${id}.wav (si no, se mide pero NO suena en el video)`);
  } catch (e) {
    problemas.push(`  ✗ ${f}: ${e.message}`);
  }
}
const faltan = beats.filter((b) => !(b.id in medidas)).map((b) => b.id);

const lineas = beats.filter((b) => b.id in medidas).map((b) => `  '${b.id}': ${medidas[b.id]},`);
writeFileSync(
  path.join(RAIZ, 'src/data/duraciones.ts'),
  `/**
 * GENERADO por \`npm run medir\` a partir de public/narracion/*.wav (duración del audio + ${RESPIRO_S} s de respiro).
 * Los beats que no aparecen aquí usan la duración estimada por cantidad de palabras.
 */
export const DURACION_MEDIDA: Record<string, number> = {
${lineas.join('\n')}
};

/** Beats con archivo de narración en public/narracion/<beat>.wav. */
export const CON_AUDIO: string[] = ${JSON.stringify(conAudio)};
`,
);

console.log(`Medidos ${Object.keys(medidas).length} de ${beats.length} beats.`);
if (faltan.length) console.log(`Sin audio todavía (se usa la duración estimada): ${faltan.join(', ')}`);
if (problemas.length) console.log('Revisar:\n' + problemas.join('\n'));
