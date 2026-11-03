import React from 'react';
import {COLOR, FUENTE} from '../tema';
import {useClaves, type Clave} from '../lib/tiempo';
import {entrada} from '../lib/anim';
import {E1, sinResultados} from '../data/ejemplos';
import {Escena, Columna, Fila} from '../components/Escena';
import {CodePanel} from '../components/CodePanel';
import {Consola} from '../components/Consola';
import {Etiqueta} from '../components/Etiqueta';

type V = {fase: 'fichas' | 'pregunta' | 'apuesta' | 'codigo' | 'titulo'; linea?: number; salida?: string[]};

const CLAVES: Clave<V>[] = [
  {beat: 'S01-B1', estado: {fase: 'fichas'}},
  {beat: 'S01-B1', en: 0.45, estado: {fase: 'pregunta'}},
  {beat: 'S01-B1', en: 0.82, estado: {fase: 'apuesta'}},
  {beat: 'S01-B2', estado: {fase: 'codigo', salida: []}},
  {beat: 'S01-B2', en: 0.08, estado: {fase: 'codigo', linea: 4, salida: ['20']}},
  {beat: 'S01-B2', en: 0.2, estado: {fase: 'codigo', linea: 6, salida: ['20', '10']}},
  {beat: 'S01-B2', en: 0.55, estado: {fase: 'titulo', salida: ['20', '10']}},
];

export const Ficha: React.FC<{nombre: string; valor: string; desde: number; retraso?: number; pie?: string}> = ({nombre, valor, desde, retraso = 0, pie}) => {
  const p = entrada(desde, retraso);
  return (
    <div style={{width: 340, padding: '34px 0', borderRadius: 32, background: COLOR.tarjeta, boxShadow: '0 16px 40px rgba(0,0,0,0.10)', textAlign: 'center', opacity: p, transform: `translateY(${(1 - p) * 40}px)`}}>
      <div style={{fontFamily: FUENTE.mono, fontSize: 120, fontWeight: 700}}>{nombre}</div>
      <div style={{fontFamily: FUENTE.mono, fontSize: 64, color: COLOR.acento, fontWeight: 700}}>= {valor}</div>
      {pie ? <div style={{fontSize: 26, color: COLOR.tintaSuave, marginTop: 10}}>{pie}</div> : null}
    </div>
  );
};

export const E01Gancho: React.FC = () => {
  const {actual: v, previo, desde} = useClaves(CLAVES);
  if (v.fase === 'fichas' || v.fase === 'pregunta' || v.fase === 'apuesta') {
    const d0 = v.fase === 'fichas' ? desde : 99;
    return (
      <Escena numero="01" titulo="Gancho" centrar>
        <Fila gap={90}>
          <Ficha nombre="x" valor="10" desde={d0} />
          <Ficha nombre="x" valor="20" desde={d0} retraso={14} />
        </Fila>
        <div style={{height: 70}} />
        {v.fase !== 'fichas' ? <Etiqueta texto="¿Cuál se imprime?" tono="tinta" tamano={64} desde={v.fase === 'pregunta' ? desde : 99} /> : null}
        <div style={{height: 40}} />
        {v.fase === 'apuesta' ? (
          <Fila gap={30}>
            {['10', '20', 'error'].map((t, i) => (
              <Etiqueta key={t} texto={`Apuesta: ${t}`} tono="suave" tamano={40} desde={desde} retraso={i * 8} />
            ))}
          </Fila>
        ) : null}
      </Escena>
    );
  }
  return (
    <Escena numero="01" titulo="Gancho">
      <Fila>
        <Columna flex={1.2}>
          <CodePanel codigo={sinResultados(E1)} titulo="ejemplo-1.js" lineasActivas={v.linea ? [v.linea] : []} desde={desde} tamano={44} />
        </Columna>
        <Columna flex={1}>
          <Consola salida={v.salida ?? []} previa={previo?.salida} desde={desde} tamano={52} />
        </Columna>
      </Fila>
      {v.fase === 'titulo' ? (
        <div style={{marginTop: 50, textAlign: 'center'}}>
          <Etiqueta texto="¿Qué pasa cuando dos variables tienen el mismo nombre?" tono="acento" tamano={54} desde={desde} />
          <div style={{marginTop: 22, fontSize: 32, color: COLOR.tintaSuave, opacity: entrada(desde, 15)}}>Ámbitos, sombreado de variables y tablas de símbolos en compiladores</div>
        </div>
      ) : null}
    </Escena>
  );
};
