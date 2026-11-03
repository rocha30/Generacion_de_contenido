// Estados de tabla EXACTOS de docs/03-storyboard.md (E1-0..E1-6, E2-0..E2-9).

export type Fila = {nombre: string; id: string; valor: string; nota?: string};
export type EstadoAmbito = 'activo' | 'abierto' | 'cerrado';
export type Ambito = {id: string; filas: Fila[]; estado: EstadoAmbito};
export type Busqueda = {nombre: string; recorrido: string[]; encontrado: boolean};
export type Tablas = {ambitos: Ambito[]; salida: string[]};

const x0e1: Fila = {nombre: 'x', id: 'x0', valor: '10'};
const x1e1: Fila = {nombre: 'x', id: 'x1', valor: '20'};

export const E1_ESTADOS: Record<string, Tablas> = {
  'E1-0': {ambitos: [{id: 'A0', filas: [], estado: 'activo'}], salida: []},
  'E1-1': {ambitos: [{id: 'A0', filas: [x0e1], estado: 'activo'}], salida: []},
  'E1-2': {ambitos: [{id: 'A0', filas: [x0e1], estado: 'abierto'}, {id: 'A1', filas: [], estado: 'activo'}], salida: []},
  'E1-3': {ambitos: [{id: 'A0', filas: [x0e1], estado: 'abierto'}, {id: 'A1', filas: [x1e1], estado: 'activo'}], salida: []},
  'E1-4': {ambitos: [{id: 'A0', filas: [x0e1], estado: 'abierto'}, {id: 'A1', filas: [x1e1], estado: 'activo'}], salida: ['20']},
  'E1-5': {ambitos: [{id: 'A0', filas: [x0e1], estado: 'activo'}, {id: 'A1', filas: [x1e1], estado: 'cerrado'}], salida: ['20']},
  'E1-6': {ambitos: [{id: 'A0', filas: [x0e1], estado: 'activo'}, {id: 'A1', filas: [x1e1], estado: 'cerrado'}], salida: ['20', '10']},
};

const x0: Fila = {nombre: 'x', id: 'x0', valor: '"afuera"'};
const y1: Fila = {nombre: 'y', id: 'y1', valor: '"medio"'};
const x2: Fila = {nombre: 'x', id: 'x2', valor: '"adentro"'};
const a = (id: string, filas: Fila[], estado: EstadoAmbito): Ambito => ({id, filas, estado});

export const E2_ESTADOS: Record<string, Tablas> = {
  'E2-0': {ambitos: [a('A0', [], 'activo')], salida: []},
  'E2-1': {ambitos: [a('A0', [x0], 'activo')], salida: []},
  'E2-2': {ambitos: [a('A0', [x0], 'abierto'), a('A1', [y1], 'activo')], salida: []},
  'E2-3': {ambitos: [a('A0', [x0], 'abierto'), a('A1', [y1], 'abierto'), a('A2', [x2], 'activo')], salida: []},
  'E2-4': {ambitos: [a('A0', [x0], 'abierto'), a('A1', [y1], 'abierto'), a('A2', [x2], 'activo')], salida: ['adentro']},
  'E2-5': {ambitos: [a('A0', [x0], 'abierto'), a('A1', [y1], 'abierto'), a('A2', [x2], 'activo')], salida: ['adentro', 'medio']},
  'E2-6': {ambitos: [a('A0', [x0], 'abierto'), a('A1', [y1], 'activo'), a('A2', [x2], 'cerrado')], salida: ['adentro', 'medio']},
  'E2-7': {ambitos: [a('A0', [x0], 'abierto'), a('A1', [y1], 'activo'), a('A2', [x2], 'cerrado')], salida: ['adentro', 'medio', 'afuera']},
  'E2-8': {ambitos: [a('A0', [x0], 'activo'), a('A1', [y1], 'cerrado'), a('A2', [x2], 'cerrado')], salida: ['adentro', 'medio', 'afuera']},
  'E2-9': {ambitos: [a('A0', [x0], 'activo'), a('A1', [y1], 'cerrado'), a('A2', [x2], 'cerrado')], salida: ['adentro', 'medio', 'afuera', 'afuera']},
};

/** Pila de mapas del resolvedor (escena 07): solo los ámbitos abiertos, sin valores. */
export const comoPila = (t: Tablas): Ambito[] =>
  t.ambitos.filter((am) => am.estado !== 'cerrado').map((am) => ({...am, filas: am.filas.map((f) => ({...f, valor: ''}))}));
