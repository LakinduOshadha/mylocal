import {invertDict} from '../model/DataStructures.js';

export const EXCLUDE_REGION_IDS = [
  "LK-7215260",
  "LK-9212070",
  "LK-9212120",
  "LK-7215235",
  "LK-1227350",
  "LK-2134105",
  "LK-6157210",
  "LK-6157215",
  "LK-4309055",
  "LK-2309595",
  "LK-1330175",
  "LK-5100",
  "LK-6000",
  "LK-9209",
  "LK-9103",
  "LK-5103",
  "LK-51",
  "LK-62",
  "LK-5",
  "LK-9",
];

export const REGION = {
  COUNTRY: 'country',
  PROVINCE: 'province',
  DISTRICT: 'district',
  DSD: 'dsd',
  GND: 'gnd',
  ED: 'ed',
  PD: 'pd',
}

export const REGION_LABEL = {
  [REGION.COUNTRY]: 'Country',
  [REGION.PROVINCE]: 'Province',
  [REGION.DISTRICT]: 'Administrative District',
  [REGION.DSD]: 'Divisional Secretariat Division',
  [REGION.GND]: 'Grama Niladari Division',
  [REGION.PD]: 'Polling Division',
  [REGION.ED]: 'Electoral District',
}
export const REGION_LIST = Object.values(REGION);

export const REGION_TO_ID_LENGTH = {
  [REGION.COUNTRY]: 2,
  [REGION.PROVINCE]: 4,
  [REGION.DISTRICT]: 5,
  [REGION.DSD]: 7,
  [REGION.GND]: 10,
}
export const ID_LENGTH_TO_REGION = invertDict(REGION_TO_ID_LENGTH);

export const DEFAULT_REGION_ID = 'LK-1127015'; // Kurunduwatta GND
