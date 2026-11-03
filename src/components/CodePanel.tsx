import React from 'react';
import {COLOR, FUENTE, SIN_LIGADURAS} from '../tema';
import {fundido} from '../lib/anim';

export type EstadoBloque = 'activo' | 'abierto' | 'cerrado';
export type Bloque = {desde: number; hasta: number; etiqueta: string; estado: EstadoBloque; nivel?: number};
export type Anotacion = {linea: number; texto: string; tono?: 'acento' | 'error' | 'neutro'};

type Props = {
  codigo: string;
  titulo?: string;
  lineasActivas?: number[];
  lineasError?: number[];
  bloques?: Bloque[];
  anotaciones?: Anotacion[];
  tamano?: number;
  /** Frames desde el último cambio de estado (para animar resaltados nuevos). */
  desde?: number;
  ancho?: number | string;
};

const PALABRAS_CLAVE = /^(let|const|var|function|return|for|if|throw|new|of|in|undefined|string)$/;
const TOKEN = /(\/\/.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\b\d+\b)|([A-Za-z_$][\w$]*)|(\s+)|([^\sA-Za-z_$\d"'`]+)/g;

const colorear = (linea: string) => {
  const piezas: React.ReactNode[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(linea))) {
    const [t, comentario, cadena, numero, ident] = m;
    let color: string = COLOR.codigoTexto;
    if (comentario) color = COLOR.codigoComentario;
    else if (cadena) color = COLOR.codigoCadena;
    else if (numero) color = COLOR.codigoNumero;
    else if (ident && PALABRAS_CLAVE.test(ident)) color = COLOR.codigoClave;
    else if (ident && linea[TOKEN.lastIndex] === '(') color = COLOR.codigoFuncion;
    piezas.push(
      <span key={i++} style={{color, fontStyle: comentario ? 'italic' : undefined}}>
        {t}
      </span>,
    );
  }
  return piezas;
};

const colorBloque = (e: EstadoBloque) =>
  e === 'activo'
    ? {borde: COLOR.acento, fondo: 'rgba(21,153,87,0.16)', texto: COLOR.codigoClave}
    : e === 'abierto'
      ? {borde: '#6B7685', fondo: 'rgba(255,255,255,0.04)', texto: '#AEB6C0'}
      : {borde: '#4A515C', fondo: 'transparent', texto: '#69717C'};

export const CodePanel: React.FC<Props> = ({
  codigo,
  titulo,
  lineasActivas = [],
  lineasError = [],
  bloques = [],
  anotaciones = [],
  tamano = 34,
  desde = 99,
  ancho = '100%',
}) => {
  const lineas = codigo.split('\n');
  const alto = Math.round(tamano * 1.6);
  const pad = 28;
  const aparece = fundido(desde);
  return (
    <div
      style={{
        width: ancho,
        background: COLOR.codigoFondo,
        borderRadius: 22,
        boxShadow: '0 18px 50px rgba(0,0,0,0.18)',
        overflow: 'hidden',
        fontFamily: FUENTE.mono,
        ...SIN_LIGADURAS,
      }}
    >
      {titulo ? (
        <div style={{padding: '14px 28px', background: '#16181D', color: '#9AA3AE', fontSize: 22, display: 'flex', gap: 10, alignItems: 'center'}}>
          <span style={{width: 13, height: 13, borderRadius: 7, background: '#3A3F48', display: 'inline-block'}} />
          <span style={{width: 13, height: 13, borderRadius: 7, background: '#3A3F48', display: 'inline-block'}} />
          <span style={{width: 13, height: 13, borderRadius: 7, background: '#3A3F48', display: 'inline-block', marginRight: 10}} />
          {titulo}
        </div>
      ) : null}
      <div style={{position: 'relative', padding: `${pad}px ${pad}px ${pad}px ${pad + 56}px`}}>
        {bloques.map((b, k) => {
          const c = colorBloque(b.estado);
          const nivel = b.nivel ?? 0;
          return (
            <div
              key={`b${k}`}
              style={{
                position: 'absolute',
                left: pad + 44 + nivel * 18,
                right: pad - 8 + nivel * 18,
                top: pad + (b.desde - 1) * alto - 4,
                height: (b.hasta - b.desde + 1) * alto + 8,
                border: `3px ${b.estado === 'cerrado' ? 'dashed' : 'solid'} ${c.borde}`,
                background: c.fondo,
                borderRadius: 14,
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  right: 12,
                  top: 6,
                  fontFamily: FUENTE.sans,
                  fontWeight: 800,
                  fontSize: 22,
                  color: c.texto,
                }}
              >
                {b.etiqueta}
              </span>
            </div>
          );
        })}
        {lineas.map((l, k) => {
          const n = k + 1;
          const activa = lineasActivas.includes(n);
          const error = lineasError.includes(n);
          const anot = anotaciones.filter((a) => a.linea === n);
          return (
            <div key={k} style={{position: 'relative', height: alto, display: 'flex', alignItems: 'center', fontSize: tamano, whiteSpace: 'pre'}}>
              {activa || error ? (
                <div
                  style={{
                    position: 'absolute',
                    left: -pad - 56,
                    right: -pad,
                    top: 0,
                    bottom: 0,
                    background: error ? 'rgba(214,69,69,0.28)' : 'rgba(127,212,168,0.20)',
                    borderLeft: `8px solid ${error ? COLOR.error : COLOR.acento}`,
                    opacity: aparece,
                  }}
                />
              ) : null}
              <span style={{position: 'absolute', left: -48, width: 32, textAlign: 'right', color: '#59616C', fontSize: tamano * 0.7}}>{n}</span>
              <span style={{position: 'relative'}}>{colorear(l)}</span>
              {anot.map((a, j) => (
                <span
                  key={j}
                  style={{
                    position: 'relative',
                    marginLeft: 26,
                    padding: '4px 16px',
                    borderRadius: 999,
                    fontFamily: FUENTE.sans,
                    fontWeight: 800,
                    fontSize: tamano * 0.66,
                    background: a.tono === 'error' ? COLOR.error : a.tono === 'neutro' ? '#4A515C' : COLOR.acento,
                    color: '#fff',
                    opacity: aparece,
                    transform: `translateX(${(1 - aparece) * 20}px)`,
                  }}
                >
                  {a.texto}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
