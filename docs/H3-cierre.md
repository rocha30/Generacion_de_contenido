# H3. Cierre de Persona 3

## Aceptación de H2

| Campo | Valor |
|---|---|
| Estado | **Aceptado** por Luis Pedro Lira (Persona 3), 2026-11-14 |
| Comprobado | `npm install`, Remotion Studio, `npm run typecheck` sin errores, escenas 01–09 presentes |
| Incidencia encontrada | `scripts/beats.mjs` fallaba en Windows (ruta `C:\C:\…` al usar `URL.pathname`). Corregido con `fileURLToPath`; no cambia escenas ni contenido. |

## Entrega en Canvas

| Campo | Valor |
|---|---|
| Fecha y hora de cierre en Canvas | _PENDIENTE de confirmar_ |
| Enlace enviado | _PENDIENTE_ |
| Fecha y hora efectiva del envío | _PENDIENTE_ |
| Comprobante | _PENDIENTE_ (`docs/evidencias/canvas.png`) |

## Manifiesto H3

| Archivo | Contenido |
|---|---|
| `public/narracion/S01-B1.wav` … `S08-B2.wav` | 27 beats de narración, WAV 48 kHz 16 bits |
| `audio/narracion-final.wav` | Narración completa unida en orden (17:57) |
| `src/data/duraciones.ts` | Duraciones medidas desde el audio real (27/27) |
| `docs/06-marcas-de-tiempo.md` | Tabla regenerada con tiempos reales |
| `renders/video-final.mp4` | Video final narrado |
| `docs/07-checklist-final.md` | Controles finales |
| `docs/08-publicacion.md` | Datos de publicación en YouTube |
