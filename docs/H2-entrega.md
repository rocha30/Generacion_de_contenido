# H2. Entrega de Persona 2 → Persona 3

## Qué recibe Persona 3

| Archivo | Contenido |
|---|---|
| `src/**`, `package*.json`, `remotion.config.ts`, `tsconfig.json`, `scripts/**` | Proyecto Remotion completo: escenas 01–09 animadas |
| `renders/corte-visual.mp4` | Corte visual completo sin voz, 1920×1080, 30 fps, H.264, con tiempos **estimados** |
| `docs/05-produccion.md` | Instalación, comandos, estructura y cómo agregar el audio |
| `docs/06-marcas-de-tiempo.md` | Inicio/fin de cada beat, primeras y últimas palabras (para cortar audio) y transiciones |
| `docs/01`–`04` (v1.1) | Guion y storyboard con los cambios de Persona 2 (apuesta inicial, analogía, reto, escena 07 con resolvedor y TypeScript) |

## Verificado por Persona 2 (2026-11-02)

- `npm install` desde cero y `npm run typecheck` sin errores.
- Los fragmentos de código en pantalla (E1–E6) son idénticos a los de `docs/01-investigacion.md` (comparación automática).
- E1–E5 reproducidos con Node.js; E6 (resolvedor) devuelve `x2, y1, x0, x0` sobre E2 y detecta E3/E4; `tsc` 5.8.3 da `TS2304` con E4.
- Un fotograma por beat revisado visualmente (27 beats): sin cortes de texto ni ligaduras tipográficas en el código.
- Render del corte visual completo: `renders/corte-visual.mp4`, 18:46 (1126 s), 1920×1080, 30 fps, H.264, 15 MB; tardó 6,5 min.
- Audio por beat probado: un WAV de prueba en `public/narracion/S01-B1.wav` suena al inicio de su beat en el MP4 (AAC) y `npm run medir` ajusta la duración.

## Pasos para Persona 3

1. `npm install` y `npm run dev` → ver la composición `Video` (y `Teleprompter`).
2. Seguir **`GUIA-PERSONA-3.md`**: grabar un WAV por beat en `public/narracion/`, `npm run medir`, revisar en Studio y `npm run render:final`. El ritmo actual de la animación es una estimación pausada: **se ajusta solo** con el audio real.
3. Antes de publicar: **nombres completos** en `src/scenes/E09Creditos.tsx` y en la descripción (`04-atribuciones.md` §5), licencia CC BY en YouTube, duración ≥ 12:00.

## Conocido / no resuelto

- La composición `Teleprompter` tapa la parte inferior del video: es solo para grabar, no para renderizar.
- Las tipografías se descargan de Google Fonts al renderizar: se necesita internet.
- No hay commits todavía: el grupo decide cuándo commitear.
