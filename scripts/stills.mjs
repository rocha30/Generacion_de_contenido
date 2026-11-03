// Revisión rápida: renderiza un fotograma por beat (por defecto al 92 % del beat) en renders/stills/.
// Uso: npm run stills            → todos los beats
//      npm run stills -- S04 0.5 → solo beats que empiezan con "S04", al 50 %
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import {mkdirSync} from 'node:fs';
import {RAIZ, leerBeats} from './beats.mjs';
import path from 'node:path';

const [filtro = '', fraccion = '0.92'] = process.argv.slice(2);
const raiz = RAIZ;
const beats = leerBeats();

const serveUrl = await bundle({entryPoint: path.join(raiz, 'src/index.ts')});
const out = path.join(raiz, 'renders/stills');
mkdirSync(out, {recursive: true});
for (const b of beats) {
  if (b.id.startsWith(filtro)) {
    const frame = b.inicioFrame + Math.floor(b.frames * Number(fraccion));
    const composition = await selectComposition({serveUrl, id: 'Video', inputProps: {teleprompter: false}});
    await renderStill({composition, serveUrl, frame, output: path.join(out, `${b.id}.png`), inputProps: {teleprompter: false}});
    console.log(`${b.id} → frame ${frame}`);
  }
}
