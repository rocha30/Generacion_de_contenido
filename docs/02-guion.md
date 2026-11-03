# 02. Guion completo para narración

**Título aprobado, según confirmación del grupo:** ¿Qué pasa cuando dos variables tienen el mismo nombre? Ámbitos, sombreado de variables y tablas de símbolos en compiladores.

**Duración editorial prevista (v1.1):** escenas 01–08 ≈ 18 min de contenido a ritmo pausado con respiros entre beats (≈ 15 min a ritmo rápido); escena 09 = 00:25 de créditos legibles. Los minutajes de cada escena abajo son aproximados: **los vigentes por beat están en `06-marcas-de-tiempo.md`**. Esta duración es una **meta**, no una medición de audio real. Persona 3 deberá grabar y ajustar el ritmo sin recortar explicaciones importantes ni agregar relleno. **Las instrucciones entre corchetes NO se narran.** El contenido está pensado para voz en español y animaciones que acompañan exactamente el texto.

**Cambios v1.1 (Persona 2, 2026-11-02):** apuesta del espectador en S01-B1; analogía nueva S04-B5; S05-B5 pasa a ser un reto (el recorrido completo se hace en S07); precisión en S06-B2 sobre por qué JavaScript reporta E4 al ejecutar; escena 07 rehecha como «del dibujo al código» con un resolvedor didáctico (E6) y contraste con TypeScript.

**Convención:** los códigos `S01-B1`, etc., son *beats* narrativos que también aparecen en `03-storyboard.md`. Los únicos fragmentos de código visibles serán los del documento de investigación; las líneas comentadas con resultados son anotaciones visuales y no se ejecutan como pasos separados.

---

## Escena 01 · Gancho (00:00–01:15)

### S01-B1 · La pregunta

Imaginá que estás leyendo un programa y encontrás dos variables llamadas exactamente igual. Las dos se llaman equis. Una vale diez y la otra vale veinte. Ahora aparece una instrucción para imprimir equis. ¿Cuál de las dos se va a utilizar? A primera vista, podría parecer que el programa se confunde, o que la segunda variable reemplaza a la primera. Pero ninguna de esas explicaciones describe correctamente lo que sucede en este ejemplo. Hacé tu apuesta antes de seguir: ¿se imprime diez, veinte, o el programa falla?

### S01-B2 · La revelación

[APARECE E1, primero sin resultados; se resalta el `console.log` interior y después el exterior.]

Dentro de las llaves, el programa imprime veinte. Fuera de ellas, imprime diez. No hay magia y tampoco tuvimos que cambiarle el nombre a ninguna variable. La clave está en **dónde** se declaró cada una y **desde dónde** se utiliza su nombre. En este video vamos a reconstruir esa decisión paso a paso: qué significa un ámbito, cómo funciona el sombreado de variables y para qué sirve una tabla de símbolos cuando queremos explicar la resolución de nombres.

**Fuentes para el equipo:** [S1], [S2], [S3].

## Escena 02 · Cuatro conceptos que necesitamos (01:15–03:00)

### S02-B1 · Identificador y declaración

Antes de resolver el misterio, necesitamos distinguir cuatro ideas. La primera es el **identificador**: el nombre con el que nos referimos a algo en el código. Aquí el identificador es equis. La segunda es la **declaración**: cuando escribimos `let x = 10`, introducimos una vinculación con ese nombre y le asignamos inicialmente el valor diez. Una vinculación es, para nuestra explicación, la relación entre un nombre y aquello que esa declaración representa. Es importante fijarnos en la declaración completa, y no pensar que todas las apariciones de la palabra equis son automáticamente la misma variable.

### S02-B2 · Referencia y ámbito

La tercera idea es la **referencia**. Cuando le pedimos a `console.log` que muestre equis, estamos usando el identificador. Antes de obtener su valor, hay que determinar a qué declaración corresponde esa referencia. Y la cuarta idea es el **ámbito**, o *scope*: la región del programa donde una vinculación puede ser alcanzada mediante su nombre. En nuestros ejemplos usamos JavaScript con `let`, que tiene alcance por bloque. Por eso las llaves que vemos son importantes. Una declaración hecha dentro de ese bloque corresponde a un ámbito diferente del exterior.

### S02-B3 · Qué estudiaremos realmente

[SE PRESENTAN LOS TÉRMINOS: nombre, declaración, referencia, ámbito.]

No vamos a estudiar todas las reglas posibles de JavaScript, ni a afirmar que todos los lenguajes se comportan igual. Vamos a usar un caso específico y verificable para entender una tarea fundamental del análisis semántico: **relacionar cada uso de un identificador con la declaración correcta**. Con estas cuatro piezas ya podemos seguir el recorrido del código.

**Fuentes para el equipo:** [S1], [S2], [S4].

## Escena 03 · Cómo se forman los ámbitos (03:00–05:00)

### S03-B1 · El exterior

Empecemos con el ejemplo más sencillo. Antes de entrar a las llaves, estamos en el ámbito exterior. Lo llamaremos A cero. En ese espacio aparece la declaración `let x = 10`. Para visualizarla, pondremos una ficha con el nombre equis y el valor diez. Esa ficha no pretende mostrar una dirección de memoria real: simplemente nos ayuda a seguir la declaración. En este punto, cuando usamos equis desde el exterior, la referencia corresponde a la declaración de A cero.

### S03-B2 · Entrar a un bloque

Ahora llegamos a la llave de apertura. Para el modelo visual, añadimos un nuevo ámbito, A uno, dentro de A cero. Pensalo como una carpeta que está dentro de otra carpeta. A uno conoce su propio contenido y está relacionado con el ámbito que lo rodea. En este bloque declaramos otra variable mediante `let x = 20`. El nombre vuelve a ser equis, pero la declaración es nueva. Por eso colocamos una ficha diferente dentro de A uno. No movemos ni reemplazamos la ficha que estaba en A cero.

### S03-B3 · Salir del bloque

Cuando ejecutamos el `console.log` interior, seguimos dentro de A uno. Pero cuando llegamos a la llave de cierre y volvemos al código exterior, ese bloque ya no es el ámbito activo para las referencias que siguen. En la animación, A uno pasa a estado cerrado y A cero vuelve a quedar en foco. Si entonces leemos equis, obtenemos la vinculación exterior, la que guarda diez. Nuestro dibujo usa una pila de ámbitos porque permite entender muy bien las entradas y salidas de los bloques; **no** significa que estemos describiendo de manera literal el manejo de memoria de todos los motores de JavaScript.

**Fuentes para el equipo:** [S1], [S2], [S3].

## Escena 04 · Shadowing: dos nombres iguales, dos vinculaciones (05:00–07:50)

### S04-B1 · Una búsqueda en el ámbito actual

Volvamos a mirar el primer `console.log`. Estamos dentro de A uno y necesitamos resolver el nombre equis. El primer lugar donde buscamos es el ámbito actual. ¿Existe una declaración llamada equis aquí? Sí. Es la que contiene veinte. Entonces esa es la vinculación que corresponde a la referencia. Para este acceso no necesitamos seguir buscando en A cero. Por eso la salida es veinte.

### S04-B2 · El sombreado no modifica el exterior

A este comportamiento se le llama **sombreado de variables**, o *variable shadowing*: una declaración más interna oculta por nombre a otra declaración exterior mientras estamos en la región donde se aplica el ámbito interno. La palabra «oculta» es importante. No significa borrar, sobrescribir ni cambiar el valor original. Si pudiéramos ver las dos fichas al mismo tiempo, encontraríamos equis igual a diez en A cero y equis igual a veinte en A uno. Son dos vinculaciones distintas que comparten el mismo identificador.

### S04-B3 · Un contraejemplo mental

Probemos una idea incorrecta: «si declaro dos veces equis, la segunda reemplaza siempre a la primera». Si eso fuera cierto, al salir del bloque deberíamos seguir viendo veinte. Pero el programa no hace eso. Vuelve a imprimir diez, precisamente porque la referencia exterior no se resuelve contra la declaración interior. La diferencia no es el momento en que apareció cada `let`, sino la estructura de ámbitos del programa.

### S04-B4 · Lo que pasa si no encontramos el nombre

Ahora hagamos una pregunta distinta. ¿Y si desde un bloque usamos un nombre que no fue declarado allí? En ese caso, nuestro modelo busca hacia afuera. Puede encontrar la vinculación en el ámbito padre, y si allí tampoco aparece, continúa por el encadenamiento de ámbitos exteriores. En otras palabras: el ámbito interno puede sombrear una declaración, pero no tiene que redefinir todos los nombres que necesita. Esta búsqueda desde adentro hacia afuera será la base de nuestra demostración con bloques anidados.

### S04-B5 · Una comparación cotidiana

[ANIMACIÓN: UNA CASA DENTRO DE UN EDIFICIO; UNA «ANA» EN LA CASA Y OTRA EN EL EDIFICIO.]

Pensalo así. Si en tu casa alguien grita «¡Ana!», responde la Ana que vive ahí, aunque en el edificio haya otras personas llamadas Ana. Solo si en tu casa no vive ninguna Ana tiene sentido salir a preguntar al pasillo. La Ana de tu casa no borra a las demás: simplemente es la más cercana. En el código, «tu casa» es el bloque donde está **escrita** la referencia, no el lugar donde se encuentra el programa al ejecutarse. Por eso hablamos de alcance **léxico**: lo decide la estructura del texto.

**Fuentes para el equipo:** [S1], [S2], [S3].

## Escena 05 · Tabla de símbolos y resolución de nombres (07:50–10:55)

### S05-B1 · Una estructura para organizar declaraciones

Hasta ahora usamos fichas y carpetas. Podemos reunirlas en una estructura más ordenada: una **tabla de símbolos didáctica**. Imaginemos que cada ámbito tiene una tabla con columnas para nombre, declaración y valor mostrado en el ejemplo. La tabla del ámbito exterior contiene equis con diez. La tabla del bloque interior contiene otra equis con veinte. Para no mezclarlas, también asignaremos un identificador diferente a cada declaración: una equis exterior y otra equis interior. Así, aunque ambas se escriban igual en el programa, nuestra visualización puede señalar exactamente cuál se está utilizando.

### S05-B2 · Aclaración técnica esencial

Esta tabla es útil para explicar una idea de la construcción de compiladores: durante el análisis semántico, un resolvedor puede recorrer ámbitos y asociar las referencias con sus declaraciones. Existen implementaciones educativas que mantienen una pila de mapas, uno por ámbito. Pero cuidado: el estándar de JavaScript describe el comportamiento mediante **registros de entorno y referencias**, y no exige que un motor utilice la misma tabla que estamos dibujando. Nuestro objetivo es comprender el principio, no reconstruir la arquitectura privada de V8 o de un navegador.

### S05-B3 · Tres ámbitos

Ahora usamos el segundo ejemplo. Primero declaramos `x` con el texto «afuera». Entramos al primer bloque y declaramos `y` con el texto «medio». Entramos a un segundo bloque y declaramos otra `x` con el texto «adentro». Tenemos tres niveles: A cero, A uno y A dos. Las tablas quedan así: en A cero está equis igual a «afuera»; en A uno está ye igual a «medio»; y en A dos está equis igual a «adentro». A dos está dentro de A uno, que a su vez está dentro de A cero.

### S05-B4 · Resolver x y resolver y

Supongamos que la ejecución está en A dos y aparece `console.log(x)`. La búsqueda empieza en A dos y allí encuentra equis. Resultado: «adentro». En la siguiente línea aparece `console.log(y)`. Esta vez A dos no contiene ye. Por eso seguimos hacia A uno, donde sí existe la declaración. Resultado: «medio». Observá la diferencia: no usamos la tabla «más antigua» ni la declaración «más reciente» de todo el programa; usamos la declaración visible más cercana según los ámbitos léxicos.

### S05-B5 · Tu turno

[SE CIERRA A2 EN EL DIBUJO; LOS DOS ÚLTIMOS `console.log(x)` QUEDAN CON SIGNOS DE PREGUNTA.]

Ya resolvimos las dos primeras impresiones. Quedan dos `console.log(x)`: uno después de cerrar el bloque más interno y otro después de cerrar el primer bloque. Ahora te toca a vos. Pausá el video y anotá qué imprime cada uno y en qué ámbito se encuentra la equis en cada caso. Lo vamos a comprobar en la demostración final, pero esta vez no con dibujos, sino con un pequeño programa que hace la búsqueda por nosotros.

**Fuentes para el equipo:** [S1], [S3], [S4].

## Escena 06 · Dos errores que conviene distinguir (10:55–13:05)

### S06-B1 · Declaración duplicada

Hasta aquí, tener dos variables llamadas igual era válido porque pertenecían a ámbitos diferentes. ¿Qué pasa si intentamos declararlas dos veces en el mismo bloque? Mirá este ejemplo: abrimos unas llaves, declaramos `let saldo = 10` y enseguida escribimos `let saldo = 20`, sin abrir un ámbito nuevo. JavaScript no permite estas dos declaraciones léxicas con el mismo nombre dentro de ese bloque. El resultado es un **SyntaxError**, considerado un error temprano. Es decir, el programa no empieza a ejecutar la primera declaración y luego se detiene en la segunda: el conflicto ya invalida ese código antes de su ejecución normal.

### S06-B2 · Nombre sin declaración

El segundo caso es distinto. Supongamos que escribimos `console.log(precioFinal)`, pero no existe ninguna vinculación accesible llamada `precioFinal`. El programa intenta obtener el valor de una referencia que no puede resolver, y al evaluarla obtiene un **ReferenceError**. Por eso debemos distinguir una declaración duplicada que viola una regla estática, de una lectura de un identificador inexistente durante la ejecución. ¿Por qué JavaScript espera hasta la ejecución en este caso? Porque en JavaScript un nombre global también puede aparecer mientras el programa corre, por ejemplo como propiedad del objeto global, así que el motor no puede descartar esa referencia de antemano. El texto exacto del mensaje puede variar entre motores, así que nos quedaremos con el tipo de error.

### S06-B3 · Precisión sobre `let`

Hay un detalle adicional que evita una confusión frecuente. Si un bloque declara su propia equis con `let`, esa vinculación interna cuenta para todo el bloque, aunque todavía no se haya ejecutado la línea que la inicializa. Leerla antes provoca un ReferenceError por la llamada zona muerta temporal. Eso **no** hace que se use automáticamente la equis exterior. No profundizaremos hoy en ese mecanismo, pero sí necesitábamos mencionarlo para no enseñar una regla falsa.

**Fuentes para el equipo:** [S1], [S2], [S5].

## Escena 07 · Demostración: del dibujo al código (13:05–16:20)

### S07-B1 · Un resolvedor en quince líneas

[APARECE EL CÓDIGO DEL RESOLVEDOR DIDÁCTICO (VER `01-investigacion.md`, E6), FUNCIÓN POR FUNCIÓN.]

Hasta ahora hicimos la búsqueda con flechas. Un compilador no dibuja flechas: la programa. Y la idea cabe en muy pocas líneas. Usamos una **pila de ámbitos**, donde cada ámbito es un mapa que asocia un nombre con su declaración. `abrirAmbito` coloca un mapa vacío encima de la pila cuando entramos a un bloque, y `cerrarAmbito` lo quita cuando salimos. `declarar` guarda un nombre en el mapa de arriba, que es el ámbito actual. Y `resolver` recorre la pila de arriba hacia abajo, es decir, desde el ámbito más interno hacia el más externo, y devuelve la primera declaración que encuentra. Es la misma estrategia que usa el resolvedor que se construye en el libro *Crafting Interpreters*, aunque este código es una versión mínima escrita para este video.

### S07-B2 · El resolvedor recorre el segundo ejemplo

[A LA IZQUIERDA E2; AL CENTRO LA PILA DE MAPAS; A LA DERECHA LA CONSOLA. CONTADOR 1/4 … 4/4.]

Le damos el segundo ejemplo. Primera declaración: en el ámbito exterior, declaramos equis, la equis cero. Primera llave: abrimos un ámbito y declaramos ye. Segunda llave: abrimos otro ámbito y declaramos la otra equis, la equis dos. Primera referencia: resolver equis. La búsqueda empieza arriba y la encuentra de inmediato: «adentro». Segunda: resolver ye. No está arriba; baja un nivel y la encuentra: «medio». Se cierra la llave interna, así que sacamos ese mapa de la pila. Tercera: resolver equis. Ahora el mapa de arriba solo contiene ye, así que bajamos hasta la equis cero: «afuera». Se cierra otra llave y sacamos otro mapa. Cuarta: resolver equis, y la encontramos en el único mapa que queda: otra vez «afuera». ¿Acertaste tu predicción?

### S07-B3 · El mismo código detecta los dos errores

[SE PRUEBAN E3 Y E4 EN EL RESOLVEDOR; LUEGO, COMPARACIÓN JAVASCRIPT / TYPESCRIPT.]

Lo interesante es que estas mismas quince líneas ya detectan los dos errores de la escena anterior. Si declaramos `saldo` dos veces en el mismo ámbito, `declarar` descubre que el nombre ya está en el mapa de arriba y lo rechaza sin ejecutar nada, igual que el error temprano de JavaScript. Y si pedimos resolver `precioFinal`, la búsqueda recorre toda la pila sin encontrarlo. Nuestro resolvedor lo reporta durante el análisis. JavaScript, en cambio, espera a la ejecución, por la razón que vimos: un nombre global podría aparecer mientras el programa corre. Otros lenguajes toman otra decisión. Si pasamos esa misma línea por el compilador de TypeScript, la rechaza antes de ejecutarla con el mensaje «Cannot find name precioFinal». Mismo código, distintas reglas, distinto momento del error.

### S07-B4 · Verificar y comprender

[SE CONGELAN E2 Y LAS CUATRO LÍNEAS DE SALIDA.]

La consola muestra exactamente cuatro líneas, en este orden: «adentro», «medio», «afuera», «afuera». Si el resultado que imaginabas era diferente, preguntate en cuál de los cuatro accesos elegiste un ámbito equivocado. Una vez que separamos nombre, declaración y ámbito, el comportamiento deja de ser una sorpresa. La resolución no depende de adivinar qué equis «gana», sino de seguir una regla consistente desde el punto donde está escrita cada referencia.

**Fuentes para el equipo:** [S1], [S4], [S7].

## Escena 08 · Cierre (16:20–17:15)

### S08-B1 · Tres ideas para recordar

Quedémonos con tres conclusiones. Primera: un identificador es un nombre, pero dos declaraciones que usan ese nombre no tienen por qué representar la misma vinculación. Segunda: los ámbitos establecen desde dónde es accesible cada declaración; una definición interna puede **sombrear** una exterior sin modificarla. Tercera: una tabla de símbolos es una forma útil de visualizar cómo un analizador semántico relaciona referencias con declaraciones, aunque los motores reales puedan utilizar estructuras distintas.

### S08-B2 · Conexión con compiladores

Por eso este tema pertenece a la construcción de compiladores: reconocer palabras y construir una estructura sintáctica no basta. También necesitamos entender a qué se refieren los nombres. La próxima vez que veas dos variables llamadas igual, no preguntés cuál fue escrita al final. Preguntate: **¿en qué ámbito está esta referencia y qué declaración encuentra primero?**

**Fuentes para el equipo:** [S1], [S4].

## Escena 09 · Créditos (17:15–17:40)

**Sin narración obligatoria. Texto en pantalla (legible, sin desplazamiento rápido):**

> ¿Qué pasa cuando dos variables tienen el mismo nombre?  
> Diego Lopez · Luis Pedro Lira · Mario Rocha  
> Universidad del Valle de Guatemala  
> Construcción de Compiladores  
> Referencias: ECMAScript 2026 (TC39/Ecma), MDN Web Docs y *Crafting Interpreters* (Robert Nystrom)  
> Material audiovisual original del grupo · Licencia prevista: Creative Commons Atribución (CC BY)

**Texto de descripción y atribuciones completas:** ver `04-atribuciones.md`. La licencia y la autoría final solo podrán declararse definitivamente una vez que Persona 3 compruebe el material efectivamente utilizado en la edición final.

---

## Instrucciones invariables para producción

- Narrar el texto de cada beat, **sin leer** los códigos `Sxx-Bn`, las notas visuales ni las referencias entre corchetes.
- Las etiquetas de **tiempo** son objetivos editoriales de H1. No estirar silencios para completar la duración; si la lectura definitiva no supera 12 minutos de contenido, el guion debe volver a Persona 1 para ampliación sustantiva.
- No sustituir E1/E2/E3/E4 por ejemplos nuevos sin revisión de Persona 1. El caso E5 solo sirve para la advertencia breve en escena 06.
- Las voces no deben decir que JavaScript tiene internamente «esta tabla». Hablar de **modelo didáctico** y del principio de resolución de nombres.
- Créditos de Persona 1 son **propuesta editorial**. Persona 3 debe verificar la ortografía y la atribución de los materiales realmente usados antes de publicar.
