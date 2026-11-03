import React from 'react';
import {COLOR} from '../tema';
import {useClaves, type Clave} from '../lib/tiempo';
import {E2, sinResultados} from '../data/ejemplos';
import {E1_ESTADOS, E2_ESTADOS} from '../data/estados';
import {Escena, Fila, Columna} from '../components/Escena';
import {VistaEjemplo, type VistaEstado} from '../components/VistaEjemplo';
import {ScopeStack} from '../components/ScopeStack';
import {Etiqueta} from '../components/Etiqueta';
import {Caja, Flecha} from '../components/Diagramas';

type V = {fase: 'tabla'; paso: number} | {fase: 'precision'; paso: number} | ({fase: 'e2'; reto?: boolean} & VistaEstado);

const CLAVES: Clave<V>[] = [
  {beat: 'S05-B1', estado: {fase: 'tabla', paso: 0}},
  {beat: 'S05-B1', en: 0.55, estado: {fase: 'tabla', paso: 1}},
  {beat: 'S05-B2', estado: {fase: 'precision', paso: 0}},
  {beat: 'S05-B2', en: 0.35, estado: {fase: 'precision', paso: 1}},
  {beat: 'S05-B3', estado: {fase: 'e2', tablas: E2_ESTADOS['E2-0']}},
  {beat: 'S05-B3', en: 0.15, estado: {fase: 'e2', tablas: E2_ESTADOS['E2-1'], lineas: [1]}},
  {beat: 'S05-B3', en: 0.35, estado: {fase: 'e2', tablas: E2_ESTADOS['E2-2'], lineas: [2, 3]}},
  {beat: 'S05-B3', en: 0.55, estado: {fase: 'e2', tablas: E2_ESTADOS['E2-3'], lineas: [4, 5]}},
  {beat: 'S05-B4', estado: {fase: 'e2', tablas: E2_ESTADOS['E2-4'], lineas: [6], busqueda: {nombre: 'x', recorrido: ['A2'], encontrado: true}}},
  {beat: 'S05-B4', en: 0.42, estado: {fase: 'e2', tablas: E2_ESTADOS['E2-5'], lineas: [7], busqueda: {nombre: 'y', recorrido: ['A2', 'A1'], encontrado: true}}},
  {beat: 'S05-B5', estado: {fase: 'e2', tablas: E2_ESTADOS['E2-6'], lineas: [8]}},
  {beat: 'S05-B5', en: 0.3, estado: {fase: 'e2', reto: true, tablas: E2_ESTADOS['E2-6'], lineas: [9, 11], anotaciones: [{linea: 9, texto: '?', tono: 'neutro'}, {linea: 11, texto: '?', tono: 'neutro'}]}},
];

export const E05Tabla: React.FC = () => {
  const {actual: v, previo, desde} = useClaves(CLAVES);
  const titulo = 'Tabla de símbolos y resolución de nombres';
  if (v.fase === 'tabla') {
    return (
      <Escena numero="05" titulo={titulo}>
        <Fila>
          <Columna flex={1.3}>
            <ScopeStack ambitos={E1_ESTADOS['E1-3'].ambitos} tamano={40} etiquetas={{A0: 'A0 · ámbito exterior', A1: 'A1 · bloque interior'}} />
          </Columna>
          <Columna flex={1} style={{justifyContent: 'center', paddingTop: 80}}>
            {v.paso >= 1 ? (
              <>
                <Etiqueta texto="x0 y x1: mismo nombre" tono="tinta" tamano={44} desde={desde} />
                <Etiqueta texto="dos declaraciones distintas" tono="acento" tamano={44} desde={desde} retraso={20} />
              </>
            ) : null}
          </Columna>
        </Fila>
      </Escena>
    );
  }
  if (v.fase === 'precision') {
    return (
      <Escena numero="05" titulo={titulo} centrar>
        <Etiqueta texto="Tabla de símbolos = modelo didáctico" tono="acento" tamano={60} desde={v.paso === 0 ? desde : 99} />
        <div style={{marginTop: 18, fontSize: 34, color: COLOR.tintaSuave}}>no es la implementación interna documentada de un motor de JavaScript</div>
        <div style={{height: 80}} />
        {v.paso >= 1 ? (
          <Fila gap={30} style={{alignItems: 'center'}}>
            <Caja titulo="Código" desde={desde} />
            <Flecha desde={desde} retraso={12} ancho={110} />
            <Caja titulo="Resolvedor conceptual" tono="acento" desde={desde} retraso={24} />
            <Flecha desde={desde} retraso={36} ancho={110} />
            <Caja titulo="Vinculación" desde={desde} retraso={48} />
          </Fila>
        ) : null}
        {v.paso >= 1 ? (
          <div style={{marginTop: 50}}>
            <Etiqueta texto="La especificación habla de registros de entorno, no de esta tabla" tono="suave" tamano={32} desde={desde} retraso={90} />
          </div>
        ) : null}
      </Escena>
    );
  }
  const prev = previo?.fase === 'e2' ? previo.tablas : undefined;
  return (
    <Escena numero="05" titulo={titulo}>
      <VistaEjemplo
        ejemplo="E2"
        codigo={sinResultados(E2)}
        {...v}
        previas={prev}
        desde={desde}
        debajo={v.reto ? <Etiqueta texto="Pausá y predecí las dos últimas salidas" tono="acento" tamano={40} desde={desde} retraso={10} /> : null}
      />
    </Escena>
  );
};
