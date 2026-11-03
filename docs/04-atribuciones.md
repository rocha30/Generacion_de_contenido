# 04. Bibliografía, licencias y atribuciones preliminares

**Alcance de este archivo:** paquete editorial de Persona 1. Se documentan **fuentes consultadas**, **material audiovisual previsto** y **textos de crédito sugeridos**. No se afirma que el video exista, que la narración esté grabada, ni que se hayan usado recursos externos que todavía no fueron elegidos por Persona 2 o 3.

## 1. Bibliografía técnica utilizada (consulta, no reutilización de contenido)

| ID | Autor / entidad | Título y sección | URL | Afirmaciones respaldadas | ¿Se copiarán elementos del recurso? |
|---|---|---|---|---|---|
| S1 | Ecma International / TC39 | *ECMAScript 2026 Language Specification*, §9.1 Environment Records, §9.1.2.1 GetIdentifierReference, §9.4.2 ResolveBinding; §14.2 y §14.3.1 | https://tc39.es/ecma262/2026/multipage/executable-code-and-execution-contexts.html ; https://tc39.es/ecma262/2026/multipage/ecmascript-language-statements-and-declarations.html | Vinculación, alcance, búsqueda, errores tempranos y `let` | **No**: solo consulta y paráfrasis propias |
| S2 | MDN Web Docs (Mozilla y colaboradores) | *let* | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let | Bloques, shadowing, redeclaraciones, TDZ | **No**: ejemplos del guion son originales |
| S3 | MDN Web Docs | *Block statement* | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block | Delimitación de ámbitos por bloques | **No** |
| S4 | Robert Nystrom | *Crafting Interpreters*, capítulo *Resolving and Binding* | https://craftinginterpreters.com/resolving-and-binding.html | Resolver variables, pila de ámbitos y análisis semántico | **No**: no copiar ejemplos ni ilustraciones del libro |
| S5 | MDN Web Docs | *ReferenceError: "x" is not defined* | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined | Diagnóstico de nombre inexistente | **No** |
| S7 | Microsoft / TypeScript | *diagnosticMessages.json* (código 2304) | https://github.com/microsoft/TypeScript/blob/main/src/compiler/diagnosticMessages.json | Mensaje «Cannot find name» de `tsc` en escena 07 | **No**: solo se cita el mensaje del compilador |
| S6 | YouTube Help / Google | *License types on YouTube* | https://support.google.com/youtube/answer/2797468 | Opción de publicación «Creative Commons – Attribution» y restricciones de licenciamiento | **No** |

**Precisiones bibliográficas:** Una referencia bibliográfica **no** equivale a permiso para insertar el texto, gráficos, audios o fragmentos de una obra en un video. Para evitar problemas de copyright, este proyecto solo prevé **ejemplos de código redactados aquí y visuales originales**. Si la producción utiliza recursos de terceros, Persona 2/3 tendrán que documentar licencia compatible y atribución concreta antes de incorporarlos.

## 2. Registro provisional de recursos audiovisuales

| Recurso | Origen previsto | Estado | Licencia / uso | Atribución a incluir |
|---|---|---|---|---|
| E1–E6 (fragmentos JavaScript/TypeScript) | Creados para este trabajo | Redactados y validados en H1 | Originales del grupo para el video | Equipo de autores, en créditos |
| Ilustraciones de ámbitos, flechas y tablas | Por crear con React/Remotion (Persona 2) | **No creadas** | Deben ser originales del equipo | Equipo de autores, en créditos |
| Narración humana | Por grabar (Persona 3) | **No grabada** | Debe ser grabación autorizada para publicar el video bajo CC BY | Equipo / locutor, confirmar en edición |
| Música | No se utilizará por defecto | No prevista | No aplica | No aplica |
| Fotografías, logos, imágenes o clips de terceros | No se utilizarán por defecto | No previstos | Si se proponen, verificar permiso que permita publicar bajo CC BY | Autor, título, fuente, licencia y cambios realizados |
| Tipografías | Inter y JetBrains Mono (Google Fonts) | Elegidas en producción (Persona 2) | SIL Open Font License 1.1: permite usarlas en video publicado | Mencionadas en créditos |
| Editor/programa Remotion, FFmpeg, Audacity | Herramientas de producción, no material audiovisual | No implementadas en H1 | La licencia de la herramienta no es automáticamente la licencia del video | No atribuir en el video salvo que se reutilicen activos sujetos a licencia |

## 3. Licencia editorial prevista para publicación

- **Opción de YouTube planificada:** `Creative Commons – Attribution` (**CC BY**), conforme al plan aprobado.
- **Condición indispensable:** que todas las imágenes, animaciones, música, audios y otros materiales incorporados estén bajo derechos de los autores, dominio público o licencias realmente compatibles con la licencia final. No asumir que «sin copyright» o «encontrado en internet» equivale a uso libre.
- **No se ha seleccionado todavía una versión numérica de CC BY**: YouTube ofrece la opción denominada «Creative Commons – Attribution». No se inventa una versión ni se atribuyen derechos sobre recursos no desarrollados.
- **No atribuir a los autores la especificación ECMAScript ni el libro:** se citan como **fuentes**, no como obras audiovisuales creadas para el video.
- **No incorporar** fragmentos de películas, canciones comerciales, fotografías, logos o extractos extensos de material ajeno; no son necesarios para esta actividad.

## 4. Créditos finales preliminares (texto exacto para storyboard)

```text
¿Qué pasa cuando dos variables tienen el mismo nombre?
Ámbitos, sombreado de variables y tablas de símbolos en compiladores

Diego Lopez
Luis Pedro Lira
Mario Rocha

Universidad del Valle de Guatemala
Construcción de Compiladores

Referencias técnicas:
ECMAScript 2026 (Ecma International / TC39)
MDN Web Docs
Crafting Interpreters (Robert Nystrom)
TypeScript (Microsoft)

Animaciones y ejemplos: producción original del grupo
Licencia prevista de publicación: Creative Commons – Attribution
```

**Nota:** La consigna pide nombres completos. Se han transcrito **exactamente los nombres proporcionados** por el usuario, ajustando mayúsculas. Antes de publicar, los integrantes deben confirmar si estos son sus nombres completos tal como deben acreditarse, incluido cualquier acento.

## 5. Descripción de YouTube preliminar (para Persona 3, NO publicada)

```text
¿Qué pasa cuando dos variables tienen el mismo nombre?

En este video explicamos ámbitos léxicos, shadowing y resolución de nombres con ejemplos de JavaScript (let). Las tablas de símbolos son una visualización didáctica y no una representación del funcionamiento interno exacto de un motor JavaScript.

Autores: Diego Lopez, Luis Pedro Lira y Mario Rocha.
Universidad del Valle de Guatemala | Construcción de Compiladores.

Bibliografía:
• Ecma International / TC39, ECMAScript 2026 Language Specification:
  https://tc39.es/ecma262/2026/multipage/executable-code-and-execution-contexts.html
  https://tc39.es/ecma262/2026/multipage/ecmascript-language-statements-and-declarations.html
• MDN Web Docs, let:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
• MDN Web Docs, Block statement:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block
• Robert Nystrom, Crafting Interpreters, Resolving and Binding:
  https://craftinginterpreters.com/resolving-and-binding.html
• MDN Web Docs, ReferenceError – not defined:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined
• Microsoft, TypeScript diagnostic messages (TS2304):
  https://github.com/microsoft/TypeScript/blob/main/src/compiler/diagnosticMessages.json

Material audiovisual original del equipo. Licencia: Creative Commons – Attribution (CC BY).
```

**Verificación obligatoria de Persona 3 antes de publicar:** actualizar créditos y descripción para reflejar exactamente lo que se haya producido o incorporado, y comprobar la licencia en YouTube Studio. Si se usan recursos adicionales, registrar autor, título, enlace, licencia, cambios y atribución.

## 6. Atribuciones que NO deben afirmarse todavía

- Que los tres nombres son legalmente completos sin confirmación adicional.
- Que existe un repositorio, grabación, video renderizado, canal o publicación.
- Que existen permisos de uso de fotografías/música que no se han seleccionado.
- Que está activa una licencia CC BY en YouTube (solo es una **decisión prevista**).
- Que el contenido consultado en páginas de terceros está incorporado como material audiovisual.
