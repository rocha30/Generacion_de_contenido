import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {COLOR, FUENTE} from '../tema';
import {entrada} from '../lib/anim';

/** Encabezado persistente de escena: número + título; entra deslizándose al iniciar. */
export const SceneTitle: React.FC<{numero: string; titulo: string}> = ({numero, titulo}) => {
  const f = useCurrentFrame();
  const p = entrada(f);
  return (
    <div style={{position: 'absolute', top: 44, left: 72, display: 'flex', alignItems: 'center', gap: 20, fontFamily: FUENTE.sans, opacity: p, transform: `translateX(${interpolate(p, [0, 1], [-40, 0])}px)`}}>
      <span style={{background: COLOR.acento, color: '#fff', fontWeight: 800, fontSize: 30, borderRadius: 12, padding: '6px 16px'}}>{numero}</span>
      <span style={{fontWeight: 800, fontSize: 38, color: COLOR.tinta}}>{titulo}</span>
    </div>
  );
};
