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
