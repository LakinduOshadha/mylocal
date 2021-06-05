import Format from 'stateless/atoms/Format.js';
import EntityLink from 'stateful/atoms/EntityLink.js';

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
  return Object.assign({}, {
    'Region Codes': undefined,
    'ISO 3166 code': entityData.id,
    'GND Num': entityData.gnd_num,
  });
}

export async function getPSInfo(entityData) {
  return {
    Name: entityData.name + ' Police Station',
    Division: entityData.division + ' Division',
    Office: Format.phoneNum(entityData.phone_office),
    Mobile: Format.phoneNum(entityData.fax),
    Fax: Format.phoneNum(entityData.phone_mobile),
    'GND of Location': <EntityLink entityID={entityData.gnd_id}/>,
  };
}
