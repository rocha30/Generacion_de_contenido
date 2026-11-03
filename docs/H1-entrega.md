# H1. Entrega de Persona 1 y estado de aceptación

**Responsable de etapa:** Persona 1 — investigación, guion y diseño didáctico.  
**Integrantes comunicados:** Diego Lopez, Luis Pedro Lira y Mario Rocha.  
**Tema:** «¿Qué pasa cuando dos variables tienen el mismo nombre? Ámbitos, sombreado de variables y tablas de símbolos en compiladores».

## 1. Estado académico y decisiones

| Control | Estado | Evidencia o límite |
|---|---|---|
| Tema aprobado por el docente | **Confirmado por el usuario** | La persona que solicitó H1 respondió «ya aprobó». No se adjuntó confirmación escrita; no se inventa una captura o correo. |
| Identidad de integrantes | **Nombres suministrados** | Diego Lopez, Luis Pedro Lira y Mario Rocha. No se verificó aún si los nombres llevan acentos o apellidos adicionales. |
| Pertenencia al grupo original del semestre | **Sin verificación independiente** | La consigna exige trabajar con el grupo del inicio del semestre. Los nombres se informaron como integrantes, pero no se proporcionó padrón o confirmación explícita de continuidad. |
| Lenguaje y ejemplos | **Definidos** | JavaScript con `let`; E1–E4 para escenas y E5 como advertencia. |
| Formato audiovisual | **Definido en el plan** | 16:9, 1920 × 1080, 30 fps, MP4 H.264/AAC, voz humana en español, React + Remotion en etapa siguiente. |
| Licencia | **Decisión editorial** | Publicación CC BY en YouTube, pendiente de validación de los activos reales. |
| Repositorio Git/GitHub | **No proporcionado / no creado** | H1 se entrega como archivos `docs/`. Persona 2 deberá acordar con el grupo dónde alojarlo antes de abrir su etapa; ningún commit ha sido realizado. |
| Lectura real cronometrada | **Pendiente de grabación/ensayo humano** | Se calculó estimación editorial por extensión del guion y tiempos de visualización. No se afirma haber grabado ni medido voz real. |
| Aceptación de Persona 2 | **Pendiente** | No se ha recibido aceptación escrita. H1 está preparado para revisión, pero la compuerta secuencial aún no puede declararse formalmente superada. |

## 2. Manifiesto exacto de archivos

| Archivo | Para qué sirve | Verificación |
|---|---|---|
| `docs/01-investigacion.md` | Base conceptual, referencias F01–F12, código E1–E5, resultados y limitaciones | Incluye fuente normativa, MDN y fuente didáctica; ejemplos evaluados por separado |
| `docs/02-guion.md` | Narración completa por escenas y beats con tiempos objetivos | 9 escenas, guion 01–08, créditos 09 |
| `docs/03-storyboard.md` | Comportamiento visual exacto por beat, estados de ámbitos y salidas | 9 escenas, tablas E1/E2, errores E3/E4/E5 sin ambigüedad |
| `docs/04-atribuciones.md` | Bibliografía, estado de licencias, créditos y descripción preliminar | No declara recursos no creados como si ya existieran |
| `docs/H1-entrega.md` | Registro de controles, manifiesto y aceptación | Estado honesto: preparado, pendiente aceptación |

## 3. Checklist interno de Persona 1

- [x] Tema reportado como aprobado por el usuario.
- [x] Se registraron los tres nombres proporcionados sin agregar personas ni apellidos.
- [x] Investigación con **cinco fuentes técnicas** (especificación, documentación y libro) y un documento oficial de licencias de YouTube.
- [x] Resolución de nombres, bloques, shadowing, tablas didácticas y distinción de errores documentados.
- [x] E1, E2, E3, E4 y E5 probados por separado mediante Node.js v22.16.0.
- [x] Texto narrado completo en escenas 01–08 y créditos redactados en escena 09.
- [x] Storyboard de nueve escenas con beat, animación prevista, código exacto, estados y referencias.
- [x] Propuesta de créditos/descripción y registro provisional de licencias.
- [x] Alcance cerrado para Persona 2: no añadir contenido o ejemplos sin revisión.
- [ ] Lectura de prueba en voz alta con cronómetro por integrante (validación humana pendiente; guion estimado ≈ 14:25 de contenido).
- [ ] Confirmación de nombres completos y continuidad del grupo original del semestre.
- [ ] Repositorio designado y commit identificable (no existe acceso o URL confirmado).
- [ ] Aceptación **escrita** de Persona 2.

## 4. Comprobaciones reproducibles para Persona 2

**E1** debe imprimir:

```text
20
10
```

**E2** debe imprimir:

```text
adentro
medio
afuera
afuera
```

**E3** debe fallar con `SyntaxError` antes de ejecutar el script.  
**E4** debe fallar con `ReferenceError` al leer un nombre inexistente.  
**E5** debe fallar con `ReferenceError` por TDZ; no usar el valor de la variable exterior.

Para reproducirlo, copiar cada ejemplo de `01-investigacion.md` en un archivo `.js` independiente y ejecutarlo con una versión actual de Node.js. No ejecutarlos todos juntos.

## 5. Regla de traspaso H1 → Persona 2

**Estado actual:** `PREPARADO PARA REVISIÓN; NO ACEPTADO TODAVÍA`.

La Persona 2 revisa los cinco archivos y responde **por escrito** una de estas opciones:

- `ACEPTADO. Recibí H1 completo y los ejemplos están claros.`
- `RECHAZADO. Incidencias: [enumerar archivo, escena, ejemplo o referencia que necesita corrección].`
- `BLOQUEADO. Motivo: [precisar acceso o dato esencial faltante].`

**Solo una aceptación explícita habilita a Persona 2 a iniciar su implementación**, conforme al plan secuencial acordado. Persona 3 no inicia hasta que la entrega H2 de Persona 2 haya sido aceptada.

## 6. Trabajo expresamente NO realizado

- No se creó ni modificó un repositorio Remotion, React o TypeScript.
- No se programaron componentes, animaciones, escenas ni efectos.
- No se grabó audio ni se generaron MP4.
- No se creó un canal ni se subió ningún video a YouTube o Canvas.
- No se simularon commits, aprobación escrita del docente ni aceptación de Persona 2.
