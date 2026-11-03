// ARCHIVO GENERADO por scripts/generar-guion.mjs a partir de docs/02-guion.md. No editar a mano.
export type BeatGuion = {id: string; escena: string; titulo: string; texto: string; palabras: number};
export const BEATS_GUION: BeatGuion[] = [
  {
    "id": "S01-B1",
    "escena": "01",
    "titulo": "La pregunta",
    "texto": "Imaginá que estás leyendo un programa y encontrás dos variables llamadas exactamente igual. Las dos se llaman equis. Una vale diez y la otra vale veinte. Ahora aparece una instrucción para imprimir equis. ¿Cuál de las dos se va a utilizar? A primera vista, podría parecer que el programa se confunde, o que la segunda variable reemplaza a la primera. Pero ninguna de esas explicaciones describe correctamente lo que sucede en este ejemplo. Hacé tu apuesta antes de seguir: ¿se imprime diez, veinte, o el programa falla?",
    "palabras": 87
  },
  {
    "id": "S01-B2",
    "escena": "01",
    "titulo": "La revelación",
    "texto": "Dentro de las llaves, el programa imprime veinte. Fuera de ellas, imprime diez. No hay magia y tampoco tuvimos que cambiarle el nombre a ninguna variable. La clave está en dónde se declaró cada una y desde dónde se utiliza su nombre. En este video vamos a reconstruir esa decisión paso a paso: qué significa un ámbito, cómo funciona el sombreado de variables y para qué sirve una tabla de símbolos cuando queremos explicar la resolución de nombres.",
    "palabras": 78
  },
  {
    "id": "S02-B1",
    "escena": "02",
    "titulo": "Identificador y declaración",
    "texto": "Antes de resolver el misterio, necesitamos distinguir cuatro ideas. La primera es el identificador: el nombre con el que nos referimos a algo en el código. Aquí el identificador es equis. La segunda es la declaración: cuando escribimos let x = 10, introducimos una vinculación con ese nombre y le asignamos inicialmente el valor diez. Una vinculación es, para nuestra explicación, la relación entre un nombre y aquello que esa declaración representa. Es importante fijarnos en la declaración completa, y no pensar que todas las apariciones de la palabra equis son automáticamente la misma variable.",
    "palabras": 95
  },
  {
    "id": "S02-B2",
    "escena": "02",
    "titulo": "Referencia y ámbito",
    "texto": "La tercera idea es la referencia. Cuando le pedimos a console.log que muestre equis, estamos usando el identificador. Antes de obtener su valor, hay que determinar a qué declaración corresponde esa referencia. Y la cuarta idea es el ámbito, o *scope*: la región del programa donde una vinculación puede ser alcanzada mediante su nombre. En nuestros ejemplos usamos JavaScript con let, que tiene alcance por bloque. Por eso las llaves que vemos son importantes. Una declaración hecha dentro de ese bloque corresponde a un ámbito diferente del exterior.",
    "palabras": 88
  },
  {
    "id": "S02-B3",
    "escena": "02",
    "titulo": "Qué estudiaremos realmente",
    "texto": "No vamos a estudiar todas las reglas posibles de JavaScript, ni a afirmar que todos los lenguajes se comportan igual. Vamos a usar un caso específico y verificable para entender una tarea fundamental del análisis semántico: relacionar cada uso de un identificador con la declaración correcta. Con estas cuatro piezas ya podemos seguir el recorrido del código.",
    "palabras": 57
  },
  {
    "id": "S03-B1",
    "escena": "03",
    "titulo": "El exterior",
    "texto": "Empecemos con el ejemplo más sencillo. Antes de entrar a las llaves, estamos en el ámbito exterior. Lo llamaremos A cero. En ese espacio aparece la declaración let x = 10. Para visualizarla, pondremos una ficha con el nombre equis y el valor diez. Esa ficha no pretende mostrar una dirección de memoria real: simplemente nos ayuda a seguir la declaración. En este punto, cuando usamos equis desde el exterior, la referencia corresponde a la declaración de A cero.",
    "palabras": 79
  },
  {
    "id": "S03-B2",
    "escena": "03",
    "titulo": "Entrar a un bloque",
    "texto": "Ahora llegamos a la llave de apertura. Para el modelo visual, añadimos un nuevo ámbito, A uno, dentro de A cero. Pensalo como una carpeta que está dentro de otra carpeta. A uno conoce su propio contenido y está relacionado con el ámbito que lo rodea. En este bloque declaramos otra variable mediante let x = 20. El nombre vuelve a ser equis, pero la declaración es nueva. Por eso colocamos una ficha diferente dentro de A uno. No movemos ni reemplazamos la ficha que estaba en A cero.",
    "palabras": 89
  },
  {
    "id": "S03-B3",
    "escena": "03",
    "titulo": "Salir del bloque",
    "texto": "Cuando ejecutamos el console.log interior, seguimos dentro de A uno. Pero cuando llegamos a la llave de cierre y volvemos al código exterior, ese bloque ya no es el ámbito activo para las referencias que siguen. En la animación, A uno pasa a estado cerrado y A cero vuelve a quedar en foco. Si entonces leemos equis, obtenemos la vinculación exterior, la que guarda diez. Nuestro dibujo usa una pila de ámbitos porque permite entender muy bien las entradas y salidas de los bloques; no significa que estemos describiendo de manera literal el manejo de memoria de todos los motores de JavaScript.",
    "palabras": 102
  },
  {
    "id": "S04-B1",
    "escena": "04",
    "titulo": "Una búsqueda en el ámbito actual",
    "texto": "Volvamos a mirar el primer console.log. Estamos dentro de A uno y necesitamos resolver el nombre equis. El primer lugar donde buscamos es el ámbito actual. ¿Existe una declaración llamada equis aquí? Sí. Es la que contiene veinte. Entonces esa es la vinculación que corresponde a la referencia. Para este acceso no necesitamos seguir buscando en A cero. Por eso la salida es veinte.",
    "palabras": 64
  },
  {
    "id": "S04-B2",
    "escena": "04",
    "titulo": "El sombreado no modifica el exterior",
    "texto": "A este comportamiento se le llama sombreado de variables, o *variable shadowing*: una declaración más interna oculta por nombre a otra declaración exterior mientras estamos en la región donde se aplica el ámbito interno. La palabra «oculta» es importante. No significa borrar, sobrescribir ni cambiar el valor original. Si pudiéramos ver las dos fichas al mismo tiempo, encontraríamos equis igual a diez en A cero y equis igual a veinte en A uno. Son dos vinculaciones distintas que comparten el mismo identificador.",
    "palabras": 82
  },
  {
    "id": "S04-B3",
    "escena": "04",
    "titulo": "Un contraejemplo mental",
    "texto": "Probemos una idea incorrecta: «si declaro dos veces equis, la segunda reemplaza siempre a la primera». Si eso fuera cierto, al salir del bloque deberíamos seguir viendo veinte. Pero el programa no hace eso. Vuelve a imprimir diez, precisamente porque la referencia exterior no se resuelve contra la declaración interior. La diferencia no es el momento en que apareció cada let, sino la estructura de ámbitos del programa.",
    "palabras": 68
  },
  {
    "id": "S04-B4",
    "escena": "04",
    "titulo": "Lo que pasa si no encontramos el nombre",
    "texto": "Ahora hagamos una pregunta distinta. ¿Y si desde un bloque usamos un nombre que no fue declarado allí? En ese caso, nuestro modelo busca hacia afuera. Puede encontrar la vinculación en el ámbito padre, y si allí tampoco aparece, continúa por el encadenamiento de ámbitos exteriores. En otras palabras: el ámbito interno puede sombrear una declaración, pero no tiene que redefinir todos los nombres que necesita. Esta búsqueda desde adentro hacia afuera será la base de nuestra demostración con bloques anidados.",
    "palabras": 81
  },
  {
    "id": "S04-B5",
    "escena": "04",
    "titulo": "Una comparación cotidiana",
    "texto": "Pensalo así. Si en tu casa alguien grita «¡Ana!», responde la Ana que vive ahí, aunque en el edificio haya otras personas llamadas Ana. Solo si en tu casa no vive ninguna Ana tiene sentido salir a preguntar al pasillo. La Ana de tu casa no borra a las demás: simplemente es la más cercana. En el código, «tu casa» es el bloque donde está escrita la referencia, no el lugar donde se encuentra el programa al ejecutarse. Por eso hablamos de alcance léxico: lo decide la estructura del texto.",
    "palabras": 90
  },
  {
    "id": "S05-B1",
    "escena": "05",
    "titulo": "Una estructura para organizar declaraciones",
    "texto": "Hasta ahora usamos fichas y carpetas. Podemos reunirlas en una estructura más ordenada: una tabla de símbolos didáctica. Imaginemos que cada ámbito tiene una tabla con columnas para nombre, declaración y valor mostrado en el ejemplo. La tabla del ámbito exterior contiene equis con diez. La tabla del bloque interior contiene otra equis con veinte. Para no mezclarlas, también asignaremos un identificador diferente a cada declaración: una equis exterior y otra equis interior. Así, aunque ambas se escriban igual en el programa, nuestra visualización puede señalar exactamente cuál se está utilizando.",
    "palabras": 91
  },
  {
    "id": "S05-B2",
    "escena": "05",
    "titulo": "Aclaración técnica esencial",
    "texto": "Esta tabla es útil para explicar una idea de la construcción de compiladores: durante el análisis semántico, un resolvedor puede recorrer ámbitos y asociar las referencias con sus declaraciones. Existen implementaciones educativas que mantienen una pila de mapas, uno por ámbito. Pero cuidado: el estándar de JavaScript describe el comportamiento mediante registros de entorno y referencias, y no exige que un motor utilice la misma tabla que estamos dibujando. Nuestro objetivo es comprender el principio, no reconstruir la arquitectura privada de V8 o de un navegador.",
    "palabras": 86
  },
  {
    "id": "S05-B3",
    "escena": "05",
    "titulo": "Tres ámbitos",
    "texto": "Ahora usamos el segundo ejemplo. Primero declaramos x con el texto «afuera». Entramos al primer bloque y declaramos y con el texto «medio». Entramos a un segundo bloque y declaramos otra x con el texto «adentro». Tenemos tres niveles: A cero, A uno y A dos. Las tablas quedan así: en A cero está equis igual a «afuera»; en A uno está ye igual a «medio»; y en A dos está equis igual a «adentro». A dos está dentro de A uno, que a su vez está dentro de A cero.",
    "palabras": 91
  },
  {
    "id": "S05-B4",
    "escena": "05",
    "titulo": "Resolver x y resolver y",
    "texto": "Supongamos que la ejecución está en A dos y aparece console.log(x). La búsqueda empieza en A dos y allí encuentra equis. Resultado: «adentro». En la siguiente línea aparece console.log(y). Esta vez A dos no contiene ye. Por eso seguimos hacia A uno, donde sí existe la declaración. Resultado: «medio». Observá la diferencia: no usamos la tabla «más antigua» ni la declaración «más reciente» de todo el programa; usamos la declaración visible más cercana según los ámbitos léxicos.",
    "palabras": 77
  },
  {
    "id": "S05-B5",
    "escena": "05",
    "titulo": "Tu turno",
    "texto": "Ya resolvimos las dos primeras impresiones. Quedan dos console.log(x): uno después de cerrar el bloque más interno y otro después de cerrar el primer bloque. Ahora te toca a vos. Pausá el video y anotá qué imprime cada uno y en qué ámbito se encuentra la equis en cada caso. Lo vamos a comprobar en la demostración final, pero esta vez no con dibujos, sino con un pequeño programa que hace la búsqueda por nosotros.",
    "palabras": 75
  },
  {
    "id": "S06-B1",
    "escena": "06",
    "titulo": "Declaración duplicada",
    "texto": "Hasta aquí, tener dos variables llamadas igual era válido porque pertenecían a ámbitos diferentes. ¿Qué pasa si intentamos declararlas dos veces en el mismo bloque? Mirá este ejemplo: abrimos unas llaves, declaramos let saldo = 10 y enseguida escribimos let saldo = 20, sin abrir un ámbito nuevo. JavaScript no permite estas dos declaraciones léxicas con el mismo nombre dentro de ese bloque. El resultado es un SyntaxError, considerado un error temprano. Es decir, el programa no empieza a ejecutar la primera declaración y luego se detiene en la segunda: el conflicto ya invalida ese código antes de su ejecución normal.",
    "palabras": 101
  },
  {
    "id": "S06-B2",
    "escena": "06",
    "titulo": "Nombre sin declaración",
    "texto": "El segundo caso es distinto. Supongamos que escribimos console.log(precioFinal), pero no existe ninguna vinculación accesible llamada precioFinal. El programa intenta obtener el valor de una referencia que no puede resolver, y al evaluarla obtiene un ReferenceError. Por eso debemos distinguir una declaración duplicada que viola una regla estática, de una lectura de un identificador inexistente durante la ejecución. ¿Por qué JavaScript espera hasta la ejecución en este caso? Porque en JavaScript un nombre global también puede aparecer mientras el programa corre, por ejemplo como propiedad del objeto global, así que el motor no puede descartar esa referencia de antemano. El texto exacto del mensaje puede variar entre motores, así que nos quedaremos con el tipo de error.",
    "palabras": 117
  },
  {
    "id": "S06-B3",
    "escena": "06",
    "titulo": "Precisión sobre `let`",
    "texto": "Hay un detalle adicional que evita una confusión frecuente. Si un bloque declara su propia equis con let, esa vinculación interna cuenta para todo el bloque, aunque todavía no se haya ejecutado la línea que la inicializa. Leerla antes provoca un ReferenceError por la llamada zona muerta temporal. Eso no hace que se use automáticamente la equis exterior. No profundizaremos hoy en ese mecanismo, pero sí necesitábamos mencionarlo para no enseñar una regla falsa.",
    "palabras": 74
  },
  {
    "id": "S07-B1",
    "escena": "07",
    "titulo": "Un resolvedor en quince líneas",
    "texto": "Hasta ahora hicimos la búsqueda con flechas. Un compilador no dibuja flechas: la programa. Y la idea cabe en muy pocas líneas. Usamos una pila de ámbitos, donde cada ámbito es un mapa que asocia un nombre con su declaración. abrirAmbito coloca un mapa vacío encima de la pila cuando entramos a un bloque, y cerrarAmbito lo quita cuando salimos. declarar guarda un nombre en el mapa de arriba, que es el ámbito actual. Y resolver recorre la pila de arriba hacia abajo, es decir, desde el ámbito más interno hacia el más externo, y devuelve la primera declaración que encuentra. Es la misma estrategia que usa el resolvedor que se construye en el libro *Crafting Interpreters*, aunque este código es una versión mínima escrita para este video.",
    "palabras": 128
  },
  {
    "id": "S07-B2",
    "escena": "07",
    "titulo": "El resolvedor recorre el segundo ejemplo",
    "texto": "Le damos el segundo ejemplo. Primera declaración: en el ámbito exterior, declaramos equis, la equis cero. Primera llave: abrimos un ámbito y declaramos ye. Segunda llave: abrimos otro ámbito y declaramos la otra equis, la equis dos. Primera referencia: resolver equis. La búsqueda empieza arriba y la encuentra de inmediato: «adentro». Segunda: resolver ye. No está arriba; baja un nivel y la encuentra: «medio». Se cierra la llave interna, así que sacamos ese mapa de la pila. Tercera: resolver equis. Ahora el mapa de arriba solo contiene ye, así que bajamos hasta la equis cero: «afuera». Se cierra otra llave y sacamos otro mapa. Cuarta: resolver equis, y la encontramos en el único mapa que queda: otra vez «afuera». ¿Acertaste tu predicción?",
    "palabras": 122
  },
  {
    "id": "S07-B3",
    "escena": "07",
    "titulo": "El mismo código detecta los dos errores",
    "texto": "Lo interesante es que estas mismas quince líneas ya detectan los dos errores de la escena anterior. Si declaramos saldo dos veces en el mismo ámbito, declarar descubre que el nombre ya está en el mapa de arriba y lo rechaza sin ejecutar nada, igual que el error temprano de JavaScript. Y si pedimos resolver precioFinal, la búsqueda recorre toda la pila sin encontrarlo. Nuestro resolvedor lo reporta durante el análisis. JavaScript, en cambio, espera a la ejecución, por la razón que vimos: un nombre global podría aparecer mientras el programa corre. Otros lenguajes toman otra decisión. Si pasamos esa misma línea por el compilador de TypeScript, la rechaza antes de ejecutarla con el mensaje «Cannot find name precioFinal». Mismo código, distintas reglas, distinto momento del error.",
    "palabras": 127
  },
  {
    "id": "S07-B4",
    "escena": "07",
    "titulo": "Verificar y comprender",
    "texto": "La consola muestra exactamente cuatro líneas, en este orden: «adentro», «medio», «afuera», «afuera». Si el resultado que imaginabas era diferente, preguntate en cuál de los cuatro accesos elegiste un ámbito equivocado. Una vez que separamos nombre, declaración y ámbito, el comportamiento deja de ser una sorpresa. La resolución no depende de adivinar qué equis «gana», sino de seguir una regla consistente desde el punto donde está escrita cada referencia.",
    "palabras": 69
  },
  {
    "id": "S08-B1",
    "escena": "08",
    "titulo": "Tres ideas para recordar",
    "texto": "Quedémonos con tres conclusiones. Primera: un identificador es un nombre, pero dos declaraciones que usan ese nombre no tienen por qué representar la misma vinculación. Segunda: los ámbitos establecen desde dónde es accesible cada declaración; una definición interna puede sombrear una exterior sin modificarla. Tercera: una tabla de símbolos es una forma útil de visualizar cómo un analizador semántico relaciona referencias con declaraciones, aunque los motores reales puedan utilizar estructuras distintas.",
    "palabras": 71
  },
  {
    "id": "S08-B2",
    "escena": "08",
    "titulo": "Conexión con compiladores",
    "texto": "Por eso este tema pertenece a la construcción de compiladores: reconocer palabras y construir una estructura sintáctica no basta. También necesitamos entender a qué se refieren los nombres. La próxima vez que veas dos variables llamadas igual, no preguntés cuál fue escrita al final. Preguntate: ¿en qué ámbito está esta referencia y qué declaración encuentra primero?",
    "palabras": 56
  }
];
