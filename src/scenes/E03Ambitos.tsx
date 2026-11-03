import React from 'react';
import {useClaves, type Clave} from '../lib/tiempo';
import {E1, sinResultados} from '../data/ejemplos';
import {E1_ESTADOS} from '../data/estados';
import {Escena} from '../components/Escena';
import {VistaEjemplo, type VistaEstado} from '../components/VistaEjemplo';
import {Etiqueta} from '../components/Etiqueta';

type V = VistaEstado & {mensaje?: string};

const CLAVES: Clave<V>[] = [
  // La escena 02 terminó en E1-3: aquí se reinicia (storyboard v1.1).
  {beat: 'S03-B1', estado: {tablas: E1_ESTADOS['E1-0']}},
  {beat: 'S03-B1', en: 0.3, estado: {tablas: E1_ESTADOS['E1-1'], lineas: [1]}},
  {beat: 'S03-B2', estado: {tablas: E1_ESTADOS['E1-2'], lineas: [2]}},
  {beat: 'S03-B2', en: 0.5, estado: {tablas: E1_ESTADOS['E1-3'], lineas: [3]}},
  {beat: 'S03-B3', estado: {tablas: E1_ESTADOS['E1-4'], lineas: [4], busqueda: {nombre: 'x', recorrido: ['A1'], encontrado: true}}},
  {beat: 'S03-B3', en: 0.3, estado: {tablas: E1_ESTADOS['E1-5'], lineas: [5]}},
  {beat: 'S03-B3', en: 0.45, estado: {tablas: E1_ESTADOS['E1-6'], lineas: [6], busqueda: {nombre: 'x', recorrido: ['A0'], encontrado: true}}},
  {beat: 'S03-B3', en: 0.8, estado: {tablas: E1_ESTADOS['E1-6'], mensaje: 'Cerrar el ámbito ≠ sobrescribir la variable exterior'}},
];

export const E03Ambitos: React.FC = () => {
  const {actual: v, previo, desde} = useClaves(CLAVES);
  return (
    <Escena numero="03" titulo="Cómo se forman los ámbitos">
      <VistaEjemplo
        ejemplo="E1"
        codigo={sinResultados(E1)}
        {...v}
        previas={previo?.tablas}
        desde={desde}
        debajo={v.mensaje ? <Etiqueta texto={v.mensaje} tono="tinta" tamano={36} desde={desde} /> : null}
      />
    </Escena>
  );
};
