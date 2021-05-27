import Format from 'view/Format.js';

export function getProvinceInfo(entityData) {
  return Object.assign({}, {
    'ISO 3166 code': entityData.id,
    'FIPS code': entityData.fips,
  });
}

export function getDistrictInfo(entityData) {
  return Object.assign({}, {
    'ISO 3166 code': entityData.id,
    'FIPS code': entityData.fips,
    'HASC code': entityData.hasc,
  });
}

export function getDSDInfo(entityData) {
  return Object.assign({}, {
    'ISO 3166 code': entityData.id,
    'HASC code': entityData.hasc,
  });
}

export function getGNDInfo(entityData) {
  return Object.assign({}, {
    'ISO 3166 code': entityData.id,
    'GND Num': entityData.gnd_num,
  });
}

export function getPSInfo(entityData) {
  return {
    Name: entityData.name + ' Police Station',
    Division: entityData.division + ' Division',
    Office: Format.phone(entityData.phone_office),
    Mobile: Format.phone(entityData.fax),
    Fax: Format.phone(entityData.phone_mobile),
  };
}
