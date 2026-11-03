import React from 'react';
import {useClaves, type Clave} from '../lib/tiempo';
import {E1, sinResultados} from '../data/ejemplos';
import {E1_ESTADOS} from '../data/estados';
import {Escena, Fila} from '../components/Escena';
import {VistaEjemplo, type VistaEstado} from '../components/VistaEjemplo';
import {Etiqueta} from '../components/Etiqueta';
import {COLOR} from '../tema';
import {entrada} from '../lib/anim';

type V = VistaEstado & {fase: 'linea1' | 'completo' | 'conceptos'};

const CLAVES: Clave<V>[] = [
  {beat: 'S02-B1', estado: {fase: 'linea1', tablas: E1_ESTADOS['E1-0'], bloques: false}},
  {beat: 'S02-B1', en: 0.18, estado: {fase: 'linea1', tablas: E1_ESTADOS['E1-0'], bloques: false, anotaciones: [{linea: 1, texto: 'x → identificador'}]}},
  {beat: 'S02-B1', en: 0.4, estado: {fase: 'linea1', tablas: E1_ESTADOS['E1-1'], bloques: false, lineas: [1], anotaciones: [{linea: 1, texto: 'declaración'}]}},
  {beat: 'S02-B2', estado: {fase: 'completo', tablas: E1_ESTADOS['E1-1'], bloques: false, lineas: [4], anotaciones: [{linea: 4, texto: 'x → referencia'}]}},
  {beat: 'S02-B2', en: 0.5, estado: {fase: 'completo', tablas: E1_ESTADOS['E1-2'], anotaciones: []}},
  {beat: 'S02-B2', en: 0.72, estado: {fase: 'completo', tablas: E1_ESTADOS['E1-3'], anotaciones: []}},
  {beat: 'S02-B3', estado: {fase: 'conceptos', tablas: E1_ESTADOS['E1-3']}},
];

const CONCEPTOS = ['Nombre', 'Declaración', 'Referencia', 'Ámbito'];

export const E02Conceptos: React.FC = () => {
  const {actual: v, previo, desde} = useClaves(CLAVES);
  if (v.fase === 'conceptos') {
    return (
      <Escena numero="02" titulo="Cuatro conceptos" centrar>
        <Fila gap={34}>
          {CONCEPTOS.map((c, i) => (
            <Etiqueta key={c} texto={c} tono={i === 3 ? 'acento' : 'tinta'} tamano={60} desde={desde} retraso={i * 40} />
          ))}
        </Fila>
        <div style={{marginTop: 90, fontSize: 56, fontWeight: 800, color: COLOR.tinta, opacity: entrada(desde, 200)}}>¿A qué declaración apunta esta referencia?</div>
      </Escena>
    );
  }
  return (
    <Escena numero="02" titulo="Cuatro conceptos">
      <VistaEjemplo
        ejemplo="E1"
        codigo={v.fase === 'linea1' ? 'let x = 10;' : sinResultados(E1)}
        {...v}
        previas={previo?.tablas}
        desde={desde}
      />
    </Escena>
  );
};
