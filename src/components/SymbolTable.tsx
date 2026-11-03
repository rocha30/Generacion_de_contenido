import React from 'react';
import {COLOR, FUENTE} from '../tema';
import {fundido} from '../lib/anim';
import type {Fila} from '../data/estados';

type Props = {
  filas: Fila[];
  /** Filas que deben aparecer animadas (recién declaradas). */
  nuevas?: Set<string>;
  resaltada?: string;
  desde?: number;
  tamano?: number;
  mostrarValor?: boolean;
  apagada?: boolean;
};

export const SymbolTable: React.FC<Props> = ({filas, nuevas, resaltada, desde = 99, tamano = 28, mostrarValor = true, apagada}) => {
  if (filas.length === 0) {
    return <div style={{fontFamily: FUENTE.sans, fontSize: tamano * 0.8, color: COLOR.tintaSuave, fontStyle: 'italic', padding: '6px 4px'}}>(vacía)</div>;
  }
  const cols = mostrarValor ? '1fr 1.2fr 1.6fr' : '1fr 1.2fr';
  return (
    <div style={{fontFamily: FUENTE.mono, fontSize: tamano}}>
      <div style={{display: 'grid', gridTemplateColumns: cols, gap: 12, color: COLOR.tintaSuave, fontFamily: FUENTE.sans, fontSize: tamano * 0.62, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, padding: '0 12px 4px'}}>
        <span>Nombre</span>
        <span>ID didáctico</span>
        {mostrarValor ? <span>Valor</span> : null}
      </div>
      {filas.map((f) => {
        const clave = f.id;
        const o = nuevas?.has(clave) ? fundido(desde) : 1;
        const res = resaltada === clave;
        return (
          <div
            key={clave}
            style={{
              display: 'grid',
              gridTemplateColumns: cols,
              gap: 12,
              padding: '8px 12px',
              borderRadius: 10,
              background: res ? COLOR.acento : apagada ? '#EEF0F2' : '#F3F7F4',
              color: res ? '#fff' : apagada ? COLOR.cerrado : COLOR.tinta,
              fontWeight: 700,
              opacity: o,
              transform: `translateY(${(1 - o) * 14}px)`,
              marginTop: 6,
            }}
          >
            <span>{f.nombre}</span>
            <span>{f.id}</span>
            {mostrarValor ? <span>{f.nota ?? f.valor}</span> : null}
          </div>
        );
      })}
    </div>
  );
};
