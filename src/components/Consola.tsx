import React from 'react';
import {COLOR, FUENTE} from '../tema';
import {fundido} from '../lib/anim';

type Props = {
  salida: string[];
  previa?: string[];
  desde?: number;
  /** Retraso (frames) antes de que aparezca la línea nueva, p. ej. tras animar una búsqueda. */
  retraso?: number;
  error?: string;
  tamano?: number;
  ancho?: number | string;
  vacio?: string;
};

export const Consola: React.FC<Props> = ({salida, previa, desde = 99, retraso = 0, error, tamano = 32, ancho = '100%', vacio = '(sin salida)'}) => (
  <div style={{width: ancho, background: COLOR.codigoFondo, borderRadius: 20, overflow: 'hidden', fontFamily: FUENTE.mono, boxShadow: '0 18px 50px rgba(0,0,0,0.18)'}}>
    <div style={{padding: '12px 24px', background: '#16181D', color: '#9AA3AE', fontSize: 22, fontFamily: FUENTE.sans, fontWeight: 600}}>Consola</div>
    <div style={{padding: '18px 26px', minHeight: tamano * 2.2}}>
      {salida.length === 0 && !error ? <div style={{color: '#59616C', fontSize: tamano * 0.8, fontStyle: 'italic'}}>{vacio}</div> : null}
      {salida.map((l, i) => {
        const nueva = previa !== undefined && i >= previa.length;
        const o = nueva ? fundido(desde, retraso) : 1;
        return (
          <div key={i} style={{color: COLOR.codigoTexto, fontSize: tamano, lineHeight: 1.5, opacity: o, transform: `translateX(${(1 - o) * -16}px)`}}>
            <span style={{color: COLOR.codigoClave, marginRight: 14}}>›</span>
            {l}
          </div>
        );
      })}
      {error ? (
        <div style={{color: '#FF8A8A', fontSize: tamano * 0.9, lineHeight: 1.5, opacity: fundido(desde, retraso)}}>
          ✖ {error}
        </div>
      ) : null}
    </div>
  </div>
);
