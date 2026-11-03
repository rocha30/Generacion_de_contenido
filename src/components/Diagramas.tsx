import React from 'react';
import {COLOR, FUENTE} from '../tema';
import {entrada} from '../lib/anim';

/** Caja con título para diagramas conceptuales. */
export const Caja: React.FC<{titulo: string; children?: React.ReactNode; tono?: 'acento' | 'neutro' | 'apagado'; desde?: number; retraso?: number; style?: React.CSSProperties}> = ({
  titulo,
  children,
  tono = 'neutro',
  desde = 99,
  retraso = 0,
  style,
}) => {
  const p = entrada(desde, retraso);
  const borde = tono === 'acento' ? COLOR.acento : tono === 'apagado' ? COLOR.cerrado : '#9AA3AE';
  return (
    <div style={{border: `4px solid ${borde}`, borderRadius: 26, background: COLOR.tarjeta, padding: '22px 28px', opacity: p, transform: `scale(${0.95 + 0.05 * p})`, ...style}}>
      <div style={{fontFamily: FUENTE.sans, fontWeight: 800, fontSize: 42, color: tono === 'acento' ? COLOR.acento : COLOR.tinta, marginBottom: children ? 14 : 0}}>{titulo}</div>
      {children}
    </div>
  );
};

/** Flecha horizontal con rótulo. */
export const Flecha: React.FC<{texto?: string; desde?: number; retraso?: number; ancho?: number; color?: string}> = ({texto, desde = 99, retraso = 0, ancho = 160, color = COLOR.tinta}) => {
  const p = entrada(desde, retraso);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: p}}>
      {texto ? <div style={{fontFamily: FUENTE.sans, fontWeight: 600, fontSize: 28, color: COLOR.tintaSuave, textAlign: 'center', maxWidth: ancho + 60}}>{texto}</div> : null}
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{width: ancho * p, height: 8, background: color, borderRadius: 4}} />
        <div style={{width: 0, height: 0, borderTop: '18px solid transparent', borderBottom: '18px solid transparent', borderLeft: `28px solid ${color}`}} />
      </div>
    </div>
  );
};

/** Persona simplificada (círculo + nombre), sin emojis para evitar problemas de licencia. */
export const Persona: React.FC<{nombre: string; resaltada?: boolean; desde?: number; retraso?: number}> = ({nombre, resaltada, desde = 99, retraso = 0}) => {
  const p = entrada(desde, retraso);
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: p}}>
      <div style={{width: 104, height: 104, borderRadius: 52, background: resaltada ? COLOR.acento : '#C9CED4', boxShadow: resaltada ? `0 0 0 10px ${COLOR.acentoSuave}` : undefined}} />
      <div style={{width: 150, height: 64, borderRadius: '70px 70px 14px 14px', background: resaltada ? COLOR.acento : '#C9CED4', marginTop: -4}} />
      <div style={{fontFamily: FUENTE.sans, fontWeight: 800, fontSize: 38, color: resaltada ? COLOR.acento : COLOR.tinta}}>{nombre}</div>
    </div>
  );
};
