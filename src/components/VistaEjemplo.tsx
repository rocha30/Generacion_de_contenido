import React from 'react';
import type {Busqueda, Tablas} from '../data/estados';
import {CodePanel, type Anotacion, type Bloque} from './CodePanel';
import {ScopeStack, framesBusqueda} from './ScopeStack';
import {Consola} from './Consola';
import {Columna, Fila} from './Escena';

const RANGOS: Record<'E1' | 'E2', Record<string, [number, number]>> = {
  E1: {A0: [1, 6], A1: [2, 5]},
  E2: {A0: [1, 11], A1: [2, 10], A2: [4, 8]},
};

/** Marcos de ámbito sobre el código, derivados del estado de las tablas (una sola fuente de verdad). */
export const bloquesDe = (ejemplo: 'E1' | 'E2', t: Tablas): Bloque[] =>
  t.ambitos.map((a, i) => ({desde: RANGOS[ejemplo][a.id][0], hasta: RANGOS[ejemplo][a.id][1], etiqueta: a.id, estado: a.estado, nivel: i}));

export type VistaEstado = {
  tablas: Tablas;
  lineas?: number[];
  anotaciones?: Anotacion[];
  busqueda?: Busqueda;
  bloques?: boolean;
};

type Props = VistaEstado & {
  ejemplo: 'E1' | 'E2';
  codigo: string;
  previas?: Tablas;
  desde: number;
  debajo?: React.ReactNode;
  tamanoTabla?: number;
};

export const VistaEjemplo: React.FC<Props> = ({ejemplo, codigo, tablas, previas, lineas, anotaciones, busqueda, bloques = true, desde, debajo, tamanoTabla}) => (
  <Fila>
    <Columna flex={1.1}>
      <CodePanel
        codigo={codigo}
        titulo={ejemplo === 'E1' ? 'ejemplo-1.js' : 'ejemplo-2.js'}
        lineasActivas={lineas}
        anotaciones={anotaciones}
        bloques={bloques ? bloquesDe(ejemplo, tablas) : []}
        desde={desde}
        tamano={ejemplo === 'E1' ? 44 : 33}
      />
      {debajo}
    </Columna>
    <Columna flex={1}>
      <ScopeStack ambitos={tablas.ambitos} previos={previas?.ambitos} busqueda={busqueda} desde={desde} tamano={tamanoTabla ?? (ejemplo === 'E1' ? 36 : 28)} />
      <Consola salida={tablas.salida} previa={previas?.salida} desde={desde} retraso={busqueda ? framesBusqueda(busqueda) : 0} tamano={ejemplo === 'E1' ? 38 : 30} />
    </Columna>
  </Fila>
);
