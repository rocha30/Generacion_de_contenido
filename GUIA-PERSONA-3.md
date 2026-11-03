# Guía para Persona 3: de la narración al video publicado

Todo lo que hay que hacer, en orden, con los comandos listos para copiar. Los comandos funcionan igual en macOS, Linux y Windows (PowerShell o CMD). Siempre se ejecutan **desde la carpeta del proyecto** (donde está `package.json`).

> Tiempo aproximado: instalar 5 min · grabar 40–60 min · ajustar 15 min · render 7–40 min (según la computadora) · publicar 15 min.
> **Entrega: miércoles 4 de noviembre de 2026.** No dejar el render para la última hora.

---

## 0. Requisitos (una sola vez)

1. **Node.js 20 o superior**: https://nodejs.org (versión LTS). Comprobar:

   ```bash
   node --version
   ```

   Debe mostrar `v20…` o mayor.
2. **Audacity** para grabar: https://www.audacityteam.org
3. **Internet** al previsualizar y renderizar (las tipografías se descargan de Google Fonts).

## 1. Instalar el proyecto

```bash
cd ruta/a/Generacion_de_contenido
npm install
```

## 2. Ver el video

```bash
npm run dev
```

Se abre Remotion Studio en el navegador (normalmente http://localhost:3000). En la lista de la izquierda:

| Composición | Para qué |
|---|---|
| `Video` | El video completo |
| `Teleprompter` | El mismo video con el texto a leer abajo y los segundos que quedan: **usar esta para grabar** |
| `Escenas → Escena01…09` | Cada escena por separado |

Espacio = reproducir/pausar. Para cerrar Studio: `Ctrl + C` en la terminal.

> El ritmo de la animación se ve lento: es a propósito. Las duraciones son una estimación pausada y **se ajustan solas** cuando agregues la narración (paso 4).

## 3. Grabar la narración

Texto completo: `docs/02-guion.md`. Se lee **solo el texto normal**: no se leen los códigos `S01-B1`, ni lo que está entre corchetes `[…]`, ni las líneas de «Fuentes». El mismo texto aparece en la composición `Teleprompter`.

**Regla clave: un archivo WAV por beat**, guardado en `public/narracion/` con el nombre **exacto** del beat:

```text
S01-B1  S01-B2
S02-B1  S02-B2  S02-B3
S03-B1  S03-B2  S03-B3
S04-B1  S04-B2  S04-B3  S04-B4  S04-B5
S05-B1  S05-B2  S05-B3  S05-B4  S05-B5
S06-B1  S06-B2  S06-B3
S07-B1  S07-B2  S07-B3  S07-B4
S08-B1  S08-B2
```

(27 archivos: `public/narracion/S01-B1.wav`, `public/narracion/S01-B2.wav`, … La escena 09, los créditos, no lleva voz.)

`docs/06-marcas-de-tiempo.md` indica con qué palabras empieza y termina cada beat.

### Forma rápida en Audacity: grabar todo seguido y exportar por etiquetas

1. Grabar en un lugar silencioso, con el micrófono a distancia constante. Si te equivocás, hacé una pausa y repetí la frase; después se corta el error.
2. Limpiar: borrar los errores y los silencios largos. **No** agregar música.
3. Marcar cada beat: seleccionar el fragmento del beat y presionar **`Ctrl + B`** (en Mac, **`Cmd + B`**), que agrega una etiqueta en la selección. Escribir el nombre del beat, por ejemplo `S01-B1`. Repetir con los 27.
4. Exportar todos los beats de una vez. El menú depende de la versión de Audacity:
   - **Audacity 3.4 o más nuevo:** *Archivo → Exportar audio…* → **Múltiples archivos** → dividir según **Etiquetas** → nombrar usando el **nombre de la etiqueta**.
   - **Versiones anteriores:** *Archivo → Exportar → Exportar múltiple…* → dividir según **Etiquetas** → nombrar usando la **etiqueta**.
   - En los dos casos: formato **WAV**, **48000 Hz**, 16 bits, y como carpeta de destino `public/narracion` de este proyecto.
5. Guardar también el proyecto de Audacity (`.aup3`) por si hay que corregir algo.

> Alternativa: grabar cada beat por separado y guardarlo directamente como `S01-B1.wav`, etc.

## 4. Ajustar el video a la voz

```bash
npm run medir
```

Este comando mide cada WAV y ajusta cada beat a la duración del audio más 1 segundo de respiro. Muestra algo así:

```text
Medidos 27 de 27 beats.
```

Si avisa algo, se corrige y se vuelve a correr `npm run medir`:

| Mensaje | Qué hacer |
|---|---|
| `Sin audio todavía: S03-B2, …` | Falta ese WAV, o tiene otro nombre |
| `? archivo.wav: el nombre no corresponde a ningún beat` | Renombrarlo como el beat que corresponde, por ejemplo `S03-B2.wav` |
| `! s01-b1.wav: renombrar exactamente a S01-B1.wav` | Mayúsculas y minúsculas importan: `S01-B1.wav` |

Después, actualizar la tabla de tiempos y revisar:

```bash
npm run marcas
npm run dev
```

En Studio, mirar `Video` completo con audífonos y comprobar que cada animación acompaña lo que se dice. Si reemplazás un WAV, volvé a correr `npm run medir`; Studio se actualiza solo.

## 5. Créditos con nombres completos

Abrir `src/scenes/E09Creditos.tsx` y corregir esta línea con los **nombres completos** (con tildes y segundo apellido si corresponde):

```ts
export const INTEGRANTES = ['Diego Lopez', 'Luis Pedro Lira', 'Mario Rocha'];
```

Usar los mismos nombres en la descripción de YouTube (`docs/04-atribuciones.md`, sección 5). Para ver solo los créditos: composición `Escena09` en Studio.

## 6. Render final

```bash
npm run typecheck
npm run render:final
```

El resultado queda en `renders/video-final.mp4` (1920×1080, 30 fps, H.264 + AAC). El corte sin voz tardó 6,5 minutos en una Mac con Apple Silicon; en otras computadoras puede tardar hasta 30–40 minutos. No cerrar la terminal mientras corre.

Comprobar la duración, que debe ser **mayor a 720 segundos (12 min)**:

```bash
npx remotion ffprobe -v error -show_entries format=duration -of default=nw=1 renders/video-final.mp4
```

Ver el MP4 completo una vez antes de subirlo: que tenga audio en todo el video, sin cortes ni pantallas negras, y con los créditos legibles.

## 7. Publicar y entregar

1. **YouTube Studio → Crear → Subir video** → `renders/video-final.mp4`.
2. **Título:** ¿Qué pasa cuando dos variables tienen el mismo nombre? Ámbitos, sombreado de variables y tablas de símbolos en compiladores
3. **Descripción:** copiar la de `docs/04-atribuciones.md` §5, con los nombres completos y agregando la referencia de TypeScript.
4. **Licencia** (en «Mostrar más»): **Creative Commons - Atribución**.
5. **Visibilidad:** la que decida el grupo (pública u oculta). Tiene que verse la fecha de publicación.
6. Abrir el enlace en una ventana privada, sin la sesión iniciada, para comprobar que se puede ver.
7. **Canvas:** pegar el enlace antes de la hora de cierre y guardar una captura del envío.

## Problemas frecuentes

| Problema | Solución |
|---|---|
| `npm` o `node` no se reconoce | Instalar Node.js (paso 0) y abrir una terminal nueva |
| El puerto 3000 está ocupado | Studio ofrece otro puerto automáticamente; usar el que muestra la terminal |
| Las letras salen con otra tipografía o el render falla al cargar fuentes | Revisar la conexión a internet y repetir |
| Un beat suena cortado o la animación termina antes | Revisar que el WAV esté completo y volver a correr `npm run medir` |
| Hay que cambiar una palabra del guion | Editar `docs/02-guion.md` y correr `npm run guion`. Solo cambia el texto del Teleprompter, no la animación |

## Referencias rápidas

- Guion: `docs/02-guion.md` · Storyboard: `docs/03-storyboard.md` · Tiempos por beat: `docs/06-marcas-de-tiempo.md`
- Detalles técnicos del proyecto: `docs/05-produccion.md` · Qué entregó Persona 2: `docs/H2-entrega.md`
