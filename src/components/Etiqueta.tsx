import React from 'react';
import {COLOR, FUENTE} from '../tema';
import {entrada} from '../lib/anim';

type Tono = 'acento' | 'error' | 'tinta' | 'suave';

const estilos: Record<Tono, {fondo: string; color: string}> = {
  acento: {fondo: COLOR.acento, color: '#fff'},
  error: {fondo: COLOR.error, color: '#fff'},
  tinta: {fondo: COLOR.tinta, color: '#fff'},
  suave: {fondo: COLOR.tarjeta, color: COLOR.tinta},
};

/** Rótulo grande y breve (Highlight del plan): aparece con un pequeño resorte. */
export const Etiqueta: React.FC<{texto: React.ReactNode; tono?: Tono; tamano?: number; desde?: number; retraso?: number; tachado?: boolean; style?: React.CSSProperties}> = ({
  texto,
  tono = 'acento',
  tamano = 40,
  desde = 99,
  retraso = 0,
  tachado,
  style,
}) => {
  const p = entrada(desde, retraso);
  const e = estilos[tono];
  return (
    <div
      style={{
        display: 'inline-block',
        alignSelf: 'flex-start',
        padding: `${tamano * 0.35}px ${tamano * 0.7}px`,
        borderRadius: tamano * 0.5,
        background: e.fondo,
        color: e.color,
        fontFamily: FUENTE.sans,
        fontWeight: 800,
        fontSize: tamano,
        lineHeight: 1.2,
        boxShadow: tono === 'suave' ? `0 0 0 3px ${COLOR.linea}` : '0 10px 30px rgba(0,0,0,0.12)',
        opacity: p,
        transform: `translateY(${(1 - p) * 24}px) scale(${0.9 + 0.1 * p})`,
        textDecoration: tachado ? 'line-through' : undefined,
        textDecorationThickness: tachado ? 5 : undefined,
        ...style,
      }}
    >
      {texto}
    </div>
  );
};
