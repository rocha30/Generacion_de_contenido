# ¿Qué pasa cuando dos variables tienen el mismo nombre?

**Ámbitos, sombreado de variables y tablas de símbolos en compiladores**

Video educativo · Actividad 01: Generación de contenido
Universidad del Valle de Guatemala · Construcción de Compiladores

**Integrantes:** Diego Lopez · Luis Pedro Lira · Mario Rocha

---

## 🎬 Video final

### ▶️ [Ver / descargar el video final (`renders/video-final.mp4`)](renders/video-final.mp4)

Si GitHub no lo reproduce en el navegador, se puede descargar directamente:
**[Descargar MP4](https://github.com/rocha30/Generacion_de_contenido/raw/main/renders/video-final.mp4)**

| Dato | Valor |
|---|---|
| Duración | 18:49 (incluye 25 s de créditos) |
| Formato | MP4 · H.264 + AAC · 1920 × 1080 · 30 fps |
| Tamaño | 67 MB |
| Narración | Voz humana en español |

## De qué trata

A partir de un ejemplo mínimo en JavaScript:

```js
let x = 10;
{
  let x = 20;
  console.log(x); // 20
}
console.log(x);   // 10
```

el video explica cómo un compilador decide a qué declaración se refiere cada nombre:

1. **Gancho:** dos variables `x`; ¿cuál se imprime?
2. **Conceptos:** identificador, declaración, referencia y ámbito.
3. **Ámbitos:** entrar y salir de bloques como una pila.
4. **Shadowing:** la variable interna oculta a la externa sin sobrescribirla.
5. **Tabla de símbolos:** búsqueda desde el ámbito actual hacia afuera.
6. **Casos límite:** declaración duplicada y nombre no declarado.
7. **Demostración:** un resolvedor de nombres de 15 líneas.
8. **Cierre:** conexión con el análisis semántico.
9. **Créditos.**

> La tabla de símbolos que se muestra es un **modelo didáctico**, no la implementación interna de un motor de JavaScript.

## Documentación del proceso

| Archivo | Contenido |
|---|---|
| [docs/01-investigacion.md](docs/01-investigacion.md) | Investigación, términos y ejemplos verificados |
| [docs/02-guion.md](docs/02-guion.md) | Guion narrado completo |
| [docs/03-storyboard.md](docs/03-storyboard.md) | Storyboard de las escenas 01–09 |
| [docs/04-atribuciones.md](docs/04-atribuciones.md) | Bibliografía, licencias y atribuciones |
| [docs/05-produccion.md](docs/05-produccion.md) | Proyecto Remotion: comandos y estructura |
| [docs/06-marcas-de-tiempo.md](docs/06-marcas-de-tiempo.md) | Tiempos de cada fragmento narrado |
| [docs/07-checklist-final.md](docs/07-checklist-final.md) | Controles finales del video |
| [docs/H1-entrega.md](docs/H1-entrega.md) · [H2](docs/H2-entrega.md) · [H3](docs/H3-cierre.md) | Entregas entre integrantes |

## Cómo se hizo

El video está programado con **React + TypeScript** usando **[Remotion](https://www.remotion.dev)**. La narración se grabó en Audacity y se sincronizó automáticamente con las animaciones.

Para abrir el proyecto (requiere Node.js 20 o superior):

```bash
npm install
npm run dev            # Remotion Studio en el navegador
npm run render:final   # genera renders/video-final.mp4
```

Los archivos de narración (`public/narracion/*.wav`) no están en el repositorio por su tamaño, así que `render:final` desde un clon genera el video sin voz. El video con narración es [renders/video-final.mp4](renders/video-final.mp4).

## Bibliografía

- Ecma International / TC39, *ECMAScript 2026 Language Specification*, §9.1, §9.4.2, §14.2, §14.3.1. <https://tc39.es/ecma262/2026/>
- MDN Web Docs, *let*. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let>
- MDN Web Docs, *Block statement*. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block>
- MDN Web Docs, *ReferenceError: "x" is not defined*. <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Not_defined>
- Robert Nystrom, *Crafting Interpreters*, «Resolving and Binding». <https://craftinginterpreters.com/resolving-and-binding.html>
- Microsoft, *TypeScript diagnostic messages* (TS2304). <https://github.com/microsoft/TypeScript/blob/main/src/compiler/diagnosticMessages.json>

## Licencia

Video y material audiovisual originales del equipo, bajo **[Creative Commons Atribución 4.0 (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.es)**. Tipografías Inter y JetBrains Mono bajo SIL Open Font License 1.1. Sin música ni material de terceros.
