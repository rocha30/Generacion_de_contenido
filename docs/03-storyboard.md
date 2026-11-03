# 03. Storyboard técnico para las 9 escenas

**Versión:** v1.1 (ajustes de Persona 2 el 2026-11-02: S04-B5, S05-B5, S06-B2 y escena 07; ver cambios en `02-guion.md`). Los tiempos por beat ahora viven en `src/data/guion.ts` y se recalibran tras grabar la voz. **Referencia textual única de narración:** `02-guion.md`; cada beat `Sxx-Bn` contiene el texto **íntegro y definitivo** que se debe narrar. Este storyboard fija lo visual, los estados y la secuencia, sin duplicar la narración (DRY). **No es una implementación de Remotion.**

**Tiempo editorial (v1.1):** ≈ 18:20 de contenido + 00:25 de créditos ≈ **18:45** estimados (tiempos vigentes por beat en `06-marcas-de-tiempo.md`). Justificación: ~2,450 palabras de narración, lectura comprensible y tiempo adicional para búsquedas visuales en la demostración final. **No es audio cronometrado**: Persona 3 ajustará tiempos después de grabar. El mínimo académico es 12:00 para el video, sin rellenar; la meta interna de contenido supera ese mínimo incluso sin créditos.

## Convenciones visuales que Persona 2 debe respetar

- Composición horizontal 1920×1080, 30 fps; código en panel oscuro y fondos claros; un verde de acento (decisión del plan), colores de error reservados para errores.
- `A0` = ámbito exterior; `A1` = primer bloque; `A2` = segundo bloque anidado. El ámbito activo se destaca; los demás continúan visibles como contexto.
- Cada variable **tiene ID semántico único**: `x0` = `x` exterior; `x1` = `x` interior E1, `x2` = `x` interior E2; `y1` = `y` del bloque medio. Los IDs son **etiquetas didácticas**, no nombres escritos por JavaScript ni identidades reales de memoria.
- Tabla: `Ámbito | Nombre | ID didáctico | Valor del ejemplo`. Solo enseñar una entrada cuando el beat ya mostró la declaración ejecutada, para mantener claridad visual. Esa aparición progresiva **no** debe presentarse como el instante preciso de instanciación normativa de un binding `let`.
- Búsqueda: resaltar `ámbito activo` → comprobar si `nombre` está en su tabla → si no está, pasar al `padre`. Cuando se encuentra, señalar declaración fuente y salida de consola.
- Todo código procede de `01-investigacion.md` sección 2. Evitar capturas ajenas, logos de terceros o animaciones de un supuesto «motor de JavaScript real».
- Texto en pantalla: títulos y etiquetas cortos, por ejemplo «Ámbito activo», «Buscar `x`», «Encontrado en A1», «Distinto binding», «SyntaxError», «ReferenceError». No llenar la pantalla de párrafos.
- Texto a narrar: exactamente el de `02-guion.md` para cada beat. Un espacio visual no autoriza añadir información técnica no revisada.

## Tabla general de escenas

| Escena | Intervalo objetivo | Guion | Código | Fuentes técnicas |
|---|---|---|---|---|
| 01 Gancho | 00:00–01:15 | S01-B1, B2 | E1 | S1–S3 |
| 02 Conceptos | 01:15–03:00 | S02-B1, B2, B3 | E1, fragmentos | S1, S2, S4 |
| 03 Ámbitos | 03:00–05:00 | S03-B1, B2, B3 | E1 | S1–S3 |
| 04 Shadowing | 05:00–07:50 | S04-B1 a B5 | E1 | S1–S3 |
| 05 Tabla de símbolos | 07:50–10:55 | S05-B1 a B5 | E1 y E2 (hasta E2-5) | S1, S3, S4 |
| 06 Casos límite | 10:55–13:05 | S06-B1, B2, B3 | E3, E4 y advertencia E5 | S1, S2, S5 |
| 07 Del dibujo al código | 13:05–16:20 | S07-B1 a B4 | E6 sobre E2; E3/E4 | S1, S4, S7 |
| 08 Cierre | 16:20–17:15 | S08-B1, B2 | E1/E2 miniaturas | S1, S4 |
| 09 Créditos | 17:15–17:40 | Sin locución obligatoria | Ninguno | `04-atribuciones.md` |

---

## E1 · Código exacto visible en escenas 01–05

```javascript
let x = 10;
{
  let x = 20;
  console.log(x); // 20
}
console.log(x);   // 10
```

**Estados de tabla E1**

| Estado | Ámbito activo | Tabla A0 | Tabla A1 | Salida acumulada |
|---|---|---|---|---|
| E1-0 | A0 | vacía | no activa | vacía |
| E1-1 | A0 | `x → x0 → 10` | no activa | vacía |
| E1-2 | A1 | `x → x0 → 10` | vacía | vacía |
| E1-3 | A1 | `x → x0 → 10` | `x → x1 → 20` | vacía |
| E1-4 | A1 | igual | igual | `20` |
| E1-5 | A0 | igual | cerrada/no activa | `20` |
| E1-6 | A0 | igual | cerrada/no activa | `20`, `10` |

## E2 · Código exacto visible en escenas 05 y 07

```javascript
let x = "afuera";
{
  let y = "medio";
  {
    let x = "adentro";
    console.log(x); // adentro
    console.log(y); // medio
  }
  console.log(x);   // afuera
}
console.log(x);     // afuera
```

**Estados de tabla E2**

| Estado | Activo | A0 | A1 | A2 | Salida acumulada |
|---|---|---|---|---|---|
| E2-0 | A0 | vacía | inactivo | inactivo | vacía |
| E2-1 | A0 | `x → x0 → "afuera"` | inactivo | inactivo | vacía |
| E2-2 | A1 | igual | `y → y1 → "medio"` | inactivo | vacía |
| E2-3 | A2 | igual | igual | `x → x2 → "adentro"` | vacía |
| E2-4 | A2 | igual | igual | igual | `adentro` |
| E2-5 | A2 | igual | igual | igual | `adentro`, `medio` |
| E2-6 | A1 | igual | igual | cerrado | `adentro`, `medio` |
| E2-7 | A1 | igual | igual | cerrado | `adentro`, `medio`, `afuera` |
| E2-8 | A0 | igual | cerrado | cerrado | igual |
| E2-9 | A0 | igual | cerrado | cerrado | `adentro`, `medio`, `afuera`, `afuera` |

**Aclaración:** Los ámbitos cerrados pueden permanecer dibujados en gris; no afirmar que se «destruyó toda la memoria» por cerrar las llaves.

## Escena 01 · Gancho · 00:00–01:15

- **S01-B1.** Narración: `02-guion.md#s01-b1--la-pregunta`. Visual: mostrar dos fichas sin IDs, ambas etiquetadas `x`, valores 10 y 20; pregunta «¿Cuál se imprime?». Estado: no hay tabla todavía. Cerrar con duda visual, sin afirmar que el código es ambiguo.
- **S01-B2.** Narración: beat homónimo. Visual: aparece E1 completo, resalta primero `console.log(x)` del interior y después el exterior. Consola: `20`, luego `10`. Termina con título del video. Todavía **sin tabla**: solo código y consola (equivale a la salida de E1-6), sin detallar el procedimiento.
- **Pantalla final:** título, dos `x` distintos y salidas 20/10. **Fuentes:** S1, S2, S3.

## Escena 02 · Conceptos · 01:15–03:00

- **S02-B1.** Mostrar `let x = 10;`, remarcar `x` como «identificador» y la línea como «declaración». Ficha didáctica `x0`; no introducir ninguna variable adicional. La tabla permanece en **E1-1**.
- **S02-B2.** Resaltar el `x` de `console.log(x)` como «referencia». Pintar dos marcos `A0` y `A1` alrededor del código E1 para enseñar «ámbito». Transición de **E1-1 a E1-3**, sin mostrar salida adicional.
- **S02-B3.** Cuatro etiquetas muy grandes, una a la vez: `Nombre`, `Declaración`, `Referencia`, `Ámbito`. Etiqueta final: «¿A qué declaración apunta esta referencia?». Estado visual: E1-3.
- **Fuentes:** S1, S2, S4.

## Escena 03 · Ámbitos · 03:00–05:00

- **S03-B1.** **Reiniciar** tablas y consola (la escena 02 terminó en E1-3) y avanzar E1-0 → E1-1. Activar A0. Crear una ficha con `nombre=x`, `ID=x0`, `valor=10`; marcar declaración exterior.
- **S03-B2.** E1-2 → E1-3. Dibujar A1 anidado, sombrear fondo interior y agregar ficha `x1=20`, mientras `x0=10` continúa visible.
- **S03-B3.** E1-4 → E1-6. Resolver la referencia interna; cerrar A1 visualmente; resolver referencia exterior. **Consola final:** `20`, `10`. Pantalla: «Cerrar el ámbito ≠ sobrescribir la variable exterior».
- **Fuentes:** S1–S3.

## Escena 04 · Shadowing · 05:00–07:50

- **S04-B1.** E1-3: flecha desde `x` en línea `console.log` interior a `A1:x1=20`. Resultado `20`; no saltar a A0 después del hallazgo.
- **S04-B2.** Comparar en paralelo `A0:x0=10` y `A1:x1=20`; etiqueta «Igual nombre, distintas declaraciones». Mantener ambos valores sin animación de sustitución.
- **S04-B3.** Mostrar la hipótesis tachada «La última declaración reemplaza a todas las anteriores». Salida E1-6 `20, 10` demuestra la diferencia. No cambiar el código.
- **S04-B4.** Solo como operación conceptual, resaltar búsqueda en tabla interna y luego en padre al no encontrar otro nombre. Para un ejemplo real de búsqueda al padre se utilizará `y` en E2, escena 05. Cerrar con flecha `A1 → A0` rotulada «Si aquí no aparece, buscar afuera».
- **S04-B5 (nuevo).** Analogía «casa dentro de un edificio»: una «Ana» en la casa y otra en el edificio; el grito «¡Ana!» lo responde la de la casa; si la casa estuviera vacía, la flecha sale al pasillo. Cerrar volviendo a E1: «casa = bloque donde está escrita la referencia». Rótulo: «Alcance léxico = lo decide el texto».
- **Fuentes:** S1–S3.

## Escena 05 · Tabla de símbolos · 07:50–10:55

- **S05-B1.** Transformar las fichas E1 en dos tablas con columnas `Ámbito`, `Nombre`, `ID didáctico`, `Valor`. Estados E1-3; visualmente distinguir `x0` y `x1`.
- **S05-B2.** Placa fija de precisión «Tabla de símbolos = modelo didáctico; no implementación interna documentada del motor JS». Visual sencillo: `Código → resolvedor conceptual → vinculación`; evitar diagramas de V8 o del compilador real.
- **S05-B3.** Sustituir E1 por E2. **Estados E2-1 → E2-3**, con A0, A1 y A2 claramente anidados. Detener antes de la primera impresión.
- **S05-B4.** Para `console.log(x)`: `A2` encuentra `x2`, consola `adentro` (**E2-4**). Para `console.log(y)`: fallo en A2, hallazgo `A1:y1`, consola `medio` (**E2-5**). Dos recorridos separados, con flechas legibles.
- **S05-B5 (reto).** Cerrar A2 (**E2-6**). Los dos últimos `console.log(x)` quedan marcados con «?» y aparece el rótulo «Pausá y predecí». **No** revelar las salidas: se resuelven en S07-B2.
- **Fuentes:** S1, S3, S4.

## Escena 06 · Casos límite · 10:55–13:05

- **S06-B1.** Mostrar **E3 exacto** sin ejecutar ninguna línea. Marcar las dos declaraciones `let saldo` en el mismo bloque. Diagnóstico: `SyntaxError · declaración léxica duplicada · error temprano`. **Estado de tabla:** «N/A: el script no inicia ejecución normal»; nunca mostrar consola con salida.

```javascript
{
  let saldo = 10;
  let saldo = 20;
}
```

- **S06-B2.** Mostrar **E4 exacto**. Búsqueda desde ámbito actual hasta exterior sin `precioFinal`. Diagnóstico `ReferenceError · nombre no resuelto al evaluarse`. Consola: no hay salida producida por `console.log`.

```javascript
console.log(precioFinal);
```

- **S06-B3.** Advertencia TDZ con **E5 exacto**. Mostrar `let x` interno sombreando el exterior incluso antes de que se ejecute la línea inicializadora; rotular «lectura antes de inicialización → ReferenceError». Distinguir de E4.

```javascript
let x = 10;
{
  console.log(x);
  let x = 20;
}
```

- **Fuentes:** S1, S2, S5.

## Escena 07 · Del dibujo al código · 13:05–16:20

- **S07-B1.** Mostrar **E6** (resolvedor didáctico, `01-investigacion.md`) resaltando una función por vez: `abrirAmbito`, `cerrarAmbito`, `declarar`, `resolver`. Junto al código, una pila vertical de mapas vacía. Rótulo: «Pila de ámbitos = pila de mapas».
- **S07-B2.** Tres columnas: E2 (izquierda), pila de mapas (centro), consola (derecha). Avanzar línea por línea: cada `{` empuja un mapa, cada `let` agrega una fila, cada `}` saca un mapa. En cada `console.log`, la flecha de `resolver` recorre la pila de arriba hacia abajo. Contador **1/4 … 4/4**; salidas `adentro`, `medio`, `afuera`, `afuera` (**E2-4 → E2-9**). Al final, el rótulo «¿Acertaste?».
- **S07-B3.** (a) E3 → `declarar("saldo")` encuentra `saldo` en el mapa de arriba → rótulo rojo «ya está declarado». (b) E4 → la flecha de `resolver("precioFinal")` recorre toda la pila sin éxito → «no está declarado». (c) Comparación de dos columnas para E4: **JavaScript** «ReferenceError al ejecutar» / **TypeScript (`tsc`)** «error TS2304: Cannot find name 'precioFinal'» antes de ejecutar. Rótulo: «Mismo código, distintas reglas».
- **S07-B4.** Congelar E2 y la consola final (4 líneas). Sobreimpresión: «Un mismo nombre, distintas vinculaciones».
- **Fuentes:** S1, S4, S7.

## Escena 08 · Cierre · 16:20–17:15

- **S08-B1.** Tres ideas ilustradas por miniaturas de E1/E2: «Nombre ≠ vinculación», «Ámbito determina visibilidad», «Tabla = modelo didáctico».
- **S08-B2.** Transformación conceptual `referencia → buscar en ámbito → vinculación`; mensaje final «¿Qué declaración encuentra esta referencia?». Sin nuevos datos técnicos.
- **Fuentes:** S1, S4.

## Escena 09 · Créditos · 17:15–17:40

- **Sin texto hablado adicional requerido**. Mostrar estáticos y legibles durante 25 segundos, como mínimo:
  - Título del trabajo.
  - Diego Lopez, Luis Pedro Lira, Mario Rocha.
  - Universidad del Valle de Guatemala.
  - Construcción de Compiladores.
  - «Fuentes: ECMAScript 2026, MDN Web Docs, *Crafting Interpreters*».
  - «Material audiovisual original del equipo · Licencia prevista CC BY» (condicionado a que Persona 3 compruebe todos los recursos utilizados).
- Información de atribución detallada en `04-atribuciones.md`, destinada a descripción de YouTube. No se da por publicada ni configurada ninguna licencia todavía.

---

## Control de consistencia para Persona 2

1. Verificar que **S01 a S09** aparecen exactamente una vez y **todos los beats** del guion quedan representados.
2. E1 debe terminar con `20`, `10`. E2 con `adentro`, `medio`, `afuera`, `afuera`.
3. E3 es un `SyntaxError` previo a la ejecución; E4 y E5 son `ReferenceError` por motivos distintos.
4. `x0`, `x1`, `x2`, `y1` son IDs inventados **solo para ayudar a visualizar**; no deben aparecer dentro del código JavaScript.
5. El texto «modelo didáctico» debe estar presente cuando se presenta la tabla.
6. Si el audio final requiere cambios de minutos, conservar el orden de beats, los valores y las transiciones conceptuales. El tiempo real lo cerrará Persona 3 con la narración.
