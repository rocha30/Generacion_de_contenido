# 01. Investigación y validación técnica

**Tema autorizado (según confirmación del grupo):** ¿Qué pasa cuando dos variables tienen el mismo nombre? Ámbitos, sombreado de variables y tablas de símbolos en compiladores.

**Integrantes informados por el grupo:** Diego Lopez, Luis Pedro Lira y Mario Rocha.

**Alcance del video:** resolución de nombres por alcance léxico en bloques, con ejemplos originales de JavaScript que usan `let`. La tabla de símbolos animada es una **abstracción didáctica de un analizador/resolvedor**, no una descripción exacta de los datos internos de V8, Node.js o un navegador. No se enseñarán `var`, closures, hoisting complejo, módulos ni el diseño completo de un compilador.

## 1. Conceptos y afirmaciones comprobadas

| ID | Concepto / afirmación | Definición exacta que puede utilizarse en el video | Respaldo |
|---|---|---|---|
| F01 | Identificador | Nombre utilizado en una declaración o referencia, por ejemplo `x` o `saldo`. | [S1], [S2] |
| F02 | Declaración | `let x = 10` introduce una vinculación (*binding*) llamada `x` en su ámbito; el valor inicial es `10` una vez evaluada la declaración. | [S1], [S2] |
| F03 | Referencia | Una aparición de `x` dentro de `console.log(x)` solicita resolver a qué vinculación corresponde ese identificador. | [S1], [S4] |
| F04 | Ámbito léxico por bloque | `let` tiene alcance dentro del bloque que lo contiene (o de su entorno exterior si no está en un bloque). Llaves delimitan los bloques que se usan en nuestros ejemplos. | [S2], [S3] |
| F05 | Sombreado (*shadowing*) | Una declaración interna `let x` hace que las referencias a `x` dentro de su ámbito alcancen la vinculación interna en vez de la exterior. No altera el valor de la exterior. | [S1], [S2], [S3] |
| F06 | Búsqueda de nombres | La representación conceptual busca un nombre en el ámbito actual y, si no existe allí, sigue hacia los ámbitos exteriores. La especificación define registros de entorno enlazados y `GetIdentifierReference`/`ResolveBinding`. | [S1] |
| F07 | Tabla de símbolos | Estructura didáctica de análisis semántico que asocia cada nombre con su declaración/ámbito. Un compilador o resolvedor puede representarla con una pila de mapas; **no** afirmamos que JavaScript implemente internamente esta misma tabla. | [S4]; contraste con [S1] |
| F08 | Duplicación de `let` | Dos declaraciones léxicas con el mismo nombre en un mismo bloque de nuestros ejemplos generan `SyntaxError` como error temprano, antes de ejecutar los `console.log`. | [S1], [S2] |
| F09 | Nombre inexistente | Leer directamente un identificador sin vinculación resoluble, como `console.log(precioFinal)`, produce `ReferenceError` durante la evaluación. | [S1], [S5] |
| F10 | Matiz TDZ | Un `let` interno ya pertenece a su ámbito antes de su inicialización. Leerlo antes de ejecutar la declaración produce `ReferenceError`; **no** se recurre automáticamente al `x` exterior. Solo se menciona como precaución, sin convertirlo en caso principal. | [S1], [S2] |
| F11 | Dependencia del lenguaje | Los diagnósticos y reglas exactas se presentan para los ejemplos JavaScript con `let`, no como regla universal de todos los compiladores. | [S1], [S4] |
| F13 | Por qué E4 falla al ejecutar | En un *script*, una referencia no resuelta en los ámbitos léxicos llega al registro de entorno global, cuya parte de objeto consulta las propiedades del objeto global **al evaluarse**; como un global puede crearse durante la ejecución (p. ej. `globalThis.precioFinal = 5`), JavaScript no rechaza E4 de antemano. | [S1] §9.1.1.4 Global Environment Records, [S5] |
| F14 | Contraste con un compilador estático | El compilador de TypeScript (`tsc`) rechaza E4 antes de ejecutar con `error TS2304: Cannot find name 'precioFinal'`. Mismo código, distinta regla y distinto momento del error. | [S7]; verificado con `tsc` 5.8.3 |
| F12 | Compilación y ejecución | En un modelo didáctico, la fase semántica comprueba qué declaración corresponde a cada referencia. Para JavaScript, hay que distinguir las **early errors** estáticas de las referencias no resueltas que fallan al evaluarse. | [S1], [S4], [S5] |

## 2. Ejemplos oficiales del video, escritos por el grupo

### E1. Dos vinculaciones con el mismo nombre (caso canónico)

```javascript
let x = 10;
{
  let x = 20;
  console.log(x); // 20
}
console.log(x);   // 10
```

**Salida exacta:**

```text
20
10
```

**Modelo de ámbito:** ámbito exterior `A0` contiene `x → E1.x.afuera`, valor 10; bloque interior `A1` contiene `x → E1.x.adentro`, valor 20. Durante el bloque, `x` resuelve primero en `A1`. Después del bloque, la referencia a `x` corresponde a `A0`. **No** explicar que el `x` exterior cambia a 20 y luego «vuelve» a 10.

### E2. Dos bloques anidados (caso de resolución escalonada)

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

**Salida exacta:**

```text
adentro
medio
afuera
afuera
```

**Ámbitos:** `A0 = { x: "afuera" }`; `A1 = { y: "medio" }` (padre `A0`); `A2 = { x: "adentro" }` (padre `A1`). Desde `A2`, `x` se encuentra en `A2`; `y` no existe en `A2`, se encuentra en `A1`. Al terminar `A2`, queda activo `A1`; al salir de `A1`, queda `A0`. La tabla visual puede mostrar los ámbitos inactivos como «cerrados», pero **no** afirmar que la memoria se destruye en ese instante en todos los casos.

### E3. Declaración léxica duplicada en el mismo bloque

```javascript
{
  let saldo = 10;
  let saldo = 20;
}
```

**Resultado:** `SyntaxError` (declaración duplicada), antes de ejecutar el bloque. No hay salida de consola. Es un **error temprano de sintaxis** según ECMAScript; la tabla didáctica puede ilustrar el conflicto, pero no debe insinuar que primero se ejecuta `let saldo = 10` y después falla.

### E4. Referencia a un identificador ausente

```javascript
console.log(precioFinal);
```

**Resultado:** `ReferenceError`, al evaluar la expresión que intenta leer `precioFinal`. No hay salida válida de `console.log`. El texto exacto del mensaje varía según el motor; **mostrar el tipo**, no fijar un mensaje literal universal.

### E6. Resolvedor didáctico (escena 07, añadido en v1.1)

```typescript
const ambitos: Map<string, string>[] = [];

function abrirAmbito() { ambitos.push(new Map()); }
function cerrarAmbito() { ambitos.pop(); }

function declarar(nombre: string, id: string) {
  const actual = ambitos[ambitos.length - 1];
  if (actual.has(nombre)) throw new Error(`'${nombre}' ya está declarado en este ámbito`);
  actual.set(nombre, id);
}

function resolver(nombre: string): string {
  for (let i = ambitos.length - 1; i >= 0; i--) {
    const id = ambitos[i].get(nombre);
    if (id !== undefined) return id;
  }
  throw new Error(`'${nombre}' no está declarado`);
}
```

**Comportamiento verificado** (Node.js v23.10.0 con `--experimental-strip-types`): al recorrer E2 con `abrirAmbito`/`declarar`/`cerrarAmbito`, las cuatro llamadas a `resolver` devuelven `x2`, `y1`, `x0`, `x0` (equivalentes a `adentro`, `medio`, `afuera`, `afuera`). Con E3, el segundo `declarar("saldo", …)` lanza `'saldo' ya está declarado en este ámbito`. Con E4, `resolver("precioFinal")` lanza `'precioFinal' no está declarado`. Es una pila de mapas, la misma estrategia del resolvedor de [S4] (que usa `Stack<Map<String, Boolean>>` en Java); el código es original y mínimo, **no** es el de ningún motor JavaScript.

### E5. Contraejemplo breve, solo para advertencia de precisión

```javascript
let x = 10;
{
  console.log(x);
  let x = 20;
}
```

**Resultado:** `ReferenceError` por acceso al `let` interno antes de inicializarlo (TDZ). No se incluye como quinta demostración extensa. Sirve para corregir la falsa regla «si aún no se ejecutó `let x`, entonces el compilador usa el `x` exterior».

## 3. Validación reproducible realizada

Se ejecutaron las cinco muestras de arriba mediante `node -e` en **Node.js v22.16.0** (solo validación de ejemplos; no se creó código del proyecto).

| Ejemplo | Código de salida del proceso | Salida observada / clase de error | Estado |
|---|---:|---|---|
| E1 | 0 | `20`, `10` | Conforme |
| E2 | 0 | `adentro`, `medio`, `afuera`, `afuera` | Conforme |
| E3 | 1 | `SyntaxError` | Conforme |
| E4 | 1 | `ReferenceError` | Conforme |
| E5 | 1 | `ReferenceError` | Conforme |

**Repetir por separado:** ejecutar cada bloque en su propia sesión de Node o archivo `.js` independiente. No mezclar E3 con E1/E2 en un mismo script, porque el error temprano puede impedir ejecutar todo ese script. Si se usa la consola interactiva de un navegador, la persistencia entre evaluaciones puede producir resultados distintos respecto de declaraciones repetidas.

## 4. Reglas editoriales obligatorias para las próximas etapas

1. La tabla de símbolos del video es una **representación educativa**: `ámbito → nombre → declaración → valor de ejemplo`. Afirmar «así visualizamos la búsqueda»; **nunca** «así almacena exactamente V8 las variables».
2. Usar siempre `let`, bloques explícitos `{}` y los identificadores/valores de E1 a E4 tal como están. No cambiar la semántica del lenguaje a mitad del video.
3. Los valores mostrados ayudan a entender la ejecución; la resolución del identificador y el valor almacenado son conceptos distintos.
4. En E3, rotular `SyntaxError: declaración duplicada (error temprano)`. En E4, `ReferenceError: identificador ausente (en ejecución)`. No confundir ambos.
5. No equiparar «se cierra el ámbito en el dibujo» con la liberación física inmediata de memoria.
6. Mostrar con suficiente claridad que dos casillas llamadas `x` corresponden a **vinculaciones diferentes**.
7. Las citas bibliográficas respaldan los conceptos, no autorizan a copiar imágenes, fragmentos extensos de código ajeno o videos.
8. No mencionar la «tabla de símbolos real» de JavaScript. Compiladores y resolvedores pueden usar estructuras de análisis similares, pero los detalles de cada implementación dependen del sistema.

## 5. Fuentes verificadas y correspondencia

- **[S1] Ecma International / TC39.** *ECMAScript 2026 Language Specification*, secciones **9.1 Environment Records**, **9.1.2.1 GetIdentifierReference**, **9.4.2 ResolveBinding**, **14.2 Block / Static Semantics: Early Errors** y **14.3.1 Let and Const Declarations**. Fuente normativa primaria.  
  https://tc39.es/ecma262/2026/multipage/executable-code-and-execution-contexts.html  
  https://tc39.es/ecma262/2026/multipage/ecmascript-language-statements-and-declarations.html  
  Sustenta F01–F06, F08–F12 y las diferencias entre las etapas de error.
- **[S2] MDN Web Docs (Mozilla y colaboradores).** *let*.  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let  
  Sustenta `let`, alcance por bloques, redeclaraciones y TDZ; F02, F04, F05, F08, F10.
- **[S3] MDN Web Docs.** *Block statement*.  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block  
  Sustenta la semántica de los bloques `A0`, `A1`, `A2`; F04, F05.
- **[S4] Robert Nystrom.** *Crafting Interpreters*, capítulo *Resolving and Binding*.  
  https://craftinginterpreters.com/resolving-and-binding.html  
  Sustenta cómo se puede explicar la resolución estática y una pila de scopes; F03, F07, F11, F12. Su implementación de Lox **no** es la de JavaScript.
- **[S5] MDN Web Docs.** *ReferenceError: "x" is not defined*.  
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined  
  Sustenta F09 y el diagnóstico de E4.

- **[S7] Microsoft.** *TypeScript compiler diagnostic messages* (`diagnosticMessages.json`, código 2304 «Cannot find name '{0}'»).  
  https://github.com/microsoft/TypeScript/blob/main/src/compiler/diagnosticMessages.json  
  Sustenta F14. Reproducible: `npx tsc --noEmit e4.ts` con E4 en `e4.ts`.

## 6. Límite de investigación

Este paquete investiga **los conceptos necesarios para el video aprobado**, no el funcionamiento interno particular de V8/SpiderMonkey ni la implementación completa de un analizador semántico. Los ejemplos son propios, verificados con Node.js y acordes con ECMAScript. Si Persona 2 quiere extender el contenido con `var`, closures u otra sintaxis, debe devolver la solicitud para revisión editorial: no es parte de H1.
