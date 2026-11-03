import React from 'react';
import {COLOR, FUENTE} from '../tema';
import {fundido} from '../lib/anim';
import type {Ambito, Busqueda} from '../data/estados';
import {SymbolTable} from './SymbolTable';

const PASO = 24; // frames por ámbito visitado durante una búsqueda

type Props = {
  ambitos: Ambito[];
  previos?: Ambito[];
  busqueda?: Busqueda;
  desde?: number;
  /** anidado: A2 dentro de A1 dentro de A0. pila: mapas apilados, el más interno arriba. */
  modo?: 'anidado' | 'pila';
  tamano?: number;
  etiquetas?: Record<string, string>;
};

/** Estado visual de la búsqueda en un ámbito: undefined = no visitado aún. */
const marcaBusqueda = (b: Busqueda | undefined, id: string, desde: number) => {
  if (!b) return undefined;
  const j = b.recorrido.indexOf(id);
  if (j === -1) return undefined;
  const visitados = Math.floor(desde / PASO);
  if (j > visitados) return undefined;
  if (j === visitados && desde % PASO < PASO / 2) return 'buscando' as const;
  const ultimo = j === b.recorrido.length - 1;
  return ultimo && b.encontrado ? ('encontrado' as const) : ('no' as const);
};

const Insignia: React.FC<{texto: string; fondo: string; color?: string}> = ({texto, fondo, color = '#fff'}) => (
  <span style={{padding: '4px 14px', borderRadius: 999, background: fondo, color, fontSize: 20, fontWeight: 800, fontFamily: FUENTE.sans}}>{texto}</span>
);

const Tarjeta: React.FC<{
  ambito: Ambito;
  previos?: Ambito[];
  busqueda?: Busqueda;
  desde: number;
  tamano: number;
  etiqueta?: string;
  hijo?: React.ReactNode;
  mostrarValor: boolean;
}> = ({ambito, previos, busqueda, desde, tamano, etiqueta, hijo, mostrarValor}) => {
  const previo = previos?.find((p) => p.id === ambito.id);
  const nuevo = previos !== undefined && !previo;
  const nuevas = new Set(ambito.filas.filter((f) => !previo?.filas.some((p) => p.id === f.id)).map((f) => f.id));
  if (nuevo) ambito.filas.forEach((f) => nuevas.delete(f.id));
  const marca = marcaBusqueda(busqueda, ambito.id, desde);
  const filaEncontrada = marca === 'encontrado' ? ambito.filas.find((f) => f.nombre === busqueda?.nombre)?.id : undefined;
  const cerrado = ambito.estado === 'cerrado';
  const activo = ambito.estado === 'activo';
  const o = nuevo ? fundido(desde) : 1;
  const borde = marca === 'buscando' ? COLOR.tinta : activo ? COLOR.acento : cerrado ? COLOR.cerrado : '#9AA3AE';
  return (
    <div
      style={{
        border: `4px ${cerrado ? 'dashed' : 'solid'} ${borde}`,
        background: activo ? '#FBFEFC' : COLOR.tarjeta,
        borderRadius: 20,
        padding: '14px 18px 18px',
        opacity: o * (cerrado ? 0.6 : 1),
        transform: `scale(${0.96 + 0.04 * o})`,
        boxShadow: activo ? '0 10px 30px rgba(21,153,87,0.18)' : '0 6px 18px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, fontFamily: FUENTE.sans}}>
        <span style={{fontWeight: 800, fontSize: tamano * 1.05, color: cerrado ? COLOR.cerrado : COLOR.tinta}}>{etiqueta ?? ambito.id}</span>
        {activo ? <Insignia texto="activo" fondo={COLOR.acento} /> : null}
        {cerrado ? <Insignia texto="cerrado" fondo={COLOR.cerrado} /> : null}
        <span style={{flex: 1}} />
        {marca === 'buscando' ? <Insignia texto={`¿${busqueda!.nombre}?`} fondo={COLOR.tinta} /> : null}
        {marca === 'no' ? <Insignia texto={`✗ no está ${busqueda!.nombre}`} fondo={COLOR.errorSuave} color={COLOR.error} /> : null}
        {marca === 'encontrado' ? <Insignia texto={`✓ ${busqueda!.nombre} encontrado`} fondo={COLOR.acento} /> : null}
      </div>
      <SymbolTable filas={ambito.filas} nuevas={nuevas} desde={desde} tamano={tamano} resaltada={filaEncontrada} apagada={cerrado} mostrarValor={mostrarValor} />
      {hijo ? <div style={{marginTop: 16}}>{hijo}</div> : null}
    </div>
  );
};

export const ScopeStack: React.FC<Props> = ({ambitos, previos, busqueda, desde = 99, modo = 'anidado', tamano = 28, etiquetas = {}}) => {
  if (modo === 'pila') {
    const arriba = [...ambitos].reverse();
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
        <div style={{fontFamily: FUENTE.sans, fontWeight: 800, color: COLOR.tintaSuave, fontSize: 22, letterSpacing: 2, textTransform: 'uppercase'}}>▲ tope de la pila</div>
        {arriba.map((am) => (
          <Tarjeta key={am.id} ambito={am} previos={previos} busqueda={busqueda} desde={desde} tamano={tamano} etiqueta={`mapa ${am.id}`} mostrarValor={false} />
        ))}
        {arriba.length === 0 ? <div style={{fontFamily: FUENTE.sans, fontSize: 26, color: COLOR.tintaSuave, fontStyle: 'italic'}}>pila vacía</div> : null}
      </div>
    );
  }
  const anidar = (i: number): React.ReactNode =>
    i >= ambitos.length ? null : (
      <Tarjeta ambito={ambitos[i]} previos={previos} busqueda={busqueda} desde={desde} tamano={tamano} etiqueta={etiquetas[ambitos[i].id]} hijo={anidar(i + 1)} mostrarValor />
    );
  return <>{anidar(0)}</>;
};

/** Frames que tarda en completarse una búsqueda (útil para sincronizar la consola). */
export const framesBusqueda = (b: Busqueda) => b.recorrido.length * PASO;
