import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {COLOR, FUENTE} from '../tema';
import {fundido} from '../lib/anim';

// Texto de docs/04-atribuciones.md §4. Confirmar nombres completos (con tildes) antes del render final.
export const INTEGRANTES = ['Diego Lopez', 'Luis Pedro Lira', 'Mario Rocha'];

export const E09Creditos: React.FC = () => {
  const f = useCurrentFrame();
  const o = fundido(f, 0, 20);
  return (
    <AbsoluteFill style={{background: COLOR.codigoFondo, color: '#fff', fontFamily: FUENTE.sans, alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: o}}>
      <div style={{fontSize: 46, fontWeight: 800, maxWidth: 1500}}>¿Qué pasa cuando dos variables tienen el mismo nombre?</div>
      <div style={{fontSize: 30, color: '#AEB6C0', marginTop: 12}}>Ámbitos, sombreado de variables y tablas de símbolos en compiladores</div>
      <div style={{marginTop: 56, display: 'flex', gap: 70, fontSize: 48, fontWeight: 800, color: COLOR.codigoClave}}>
        {INTEGRANTES.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
      <div style={{marginTop: 56, fontSize: 40, fontWeight: 600}}>Universidad del Valle de Guatemala</div>
      <div style={{fontSize: 40, fontWeight: 600, marginTop: 8}}>Construcción de Compiladores</div>
      <div style={{marginTop: 56, fontSize: 26, color: '#AEB6C0', lineHeight: 1.6}}>
        Referencias técnicas: ECMAScript 2026 (Ecma International / TC39) · MDN Web Docs · <i>Crafting Interpreters</i> (Robert Nystrom) · TypeScript (Microsoft)
        <br />
        Animaciones y ejemplos: producción original del grupo · Tipografías Inter y JetBrains Mono (SIL Open Font License)
        <br />
        Licencia: Creative Commons Atribución (CC BY)
      </div>
    </AbsoluteFill>
  );
};
