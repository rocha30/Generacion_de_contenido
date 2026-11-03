import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLOR, FUENTE, SIN_LIGADURAS} from '../tema';
import {SceneTitle} from './SceneTitle';

/** Base común de todas las escenas: fondo, encabezado y área de contenido. */
export const Escena: React.FC<{numero: string; titulo: string; children: React.ReactNode; centrar?: boolean}> = ({numero, titulo, children, centrar}) => (
  <AbsoluteFill style={{background: COLOR.fondo, fontFamily: FUENTE.sans, color: COLOR.tinta, ...SIN_LIGADURAS}}>
    <SceneTitle numero={numero} titulo={titulo} />
    <div style={{position: 'absolute', top: 130, left: 72, right: 72, bottom: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: centrar ? 'center' : 'stretch'}}>
      {children}
    </div>
  </AbsoluteFill>
);

export const Fila: React.FC<{children: React.ReactNode; gap?: number; style?: React.CSSProperties}> = ({children, gap = 48, style}) => (
  <div style={{display: 'flex', gap, alignItems: 'flex-start', ...style}}>{children}</div>
);

export const Columna: React.FC<{children: React.ReactNode; flex?: number; gap?: number; style?: React.CSSProperties}> = ({children, flex = 1, gap = 28, style}) => (
  <div style={{flex, display: 'flex', flexDirection: 'column', gap, minWidth: 0, ...style}}>{children}</div>
);
