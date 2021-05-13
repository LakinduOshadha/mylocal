import {
  REGION,
  REGION_TO_ID_LENGTH,
  ID_LENGTH_TO_REGION,
} from '../model/RegionConstants.js';

export function getIDKey(regionType) {
  return `${regionType}_id`
}

export function isISORegionType(regionID) {
  return regionID.substring(0, 2) === 'LK';
}

export function isECRegionType(regionID) {
  return regionID.substring(0, 2) === 'EC';
}

export function getRegionType(regionID) {
  const idLength = regionID.length;
  if (isISORegionType(regionID)) {
    return ID_LENGTH_TO_REGION[idLength] || undefined;
  }
  else if (isECRegionType(regionID)) {
    if (idLength === 5) {
      return REGION.ED;
    } else if (idLength === 6) {
      return REGION.PD;
    }
  }
  return undefined;
}

export function convertRegionID(selectedRegionID, regionType) {
  const newRegionIDLength = REGION_TO_ID_LENGTH[regionType];
  const currentRegionIDLength = selectedRegionID.length;
  if (newRegionIDLength < currentRegionIDLength) {
    return selectedRegionID.slice(0, newRegionIDLength);
  }
  return selectedRegionID;
}

export function getParentRegionTypes(regionType) {
  switch(regionType) {
    case REGION.GND:
      return [].concat(getParentRegionTypes(REGION.DSD), [REGION.GND]);
    case REGION.DSD:
      return [].concat(getParentRegionTypes(REGION.DISTRICT), [REGION.DSD]);
    case REGION.DISTRICT:
      return [].concat(
          getParentRegionTypes(REGION.PROVINCE),
          [REGION.DISTRICT],
      );
    case REGION.PROVINCE:
      return [REGION.PROVINCE];
    default:
      return [];
  }
}
