import React from 'react';
import {COLOR, FUENTE} from '../tema';
import {useClaves, type Clave} from '../lib/tiempo';
import {E3, E4, E5} from '../data/ejemplos';
import type {Tablas} from '../data/estados';
import {Escena, Fila, Columna} from '../components/Escena';
import {CodePanel} from '../components/CodePanel';
import {ScopeStack, framesBusqueda} from '../components/ScopeStack';
import {Consola} from '../components/Consola';
import {Etiqueta} from '../components/Etiqueta';

type V = {caso: 'E3' | 'E4' | 'E5'; paso: number};

const CLAVES: Clave<V>[] = [
  {beat: 'S06-B1', estado: {caso: 'E3', paso: 0}},
  {beat: 'S06-B1', en: 0.3, estado: {caso: 'E3', paso: 1}},
  {beat: 'S06-B1', en: 0.55, estado: {caso: 'E3', paso: 2}},
  {beat: 'S06-B2', estado: {caso: 'E4', paso: 0}},
  {beat: 'S06-B2', en: 0.3, estado: {caso: 'E4', paso: 1}},
  {beat: 'S06-B2', en: 0.55, estado: {caso: 'E4', paso: 2}},
  {beat: 'S06-B3', estado: {caso: 'E5', paso: 0}},
  {beat: 'S06-B3', en: 0.35, estado: {caso: 'E5', paso: 1}},
  {beat: 'S06-B3', en: 0.6, estado: {caso: 'E5', paso: 2}},
];

const TDZ: Tablas = {
  ambitos: [
    {id: 'A0', filas: [{nombre: 'x', id: 'x0', valor: '10'}], estado: 'abierto'},
    {id: 'A1', filas: [{nombre: 'x', id: 'x1', valor: '', nota: 'sin inicializar'}], estado: 'activo'},
  ],
  salida: [],
};
const GLOBAL_VACIO: Tablas = {ambitos: [{id: 'A0', filas: [], estado: 'activo'}], salida: []};

export const E06Errores: React.FC = () => {
  const {actual: v, desde} = useClaves(CLAVES);
  const titulo = 'Dos errores que conviene distinguir';
  if (v.caso === 'E3') {
    return (
      <Escena numero="06" titulo={titulo}>
        <Fila>
          <Columna flex={1}>
            <CodePanel codigo={E3} titulo="ejemplo-3.js" tamano={44} lineasError={v.paso >= 1 ? [2, 3] : []} anotaciones={v.paso >= 1 ? [{linea: 3, texto: 'duplicada', tono: 'error'}] : []} desde={desde} />
            {v.paso >= 2 ? <Etiqueta texto="SyntaxError · declaración léxica duplicada · error temprano" tono="error" tamano={36} desde={desde} /> : null}
          </Columna>
          <Columna flex={0.8}>
            <Consola salida={[]} vacio="(no se ejecuta ninguna línea)" tamano={34} />
            {v.paso >= 2 ? <Etiqueta texto="Se rechaza antes de ejecutar" tono="tinta" tamano={36} desde={desde} retraso={25} /> : null}
          </Columna>
        </Fila>
      </Escena>
    );
  }
  if (v.caso === 'E4') {
    const busqueda = {nombre: 'precioFinal', recorrido: ['A0'], encontrado: false};
    return (
      <Escena numero="06" titulo={titulo}>
        <Fila>
          <Columna flex={1.1}>
            <CodePanel codigo={E4} titulo="ejemplo-4.js" tamano={40} lineasActivas={[1]} desde={desde} />
            {v.paso >= 2 ? (
              <div style={{marginTop: 10}}>
                <Etiqueta texto="¿Por qué recién al ejecutar?" tono="tinta" tamano={34} desde={desde} />
                <div style={{marginTop: 18, fontSize: 30, lineHeight: 1.4, opacity: desde > 20 ? 1 : desde / 20}}>
                  Un nombre global puede aparecer mientras el programa corre, por ejemplo{' '}
                  <span style={{fontFamily: FUENTE.mono, background: '#E6E9E4', padding: '2px 10px', borderRadius: 8}}>globalThis.precioFinal = 5;</span>
                </div>
              </div>
            ) : null}
          </Columna>
          <Columna flex={1}>
            <ScopeStack ambitos={GLOBAL_VACIO.ambitos} busqueda={v.paso === 0 ? busqueda : undefined} desde={desde} etiquetas={{A0: 'A0 · exterior (global)'}} tamano={30} />
            {v.paso === 0 ? <Consola salida={[]} desde={desde} retraso={framesBusqueda(busqueda)} error="ReferenceError" tamano={32} /> : <Consola salida={[]} error="ReferenceError" tamano={32} />}
            {v.paso >= 1 ? <Etiqueta texto="ReferenceError · nombre no resuelto al evaluarse" tono="error" tamano={34} desde={v.paso === 1 ? desde : 99} /> : null}
          </Columna>
        </Fila>
      </Escena>
    );
  }
  const busqueda = {nombre: 'x', recorrido: ['A1'], encontrado: true};
  return (
    <Escena numero="06" titulo={titulo}>
      <Fila>
        <Columna flex={1}>
          <CodePanel codigo={E5} titulo="ejemplo-5.js" tamano={40} lineasActivas={[3]} lineasError={v.paso >= 1 ? [3] : []} bloques={[{desde: 2, hasta: 5, etiqueta: 'A1', estado: 'activo', nivel: 0}]} desde={desde} />
          {v.paso >= 2 ? <Etiqueta texto="Lectura antes de inicialización → ReferenceError" tono="error" tamano={34} desde={desde} /> : null}
          {v.paso >= 2 ? <Etiqueta texto="No se usa la x exterior (x0)" tono="tinta" tamano={34} desde={desde} retraso={25} /> : null}
        </Columna>
        <Columna flex={1}>
          <ScopeStack ambitos={TDZ.ambitos} busqueda={busqueda} desde={v.paso === 0 ? desde : 99} tamano={30} />
          <Consola salida={[]} error={v.paso >= 1 ? 'ReferenceError' : undefined} desde={v.paso === 1 ? desde : 99} tamano={32} />
        </Columna>
      </Fila>
      <div style={{marginTop: 24, fontSize: 26, color: COLOR.tintaSuave}}>Advertencia breve: el let interno ya pertenece al bloque antes de ejecutarse su línea.</div>
    </Escena>
  );
};
