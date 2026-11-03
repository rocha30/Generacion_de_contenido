import React from 'react';
import {COLOR, FUENTE} from '../tema';
import {useClaves, type Clave} from '../lib/tiempo';
import {E2, E6, sinResultados} from '../data/ejemplos';
import {E2_ESTADOS, comoPila, type Busqueda, type Tablas} from '../data/estados';
import {Escena, Fila, Columna} from '../components/Escena';
import {CodePanel} from '../components/CodePanel';
import {ScopeStack, framesBusqueda} from '../components/ScopeStack';
import {Consola} from '../components/Consola';
import {Etiqueta} from '../components/Etiqueta';
import {entrada} from '../lib/anim';

type Traza = {tablas: Tablas | null; linea?: number; busqueda?: Busqueda; acertaste?: boolean};
type V =
  | {fase: 'resolvedor'; lineas: number[]; rotulo?: boolean}
  | ({fase: 'traza'} & Traza)
  | {fase: 'errores'; paso: number}
  | {fase: 'final'};

const t = (en: number, x: Traza): Clave<V> => ({beat: 'S07-B2', en, estado: {fase: 'traza', ...x}});

const CLAVES: Clave<V>[] = [
  {beat: 'S07-B1', estado: {fase: 'resolvedor', lineas: []}},
  {beat: 'S07-B1', en: 0.18, estado: {fase: 'resolvedor', lineas: [1], rotulo: true}},
  {beat: 'S07-B1', en: 0.32, estado: {fase: 'resolvedor', lineas: [3], rotulo: true}},
  {beat: 'S07-B1', en: 0.42, estado: {fase: 'resolvedor', lineas: [4], rotulo: true}},
  {beat: 'S07-B1', en: 0.52, estado: {fase: 'resolvedor', lineas: [6, 7, 8, 9, 10], rotulo: true}},
  {beat: 'S07-B1', en: 0.64, estado: {fase: 'resolvedor', lineas: [12, 13, 14, 15, 16, 17, 18], rotulo: true}},
  t(0, {tablas: null}),
  t(0.04, {tablas: E2_ESTADOS['E2-1'], linea: 1}),
  t(0.12, {tablas: E2_ESTADOS['E2-2'], linea: 3}),
  t(0.2, {tablas: E2_ESTADOS['E2-3'], linea: 5}),
  t(0.3, {tablas: E2_ESTADOS['E2-4'], linea: 6, busqueda: {nombre: 'x', recorrido: ['A2'], encontrado: true}}),
  t(0.42, {tablas: E2_ESTADOS['E2-5'], linea: 7, busqueda: {nombre: 'y', recorrido: ['A2', 'A1'], encontrado: true}}),
  t(0.55, {tablas: E2_ESTADOS['E2-6'], linea: 8}),
  t(0.62, {tablas: E2_ESTADOS['E2-7'], linea: 9, busqueda: {nombre: 'x', recorrido: ['A1', 'A0'], encontrado: true}}),
  t(0.76, {tablas: E2_ESTADOS['E2-8'], linea: 10}),
  t(0.84, {tablas: E2_ESTADOS['E2-9'], linea: 11, busqueda: {nombre: 'x', recorrido: ['A0'], encontrado: true}}),
  t(0.95, {tablas: E2_ESTADOS['E2-9'], acertaste: true}),
  {beat: 'S07-B3', estado: {fase: 'errores', paso: 0}},
  {beat: 'S07-B3', en: 0.28, estado: {fase: 'errores', paso: 1}},
  {beat: 'S07-B3', en: 0.62, estado: {fase: 'errores', paso: 2}},
  {beat: 'S07-B4', estado: {fase: 'final'}},
];

const Llamada: React.FC<{codigo: string; resultado: string; desde: number; retraso?: number}> = ({codigo, resultado, desde, retraso = 0}) => (
  <div style={{background: COLOR.tarjeta, borderRadius: 20, padding: '22px 28px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', opacity: entrada(desde, retraso)}}>
    <div style={{fontFamily: FUENTE.mono, fontSize: 34, fontWeight: 700}}>{codigo}</div>
    <div style={{fontFamily: FUENTE.mono, fontSize: 30, color: COLOR.error, marginTop: 10, opacity: entrada(desde, retraso + 25)}}>✗ Error: {resultado}</div>
  </div>
);

const Comparacion: React.FC<{desde: number}> = ({desde}) => (
  <Fila gap={30}>
    {[
      {quien: 'JavaScript', cuando: 'al ejecutar', msg: 'ReferenceError', tono: COLOR.tinta},
      {quien: 'TypeScript (tsc)', cuando: 'antes de ejecutar', msg: "error TS2304: Cannot find name 'precioFinal'.", tono: COLOR.acento},
    ].map((c, i) => (
      <Columna key={c.quien} gap={12} style={{background: COLOR.tarjeta, borderRadius: 22, padding: 26, border: `4px solid ${c.tono}`, opacity: entrada(desde, i * 20)}}>
        <div style={{fontWeight: 800, fontSize: 36, color: c.tono}}>{c.quien}</div>
        <div style={{fontSize: 30}}>Error <b>{c.cuando}</b></div>
        <div style={{fontFamily: FUENTE.mono, fontSize: 24, background: COLOR.codigoFondo, color: '#FF9A9A', padding: '12px 16px', borderRadius: 12}}>{c.msg}</div>
      </Columna>
    ))}
  </Fila>
);

export const E07Codigo: React.FC = () => {
  const {actual: v, previo, desde} = useClaves(CLAVES);
  const titulo = 'Del dibujo al código';
  if (v.fase === 'resolvedor') {
    return (
      <Escena numero="07" titulo={titulo}>
        <Fila>
          <Columna flex={3}>
            <CodePanel codigo={E6} titulo="resolvedor.ts" tamano={20} lineasActivas={v.lineas} desde={desde} />
          </Columna>
          <Columna flex={1} style={{paddingTop: 30}}>
            <ScopeStack ambitos={[]} modo="pila" />
            {v.rotulo ? <Etiqueta texto="Pila de ámbitos = pila de mapas" tono="acento" tamano={38} desde={previo?.fase === 'resolvedor' && previo.rotulo ? 99 : desde} /> : null}
            <div style={{fontSize: 28, color: COLOR.tintaSuave, lineHeight: 1.4}}>Misma estrategia que el resolvedor de <i>Crafting Interpreters</i> (versión mínima, escrita para este video).</div>
          </Columna>
        </Fila>
      </Escena>
    );
  }
  if (v.fase === 'traza') {
    const pila = v.tablas ? comoPila(v.tablas) : [];
    const prevT = previo?.fase === 'traza' && previo.tablas ? previo.tablas : undefined;
    const prevPila = previo?.fase === 'traza' ? (prevT ? comoPila(prevT) : []) : undefined;
    const salida = v.tablas?.salida ?? [];
    return (
      <Escena numero="07" titulo={titulo}>
        <Fila gap={36}>
          <Columna flex={1}>
            <CodePanel codigo={sinResultados(E2)} titulo="ejemplo-2.js" tamano={26} lineasActivas={v.linea ? [v.linea] : []} desde={desde} />
            {v.busqueda ? <Etiqueta texto={`resolver("${v.busqueda.nombre}")`} tono="tinta" tamano={32} desde={desde} style={{fontFamily: FUENTE.mono}} /> : null}
          </Columna>
          <Columna flex={0.95}>
            <ScopeStack ambitos={pila} previos={prevPila} busqueda={v.busqueda} desde={desde} modo="pila" tamano={26} />
          </Columna>
          <Columna flex={0.8}>
            <Consola salida={salida} previa={prevT?.salida ?? []} desde={desde} retraso={v.busqueda ? framesBusqueda(v.busqueda) : 0} tamano={30} />
            {salida.length > 0 ? <Etiqueta texto={`${salida.length}/4`} tono="tinta" tamano={40} /> : null}
            {v.acertaste ? <Etiqueta texto="¿Acertaste?" tono="acento" tamano={52} desde={desde} /> : null}
          </Columna>
        </Fila>
      </Escena>
    );
  }
  if (v.fase === 'errores') {
    return (
      <Escena numero="07" titulo={titulo}>
        <Fila gap={40}>
          <Columna flex={1}>
            <Llamada codigo={'declarar("saldo", …)  // otra vez'} resultado="'saldo' ya está declarado en este ámbito" desde={v.paso === 0 ? desde : 99} />
            {v.paso >= 1 ? <Llamada codigo={'resolver("precioFinal")'} resultado="'precioFinal' no está declarado" desde={v.paso === 1 ? desde : 99} /> : null}
            {v.paso >= 1 ? <Etiqueta texto="Ambos se detectan durante el análisis" tono="acento" tamano={34} desde={v.paso === 1 ? desde : 99} retraso={50} /> : null}
          </Columna>
          <Columna flex={1.1}>
            {v.paso >= 2 ? (
              <>
                <div style={{fontWeight: 800, fontSize: 34}}>
                  Y con <span style={{fontFamily: FUENTE.mono}}>console.log(precioFinal);</span>
                </div>
                <Comparacion desde={desde} />
                <Etiqueta texto="Mismo código, distintas reglas" tono="tinta" tamano={40} desde={desde} retraso={60} />
              </>
            ) : null}
          </Columna>
        </Fila>
      </Escena>
    );
  }
  return (
    <Escena numero="07" titulo={titulo}>
      <Fila>
        <Columna flex={1.2}>
          <CodePanel codigo={E2} titulo="ejemplo-2.js" tamano={31} />
        </Columna>
        <Columna flex={1}>
          <Consola salida={E2_ESTADOS['E2-9'].salida} tamano={40} />
          <Etiqueta texto="Un mismo nombre, distintas vinculaciones" tono="acento" tamano={40} desde={desde} retraso={10} />
        </Columna>
      </Fila>
    </Escena>
  );
};
