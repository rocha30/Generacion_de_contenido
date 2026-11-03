import React from 'react';
import {COLOR, FUENTE} from '../tema';
import {useClaves, type Clave} from '../lib/tiempo';
import {entrada} from '../lib/anim';
import {Escena, Fila} from '../components/Escena';
import {Caja, Flecha} from '../components/Diagramas';

type V = {fase: 'ideas'; n: number} | {fase: 'pregunta'; paso: number};

const CLAVES: Clave<V>[] = [
  {beat: 'S08-B1', estado: {fase: 'ideas', n: 0}},
  {beat: 'S08-B1', en: 0.08, estado: {fase: 'ideas', n: 1}},
  {beat: 'S08-B1', en: 0.38, estado: {fase: 'ideas', n: 2}},
  {beat: 'S08-B1', en: 0.68, estado: {fase: 'ideas', n: 3}},
  {beat: 'S08-B2', estado: {fase: 'pregunta', paso: 0}},
  {beat: 'S08-B2', en: 0.55, estado: {fase: 'pregunta', paso: 1}},
];

const IDEAS = [
  {t: 'Nombre ≠ vinculación', d: 'Dos declaraciones pueden compartir el identificador.'},
  {t: 'El ámbito decide la visibilidad', d: 'Una declaración interna sombrea sin modificar la exterior.'},
  {t: 'Tabla = modelo didáctico', d: 'Visualiza cómo se relacionan referencias y declaraciones.'},
];

export const E08Cierre: React.FC = () => {
  const {actual: v, desde} = useClaves(CLAVES);
  if (v.fase === 'ideas') {
    return (
      <Escena numero="08" titulo="Cierre" centrar>
        <Fila gap={36} style={{alignItems: 'stretch'}}>
          {IDEAS.map((idea, i) =>
            i < v.n ? (
              <div key={idea.t} style={{width: 520, background: COLOR.tarjeta, borderRadius: 28, padding: 40, borderTop: `10px solid ${COLOR.acento}`, boxShadow: '0 14px 40px rgba(0,0,0,0.08)', opacity: entrada(i === v.n - 1 ? desde : 99), transform: `translateY(${(1 - entrada(i === v.n - 1 ? desde : 99)) * 30}px)`}}>
                <div style={{fontFamily: FUENTE.mono, color: COLOR.acento, fontSize: 40, fontWeight: 700}}>{i + 1}</div>
                <div style={{fontSize: 44, fontWeight: 800, marginTop: 10}}>{idea.t}</div>
                <div style={{fontSize: 30, color: COLOR.tintaSuave, marginTop: 16, lineHeight: 1.35}}>{idea.d}</div>
              </div>
            ) : (
              <div key={idea.t} style={{width: 520}} />
            ),
          )}
        </Fila>
      </Escena>
    );
  }
  return (
    <Escena numero="08" titulo="Cierre" centrar>
      <Fila gap={30} style={{alignItems: 'center'}}>
        <Caja titulo="Referencia" desde={v.paso === 0 ? desde : 99} />
        <Flecha desde={v.paso === 0 ? desde : 99} retraso={12} ancho={120} />
        <Caja titulo="Buscar en el ámbito" tono="acento" desde={v.paso === 0 ? desde : 99} retraso={24} />
        <Flecha desde={v.paso === 0 ? desde : 99} retraso={36} ancho={120} />
        <Caja titulo="Vinculación" desde={v.paso === 0 ? desde : 99} retraso={48} />
      </Fila>
      {v.paso >= 1 ? (
        <div style={{marginTop: 90, fontSize: 64, fontWeight: 800, textAlign: 'center', opacity: entrada(desde), maxWidth: 1500}}>
          ¿En qué ámbito está esta referencia y qué declaración encuentra primero?
        </div>
      ) : null}
    </Escena>
  );
};
