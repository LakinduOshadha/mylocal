// import {ENTITY} from 'core/EntityConstants.js';
// import {getPlacesWithinRegion} from 'core/Places.js';
import Format from 'view/Format.js';
import {renderID} from 'view/components/EntityLink.js';

export async function getProvinceInfo(entityData) {
  return Object.assign({}, {
    'Region Codes': undefined,
    'ISO 3166 code': entityData.id,
    'FIPS code': entityData.fips,
  });
}

export async function getDistrictInfo(entityData) {
  return Object.assign({}, {
    'Region Codes': undefined,
    'ISO 3166 code': entityData.id,
    'FIPS code': entityData.fips,
    'HASC code': entityData.hasc,
  });
}

export async function getDSDInfo(entityData) {
  return Object.assign({}, {
    'Region Codes': undefined,
    'ISO 3166 code': entityData.id,
    'HASC code': entityData.hasc,
  });
}

export async function getGNDInfo(entityData) {
  // const policeEntities = await getPlacesWithinRegion(ENTITY.PS, entityData.id);
  // const placeInfo = (policeEntities.length > 0) ? {
  //   'Police Stations': renderID(policeEntities[0].id),
  // } : null;

  return Object.assign({}, {
    'Region Codes': undefined,
    'ISO 3166 code': entityData.id,
    'GND Num': entityData.gnd_num,
  });
  // }, placeInfo);
}

export async function getPSInfo(entityData) {
  return {
    Name: entityData.name + ' Police Station',
    Division: entityData.division + ' Division',
    Office: Format.phoneNum(entityData.phone_office),
    Mobile: Format.phoneNum(entityData.fax),
    Fax: Format.phoneNum(entityData.phone_mobile),
    'GND of Location': renderID(entityData.gnd_id),
  };
}
