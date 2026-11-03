import React from 'react';
import {Composition, Folder} from 'remotion';
import {Video, type VideoProps} from './Video';
import {ALTO, ANCHO, ESCENAS, FPS, framesDeEscena, framesTotales} from './lib/tiempo';
import {COMPONENTES} from './scenes';

const base = {fps: FPS, width: ANCHO, height: ALTO} as const;

export const Root: React.FC = () => (
  <>
    <Composition id="Video" component={Video} durationInFrames={framesTotales()} defaultProps={{teleprompter: false} satisfies VideoProps} {...base} />
    {/* Mismo video con el texto del guion abajo: para grabar la narración mirando la animación. */}
    <Composition id="Teleprompter" component={Video} durationInFrames={framesTotales()} defaultProps={{teleprompter: true} satisfies VideoProps} {...base} />
    <Folder name="Escenas">
      {ESCENAS.map((e) => (
        <Composition key={e} id={`Escena${e}`} component={COMPONENTES[e]} durationInFrames={framesDeEscena(e)} {...base} />
      ))}
    </Folder>
  </>
);
