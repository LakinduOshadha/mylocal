import {invertDict} from './DataStructures.js';

export const ENTITY = {
  COUNTRY: 'country',
  PROVINCE: 'province',
  DISTRICT: 'district',
  DSD: 'dsd',
  GND: 'gnd',
  ED: 'ed',
  PD: 'pd',
  PS: 'ps',
  MOH: 'moh',
  LG: 'lg',
  UNKNOWN: 'unknown',
}

export const DEFAULT_ENTITY_ID = 'LK-1127015';

export const ENTITIES = Object.values(ENTITY);

export const ENTITY_LABEL_MAP = {
  [ENTITY.COUNTRY]: 'Country',
  [ENTITY.PROVINCE]: 'Province',
  [ENTITY.DISTRICT]: 'Administrative District',
  [ENTITY.DSD]: 'Divisional Secretariat Division',
  [ENTITY.GND]: 'Grama Niladari Division',
  [ENTITY.PD]: 'Polling Division',
  [ENTITY.ED]: 'Electoral District',
  [ENTITY.PS]: 'Police Station',
  [ENTITY.LG]: 'Local Authority',
  [ENTITY.MOH]: 'Medical Office of Health Area',
}

export const ENTITY_LABEL_SHORT_MAP = {
  [ENTITY.COUNTRY]: '',
  [ENTITY.PROVINCE]: 'Province',
  [ENTITY.DISTRICT]: 'District',
  [ENTITY.DSD]: 'DSD',
  [ENTITY.GND]: 'GND',
  [ENTITY.PD]: 'PD',
  [ENTITY.ED]: 'ED',
  [ENTITY.PS]: 'PS',
  [ENTITY.LG]: '',
  [ENTITY.MOH]: 'MOH',
}

export const ISO_ENTITY_TO_ID_LENGTH = {
  [ENTITY.COUNTRY]: 2,
  [ENTITY.PROVINCE]: 4,
  [ENTITY.DISTRICT]: 5,
  [ENTITY.DSD]: 7,
  [ENTITY.GND]: 10,
}
export const ISO_ID_LENGTH_TO_ENTITY = invertDict(ISO_ENTITY_TO_ID_LENGTH);

export const EC_ID_LENGTH_TO_ENTITY = {
  5: ENTITY.ED,
  6: ENTITY.PD,
}
