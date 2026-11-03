import type React from 'react';
import type {Escena} from '../lib/tiempo';
import {E01Gancho} from './E01Gancho';
import {E02Conceptos} from './E02Conceptos';
import {E03Ambitos} from './E03Ambitos';
import {E04Shadowing} from './E04Shadowing';
import {E05Tabla} from './E05Tabla';
import {E06Errores} from './E06Errores';
import {E07Codigo} from './E07Codigo';
import {E08Cierre} from './E08Cierre';
import {E09Creditos} from './E09Creditos';

export const COMPONENTES: Record<Escena, React.FC> = {
  '01': E01Gancho,
  '02': E02Conceptos,
  '03': E03Ambitos,
  '04': E04Shadowing,
  '05': E05Tabla,
  '06': E06Errores,
  '07': E07Codigo,
  '08': E08Cierre,
  '09': E09Creditos,
};
