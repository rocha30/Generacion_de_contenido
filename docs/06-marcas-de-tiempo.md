# 06. Marcas de tiempo por beat

> **Archivo generado** por `npm run marcas` (scripts/marcas.mjs). No editar a mano: el texto sale de `docs/02-guion.md` y las duraciones de `src/data/duraciones.ts`.

**Estado:** 0 de 27 beats con duración medida; el resto son **estimados** (≈138 palabras/min + 3 s de respiro). **Duración total actual:** 18:46.0 (contenido 18:21.0 + 25 s de créditos).

## Cómo usar esta tabla (Persona 3)

Guía paso a paso: `GUIA-PERSONA-3.md` (raíz del repositorio). En resumen:

1. Grabar la narración (con la composición `Teleprompter` o leyendo `docs/02-guion.md`) y exportar **un WAV por beat** a `public/narracion/` con el nombre exacto del beat (`S01-B1.wav`, …). Las columnas «Empieza con» / «Termina con» indican dónde cortar.
2. `npm run medir`: mide cada WAV, ajusta la duración de cada beat (audio + 1 s) y el video entero se reajusta solo.
3. `npm run marcas`: actualiza esta tabla con los tiempos reales.

## Tabla

| Beat | Escena | Inicio | Fin | Duración | Origen | Título | Empieza con | Termina con | Transición |
|---|---|---|---|---|---|---|---|---|---|
| S01-B1 | 01 | 00:00.0 | 00:41.0 | 41 s | estimado | La pregunta | «Imaginá que estás leyendo un programa y…» | «…diez, veinte, o el programa falla?» | continúa en la escena |
| S01-B2 | 01 | 00:41.0 | 01:18.0 | 37 s | estimado | La revelación | «Dentro de las llaves, el programa imprime…» | «…queremos explicar la resolución de nombres.» | → Escena 02 (cambio de escena) |
| S02-B1 | 02 | 01:18.0 | 02:02.0 | 44 s | estimado | Identificador y declaración | «Antes de resolver el misterio, necesitamos distinguir…» | «…equis son automáticamente la misma variable.» | continúa en la escena |
| S02-B2 | 02 | 02:02.0 | 02:43.0 | 41 s | estimado | Referencia y ámbito | «La tercera idea es la referencia. Cuando…» | «…a un ámbito diferente del exterior.» | continúa en la escena |
| S02-B3 | 02 | 02:43.0 | 03:11.0 | 28 s | estimado | Qué estudiaremos realmente | «No vamos a estudiar todas las reglas…» | «…podemos seguir el recorrido del código.» | → Escena 03 (cambio de escena) |
| S03-B1 | 03 | 03:11.0 | 03:48.0 | 37 s | estimado | El exterior | «Empecemos con el ejemplo más sencillo. Antes…» | «…a la declaración de A cero.» | continúa en la escena |
| S03-B2 | 03 | 03:48.0 | 04:30.0 | 42 s | estimado | Entrar a un bloque | «Ahora llegamos a la llave de apertura.…» | «…ficha que estaba en A cero.» | continúa en la escena |
| S03-B3 | 03 | 04:30.0 | 05:17.0 | 47 s | estimado | Salir del bloque | «Cuando ejecutamos el console.log interior, seguimos dentro…» | «…de todos los motores de JavaScript.» | → Escena 04 (cambio de escena) |
| S04-B1 | 04 | 05:17.0 | 05:48.0 | 31 s | estimado | Una búsqueda en el ámbito actual | «Volvamos a mirar el primer console.log. Estamos…» | «…Por eso la salida es veinte.» | continúa en la escena |
| S04-B2 | 04 | 05:48.0 | 06:27.0 | 39 s | estimado | El sombreado no modifica el exterior | «A este comportamiento se le llama sombreado…» | «…distintas que comparten el mismo identificador.» | continúa en la escena |
| S04-B3 | 04 | 06:27.0 | 07:00.0 | 33 s | estimado | Un contraejemplo mental | «Probemos una idea incorrecta: «si declaro dos…» | «…la estructura de ámbitos del programa.» | continúa en la escena |
| S04-B4 | 04 | 07:00.0 | 07:38.0 | 38 s | estimado | Lo que pasa si no encontramos el nombre | «Ahora hagamos una pregunta distinta. ¿Y si…» | «…de nuestra demostración con bloques anidados.» | continúa en la escena |
| S04-B5 | 04 | 07:38.0 | 08:20.0 | 42 s | estimado | Una comparación cotidiana | «Pensalo así. Si en tu casa alguien…» | «…lo decide la estructura del texto.» | → Escena 05 (cambio de escena) |
| S05-B1 | 05 | 08:20.0 | 09:03.0 | 43 s | estimado | Una estructura para organizar declaraciones | «Hasta ahora usamos fichas y carpetas. Podemos…» | «…señalar exactamente cuál se está utilizando.» | continúa en la escena |
| S05-B2 | 05 | 09:03.0 | 09:43.0 | 40 s | estimado | Aclaración técnica esencial | «Esta tabla es útil para explicar una…» | «…de V8 o de un navegador.» | continúa en la escena |
| S05-B3 | 05 | 09:43.0 | 10:26.0 | 43 s | estimado | Tres ámbitos | «Ahora usamos el segundo ejemplo. Primero declaramos…» | «…vez está dentro de A cero.» | continúa en la escena |
| S05-B4 | 05 | 10:26.0 | 11:02.0 | 36 s | estimado | Resolver x y resolver y | «Supongamos que la ejecución está en A…» | «…más cercana según los ámbitos léxicos.» | continúa en la escena |
| S05-B5 | 05 | 11:02.0 | 11:38.0 | 36 s | estimado | Tu turno | «Ya resolvimos las dos primeras impresiones. Quedan…» | «…que hace la búsqueda por nosotros.» | → Escena 06 (cambio de escena) |
| S06-B1 | 06 | 11:38.0 | 12:25.0 | 47 s | estimado | Declaración duplicada | «Hasta aquí, tener dos variables llamadas igual…» | «…código antes de su ejecución normal.» | continúa en la escena |
| S06-B2 | 06 | 12:25.0 | 13:19.0 | 54 s | estimado | Nombre sin declaración | «El segundo caso es distinto. Supongamos que…» | «…quedaremos con el tipo de error.» | continúa en la escena |
| S06-B3 | 06 | 13:19.0 | 13:54.0 | 35 s | estimado | Precisión sobre `let` | «Hay un detalle adicional que evita una…» | «…para no enseñar una regla falsa.» | → Escena 07 (cambio de escena) |
| S07-B1 | 07 | 13:54.0 | 14:53.0 | 59 s | estimado | Un resolvedor en quince líneas | «Hasta ahora hicimos la búsqueda con flechas.…» | «…versión mínima escrita para este video.» | continúa en la escena |
| S07-B2 | 07 | 14:53.0 | 15:49.0 | 56 s | estimado | El resolvedor recorre el segundo ejemplo | «Le damos el segundo ejemplo. Primera declaración:…» | «…otra vez «afuera». ¿Acertaste tu predicción?» | continúa en la escena |
| S07-B3 | 07 | 15:49.0 | 16:47.0 | 58 s | estimado | El mismo código detecta los dos errores | «Lo interesante es que estas mismas quince…» | «…distintas reglas, distinto momento del error.» | continúa en la escena |
| S07-B4 | 07 | 16:47.0 | 17:20.0 | 33 s | estimado | Verificar y comprender | «La consola muestra exactamente cuatro líneas, en…» | «…punto donde está escrita cada referencia.» | → Escena 08 (cambio de escena) |
| S08-B1 | 08 | 17:20.0 | 17:54.0 | 34 s | estimado | Tres ideas para recordar | «Quedémonos con tres conclusiones. Primera: un identificador…» | «…motores reales puedan utilizar estructuras distintas.» | continúa en la escena |
| S08-B2 | 08 | 17:54.0 | 18:21.0 | 27 s | estimado | Conexión con compiladores | «Por eso este tema pertenece a la…» | «…referencia y qué declaración encuentra primero?» | → Escena 09 (créditos) |
| Créditos | 09 | 18:21.0 | 18:46.0 | 25 s | fijo | Créditos (sin narración) | — | — | fin del video |
