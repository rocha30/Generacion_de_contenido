// Código EXACTO de docs/01-investigacion.md, sección 2. No modificar sin revisar el guion.

export const E1 = `let x = 10;
{
  let x = 20;
  console.log(x); // 20
}
console.log(x);   // 10`;

export const E2 = `let x = "afuera";
{
  let y = "medio";
  {
    let x = "adentro";
    console.log(x); // adentro
    console.log(y); // medio
  }
  console.log(x);   // afuera
}
console.log(x);     // afuera`;

export const E3 = `{
  let saldo = 10;
  let saldo = 20;
}`;

export const E4 = `console.log(precioFinal);`;

export const E5 = `let x = 10;
{
  console.log(x);
  let x = 20;
}`;

export const E6 = `const ambitos: Map<string, string>[] = [];

function abrirAmbito() { ambitos.push(new Map()); }
function cerrarAmbito() { ambitos.pop(); }

function declarar(nombre: string, id: string) {
  const actual = ambitos[ambitos.length - 1];
  if (actual.has(nombre)) throw new Error(\`'\${nombre}' ya está declarado en este ámbito\`);
  actual.set(nombre, id);
}

function resolver(nombre: string): string {
  for (let i = ambitos.length - 1; i >= 0; i--) {
    const id = ambitos[i].get(nombre);
    if (id !== undefined) return id;
  }
  throw new Error(\`'\${nombre}' no está declarado\`);
}`;

/** Quita los comentarios de resultado para mostrar el código "sin respuestas". */
export const sinResultados = (codigo: string) => codigo.replace(/\s*\/\/ .*$/gm, '');
