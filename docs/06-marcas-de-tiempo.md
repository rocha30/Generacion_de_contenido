# 06. Marcas de tiempo por beat

> **Archivo generado** por `npm run marcas` (scripts/marcas.mjs). No editar a mano: el texto sale de `docs/02-guion.md` y las duraciones de `src/data/duraciones.ts`.

**Estado:** 27 de 27 beats con duración medida; el resto son **estimados** (≈138 palabras/min + 3 s de respiro). **Duración total actual:** 18:49.6 (contenido 18:24.6 + 25 s de créditos).

## Cómo usar esta tabla (Persona 3)

Guía paso a paso: `GUIA-PERSONA-3.md` (raíz del repositorio). En resumen:

1. Grabar la narración (con la composición `Teleprompter` o leyendo `docs/02-guion.md`) y exportar **un WAV por beat** a `public/narracion/` con el nombre exacto del beat (`S01-B1.wav`, …). Las columnas «Empieza con» / «Termina con» indican dónde cortar.
2. `npm run medir`: mide cada WAV, ajusta la duración de cada beat (audio + 1 s) y el video entero se reajusta solo.
3. `npm run marcas`: actualiza esta tabla con los tiempos reales.

## Tabla

| Beat | Escena | Inicio | Fin | Duración | Origen | Título | Empieza con | Termina con | Transición |
|---|---|---|---|---|---|---|---|---|---|
| S01-B1 | 01 | 00:00.0 | 00:40.9 | 40.9 s | medido | La pregunta | «Imaginá que estás leyendo un programa y…» | «…diez, veinte, o el programa falla?» | continúa en la escena |
| S01-B2 | 01 | 00:40.9 | 01:16.1 | 35.2 s | medido | La revelación | «Dentro de las llaves, el programa imprime…» | «…queremos explicar la resolución de nombres.» | → Escena 02 (cambio de escena) |
| S02-B1 | 02 | 01:16.1 | 02:00.0 | 43.9 s | medido | Identificador y declaración | «Antes de resolver el misterio, necesitamos distinguir…» | «…equis son automáticamente la misma variable.» | continúa en la escena |
| S02-B2 | 02 | 02:00.0 | 02:41.7 | 41.7 s | medido | Referencia y ámbito | «La tercera idea es la referencia. Cuando…» | «…a un ámbito diferente del exterior.» | continúa en la escena |
| S02-B3 | 02 | 02:41.7 | 03:07.7 | 26 s | medido | Qué estudiaremos realmente | «No vamos a estudiar todas las reglas…» | «…podemos seguir el recorrido del código.» | → Escena 03 (cambio de escena) |
| S03-B1 | 03 | 03:07.7 | 03:43.7 | 36 s | medido | El exterior | «Empecemos con el ejemplo más sencillo. Antes…» | «…a la declaración de A cero.» | continúa en la escena |
| S03-B2 | 03 | 03:43.7 | 04:28.0 | 44.3 s | medido | Entrar a un bloque | «Ahora llegamos a la llave de apertura.…» | «…ficha que estaba en A cero.» | continúa en la escena |
| S03-B3 | 03 | 04:28.0 | 05:14.7 | 46.7 s | medido | Salir del bloque | «Cuando ejecutamos el console.log interior, seguimos dentro…» | «…de todos los motores de JavaScript.» | → Escena 04 (cambio de escena) |
| S04-B1 | 04 | 05:14.7 | 05:46.9 | 32.2 s | medido | Una búsqueda en el ámbito actual | «Volvamos a mirar el primer console.log. Estamos…» | «…Por eso la salida es veinte.» | continúa en la escena |
| S04-B2 | 04 | 05:46.9 | 06:26.2 | 39.3 s | medido | El sombreado no modifica el exterior | «A este comportamiento se le llama sombreado…» | «…distintas que comparten el mismo identificador.» | continúa en la escena |
| S04-B3 | 04 | 06:26.2 | 07:02.0 | 35.8 s | medido | Un contraejemplo mental | «Probemos una idea incorrecta: «si declaro dos…» | «…la estructura de ámbitos del programa.» | continúa en la escena |
| S04-B4 | 04 | 07:02.0 | 07:40.3 | 38.3 s | medido | Lo que pasa si no encontramos el nombre | «Ahora hagamos una pregunta distinta. ¿Y si…» | «…de nuestra demostración con bloques anidados.» | continúa en la escena |
| S04-B5 | 04 | 07:40.3 | 08:21.2 | 40.9 s | medido | Una comparación cotidiana | «Pensalo así. Si en tu casa alguien…» | «…lo decide la estructura del texto.» | → Escena 05 (cambio de escena) |
| S05-B1 | 05 | 08:21.2 | 09:05.4 | 44.2 s | medido | Una estructura para organizar declaraciones | «Hasta ahora usamos fichas y carpetas. Podemos…» | «…señalar exactamente cuál se está utilizando.» | continúa en la escena |
| S05-B2 | 05 | 09:05.4 | 09:46.0 | 40.6 s | medido | Aclaración técnica esencial | «Esta tabla es útil para explicar una…» | «…de V8 o de un navegador.» | continúa en la escena |
| S05-B3 | 05 | 09:46.0 | 10:30.9 | 44.9 s | medido | Tres ámbitos | «Ahora usamos el segundo ejemplo. Primero declaramos…» | «…vez está dentro de A cero.» | continúa en la escena |
| S05-B4 | 05 | 10:30.9 | 11:06.9 | 36 s | medido | Resolver x y resolver y | «Supongamos que la ejecución está en A…» | «…más cercana según los ámbitos léxicos.» | continúa en la escena |
| S05-B5 | 05 | 11:06.9 | 11:42.7 | 35.8 s | medido | Tu turno | «Ya resolvimos las dos primeras impresiones. Quedan…» | «…que hace la búsqueda por nosotros.» | → Escena 06 (cambio de escena) |
| S06-B1 | 06 | 11:42.7 | 12:29.5 | 46.8 s | medido | Declaración duplicada | «Hasta aquí, tener dos variables llamadas igual…» | «…código antes de su ejecución normal.» | continúa en la escena |
| S06-B2 | 06 | 12:29.5 | 13:23.6 | 54.1 s | medido | Nombre sin declaración | «El segundo caso es distinto. Supongamos que…» | «…quedaremos con el tipo de error.» | continúa en la escena |
| S06-B3 | 06 | 13:23.6 | 13:59.3 | 35.7 s | medido | Precisión sobre `let` | «Hay un detalle adicional que evita una…» | «…para no enseñar una regla falsa.» | → Escena 07 (cambio de escena) |
| S07-B1 | 07 | 13:59.3 | 14:58.9 | 59.6 s | medido | Un resolvedor en quince líneas | «Hasta ahora hicimos la búsqueda con flechas.…» | «…versión mínima escrita para este video.» | continúa en la escena |
| S07-B2 | 07 | 14:58.9 | 15:52.9 | 54 s | medido | El resolvedor recorre el segundo ejemplo | «Le damos el segundo ejemplo. Primera declaración:…» | «…otra vez «afuera». ¿Acertaste tu predicción?» | continúa en la escena |
| S07-B3 | 07 | 15:52.9 | 16:49.9 | 57 s | medido | El mismo código detecta los dos errores | «Lo interesante es que estas mismas quince…» | «…distintas reglas, distinto momento del error.» | continúa en la escena |
| S07-B4 | 07 | 16:49.9 | 17:24.3 | 34.4 s | medido | Verificar y comprender | «La consola muestra exactamente cuatro líneas, en…» | «…punto donde está escrita cada referencia.» | → Escena 08 (cambio de escena) |
| S08-B1 | 08 | 17:24.3 | 17:59.9 | 35.6 s | medido | Tres ideas para recordar | «Quedémonos con tres conclusiones. Primera: un identificador…» | «…motores reales puedan utilizar estructuras distintas.» | continúa en la escena |
| S08-B2 | 08 | 17:59.9 | 18:24.6 | 24.7 s | medido | Conexión con compiladores | «Por eso este tema pertenece a la…» | «…referencia y qué declaración encuentra primero?» | → Escena 09 (créditos) |
| Créditos | 09 | 18:24.6 | 18:49.6 | 25 s | fijo | Créditos (sin narración) | — | — | fin del video |
