import React from 'react';
import {COLOR, FUENTE} from '../tema';
import {useClaves, type Clave} from '../lib/tiempo';
import {entrada} from '../lib/anim';
import {E1, sinResultados} from '../data/ejemplos';
import {E1_ESTADOS} from '../data/estados';
import {Escena, Fila, Columna} from '../components/Escena';
import {VistaEjemplo} from '../components/VistaEjemplo';
import {Etiqueta} from '../components/Etiqueta';
import {Consola} from '../components/Consola';
import {CodePanel} from '../components/CodePanel';
import {Caja, Flecha, Persona} from '../components/Diagramas';
import {Ficha} from './E01Gancho';

type V =
  | {fase: 'busqueda'; mensaje?: boolean}
  | {fase: 'comparar'; mensaje?: boolean}
  | {fase: 'hipotesis'; tachar?: boolean; salida: string[]}
  | {fase: 'afuera'; paso: number}
  | {fase: 'analogia'; paso: number};

const CLAVES: Clave<V>[] = [
  {beat: 'S04-B1', estado: {fase: 'busqueda'}},
  {beat: 'S04-B1', en: 0.55, estado: {fase: 'busqueda', mensaje: true}},
  {beat: 'S04-B2', estado: {fase: 'comparar'}},
  {beat: 'S04-B2', en: 0.45, estado: {fase: 'comparar', mensaje: true}},
  {beat: 'S04-B3', estado: {fase: 'hipotesis', salida: []}},
  {beat: 'S04-B3', en: 0.4, estado: {fase: 'hipotesis', salida: ['20']}},
  {beat: 'S04-B3', en: 0.5, estado: {fase: 'hipotesis', salida: ['20', '10'], tachar: true}},
  {beat: 'S04-B4', estado: {fase: 'afuera', paso: 0}},
  {beat: 'S04-B4', en: 0.3, estado: {fase: 'afuera', paso: 1}},
  {beat: 'S04-B4', en: 0.55, estado: {fase: 'afuera', paso: 2}},
  {beat: 'S04-B5', estado: {fase: 'analogia', paso: 0}},
  {beat: 'S04-B5', en: 0.18, estado: {fase: 'analogia', paso: 1}},
  {beat: 'S04-B5', en: 0.42, estado: {fase: 'analogia', paso: 2}},
  {beat: 'S04-B5', en: 0.68, estado: {fase: 'analogia', paso: 3}},
];

const Analogia: React.FC<{paso: number; desde: number}> = ({paso, desde}) => {
  const casaSinAna = paso === 2;
  return (
    <Fila gap={60} style={{alignItems: 'center'}}>
      <div style={{flex: 1.4, border: `5px solid #9AA3AE`, borderRadius: 30, padding: 30, background: '#ECEEEA', position: 'relative'}}>
        <div style={{fontWeight: 800, fontSize: 42, marginBottom: 22}}>Edificio</div>
        <Fila gap={40} style={{alignItems: 'stretch'}}>
          <div style={{flex: 1.3, border: `5px solid ${COLOR.acento}`, borderRadius: 24, background: '#fff', padding: 30, minHeight: 470}}>
            <div style={{fontWeight: 800, fontSize: 40, color: COLOR.acento}}>Tu casa</div>
            <Fila gap={40} style={{marginTop: 50, alignItems: 'center'}}>
              {paso >= 1 ? <Etiqueta texto="«¡Ana!»" tono="tinta" tamano={40} desde={paso === 1 ? desde : 99} /> : null}
              {!casaSinAna ? <Persona nombre="Ana" resaltada={paso === 1 || paso === 3} desde={paso === 0 ? desde : 99} /> : <div style={{fontSize: 28, color: COLOR.tintaSuave, fontStyle: 'italic'}}>(aquí no vive ninguna Ana)</div>}
            </Fila>
          </div>
          <div style={{flex: 1, border: `4px dashed #9AA3AE`, borderRadius: 24, padding: 26}}>
            <div style={{fontWeight: 800, fontSize: 36, color: COLOR.tintaSuave}}>Pasillo / resto del edificio</div>
            <div style={{marginTop: 70, display: 'flex', justifyContent: 'center'}}>
              <Persona nombre="Ana" resaltada={casaSinAna} desde={paso === 0 ? desde : 99} retraso={12} />
            </div>
          </div>
        </Fila>
        {casaSinAna ? (
          <div style={{position: 'absolute', left: '42%', top: '52%'}}>
            <Flecha texto="si en casa no está, salir a buscar" desde={desde} ancho={180} color={COLOR.acento} />
          </div>
        ) : null}
      </div>
      <Columna flex={1} gap={30}>
        {paso >= 1 && paso !== 2 ? <Etiqueta texto="Responde la más cercana" tono="acento" tamano={44} desde={paso === 1 ? desde : 99} /> : null}
        {paso === 2 ? <Etiqueta texto="Recién entonces se busca afuera" tono="acento" tamano={44} desde={desde} /> : null}
        {paso === 3 ? (
          <>
            <Etiqueta texto="Casa = bloque donde está escrita la referencia" tono="tinta" tamano={42} desde={desde} />
            <Etiqueta texto="Alcance léxico = lo decide el texto" tono="acento" tamano={46} desde={desde} retraso={30} />
          </>
        ) : null}
      </Columna>
    </Fila>
  );
};

export const E04Shadowing: React.FC = () => {
  const {actual: v, previo, desde} = useClaves(CLAVES);
  const titulo = 'Shadowing: mismo nombre, dos vinculaciones';
  if (v.fase === 'busqueda') {
    return (
      <Escena numero="04" titulo={titulo}>
        <VistaEjemplo
          ejemplo="E1"
          codigo={sinResultados(E1)}
          tablas={E1_ESTADOS['E1-4']}
          previas={previo ? undefined : E1_ESTADOS['E1-3']}
          lineas={[4]}
          busqueda={v.mensaje ? undefined : {nombre: 'x', recorrido: ['A1'], encontrado: true}}
          desde={desde}
          debajo={v.mensaje ? <Etiqueta texto="Encontrado en A1: no hace falta seguir buscando" tono="acento" tamano={34} desde={desde} /> : null}
        />
      </Escena>
    );
  }
  if (v.fase === 'comparar') {
    return (
      <Escena numero="04" titulo={titulo} centrar>
        <Fila gap={120} style={{alignItems: 'center'}}>
          <Columna gap={16} style={{alignItems: 'center'}}>
            <div style={{fontWeight: 800, fontSize: 38}}>A0 · exterior</div>
            <Ficha nombre="x" valor="10" desde={99} pie="ID didáctico: x0" />
          </Columna>
          <div style={{fontFamily: FUENTE.mono, fontSize: 110, fontWeight: 700, color: COLOR.error, opacity: entrada(desde, 10)}}>≠</div>
          <Columna gap={16} style={{alignItems: 'center'}}>
            <div style={{fontWeight: 800, fontSize: 38}}>A1 · bloque</div>
            <Ficha nombre="x" valor="20" desde={99} pie="ID didáctico: x1" />
          </Columna>
        </Fila>
        <div style={{height: 70}} />
        {v.mensaje ? <Etiqueta texto="Igual nombre, distintas declaraciones" tono="acento" tamano={52} desde={desde} /> : null}
      </Escena>
    );
  }
  if (v.fase === 'hipotesis') {
    return (
      <Escena numero="04" titulo={titulo}>
        <Fila>
          <Columna flex={1.1}>
            <Etiqueta texto="Hipótesis: «la última declaración reemplaza a todas las anteriores»" tono="suave" tamano={40} desde={99} tachado={v.tachar} />
            {v.tachar ? <Etiqueta texto="Falsa: la salida lo demuestra" tono="error" tamano={40} desde={desde} retraso={20} /> : null}
            <CodePanel codigo={sinResultados(E1)} titulo="ejemplo-1.js" tamano={36} />
          </Columna>
          <Columna flex={1}>
            <Consola salida={v.salida} previa={previo?.fase === 'hipotesis' ? previo.salida : undefined} desde={desde} tamano={46} />
          </Columna>
        </Fila>
      </Escena>
    );
  }
  if (v.fase === 'afuera') {
    return (
      <Escena numero="04" titulo={titulo} centrar>
        <Fila gap={40} style={{alignItems: 'center'}}>
          <Caja titulo="Ámbito actual" tono="acento" desde={v.paso === 0 ? desde : 99}>
            <div style={{fontSize: 36}}>¿Está el nombre aquí?</div>
            {v.paso >= 1 ? <div style={{fontSize: 36, color: COLOR.error, fontWeight: 800, marginTop: 10, opacity: entrada(desde)}}>✗ no aparece</div> : null}
          </Caja>
          {v.paso >= 1 ? <Flecha texto="Si aquí no aparece, buscar afuera" desde={v.paso === 1 ? desde : 99} retraso={10} /> : null}
          {v.paso >= 1 ? (
            <Caja titulo="Ámbito padre" desde={v.paso === 1 ? desde : 99} retraso={20}>
              <div style={{fontSize: 36}}>¿Está aquí?</div>
            </Caja>
          ) : null}
          {v.paso >= 2 ? <Flecha texto="y así, hacia afuera" desde={desde} /> : null}
          {v.paso >= 2 ? <Caja titulo="Ámbito exterior" desde={desde} retraso={12} /> : null}
        </Fila>
        <div style={{height: 60}} />
        {v.paso >= 2 ? <Etiqueta texto="Sombrear un nombre no obliga a redeclarar todos los demás" tono="tinta" tamano={42} desde={desde} retraso={30} /> : null}
      </Escena>
    );
  }
  return (
    <Escena numero="04" titulo={titulo}>
      <Analogia paso={v.paso} desde={desde} />
    </Escena>
  );
};
