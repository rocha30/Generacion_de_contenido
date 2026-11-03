import React from 'react';
import {AbsoluteFill, Audio, Sequence, Series, staticFile, useCurrentFrame} from 'remotion';
import {BEATS, ESCENAS, FPS, beatsDe, framesDeEscena, inicioGlobal} from './lib/tiempo';
import {CON_AUDIO} from './data/duraciones';
import {COMPONENTES} from './scenes';
import {COLOR, FUENTE} from './tema';

export type VideoProps = {teleprompter: boolean};

/** Texto del beat actual en la parte inferior, para grabar la voz mirando la animación. */
const Teleprompter: React.FC = () => {
  const frame = useCurrentFrame();
  let acc = 0;
  for (const e of ESCENAS) {
    if (e === '09') break;
    for (const b of beatsDe(e)) {
      if (frame < acc + b.frames) {
        const local = frame - acc;
        const restante = Math.ceil((b.frames - local) / FPS);
        return (
          <AbsoluteFill style={{justifyContent: 'flex-end'}}>
            <div style={{background: 'rgba(10,12,15,0.88)', color: '#fff', padding: '18px 40px 26px', fontFamily: FUENTE.sans}}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 22, color: COLOR.codigoClave, fontWeight: 800}}>
                <span>
                  {b.id} · {b.titulo}
                </span>
                <span>quedan {restante} s</span>
              </div>
              <div style={{height: 6, background: '#333', borderRadius: 3, margin: '8px 0 12px'}}>
                <div style={{width: `${(local / b.frames) * 100}%`, height: 6, background: COLOR.acento, borderRadius: 3}} />
              </div>
              <div style={{fontSize: 27, lineHeight: 1.38}}>{b.texto}</div>
            </div>
          </AbsoluteFill>
        );
      }
      acc += b.frames;
    }
  }
  return null;
};

export const Video: React.FC<VideoProps> = ({teleprompter}) => (
  <AbsoluteFill style={{background: COLOR.fondo}}>
    <Series>
      {ESCENAS.map((e) => {
        const C = COMPONENTES[e];
        return (
          <Series.Sequence key={e} durationInFrames={framesDeEscena(e)} name={`Escena ${e}`}>
            <C />
          </Series.Sequence>
        );
      })}
    </Series>
    {/* Narración: un WAV por beat (public/narracion/S01-B1.wav, …), cada uno al inicio de su beat. */}
    {BEATS.filter((b) => CON_AUDIO.includes(b.id)).map((b) => (
      <Sequence key={b.id} from={inicioGlobal(b.id)} durationInFrames={b.frames} name={`Voz ${b.id}`} layout="none">
        <Audio src={staticFile(`narracion/${b.id}.wav`)} />
      </Sequence>
    ))}
    {teleprompter ? <Teleprompter /> : null}
  </AbsoluteFill>
);

export const resumenDuracion = () =>
  ESCENAS.map((e) => `${e}: ${(framesDeEscena(e) / FPS).toFixed(0)} s`).join(' · ') + ` · beats: ${BEATS.length}`;
