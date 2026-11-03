# 05. Producción (Persona 2): proyecto Remotion

## Requisitos e instalación

- Node.js ≥ 20 (probado con v23.10.0) y npm. Remotion trae su propio FFmpeg; no hace falta instalarlo.
- Tipografías Inter y JetBrains Mono (SIL Open Font License) se descargan de Google Fonts al previsualizar o renderizar: requiere internet.

```bash
npm install
npm run dev          # abre Remotion Studio en el navegador
```

## Composiciones

| ID | Para qué |
|---|---|
| `Video` | Video completo, escenas 01–09 |
| `Teleprompter` | Mismo video con el texto del beat, barra de progreso y segundos restantes abajo: **para grabar la narración mirando la animación** |
| `Escenas/Escena01` … `Escena09` | Cada escena por separado, para revisar rápido |

## Flujo de trabajo acordado (animar → grabar → ajustar)

1. **Guion → datos.** El texto narrado vive solo en `docs/02-guion.md`. Si cambia, ejecutar `npm run guion` (regenera `src/data/guion.generado.ts`).
2. **Tiempos estimados.** Cada beat dura `palabras / 138 × 60 + 3` segundos (`src/lib/tiempo.ts`). Las animaciones de cada escena están definidas como fracciones del beat (`en: 0.4` = al 40 %), así que se reescalan solas.
3. **Grabar.** Reproducir `Teleprompter` en Studio y leer el texto que aparece abajo. Exportar **un WAV por beat** (48 kHz) a `public/narracion/S01-B1.wav`, `S01-B2.wav`, …
4. **Ajustar.** `npm run medir` lee esos WAV, escribe `src/data/duraciones.ts` (audio + 1 s de respiro) y cada WAV suena al inicio de su beat. Se ajusta el video entero sin tocar componentes.
5. **Render final.** `npm run render:final` → `renders/video-final.mp4`. Paso a paso completo en `GUIA-PERSONA-3.md`.

## Comandos

```bash
npm run typecheck     # TypeScript sin errores
npm run medir         # mide public/narracion/*.wav y ajusta los tiempos
npm run marcas        # regenera docs/06-marcas-de-tiempo.md con las duraciones vigentes
npm run stills        # un fotograma por beat en renders/stills/ (revisión rápida)
npm run stills -- S07 0.5   # solo beats S07, al 50 % del beat
npm run render        # corte visual sin voz → renders/corte-visual.mp4 (1920×1080, 30 fps, H.264)
npm run render:final  # video con narración → renders/video-final.mp4
```

## Estructura

```text
src/
  data/        guion.generado.ts (auto), duraciones.ts, ejemplos.ts (E1–E6 exactos), estados.ts (E1-0…E2-9)
  lib/         tiempo.ts (beats → frames, useClaves), anim.ts
  components/  CodePanel, ScopeStack, SymbolTable, Consola, Etiqueta, SceneTitle, Escena, VistaEjemplo, Diagramas
  scenes/      E01Gancho … E09Creditos
scripts/       generar-guion.mjs, medir-audio.mjs, marcas.mjs, stills.mjs, beats.mjs
public/narracion/   WAV por beat (los pone Persona 3)
```

## Pendientes antes del render final

- Confirmar **nombres completos** (con tildes) en `src/scenes/E09Creditos.tsx`.
- Revisar en Studio el ritmo de cada escena con la voz real.
- Duración estimada actual: ver `docs/06-marcas-de-tiempo.md` (≈ 18:46 antes de grabar; se recalcula con `npm run marcas`).
